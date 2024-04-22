import { api } from "@/services-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Lotes() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    api.get("/api/lotes")
      .then(res => setLotes(res.data));
  }, []);

  return (
    <div>
      <h1>Lotes</h1> 
      <Link
        className="rounded-md py-2 px-4 border bg-stone-300"
        href="/lotes/novo">
        Novo Lote
      </Link>

      <ol className="pt-8">
        {lotes.map((lote) => {
          return (
            <li key={lote.id}>
              {lote.nome} - {lote.quantidade} - 
              <Link href={"/lotes/"+ lote.id}>+detalhes</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
