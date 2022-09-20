import { initializeApp } from "../../lib/firebase-app.js";
import { getAnalytics } from "../../lib/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  enableIndexedDbPersistence,
  getDoc,
  serverTimestamp,
} from "../../lib/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "../../lib/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBF9uLusU0g-77cXS1bAwvVVPGlc3xmZeE",
  authDomain: "habibbrothers-test-app.firebaseapp.com",
  projectId: "habibbrothers-test-app",
  storageBucket: "habibbrothers-test-app.appspot.com",
  messagingSenderId: "413567219553",
  appId: "1:413567219553:web:ca3f9e0f39a171839bb720",
  measurementId: "G-989WSS6D83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  console.log(err);
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export {
  firebaseConfig,
  auth,
  signInWithEmailAndPassword,
  signOut,
  db,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  serverTimestamp,
};
