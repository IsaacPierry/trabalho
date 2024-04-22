import { useClient } from "@/services-api";
import { useRouter } from "next/router"; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validação utilizando Yup
const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  descricao: yup.string().required('A descrição é obrigatória'),
});

function CadastroCategoriaForm() {
  const client = useClient(); 
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await client.post("/api/categorias", data);
      alert("Categoria cadastrada com sucesso");
      router.replace("/categorias"); 
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
        <label>Descrição</label>
        <input {...register('descricao')} />
        <p>{errors.descricao?.message}</p>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroCategoriaForm;
