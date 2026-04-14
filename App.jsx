import { useState, useEffect } from "https://esm.sh/react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDppJ2BQurJIk-LsOnLNi9wpuqbUs0yog4",
  authDomain: "property-ai-system.firebaseapp.com",
  projectId: "property-ai-system",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {

  const [criteria, setCriteria] = useState({});
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addTestLead = async () => {
    await addDoc(collection(db, "leads"), {
      name: "Test Lead",
      phone: "60123456789",
      status: "new"
    });
  };

  return (
    <div style={{padding:20}}>
      <h1>AI Property System</h1>

      <button onClick={addTestLead}>
        Test Firebase Connection
      </button>

      <h2>Leads</h2>

      {leads.map(l => (
        <div key={l.id}>
          {l.name} - {l.phone}
        </div>
      ))}
    </div>
  );
}
