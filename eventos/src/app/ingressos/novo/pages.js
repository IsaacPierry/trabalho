import { useClient } from "@/services-api";
import { useRouter } from "next/router"; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validação utilizando Yup
const schema = yup.object().shape({
  quantidade: yup.number().positive('A quantidade deve ser maior que zero').required('A quantidade é obrigatória'),
  valor: yup.number().positive('O valor deve ser maior que zero').required('O valor é obrigatório'),
  eventoId: yup.number().positive('O ID do evento é obrigatório').required('O ID do evento é obrigatório'),
  categoriaId: yup.number().positive('O ID da categoria é obrigatório').required('O ID da categoria é obrigatório'),
  loteId: yup.number().positive('O ID do lote é obrigatório').required('O ID do lote é obrigatório')
});

function CadastroIngressoForm() {
  const client = useClient();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await client.post("/api/ingressos", data);
      alert("Ingresso cadastrado com sucesso");
      router.replace("/ingressos");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Quantidade</label>
        <input type="number" {...register('quantidade')} />
        <p>{errors.quantidade?.message}</p> 
      </div>
      <div>
        <label>Valor</label>
        <input type="number" step="0.01" {...register('valor')} />
        <p>{errors.valor?.message}</p>
      </div>
      <div>
        <label>ID do Evento</label>
        <input type="number" {...register('eventoId')} />
        <p>{errors.eventoId?.message}</p>
      </div>
      <div>
        <label>ID da Categoria</label>
        <input type="number" {...register('categoriaId')} />
        <p>{errors.categoriaId?.message}</p>
      </div>
      <div>
        <label>ID do Lote</label>
        <input type="number" {...register('loteId')} />
        <p>{errors.loteId?.message}</p>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroIngressoForm;
