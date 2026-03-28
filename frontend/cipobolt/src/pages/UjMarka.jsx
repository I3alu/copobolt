import { useState } from "react";
import API from "../api";

export default function UjMarka() {
  const [form, setForm] = useState({
    nev: "",
    szarmazasi_orszag: "",
    img: ""
  });

  const kuldes = () => {
    API.post("/ujMarka", form)
      .then(() => alert("Sikeres"))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Új márka</h2>

      <input className="form-control mb-2" placeholder="Név"
        onChange={e => setForm({...form, nev:e.target.value})} />

      <input className="form-control mb-2" placeholder="Ország"
        onChange={e => setForm({...form, szarmazasi_orszag:e.target.value})} />

      <input className="form-control mb-2" placeholder="Kép"
        onChange={e => setForm({...form, img:e.target.value})} />

      <button className="btn btn-primary" onClick={kuldes}>
        Mentés
      </button>
    </div>
  );
}