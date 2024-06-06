import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push, onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSy6B10VfJPAzJVMf9AoKsuW25adBWGaK4",
  authDomain: "students-97408.firebaseapp.com",
  projectId: "students-97408",
  storageBucket: "students-97408.appspot.com",
  messagingSenderId: "721332600293",
  appId: "1:721332600293:web:e184c183a1ca3d37f1830c",
};

const app = initializeApp(firebaseConfig);
const fireDb = getDatabase(app);

export default fireDb;
export { ref, set, get, child, push, onValue,getDatabase };;
