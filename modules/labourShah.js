import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import db from "../assets/js/IDB.js";

const labourShah = d.createElement("div");
const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "table"] });
const h1 = d.createElement("h1", "শাহ্ সিমেন্ট লেভার হিসাব");

const interval = d
  .createElement("div")
  .setAttribute({ class: "interval" });

const startDate = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "date",
  onchange: "mNiAc(this, '1')",
});

const endDate = d.createElement("input").setAttribute({
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "date",
  onchange: "mNiAc(this, '1')",
});

interval.append(startDate, endDate);
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

const dataPrint = (data) => {
  for(let i = 0; i < data.length; i++){
    const tr = d.createElement("tr");
    for (let j = 0; j < data[i].length; j++) {
      tr.append(d.createElement("td", data[i][j]));
    }
    tbody.append(tr);
  }
}

table.append(thead, tbody);
tableWrapper.append(table);

main.append(h1, interval, tableWrapper);

const buttons = d.createElement(
  "div",
  [
    d.createElement(
      "svg",
      `
      <g><path d="M186.4,10h627.2c0,91.5,0,182.9,0,274.4c37.7,0,75.5,0,113.2,0c11.2-0.3,22.6,1.7,32.5,7.2c17.8,9.5,29.6,28.7,30.7,48.7v418.2c-1.5,20.2-13.7,39.4-32,48.5c-10.1,5.4-21.7,6.8-33,6.6c-37.2,0-74.3,0-111.4,0c-0.1,58.8,0,117.6,0,176.4H186.4c0-58.8,0-117.6,0-176.4c-39-0.1-78.1,0.1-117.1-0.1c-17.8,0.1-35.4-8.2-46.4-22.2c-7.5-9.2-11.6-20.8-12.9-32.5V340.5c0.9-12.8,5.5-25.4,13.9-35.1c11-13.4,28.2-21,45.4-20.9c39-0.1,78,0,117-0.1C186.4,193,186.4,101.5,186.4,10z M225.6,49.2c0,78.4,0,156.8,0,235.2c182.9,0,365.9,0,548.8,0c0-78.4,0-156.8,0-235.2C591.5,49.2,408.5,49.2,225.6,49.2z M49.2,344.8c-0.1,136-0.1,272,0,408c-0.9,11.3,8.7,22.1,20.2,21.5c39,0.3,78,0,116.9,0.1c0-71.9,0-143.7,0-215.6c209.1,0,418.1,0,627.2,0c0,71.9,0,143.7,0,215.6c37.7,0,75.5,0,113.2,0c5.9,0,12.4-0.6,17-4.8c5.6-4.5,7.3-12,7-18.8c-0.1-135.3,0.1-270.6-0.1-405.9c1-12.1-10.1-22.6-22.1-21.2c-285.8,0-571.6,0-857.4,0C59.3,322.3,48.3,332.8,49.2,344.8z M225.6,598c-0.1,117.6,0,235.2,0,352.8c183,0.1,365.9,0.1,548.9,0c-0.1-117.6,0-235.2-0.1-352.8C591.5,598,408.5,598,225.6,598z M841.4,384.2c10.8-3.3,23-1.7,32.5,4.5c10.5,6.6,17.4,18.5,17.9,30.9c0.6,12-4.6,24.2-13.8,31.9c-11,9.4-27.4,11.8-40.6,6c-14.8-6.1-24.7-22-23.6-37.9C814.3,403.5,826,388.7,841.4,384.2z M303.3,676.7c126.8-0.7,253.6-0.1,380.4-0.3c8.8-0.1,19.5-1,25.9,6.3c7.4,6.8,7.4,20-0.1,26.8c-4.9,5.7-13.1,6.1-20.1,6.2c-127.6-0.1-255.2,0-382.8,0c-9.1,0.2-19.1-5.1-21.1-14.5C281.9,689.7,291.4,676.9,303.3,676.7z M303.2,755.1c102.6-0.7,205.2,0,307.9-0.4c7.5-0.3,16.3,0.9,21.2,7.4c8.4,8.9,4.5,24.9-6.5,29.7c-7.7,3-16.1,2-24.2,2.1c-98.3,0-196.7,0-295,0c-9,0.2-18.9-5.2-20.9-14.5C281.8,768.1,291.3,755.4,303.2,755.1z M303.2,833.5c128.7-0.7,257.4,0,386.1-0.4c7.1-0.2,15.4,0.6,20.4,6.4c7.4,6.8,7.2,20-0.3,26.8c-4.9,5.7-13,6.1-19.9,6.2c-127.6-0.1-255.3,0-382.9,0c-9.1,0.2-19-5.1-21-14.4C281.8,846.5,291.3,833.8,303.2,833.5z"/></g>
      `,
      {
        viewBox: "0 0 1000 1000",
      }
    ),
    d.createElement(
      "svg",
      `<polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
  455,242.5 "/>`,
      {
        viewBox: "0 0 455 455",
        onclick: "window.location='#/labourShahAdd'",
      }
    ),
  ],
  { class: "buttons" }
);
labourShah.append(header, main, buttons, footer);

labourShah.onload = async () => {
  header.onload();
  footer.onload();
  /*let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase = "labourShah" + year + String(month).padStart(2, '0');
  let pastMonthDatabase = "labourShah" + year + String((month - 1) ? (month - 1) : 12).padStart(2, '0');
  let presentMonth = await idb.exit(presentMonthDatabase);
  let pastMonth = await idb.exit(pastMonthDatabase);
 /* if(presentMonth && pastMonth){
    let database = await idb.createDataBase(presentMonthDatabase, {keyPath: "date"});
    let data = await idb.getAllValues("data");
    dataPrint(data)
  } else{
   // let database = await idb.createDataBase(presentMonthDatabase, {keyPath: "date"});
    
  }*/
  
};
export { labourShah };
