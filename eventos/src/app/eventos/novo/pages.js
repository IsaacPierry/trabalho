import { useClient } from "@/services-api";
import { useRouter } from "next/router"; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validação utilizando Yup
const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  data: yup.date().required('A data é obrigatória'),
  local: yup.string().required('O local é obrigatório'),
  descricao: yup.string().required('A descrição é obrigatória'),
});

function MeuFormulario() {
  const client = useClient();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await client.post("/api/eventos", data); 
      alert("Cadastrado com sucesso");
      router.replace("/eventos"); 
    } catch (error) {
      console.error("Erro:", error);
    }
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
