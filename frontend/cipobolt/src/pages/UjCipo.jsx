import { useState } from "react";
import API from "../api";

export default function UjCipo() {
  const [form, setForm] = useState({
    nev: "",
    meret: "",
    ar: "",
    marka_id: ""
  });

  const kuldes = () => {
    API.post("/ujCipo", form)
      .then(() => alert("Sikeres"))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Új cipő</h2>

      <input className="form-control mb-2" placeholder="Név"
        onChange={e => setForm({...form, nev:e.target.value})} />

      <input className="form-control mb-2" placeholder="Méret"
        onChange={e => setForm({...form, meret:e.target.value})} />

      <input className="form-control mb-2" placeholder="Ár"
        onChange={e => setForm({...form, ar:e.target.value})} />

      <input className="form-control mb-2" placeholder="Márka ID"
        onChange={e => setForm({...form, marka_id:e.target.value})} />

      <button className="btn btn-success" onClick={kuldes}>
        Mentés
      </button>
    </div>
  );
}