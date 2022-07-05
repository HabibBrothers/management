import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { loading } from "./loading.js";
import db from "../assets/js/IDB.js";

const labourTable = d.createElement("div");
const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "table"] });
const h1 = d.createElement("h1");

const interval = d
  .createElement("div")
  .setAttribute({ class: "interval" });

const startDate = d.createElement("input").setAttribute({
  type: "date",
  onchange: "labour(this, '1')",
});

const endDate = d.createElement("input").setAttribute({
  type: "date",
  onchange: "labour(this, '2')",
});

interval.append(startDate, endDate);
const tableWrapper = d
  .createElement("div")
  .setAttribute({ class: "wrapper" });

const table = d.createElement("table");
const thead = d.createElement("thead");

const titles = [
  "তারিখ",
  "সিমেন্ট নাম",
  "পরিমাণ",
  "দর",
  "মোট",
  "আপডেট",
];

const theadTr = d.createElement("tr");
for (let x of titles) {
  theadTr.append(d.createElement("th", x));
}

thead.append(theadTr);

const tbody = d.createElement("tbody");

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
  data.sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });
  if (start && end) {
    data = data.filter((v) => {
      // console.log(new Date(v[0]), new Date(start), new Date(end));
      return (
        new Date(v[0]).getTime() >= new Date(start).getTime() &&
        new Date(v[0]).getTime() <= new Date(end).getTime()
      );
    });
    if (!data.length) data = [];
  }
  for (let i = 0; i < data.length; i++) {
    const tr = d.createElement("tr");
    let iniDate = data[i][0];
    data[i][0] =
      String(new Date(data[i][0]).getDate()).padStart(2, "0") +
      "/" +
      String(new Date(data[i][0]).getMonth() + 1).padStart(2, "0") +
      "/" +
      new Date(data[i][0]).getFullYear();
    for (let j = 0; j < data[i].length - 1; j++) {
      tr.append(d.createElement("td", enToBn(data[i][j])));
    }
    data[i][0] = iniDate;
    tr.append(
      d.createElement(
        "td",
        d.createElement("img").setAttribute(
          {
            src: "./assets/img/edit.svg",
            edit: i,
          },
          { style: "padding: 0;" }
        )
      )
    );
    tbody.append(tr);
  }
  return data;
};

table.append(thead, tbody);
tableWrapper.append(table);

main.append(h1, loading);

const buttons = d.createElement(
  "div",
  [
    d.createElement(
      "svg",
      `<polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
  455,242.5 "/>`,
      {
        viewBox: "0 0 455 455",
        onclick: "window.location='#/labourAdd'",
      }
    ),
  ],
  { class: "buttons" }
);
labourTable.append(header, main, footer);

const cements = {
  shah: "শাহ্",
  scan: "স্কেন",
  crown: "ক্রাউন্ট",
  premier: "প্রিমিয়ার",
};

const dateList = {
  1: startDate,
  2: endDate,
};
labourTable.onload = async () => {
  if (!header.cement) {
    window.location = "#/labour";
    return;
  }
  header.onload();
  footer.onload();
  delete header.labourEdit;
  const { cement } = header;
  const page = cement + "laborTable";
  header.page = page;
  h1.setChildren(`${cements[cement]} সিমেন্ট লেভার হিসাব`);
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "labour" + cement + year + String(month).padStart(2, "0");
  let pastMonthDatabase =
    "labour" +
    cement +
    year +
    String(month - 1 ? month - 1 : 12).padStart(2, "0");
  let pastMonth = await idb.exit(pastMonthDatabase);
  if (pastMonth) {
    const { start, end } = getInterval();
    startDate.changeAttribute("value", start);
    startDate.changeAttribute("max", end);
    endDate.changeAttribute("value", end);
    endDate.changeAttribute("max", end);
    endDate.changeAttribute("min", start);
    main.setChildren([h1, interval, tableWrapper]);
    labourTable._rendered = false;
    labourTable.insert(2, buttons);
    document.getElementById("root").innerHTML = labourTable._render();
    header.onload();
    footer.onload();
    let database = await idb.createDataBase(presentMonthDatabase, {
      keyPath: "date",
    });
    try {
      let data = await idb.getAllValues("data");
      data = dataPrint(data, start, end);
      for (let i = 0; i < data.length; i++) {
        document.querySelector(`img[edit="${i}"]`).onclick = () => {
          header.labourEdit = {
            data: data[i],
          };
          window.location = "#/labourAdd";
        };
      }
    } catch (err) {
      console.log(err);
    }
    let data = await idb.getAllValues("data");
    data = data.map((value) => {
      value[0] = "d" + value[0];
      return value;
    });
    d.post(
      "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
      {
        type: 4,
        data: JSON.stringify({
          year: year,
          month: month,
          cement: cement,
          data: data,
        }),
      }
    ).catch((err) => console.log(err));
  } else {
    d.post(
      "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
      {
        type: 3,
        data: JSON.stringify({
          year: year,
          month: month - 1,
          cement: cement,
        }),
      }
    ).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, present, past } = res;
      if (result) {
        const { start, end } = getInterval();
        if (header.page == page) {
          startDate.changeAttribute("value", start);
          startDate.changeAttribute("max", end);
          endDate.changeAttribute("value", end);
          endDate.changeAttribute("max", end);
          endDate.changeAttribute("min", start);
          main.setChildren([h1, interval, tableWrapper]);
          labourTable._rendered = false;
          labourTable.insert(2, buttons);
          document.getElementById("root").innerHTML =
            labourTable._render();
          header.onload();
          footer.onload();
          const finalDataPast = [];
          for (let i = 0; i < past.length; i++) {
            past[i] = past[i].map((v) => v.substr(1));
            finalDataPast.push({
              date: past[i][0],
              data: past[i],
            });
          }
          let database = await idb.createDataBase(pastMonthDatabase, {
            keyPath: "date",
          });
          idb.add(finalDataPast);
          const finalDataPresent = [];
          for (let i = 0; i < present.length; i++) {
            present[i] = present[i].map((v) => v.substr(1));
            finalDataPresent.push({
              date: present[i][0],
              data: present[i],
            });
          }
          database = await idb.createDataBase(presentMonthDatabase, {
            keyPath: "date",
          });
          idb.add(finalDataPresent);
          let data = await idb.getAllValues("data");
          data = dataPrint(data, start, end);
          for (let i = 0; i < data.length; i++) {
            document.querySelector(`img[edit="${i}"]`).onclick =
              () => {
                header.labourEdit = {
                  data: data[i],
                };
                window.location = "#/labourAdd";
              };
          }
        }
      }
    });
  }

  window.labour = async (input, type) => {
    let start, end;
    if (type == 1) {
      let data = getInterval(input.value);
      (start = data.start), (end = data.end);
      startDate.changeAttribute("max", getInterval().end);
      endDate.changeAttribute("max", end);
      endDate.changeAttribute("min", start);
    } else {
      start = getInterval(startDate.getAttribute("value")[0]).start;
      end = getInterval(input.value).start;
    }
    let year = new Date(start).getFullYear();
    let month = new Date(start).getMonth() + 1;
    const idb = new db("com.infc.agency.habib-brother's");
    let dataBase =
      "labour" + cement + year + String(month).padStart(2, "0");
    let dataBaseData = await idb.exit(dataBase);
    if (dataBaseData) {
      tableWrapper.init();
      startDate.changeAttributeN("value", start);
      endDate.changeAttributeN("value", end);
      main.setChildren([h1, interval, tableWrapper]);
      labourTable._rendered = false;
      labourTable.insert(2, buttons);
      document.getElementById("root").innerHTML =
        labourTable._render();
      try {
        let database = await idb.createDataBase(dataBase, {
          keyPath: "date",
        });
        let data = await idb.getAllValues("data");
        data = dataPrint(data, start, end);
        for (let i = 0; i < data.length; i++) {
          document.querySelector(`img[edit="${i}"]`).onclick = () => {
            header.labourEdit = {
              data: data[i],
            };
            window.location = "#/labourAdd";
          };
        }
      } catch (err) {
        console.log(err);
      }
      let data = await idb.getAllValues("data");
      data = data.map((value) => {
        value[0] = "d" + value[0];
        return value;
      });
      d.post(
        "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
        {
          type: 4,
          data: JSON.stringify({
            year: year,
            month: month,
            cement: cement,
            data: data,
          }),
        }
      ).catch((err) => console.log(err));
    }
  };
};

function getInterval(date = "") {
  let result = {};
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let startDate = 1;
  let endDate = 15;
  if (date) {
    startDate = new Date(date).getDate();
    if (
      startDate > new Date().getDate() &&
      new Date(date).getMonth() == new Date().getMonth()
    )
      startDate = new Date().getDate();
    // if (new Date(date).getDate() > 15) {
    //   startDate = 16;
    // }
    if (startDate >= 16) {
      endDate = monthDays[new Date(date).getMonth()];
      if (new Date(date).getFullYear() / 4 == 0 && endDate == 28)
        endDate = 29;
      if (
        new Date(date).getMonth() == new Date().getMonth() &&
        endDate > new Date().getDate()
      ) {
        endDate = new Date().getDate();
      }
    }
    if (
      endDate > new Date().getDate() &&
      new Date(date).getMonth() == new Date().getMonth()
    )
      endDate = new Date().getDate();
    result.start =
      new Date(date).getFullYear() +
      "-" +
      String(new Date(date).getMonth() + 1).padStart(2, "0") +
      "-" +
      String(startDate).padStart(2, "0");

    result.end =
      new Date(date).getFullYear() +
      "-" +
      String(new Date(date).getMonth() + 1).padStart(2, "0") +
      "-" +
      String(endDate).padStart(2, "0");
  } else {
    date = new Date().toString();
    if (new Date(date).getDate() > 15) {
      startDate = 16;
    }
    result.start =
      new Date(date).getFullYear() +
      "-" +
      String(new Date(date).getMonth() + 1).padStart(2, "0") +
      "-" +
      String(startDate).padStart(2, "0");

    result.end =
      new Date(date).getFullYear() +
      "-" +
      String(new Date(date).getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date(date).getDate()).padStart(2, "0");
  }

  return result;
}
export { labourTable };
