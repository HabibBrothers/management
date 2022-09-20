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
  getDoc,
} from "../assets/js/firebase.js";

const dbName = "giveTake";

import idb from "../lib/idb.js";
import { startAfter } from "../lib/firebase-firestore.js";

const { createElement, $ } = d;

const giveTakeDetails = createElement("div");

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
  "তারিখ",
  "মাধ্যম",
  "ধরণ",
  "বর্ণনা",
  "পরিমাণ",
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

const dataPrint = (data, start, end) => {
  tbody.setChildren([]);

  let data_ = data.data.filter((value) => {
    return (
      new Date(value.date).getTime() >= new Date(start).getTime() &&
      new Date(value.date).getTime() <= new Date(end).getTime()
    );
  });

  const _data = data_.sort((a, b) => {
    let time1 = new Date(a.date).getTime();
    let time2 = new Date(b.date).getTime();
    if (time1 == time2) {
      return (
        new Date(a.timespan.seconds).getTime() -
        new Date(b.timespan.seconds).getTime()
      );
    }

    return time1 - time2;
  });

  for (let x of _data) {
    const edit = createElement("img").setAttribute(
      {
        src: "./assets/img/edit.svg",
      },
      { style: "padding: 0;" }
    );

    edit.onload = () => {
      $(edit).onclick = () => {
        header.giveTakeTypeId = {
          id: data.id,
          type: x.type,
          typeEn: x.typeEn,
          typeId: x.id,
        };

        window.location = "./#/giveTakeAdd2";
      };
    };

    let date = new Date(x.date);

    date =
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();

    const tr = d.createElement("tr");
    tr.append(createElement("td", enToBn(date)));
    tr.append(createElement("td", data.media));
    tr.append(createElement("td", x.type));
    tr.append(createElement("td", x.details));
    tr.append(createElement("td", enToBn(x.amount)));
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

  const notAllow = [5];
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

giveTakeDetails.append(header, main, buttonDiv, footer);

giveTakeDetails.onload = async () => {
  const page = "giveTakeDetails";
  header.page = page;
  h1.setChildren(`দেওয়া নেওয়া হিসাব`);

  const id = header.giveTakeId;

  if (!id) {
    window.location = "./#/giveTake";
    return;
  }

  const _giveDocs = await getDocs(
    collection(db, `${dbName}/${id}/give`)
  );
  const _giveData = [];
  _giveDocs.docs.forEach((element) => {
    _giveData.push({
      ...element.data(),
      type: "দেওয়া",
      typeEn: "give",
      id: element.id,
    });
  });

  const _takeDocs = await getDocs(
    collection(db, `${dbName}/${id}/take`)
  );
  const _takeData = [];
  _takeDocs.docs.forEach((element) => {
    _takeData.push({
      ...element.data(),
      type: "নেওয়া",
      typeEn: "take",
      id: element.id,
    });
  });

  const finalData = {
    data: [..._giveData, ..._takeData],
    media: await (await getDoc(doc(db, dbName, id))).data().value,
    id: id,
  };

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

export { giveTakeDetails };
