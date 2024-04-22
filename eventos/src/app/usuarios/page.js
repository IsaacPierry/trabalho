import { api } from "@/services-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    api.get("/api/usuarios")
      .then(res => setUsuarios(res.data));
  }, []);

  return (
    <div>
      <h1>Usuários</h1> 
      <Link
        className="rounded-md py-2 px-4 border bg-stone-300"
        href="/usuarios/novo">
        Novo Usuário
      </Link>

      <ol className="pt-8">
        {usuarios.map((usuario) => {
          return (
            <li key={usuario.id}>
              {usuario.nome} - {usuario.nivel_acesso} - 
              <Link href={"/usuarios/"+ usuario.id}>+detalhes</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
