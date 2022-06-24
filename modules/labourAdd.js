import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import db from "../assets/js/IDB.js";

const labourAdd = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const h1 = d.createElement("h1");

const form = d
  .createElement("form")
  .setAttribute({ class: "form", name: "form" });

const cementName = d.createElement("input").setAttribute({
  disabled: "",
});

const date = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "date",
  onchange: "nin(this, 'date')",
});

const quantity = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  oninput: "nin(this, 'quantity')",
});

const rate = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  oninput: "nin(this, 'rate')",
});

const total = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  disabled: "",
  value: 0,
});

const error = d.createElement("div", "", { class: "error" });
const errDiv = d.createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn = `
<svg onclick="closeDiv('.error')" aria-hidden="true" style="fill: rgb(207, 34, 46); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
error.append(errDiv, closeBtn);

const success = d.createElement("div", "", { class: "success" });
const succDiv = d.createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn2 = `
<svg onclick="closeDiv('.success')" aria-hidden="true" style="fill: rgb(34, 207, 92); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
success.append(succDiv, closeBtn2);

const FormInput = {
  cementName: "সিমেন্ট ব্রান্ড নাম",
  date: "তারিখ",
  quantity: "পরিমাণ",
  rate: "দর",
  total: "মোট",
};

for (let x in FormInput) {
  form.append(
    d.createElement("label", FormInput[x], {
      class: "formLabel",
    }),
    eval(x)
  );
}

const button = d.createElement("button", "যোগ করুন", {
  class: "submitBtn",
  type: "submit",
});

const button2 = d.createElement("button", "মুছে ফেলুন", {
  class: "submitBtn2",
  type: "button",
});

form.append(success, error, button);
main.append(h1, form);
labourAdd.append(header, main, footer);

const cements = {
  shah: "শাহ্",
  scan: "স্কেন",
  crown: "ক্রাউন্ট",
  premier: "প্রিমিয়ার",
};

const addRequest = async () => {
  button
    .setChildren("যোগ হচ্ছে...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: #870000c9; color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  const { cement } = header;
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "labour" + cement + year + String(month).padStart(2, "0");
  let database = await idb.createDataBase(presentMonthDatabase, {
    keyPath: "date",
  });
  idb
    .add({
      date: date.getAttribute("value")[0],
      data: [
        date.getAttribute("value")[0],
        cementName.getAttribute("value")[0],
        quantity.getAttribute("value")[0],
        rate.getAttribute("value")[0],
        total.getAttribute("value")[0],
        new Date().toString(),
      ],
    })
    .then((res) => {
      if (res == "success") {
        succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
        success.changeAttribute("style", "display: flex");
        button
          .setChildren("যোগ করুন")
          .removeAttribute("disabled", "style");
      } else {
        errDiv.setChildren("ওহ! সমস্যা হয়েছে।");
        error.changeAttribute("style", "display: flex");
        button
          .setChildren("যোগ করুন")
          .removeAttribute("disabled", "style");
      }
    })
    .catch((err) => {
      errDiv.setChildren("ওহ! সমস্যা হয়েছে। তারিখ চেক করুন।");
      error.changeAttribute("style", "display: flex");
      button
        .setChildren("যোগ করুন")
        .removeAttribute("disabled", "style");
    });
};

const editRequest = async (date) => {
  button
    .setChildren("ইডিট হচ্ছে...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: #870000c9; color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  const { cement } = header;
  let year = new Date(date).getFullYear();
  let month = new Date(date).getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "labour" + cement + year + String(month).padStart(2, "0");
  let database = await idb.createDataBase(presentMonthDatabase, {
    keyPath: "date",
  });
  idb
    .put(date, {
      data: [
        date,
        cementName.getAttribute("value")[0],
        quantity.getAttribute("value")[0],
        rate.getAttribute("value")[0],
        total.getAttribute("value")[0],
        new Date().toString(),
      ],
    })
    .then((res) => {
      if (res == "success") {
        succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
        success.changeAttribute("style", "display: flex");
        button
          .setChildren("ইডিট করুন")
          .removeAttribute("disabled", "style");
      } else {
        errDiv.setChildren("ওহ! সমস্যা হয়েছে।");
        error.changeAttribute("style", "display: flex");
        button
          .setChildren("ইডিট করুন")
          .removeAttribute("disabled", "style");
      }
    })
    .catch((err) => {
      errDiv.setChildren("ওহ! সমস্যা হয়েছে। তারিখ চেক করুন।");
      error.changeAttribute("style", "display: flex");
      button
        .setChildren("ইডিট করুন")
        .removeAttribute("disabled", "style");
    });
};

const deleteRequest = async (date) => {
  button2
    .setChildren("মুছে ফেলা হচ্ছে...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: #870000c9; color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  const { cement } = header;
  let year = new Date(date).getFullYear();
  let month = new Date(date).getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "labour" + cement + year + String(month).padStart(2, "0");
  let database = await idb.createDataBase(presentMonthDatabase, {
    keyPath: "date",
  });
  idb
    .remove(date)
    .then((res) => {
      if (res == "success") {
        succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
        success.changeAttribute("style", "display: flex");
        form.removeElement(button2);
      } else {
        errDiv.setChildren("ওহ! সমস্যা হয়েছে।");
        error.changeAttribute("style", "display: flex");
        form.removeElement(button2);
      }
    })
    .catch((err) => {
      errDiv.setChildren("ওহ! সমস্যা হয়েছে। তারিখ চেক করুন।");
      error.changeAttribute("style", "display: flex");
      form.removeElement(button2);
    });
};

labourAdd.onload = () => {
  if (!header.cement) {
    window.location = "#/labour";
    return;
  }
  header.onload();
  footer.onload();
  const { cement } = header;
  header.page = cement + "laborAdd";
  h1.setChildren(`${cements[cement]} সিমেন্ট লেভার`);
  cementName.changeAttribute("value", `${cements[cement]} সিমেন্ট`);
  if (header.labourEdit) {
    const { data } = header.labourEdit;
    date.changeAttribute("type", "text");
    date.changeAttribute(
      "value",
      String(new Date(data[0]).getDate()).padStart(2, "0") +
        "/" +
        String(new Date(data[0]).getMonth() + 1).padStart(2, "0") +
        "/" +
        new Date(data[0]).getFullYear()
    );
    date.changeAttribute("disabled", "");
    quantity.changeAttribute("value", data[2]);
    rate.changeAttribute("value", data[3]);
    total.changeAttribute("value", data[4]);
    button.setChildren("ইডিট করুন");
    form.append(button2);

    document.querySelector(".submitBtn2").onclick = () => {
      form.removeElement(button);
      deleteRequest(data[0]);
    };
    document.forms["form"].onsubmit = (e) => {
      e.preventDefault();
      editRequest(data[0]);
    };
  } else {
    date.changeAttribute(
      "value",
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date().getDate()).padStart(2, "0")
    );

    document.forms["form"].onsubmit = (e) => {
      e.preventDefault();
      addRequest();
    };
  }

  window.nin = (input, type) => {
    eval(type).changeAttributeN("value", input.value);
    let value =
      Number(quantity.getAttribute("value")[0]) *
      Number(rate.getAttribute("value")[0]);
    if (isNaN(value)) value = 0;
    total.changeAttribute("value", value);
  };
};
export { labourAdd };
