const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc
} = require('firebase/firestore/lite');

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


async function get(tableName) {
  const tableRef = collection(db, tableName);

  const q = query(tableRef);

  const querySnapshot = await getDocs(q);

  const list = [];

  querySnapshot.forEach((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id
    }
    list.push(data);
    console.log(doc.id, " => ", doc.data());
  });
  return list;
}

async function getById(tableName, id) {
  const docRef = doc(db, tableName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return new Error('Not found');
  }
}

async function remove(tableName, id){
  const data = await deleteDoc(doc(db, tableName, id));
  return {
    message: `${id} deleted`
  }
}

module.exports = {
  save,
  get,
  getById,
  remove
}