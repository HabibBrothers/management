import d from "../lib/dom.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { loading } from "./loading.js";

import {
  db,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "../assets/js/firebase.js";

const { createElement, $ } = d;

const dbName = "giveTake";

const giveTakeAdd = createElement("div");
const main = createElement("main").setAttribute({ class: "main" });
const h1 = createElement("h1");

const form = createElement("form").setAttribute({
  class: "form",
  name: "form",
});

const date = createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "date",
  spellcheck: "false",
});

const media = createElement("select").setAttribute({
  required: "",
});

const newOptionDiv = createElement("div").setAttribute({
  class: "freeze hide",
});

const newOptionValue = createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  spellcheck: "false",
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
    $(media).value = "";
    $(newOptionDivArea).style.transform = "scale(0)";
    setTimeout(() => {
      $(newOptionDiv).style.display = "none";
    }, 100);
  };
};

const newOptionFormSubmitBtn = createElement("button", "যোগ করুন", {
  class: "submitBtn",
  type: "submit",
});

const newOptionForm = createElement(
  "form",
  [
    d.createElement("label", "মাধ্যম", {
      class: "formLabel",
    }),
    newOptionValue,
    newOptionFormSubmitBtn,
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
      .setChildren("যোগ হচ্ছে...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", [
        "background: #870000c9; color: #fcfcfcb0;",
      ]);

    addDoc(collection(db, dbName), {
      value: $(newOptionValue).value,
    });

    $(media).value = "";
    setTimeout(() => {
      $(newOptionDiv).style.display = "none";
      $(newOptionDivArea).style.transform = "scale(0)";
      newOptionFormSubmitBtn
        .setChildren("যোগ করুন")
        .removeAttribute("style", "disabled");
    }, 500);
    giveTakeAdd.onload();
  };
};

const newOptionDivArea = createElement(
  "div",
  [closeBtnNew, createElement("h1", "নতুন মাধ্যম"), newOptionForm],
  {
    class: "area",
  }
);

newOptionDiv.append(newOptionDivArea);

media.onload = () => {
  $(media).onchange = (e) => {
    if ($(media).value == "new") {
      $(newOptionForm).reset();
      $(newOptionDiv).style.display = "flex";
      setTimeout(() => {
        $(newOptionDivArea).style.transform = "scale(1)";
      }, 100);
      //console.log("new media choose");
    }
  };
};

const mediaOptionLoad = (mediaList) => {
  media.setChildren([createElement("option")]);
  for (let x of mediaList) {
    media.append(
      createElement("option", x.value, {
        value: x.id,
        text: x.value,
      })
    );
  }

  media.append(
    createElement("option", "নতুন মাধ্যম", {
      value: "new",
    })
  );
};

const type = createElement(
  "select",
  [
    createElement("option", ""),
    createElement("option", "দেওয়া", { value: "give" }),
    createElement("option", "নেওয়া", { value: "take" }),
  ],
  {
    required: "",
  }
);

const details = createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  spellcheck: "false",
});

const amount = createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  spellcheck: "false",
});

const error = createElement("div", "", { class: "error" });
const errDiv = createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn = createElement(
  "svg",
  `
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
  `,
  {
    "aria-hidden": "true",
    style: "fill: rgb(207, 34, 46); cursor: pointer",
    height: "16",
    viewBox: "0 0 16 16",
    version: "1.1",
    width: "16",
    "data-view-component": "true",
    class: "octicon octicon-x",
  }
);
closeBtn.onload = () => {
  $(closeBtn).onclick = () => {
    $(error).style.display = "none";
  };
};
error.append(errDiv, closeBtn);

const success = createElement("div", "", { class: "success" });
const succDiv = createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn2 = createElement(
  "svg",
  `
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
  `,
  {
    "aria-hidden": "true",
    style: "fill: rgb(34, 207, 92); cursor: pointer",
    height: "16",
    viewBox: "0 0 16 16",
    version: "1.1",
    width: "16",
    "data-view-component": "true",
    class: "octicon octicon-x",
  }
);

closeBtn2.onload = () => {
  $(closeBtn2).onclick = () => {
    $(success).style.display = "none";
  };
};
success.append(succDiv, closeBtn2);

const FormInput = {
  date: "তারিখ",
  media: "মাধ্যম",
  type: "ধরণ",
  details: "বর্ণনা",
  amount: "পরিমাণ",
};

for (let x in FormInput) {
  form.append(
    createElement("label", FormInput[x], {
      class: "formLabel",
    }),
    eval(x)
  );
}

const button = createElement("button", "যোগ করুন", {
  class: "submitBtn",
  type: "submit",
});

form.append(success, error, button);

form.onload = () => {
  $(form).onsubmit = (e) => {
    e.preventDefault();
    button
      .setChildren("যোগ হচ্ছে...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", [
        "background: #870000c9; color: #fcfcfcb0;",
      ]);
    error.changeAttribute("style", "display: none;");
    success.changeAttribute("style", "display: none;");

    let amountValue = Number($(amount).value);

    if (isNaN(amountValue)) {
      errDiv.setChildren("পরিমাণ সংখা হতে হবে!");
      error.changeAttribute("style", "display: flex");
      button
        .setChildren("যোগ করুন")
        .removeAttribute("disabled", "style");
      return;
    }
    let data = {
      date: $(date).value,
      media:
        $(media).querySelectorAll("option")[$(media).selectedIndex]
          .innerText,
      details: $(details).value,
      amount: amountValue,
      timespan: serverTimestamp(),
    };

    addDoc(
      collection(db, `${dbName}/${$(media).value}/${$(type).value}`),
      data
    );

    $(form).reset();

    succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
    success.changeAttribute("style", "display: flex");
    button
      .setChildren("যোগ করুন")
      .removeAttribute("disabled", "style");
    $(date).value =
      new Date().getFullYear() +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0");
  };
};

main.append(h1, loading);
giveTakeAdd.append(header, main, footer, newOptionDiv);

giveTakeAdd.onload = async () => {
  header.page = "giveTakeAdd";
  h1.setChildren(`দেওয়া নেওয়ার হিসাব`);
  const id = header.giveTakeId;
  if (id) {
    const x = {
      id: id,
      value: await (await getDoc(doc(db, dbName, id))).data().value,
    };
    media.setChildren([
      createElement("option", x.value, {
        value: x.id,
        text: x.value,
      }),
    ]);

    media.onload = () => {
      $(media).disabled = true;
    };
  } else {
    const ref = collection(db, dbName);
    let docs = await getDocs(ref);
    const mediaList = [];
    docs.docs.forEach((element) => {
      mediaList.push({ ...element.data(), id: element.id });
    });

    mediaOptionLoad(mediaList);
  }
  main.setChildren([h1, form]);

  $(date).value =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
  $(date).max =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
};

export { giveTakeAdd };
