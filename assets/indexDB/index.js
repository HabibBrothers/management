if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}

// const openIDB = (idbName, callback = function () {}) => {
//   return new Promise((resolve, reject) => {
//     let request = window.indexedDB.open(idbName);
//     request.onsuccess = (e) => {
//       resolve(e.target.result);
//     };
//     request.onerror = reject;
//     request.onupgradeneeded = callback;
//   });
// };

const IDB = {
  enabled: false,
  define(dbName, objects) {
    this.name = dbName;
    this.enabled = true;
    let request = window.indexedDB.open(this.name);
    console.log(request);
    request.onsuccess = (e) => {
      console.log(e.target.result);
    };
    request.onerror = (e) => {
      this.enabled = false;
      this.error = e;
    };
    request.onupgradeneeded = (e) => {
      let db = e.target.result;
      for (let x of objects) {
        let { keyPath } = x;
        let option = { keyPath: keyPath };
        if (!keyPath) option = { autoIncrement: true };
        db.createObjectStore(x.name, option);
      }
    };
    return this;
  },
  add(database, value) {
    let request = window.indexedDB.open(this.name);
    request.onsuccess = (e) => {
      let transaction = e.target.result
        .transaction([database], "readwrite")
        .objectStore(database)
        .add(value);
    };
  },
  remove(database, key) {
    let request = window.indexedDB.open(this.name);
    request.onsuccess = (e) => {
      let transaction = e.target.result
        .transaction([database], "readwrite")
        .objectStore(database)
        .delete(key);
    };
  },
  get(database, key) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let transaction = e.target.result
          .transaction([database])
          .objectStore(database)
          .get(key);
        transaction.onsuccess = (e) => {
          resolve(e.target.result);
        };
      };
    });
  },
};

const idb = IDB.define("test", [{ name: "labour" }], 0);
idb.get("labour", 5).then((res) => console.log(res));

// var db;
// // This is what our customer data looks like.
// const customerData = [
//   {
//     ssn: "444-44-44448678",
//     name: "Bill",
//     age: 35,
//     email: "bill@company.com",
//   },
//   {
//     ssn: "555-55-5555",
//     name: "Donna",
//     age: 32,
//     email: "donna@home.org",
//   },
// ];

// const dbName = "the_name";

// var request = indexedDB.open(dbName, 3);

// request.onerror = (event) => {
//   // Handle errors.
//   console.log(event);
// };
// request.onupgradeneeded = (event) => {
//   db = event.target.result;

//   // Create an objectStore to hold information about our customers. We're
//   // going to use "ssn" as our key path because it's guaranteed to be
//   // unique - or at least that's what I was told during the kickoff meeting.
//   objectStore = db.createObjectStore("customers", {
//     keyPath: "ssn",
//   });

//   // Create an index to search customers by name. We may have duplicates
//   // so we can't use a unique index.
//   objectStore.createIndex("name", "name", { unique: false });

//   // Create an index to search customers by email. We want to ensure that
//   // no two customers have the same email, so use a unique index.
//   objectStore.createIndex("email", "email", { unique: true });

//   // Use transaction oncomplete to make sure the objectStore creation is
//   // finished before adding data into it.
//   objectStore.transaction.oncomplete = (event) => {
//     // Store values in the newly created objectStore.
//     var customerObjectStore = db
//       .transaction("customers", "readwrite")
//       .objectStore("customers");
//     customerData.forEach(function (customer) {
//       customerObjectStore.add(customer);
//     });
//   };
// };

// // Open the indexedDB.
// var request = indexedDB.open(dbName, 3);

// request.onupgradeneeded = (event) => {
//   var db = event.target.result;

//   // Create another object store called "names" with the autoIncrement flag set as true.
//   var objStore = db.createObjectStore("names", {
//     autoIncrement: true,
//   });

//   // Because the "names" object store has the key generator, the key for the name value is generated automatically.
//   // The added records would be like:
//   // key : 1 => value : "Bill"
//   // key : 2 => value : "Donna"
//   customerData.forEach(function (customer) {
//     objStore.add(customer.name);
//   });
// };
