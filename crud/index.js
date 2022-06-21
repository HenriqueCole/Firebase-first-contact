const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, addDoc } = require('firebase/firestore/lite');

const firebaseConfig = {
  apiKey: "AIzaSyDPYZh6huCFnee9bX0uwaegiFGw2DuyMm0",
  authDomain: "fist-database-access.firebaseapp.com",
  projectId: "fist-database-access",
  storageBucket: "fist-database-access.appspot.com",
  messagingSenderId: "318902867356",
  appId: "1:318902867356:web:43308e4815d482c5c8e459",
  measurementId: "G-FWRSBJ1WY2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(tableName, id, data) {
  if (id) {
    const referenceEntity = await setDoc(doc(db, tableName, id), data);
    const savedData = {
      ...data,
      id: id
    }
    return savedData;
  } else {
    const referenceEntity = await addDoc(collection(db, tableName), data);
    const savedData = {
      ...data,
      id: referenceEntity.id
    }
    return savedData;
  }
}

module.exports = {
  save
}