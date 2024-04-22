import { api } from "@/services-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ingressos() {
  const [ingressos, setIngressos] = useState([]);

  useEffect(() => {
    api.get("/api/ingressos")
      .then(res => setIngressos(res.data));
  }, []);

  return (
    <div>
      <h1>Ingressos</h1> 
      <Link
        className="rounded-md py-2 px-4 border bg-stone-300"
        href="/ingressos/novo">
        Novo Ingresso
      </Link>

      <ol className="pt-8">
        {ingressos.map((ingresso) => {
          return (
            <li key={ingresso.id}>
              {ingresso.tipo} - {ingresso.preco} - 
              <Link href={"/ingressos/"+ ingresso.id}>+detalhes</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
