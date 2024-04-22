import { useClient } from "@/services-api";
import { useRouter } from "next/router"; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validação utilizando Yup
const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  descricao: yup.string().required('A descrição é obrigatória'),
  quantidade: yup.number().positive('A quantidade deve ser maior que zero').required('A quantidade é obrigatória'),
  preco: yup.number().positive('O preço deve ser maior que zero').required('O preço é obrigatório'),
});

function CadastroLoteForm() {
  const client = useClient();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await client.post("/api/lotes", data);
      alert("Lote cadastrado com sucesso");
      router.replace("/lotes");
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
      <div>
        <label>Quantidade</label>
        <input type="number" {...register('quantidade')} />
        <p>{errors.quantidade?.message}</p>
      </div>
      <div>
        <label>Preço</label>
        <input type="number" step="0.01" {...register('preco')} />
        <p>{errors.preco?.message}</p>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroLoteForm;