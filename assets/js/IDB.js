class IDB {
  constructor(dataBase) {
    this.name = dataBase;
  }

  // idb.version
  get version() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        resolve(e.target.result.version);
        this.dataBases = e.target.result.objectStoreNames;
        e.target.result.close();
      };
      request.onerror = reject;
    });
  }

  // create new data base
  createDataBase(databaseName, option = { autoIncrement: true }) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let version = e.target.result.version;
        let dataBases = e.target.result.objectStoreNames;
        e.target.result.close();
        for (let i = 0; i < dataBases.length; i++) {
          console.log(dataBases[i]);
          if (dataBases[i] == databaseName) {
            this.dataBase = databaseName;
            resolve(this.dataBase);
            return;
          }
        }
        let request2 = window.indexedDB.open(
          this.name,
          Number(version) + 1
        );
        request2.onsuccess = (e) => {
          this.dataBase = databaseName;
          resolve(this.dataBase);
          e.target.result.close();
        };
        request2.onerror = reject;
        request2.onupgradeneeded = (e) => {
          let db = e.target.result;
          db.createObjectStore(databaseName, option);
        };
      };
      request.onerror = reject;
    });
  }

  // add value
  add(value) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.name);
      request.onsuccess = (e) => {
        let db = e.target.result;
        let transaction = db
          .transaction([this.dataBase], "readwrite")
          .objectStore(this.dataBase);
        if (value.constructor.toString().indexOf("Array") >= 0) {
          value.forEach((data, index) => {
            let request = transaction.add(data);
            if (index == value.length - 1) {
              request.onsuccess = () => {
                resolve("success");
                db.close();
              };
            }
            request.onerror = (err) => {
              db.close();
              reject(err);
            };
          });
        } else {
          let request = transaction.add(value);
          request.onsuccess = () => {
            resolve("success");
            db.close();
          };
          request.onerror = (err) => {
            db.close();
            reject(err);
          };
        }
      };
    });
  }
}
export default IDB;
