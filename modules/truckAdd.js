import d from "../lib/dom.js";
import { header, measureText } from "./header.js";
import { footer } from "./footer.js";
import { loading } from "./loading.js";
import db from "../lib/idb.js";

const truckAdd = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const h1 = d.createElement("h1", "গাড়ি হিসাব");

const form = d
  .createElement("form")
  .setAttribute({ class: "form", name: "form" });

const date = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "date",
  onchange: "nin(this, 'date')",
});

const driver = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "nin(this, 'driver')",
});

const truckNo = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "nin(this, 'truckNo')",
});

const phone = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  onchange: "nin(this, 'phone')",
});

const marketing = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "nin(this, 'marketing')",
});

const dealer = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "nin(this, 'dealer')",
});

const place = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "text",
  onchange: "nin(this, 'place')",
});

const rate = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  oninput: "nin(this, 'rate')",
});

const quantity = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  oninput: "nin(this, 'quantity')",
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
  date: "তারিখ",
  driver: "ড্রাইবার নাম",
  truckNo: "গাড়ি নাম্বার",
  phone: "ফোন নাম্বার",
  marketing: "মার্কেটিং অফিসার",
  dealer: "ডিলার",
  place: "স্থান",
  rate: "দর",
  quantity: "পরিমাণ",
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
truckAdd.append(header, main, footer);

const addRequest = async () => {
  button
    .setChildren("যোগ হচ্ছে...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", [
      "background: #870000c9; color: #fcfcfcb0;",
    ]);
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  let year = new Date(date.getAttribute("value")[0]).getFullYear();
  let month = new Date(date.getAttribute("value")[0]).getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "truck" + year + String(month).padStart(2, "0");
  let database = await idb.createDataBase(presentMonthDatabase, {
    keyPath: "date",
  });
  let data = [date.getAttribute("value")[0]];
  delete FormInput.date;
  for (let x in FormInput) {
    data.push(eval(x).getAttribute("value")[0]);
  }
  data.push(new Date().toString());
  idb
    .add({
      date: date.getAttribute("value")[0],
      data: data,
    })
    .then(async (res) => {
      if (res == "success") {
        succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
        success.changeAttribute("style", "display: flex");
        button
          .setChildren("যোগ করুন")
          .removeAttribute("disabled", "style");
        let data = await idb.getAllValues("data");
        data = data.map((value) => {
          return value.map((v) => "t" + v);
        });
        d.post(
          "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
          {
            type: 6,
            data: JSON.stringify({
              year: year,
              month: month,
              data: data,
            }),
          }
        ).catch((err) => console.log(err));
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
  let year = new Date(date).getFullYear();
  let month = new Date(date).getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "truck" + year + String(month).padStart(2, "0");
  let database = await idb.createDataBase(presentMonthDatabase, {
    keyPath: "date",
  });
  let data = [date];
  delete FormInput.date;
  for (let x in FormInput) {
    data.push(eval(x).getAttribute("value")[0]);
  }
  data.push(new Date().toString());
  idb
    .put(date, {
      data: data,
    })
    .then(async (res) => {
      if (res == "success") {
        succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
        success.changeAttribute("style", "display: flex");
        button
          .setChildren("ইডিট করুন")
          .removeAttribute("disabled", "style");
        let data = await idb.getAllValues("data");
        data = data.map((value) => {
          return value.map((v) => "t" + v);
        });
        d.post(
          "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
          {
            type: 6,
            data: JSON.stringify({
              year: year,
              month: month,
              data: data,
            }),
          }
        ).catch((err) => console.log(err));
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
  let year = new Date(date).getFullYear();
  let month = new Date(date).getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "truck" + year + String(month).padStart(2, "0");
  let database = await idb.createDataBase(presentMonthDatabase, {
    keyPath: "date",
  });
  idb
    .remove(date)
    .then(async (res) => {
      if (res == "success") {
        succDiv.setChildren("অসাধারণ! আপনি সফল হয়েছেন।");
        success.changeAttribute("style", "display: flex");
        form.removeElement(button2);
        let data = await idb.getAllValues("data");
        data = data.map((value) => {
          return value.map((v) => "t" + v);
        });
        d.post(
          "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
          {
            type: 6,
            data: JSON.stringify({
              year: year,
              month: month,
              data: data,
            }),
          }
        ).catch((err) => console.log(err));
      } else {
        errDiv.setChildren("ওহ! সমস্যা হয়েছে।");
        error.changeAttribute("style", "display: flex");
        form.removeElement(button2);
      }
    })
    .catch((err) => {
      errDiv.setChildren("ওহ! সমস্যা হয়েছে।");
      error.changeAttribute("style", "display: flex");
      form.removeElement(button2);
    });
};

truckAdd.onload = () => {
  header.onload();
  footer.onload();
  header.page = "truckAdd";
  form.reset();
  if (header.truckEdit) {
    const { data } = header.truckEdit;
    date.changeAttribute("type", "text");
    date.changeAttribute(
      "value",
      String(new Date(data[0]).getDate()).padStart(2, "0") +
        "/" +
        String(new Date(data[0]).getMonth() + 1).padStart(2, "0") +
        "/" +
        new Date(data[0]).getFullYear()
    );
    button2.init();
    date.changeAttribute("disabled", "");
    delete FormInput.date;
    let i = 1;
    for (let x in FormInput) {
      eval(x).changeAttribute("value", data[i]);
      i++;
    }
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
    date.changeAttribute(
      "max",
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

export { truckAdd };
