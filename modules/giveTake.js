import d from "../lib/dom.js";
import { header, measureText } from "./header.js";
import { footer } from "./footer.js";
import { loading } from "./loading.js";
import {
  db,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
} from "../assets/js/firebase.js";

const dbName = "giveTake";

const { createElement, $ } = d;

const giveTake = createElement("div");

const main = createElement("main").setAttribute({
  class: ["main", "table"],
});
const h1 = createElement("h1");

const interval = createElement("div").setAttribute({
  class: "interval",
});

const startDate = createElement("input").setAttribute({
  type: "date",
});

const endDate = createElement("input").setAttribute({
  type: "date",
});

interval.append(startDate, endDate);
const tableWrapper = createElement("div").setAttribute({
  class: "wrapper",
});

const table = createElement("table");
const thead = createElement("thead").setAttribute({
  class: "sticky",
});

const titles = [
  "মাধ্যম",
  "দেওয়া",
  "নেওয়া",
  "পাওনা",
  "বিস্তারিত",
  "আপডেট",
];

const measureTableData = {};

for (let x in titles) {
  const data = [];
  data.push(92);
  measureTableData[x] = data;
}

const theadTr = createElement("tr");
for (let x of titles) {
  theadTr.append(
    createElement("th", x)
    // ({ style: [`width: ${x.length * 10}px`] })
  );
}

thead.append(theadTr);

const tbody = createElement("tbody").setAttribute({
  class: "sticky",
});

const enToBn = (en) => {
  en = String(en);
  const enDegit = "0123456789";
  const bnDegit = "০১২৩৪৫৬৭৮৯";
  for (let i = 0; i < enDegit.length; i++) {
    en = eval(`en.replace(/${enDegit[i]}/g, "${bnDegit[i]}")`);
  }
  return en;
};

const newOptionDiv = createElement("div").setAttribute({
  class: "freeze hide",
});

const newOptionValue = createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  spellcheck: "false",
});

const newOptionId = createElement("input").setAttribute({
  type: "hidden",
});

const closeBtnNew = createElement(
  "svg",
  `
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
  `,
  {
    "aria-hidden": "true",
    style:
      "fill: rgb(207, 34, 46);cursor: pointer;width: 20px;height: 20px;position: absolute;right: 10px;top: 10px;",
    height: "16",
    viewBox: "0 0 16 16",
    version: "1.1",
    width: "16",
    "data-view-component": "true",
    class: "octicon octicon-x",
  }
);

closeBtnNew.onload = () => {
  $(closeBtnNew).onclick = () => {
    $(newOptionDivArea).style.transform = "scale(0)";
    setTimeout(() => {
      $(newOptionDiv).style.display = "none";
    }, 100);
  };
};

const newOptionFormSubmitBtn = createElement("button", "আপডেট করুন", {
  class: "submitBtn",
  type: "submit",
});

const newOptionFormDeleteBtn = createElement("button", "মুছে ফেলুন", {
  class: "submitBtn",
  type: "button",
});

newOptionFormDeleteBtn.onload = async () => {
  $(newOptionFormDeleteBtn).onclick = async () => {
    newOptionFormDeleteBtn
      .setChildren("মুছে ফেলা হচ্ছে...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", [
        "background: #870000c9; color: #fcfcfcb0;",
      ]);

    const _giveDocs = await getDocs(
      collection(db, `${dbName}/${$(newOptionId).value}/give`)
    );

    _giveDocs.docs.forEach((element) => {
      deleteDoc(
        doc(db, dbName, $(newOptionId).value, "give", element.id)
      );
    });

    const _takeDocs = await getDocs(
      collection(db, `${dbName}/${$(newOptionId).value}/take`)
    );
    _takeDocs.docs.forEach((element) => {
      deleteDoc(
        doc(db, dbName, $(newOptionId).value, "take", element.id)
      );
    });

    deleteDoc(doc(db, dbName, $(newOptionId).value));

    main.setChildren([h1, loading]);

    $(newOptionDiv).style.display = "none";
    $(newOptionDivArea).style.transform = "scale(0)";
    newOptionFormDeleteBtn
      .setChildren("মুছে ফেলুন")
      .removeAttribute("style", "disabled");
    giveTake.onload();
  };
};

const newOptionForm = createElement(
  "form",
  [
    d.createElement("label", "মাধ্যম", {
      class: "formLabel",
    }),
    newOptionValue,
    newOptionId,
    newOptionFormSubmitBtn,
    newOptionFormDeleteBtn,
  ],
  {
    class: "form",
    style: " animation-name: none;",
  }
);

newOptionForm.onload = () => {
  $(newOptionForm).onsubmit = async (e) => {
    e.preventDefault();
    newOptionFormSubmitBtn
      .setChildren("আপডেট হচ্ছে...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", [
        "background: #870000c9; color: #fcfcfcb0;",
      ]);

    updateDoc(doc(db, dbName, $(newOptionId).value), {
      value: $(newOptionValue).value,
    });

    main.setChildren([h1, loading]);

    $(newOptionDiv).style.display = "none";
    $(newOptionDivArea).style.transform = "scale(0)";
    newOptionFormSubmitBtn
      .setChildren("আপডেট করুন")
      .removeAttribute("style", "disabled");

    giveTake.onload();
  };
};

const newOptionDivArea = createElement(
  "div",
  [closeBtnNew, createElement("h1", "মাধ্যম আপডেট"), newOptionForm],
  {
    class: "area",
  }
);

newOptionDiv.append(newOptionDivArea);

const dataPrint = (data, start, end) => {
  tbody.setChildren([]);
  for (let i = 0; i < data.length; i++) {
    const _data = data[i];

    const give = _data.give.filter((value) => {
      return (
        new Date(value.date).getTime() >= new Date(start).getTime() &&
        new Date(value.date).getTime() <= new Date(end).getTime()
      );
    });

    const take = _data.take.filter((value) => {
      return (
        new Date(value.date).getTime() >= new Date(start).getTime() &&
        new Date(value.date).getTime() <= new Date(end).getTime()
      );
    });

    let totalGive = 0;
    for (let x of give) {
      totalGive += Number(x.amount);
    }

    let totalTake = 0;
    for (let x of take) {
      totalTake += Number(x.amount);
    }

    const view = createElement("img").setAttribute(
      {
        src: "./assets/img/view.svg",
      },
      { style: "padding: 0;" }
    );

    view.onload = () => {
      $(view).onclick = () => {
        header.giveTakeId = _data.id;
        window.location = "./#/giveTakeDetails";
      };
    };

    const edit = createElement("img").setAttribute(
      {
        src: "./assets/img/edit.svg",
      },
      { style: "padding: 0;" }
    );

    edit.onload = () => {
      $(edit).onclick = () => {
        $(newOptionValue).value = _data.media;
        $(newOptionId).value = _data.id;
        $(newOptionDiv).style.display = "flex";
        setTimeout(() => {
          $(newOptionDivArea).style.transform = "scale(1)";
        }, 100);
      };
    };

    const tr = d.createElement("tr");
    tr.append(createElement("td", _data.media));
    tr.append(createElement("td", enToBn(totalGive)));
    tr.append(createElement("td", enToBn(totalTake)));
    tr.append(createElement("td", enToBn(totalGive - totalTake)));
    tr.append(createElement("td", view));
    tr.append(createElement("td", edit));
    tbody.append(tr);

    let childrens = tr._childrens;
    for (let x in childrens) {
      const data = measureTableData[x];
      data.push(
        measureText(
          childrens[x]._childrens[0],
          16,
          "font-family: SolaimanLipi, monospace; padding: 0.625rem 0.25rem;"
        ).width
      );
    }
  }

  const notAllow = [4, 5];
  for (let x in measureTableData) {
    if (notAllow.indexOf(Number(x)) >= 0) continue;
    const padding = "0.25rem";
    const maxWidth = Math.max(...measureTableData[x]);
    if (maxWidth == 92) continue;
    document.querySelectorAll("th")[
      x
    ].style.width = `calc(${maxWidth}px - ${padding})`;
  }
};

table.append(thead, tbody);
tableWrapper.append(table);

const buttonDiv = createElement("div");

main.append(h1, loading);

const buttons = createElement(
  "div",
  [
    d.createElement(
      "svg",
      `<polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
  455,242.5 "/>`,
      {
        viewBox: "0 0 455 455",
        onclick: "window.location='#/giveTakeAdd'",
      }
    ),
  ],
  { class: "buttons" }
);

giveTake.append(header, main, buttonDiv, footer, newOptionDiv);

giveTake.onload = async () => {
  const page = "giveTake";
  header.page = page;
  h1.setChildren(`দেওয়া নেওয়া হিসাব`);
  const ref = collection(db, dbName);
  let docs = await getDocs(ref);
  let _data = [];
  docs.docs.forEach((element) => {
    _data.push({ ...element.data(), id: element.id });
  });

  const finalData = [];

  for (let x of _data) {
    const _giveDocs = await getDocs(
      collection(db, `${dbName}/${x.id}/give`)
    );
    const _giveData = [];
    _giveDocs.docs.forEach((element) => {
      _giveData.push(element.data());
    });

    const _takeDocs = await getDocs(
      collection(db, `${dbName}/${x.id}/take`)
    );
    const _takeData = [];
    _takeDocs.docs.forEach((element) => {
      _takeData.push(element.data());
    });

    finalData.push({
      give: _giveData,
      take: _takeData,
      media: x.value,
      id: x.id,
    });
  }

  const { start, end } = getInterval();
  main.setChildren([h1, interval, tableWrapper]);
  $(startDate).value = start;
  $(startDate).max = end;
  $(endDate).value = end;
  $(endDate).min = start;
  $(endDate).max = end;

  dataPrint(finalData, start, end);
  buttonDiv.setChildren(buttons);

  $(startDate).onchange = () => {
    const { start, end } = getInterval($(startDate).value);
    $(startDate).value = start;
    $(startDate).max = end;
    $(endDate).value = end;
    $(endDate).min = start;
    $(endDate).max = end;

    dataPrint(finalData, start, end);
  };

  $(endDate).onchange = () => {
    const start = $(startDate).value;
    const end = $(endDate).value;
    dataPrint(finalData, start, end);
  };
};

const getInterval = (date = "") => {
  let result = {};
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let startDate = 1;
  if (date) {
    startDate = new Date(date).getDate();
    if (
      startDate > new Date().getDate() &&
      new Date(date).getMonth() == new Date().getMonth()
    )
      startDate = new Date().getDate();
    result.start =
      new Date(date).getFullYear() +
      "-" +
      String(new Date(date).getMonth() + 1).padStart(2, "0") +
      "-" +
      String(startDate).padStart(2, "0");
  } else {
    date = new Date().toString();
    result.start =
      new Date(date).getFullYear() +
      "-" +
      String(new Date(date).getMonth() + 1).padStart(2, "0") +
      "-" +
      String(startDate).padStart(2, "0");
  }

  date = new Date().toString();
  result.end =
    new Date(date).getFullYear() +
    "-" +
    String(new Date(date).getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date(date).getDate()).padStart(2, "0");

  return result;
};

export { giveTake };
