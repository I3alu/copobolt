import { useEffect, useState } from "react";
import API from "../api";
import CipoKartya from "../components/CipoKartya";

export default function Home() {
  const [cipok, setCipok] = useState([]);

  useEffect(() => {
    API.get("/minden")
      .then(res => setCipok(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <header></header>

      <main className="container">
        <div className="row">
          {cipok.map(c => (
            <CipoKartya key={c.cipo_id} cipo={c} />
          ))}
        </div>
      </main>

      <footer>Györei Balázs</footer>
    </>
  );
}