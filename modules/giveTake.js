import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
import { loading } from "./loading.js";
import db from "../assets/js/IDB.js";

const giveTake = d.createElement("div");

const main = d
  .createElement("main")
  .setAttribute({ class: ["main", "table"] });
const h1 = d.createElement("h1", "দেওয়া নেওয়া হিসাব");

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

const titles = ["তারিখ", "মাধ্যম", "দেওয়া", "নেওয়া", "বিস্তারিত"];

const theadTr = d.createElement("tr");
for (let x of titles) {
  theadTr.append(
    d.createElement("th", x)
    // ({ style: [`width: ${x.length * 10}px`] })
  );
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
const dataPrint = (data) => {
  data.sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });
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
};

table.append(thead, tbody);
tableWrapper.append(table);

main.append(h1, tableWrapper);

giveTake.append(header, main, footer);

giveTake.onload = async () => {
  header.onload();
  footer.onload();
  const page = "giveTake";
  delete header.giveEdit;
  header.page = page;
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  const idb = new db("com.infc.agency.habib-brother's");
  let presentMonthDatabase =
    "giveTake" + year + String(month).padStart(2, "0");
  let pastMonthDatabase =
    "giveTake" +
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
    truck._rendered = false;
    truck.insert(2, buttons);
    document.getElementById("root").innerHTML = truck._render();
    header.onload();
    footer.onload();
    let database = await idb.createDataBase(presentMonthDatabase, {
      keyPath: "date",
    });
    try {
      let data = await idb.getAllValues("data");
      dataPrint(data);
      for (let i = 0; i < data.length; i++) {
        document.querySelector(`img[edit="${i}"]`).onclick = () => {
          header.truckEdit = {
            data: data[i],
          };
          window.location = "#/truckAdd";
        };
      }
    } catch (err) {
      console.log(err);
    }
    let data = await idb.getAllValues("data");
    data = data.map((value) => {
      return value.map((v) => "t" + v);
    });
    d.post(
      "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
      {
        type: 10,
        data: JSON.stringify({
          year: year,
          month: month,
          data: data,
        }),
      }
    ).catch((err) => console.log(err));
  } else {
    d.post(
      "https://script.google.com/macros/s/AKfycbymExR-OQWZdIEkT6AeLqj9mY92JzS_ucnntS2L/exec",
      {
        type: 9,
        data: JSON.stringify({
          year: year,
          month: month - 1,
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
          truck._rendered = false;
          truck.insert(2, buttons);
          document.getElementById("root").innerHTML = truck._render();
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
          dataPrint(data);
          for (let i = 0; i < data.length; i++) {
            document.querySelector(`img[edit="${i}"]`).onclick =
              () => {
                header.labourEdit = {
                  data: data[i],
                };
                window.location = "#/truckAdd";
              };
          }
        }
      }
    });
  }

  window.labour = (input, type) => {
    if (type == 1) {
      const { start, end } = getInterval(input.value);
      startDate.changeAttribute("max", getInterval().end);
      // document.querySelector(
      //   `input[node="${startDate._node}"]`
      // ).value = start;
      document.querySelector(`input[node="${endDate._node}"]`).value =
        end;
      endDate.changeAttribute("max", end);
      endDate.changeAttribute("min", start);
    }
  };
};

function getInterval(date = "") {
  let result = {};
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let startDate = 1;
  let endDate = 15;
  if (date) {
    if (new Date(date).getDate() > 15) {
      startDate = 16;
    }
    if (startDate == 16) {
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

export { giveTake };