import { getFirestore, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import fs from 'fs';

const firebaseAppletConfig = JSON.parse(fs.readFileSync('../../firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseAppletConfig);
const db = getFirestore(app);

async function test() {
  try {
    const q = query(collection(db, 'calls'), where('callerId', '==', 'test'), orderBy('createdAt', 'desc'), limit(1));
    await getDocs(q);
    console.log("Query with orderBy succeeded");
  } catch(e) {
    console.log("Query failed:", e.message);
  }
}
test();
