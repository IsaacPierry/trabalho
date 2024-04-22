'use client'

import { api } from "@/services-api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"; 

// Validação utilizando Yup
const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  data: yup.date().required('A data é obrigatória'),
  local: yup.string().required('O local é obrigatório'),
  descricao: yup.string().required('A descrição é obrigatória'),
});

function MeuFormulario() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
 });

  const router = useRouter(); 

  const onSubmit = (data) => {
    api.post("/api/usuarios", data)
      .then(() => {
        alert("Cadastrado com Sucesso")
        router.replace("/usuarios")
      })
      .catch((error) => {
        // Trate o erro, se necessário
        console.error("Erro:", error);
      });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome</label>
        <input {...register('nome')} />
        <p>{errors.nome?.message}</p> 
      </div>
      <div>
        <label>Data</label>
        <input type="date" {...register('data')} />
        <p>{errors.data?.message}</p>
      </div>
      <div>
        <label>Local</label>
        <input {...register('local')} />
        <p>{errors.local?.message}</p> 
      </div>
      <div>
        <label>Descrição</label>
        <input {...register('descricao')} />
        <p>{errors.descricao?.message}</p>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MeuFormulario;
