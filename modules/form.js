import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";

const Form = d.createElement("div");
const main = d.createElement("main").setAttribute({ class: "main" });
const h1 = d.createElement("h1", "শাহ্ সিমেন্ট লেভার হিসাব");

const form = d.createElement("form").setAttribute({ class: "form" });

const cementName = d.createElement("input").setAttribute({
  disabled: "",
  value: "শাহ্ সিমেন্ট",
});

// cementName.append(
//   d.createElement("option", "শাহ্ সিমেন্ট", { value: "1" })
// );

const date = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "date",
  onchange: "mNiAc(this, '1')",
});

const quantity = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  onchange: "mNiAc(this, '2')",
});

const rate = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  onchange: "mNiAc(this, '3')",
});

const total = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  type: "number",
  disabled: "",
  onchange: "mNiAc(this, '4')",
});

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

form.append(button);
main.append(h1, form);
Form.append(header, main, footer);
export { Form };
