import d from "../lib/dom.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { loading } from "./loading.js";

import {
  db,
  deleteDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "../assets/js/firebase.js";

const { createElement, $ } = d;

const dbName = "giveTake";

const giveTakeAdd2 = createElement("div");
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

const type = createElement("select", [], {
  required: "",
});

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

const button = createElement("button", "আপডেট করুন", {
  class: "submitBtn",
  type: "submit",
});

const deleteBtn = createElement("button", "মুছে ফেলুন", {
  class: "submitBtn",
  type: "button",
});

deleteBtn.onload = async () => {
  $(deleteBtn).onclick = async () => {
    deleteBtn
      .setChildren("মুছে ফেলা হচ্ছে...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", [
        "background: #870000c9; color: #fcfcfcb0;",
      ]);

    const id = header.giveTakeTypeId;

    deleteDoc(doc(db, dbName, id.id, id.typeEn, id.typeId));

    window.location = "./#/giveTakeDetails";

    deleteBtn
      .setChildren("মুছে ফেলুন")
      .removeAttribute("style", "disabled");
    delete header.giveTakeTypeId;
  };
};

form.append(success, error, button, deleteBtn);

form.onload = () => {
  $(form).onsubmit = (e) => {
    e.preventDefault();
    button
      .setChildren("আপডেট হচ্ছে...")
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
        .setChildren("আপডেট করুন")
        .removeAttribute("disabled", "style");
      return;
    }

    const id = header.giveTakeTypeId;

    let data = {
      date: $(date).value,
      details: $(details).value,
      amount: amountValue,
      timespan: serverTimestamp(),
    };

    updateDoc(doc(db, dbName, id.id, id.typeEn, id.typeId), data);

    succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
    success.changeAttribute("style", "display: flex");
    button
      .setChildren("আপডেট করুন")
      .removeAttribute("disabled", "style");
  };
};

main.append(h1, loading);
giveTakeAdd2.append(header, main, footer);

giveTakeAdd2.onload = async () => {
  header.page = "giveTakeAdd2";
  h1.setChildren(`দেওয়া নেওয়ার হিসাব`);
  const id = header.giveTakeTypeId;

  if (!id || !id.id) {
    window.history.go(-1);
    return;
  }

  const data = {
    ...(await (
      await getDoc(doc(db, dbName, id.id, id.typeEn, id.typeId))
    ).data()),
    type: id.type,
    typeEn: id.typeEn,
  };

  media.setChildren([
    createElement("option", data.media, {
      value: data.media,
    }),
  ]);

  type.setChildren([
    createElement("option", data.type, {
      value: data.typeEn,
    }),
  ]);

  main.setChildren([h1, form]);

  $(date).value =
    new Date(data.date).getFullYear() +
    "-" +
    String(new Date(data.date).getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date(data.date).getDate()).padStart(2, "0");

  $(date).max =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  $(details).value = data.details;
  $(amount).value = data.amount;

  //$(date).disabled = true;
  $(media).disabled = true;
  $(type).disabled = true;
};

export { giveTakeAdd2 };
