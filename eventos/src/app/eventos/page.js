import { api } from "@/services-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    api.get("/api/eventos")
      .then(res => setEventos(res.data));
  }, []);

  return (
    <div>
      <h1>Eventos</h1> 
      <Link
        className="rounded-md py-2 px-4 border bg-stone-300"
        href="/eventos/novo">
        Novo Evento
      </Link>

      <ol className="pt-8">
        {eventos.map((evento) => {
          return (
            <li key={evento.id}>
              {evento.nome} - {evento.data} - 
              <Link href={"/eventos/"+ evento.id}>+detalhes</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
