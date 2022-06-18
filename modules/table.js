import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";

const Table = d.createElement("div");
const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "table"] });
const h1 = d.createElement("h1", "শাহ্ সিমেন্ট লেভার হিসাব");

const tableWrapper = d
  .createElement("div")
  .setAttribute({ class: "wrapper" });

const table = d.createElement("table");
const thead = d.createElement("thead");

const titles = ["তারিখ", "সিমেন্ট নাম", "পরিমাণ", "দর", "মোট"];

const theadTr = d.createElement("tr");
for (let x of titles) {
  theadTr.append(d.createElement("th", x));
}

thead.append(theadTr);

const tbody = d.createElement("tbody");

for (let i = 1; i < 20; i++) {
  const tr = d.createElement("tr");
  for (let x of titles) {
    tr.append(d.createElement("td", x));
  }
  tbody.append(tr);
}
table.append(thead, tbody);
tableWrapper.append(table);
main.append(h1, tableWrapper);
Table.append(header, main, footer);

export { Table };
