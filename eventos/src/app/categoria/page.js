import { api } from "@/services-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    api.get("/api/categorias")
      .then(res => setCategorias(res.data));
  }, []);

  return (
    <div>
      <h1>Categorias</h1> 
      <Link
        className="rounded-md py-2 px-4 border bg-stone-300"
        href="/categorias/nova">
        Nova Categoria
      </Link>

      <ol className="pt-8">
        {categorias.map((categoria) => {
          return (
            <li key={categoria.id}>
              {categoria.nome} - {categoria.descricao} - 
              <Link href={"/categorias/"+ categoria.id}>+detalhes</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
