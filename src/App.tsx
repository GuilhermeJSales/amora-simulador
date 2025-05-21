import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formatCurrency } from "./types/formatCurrency";
import { Input } from "./components/input";

interface ResultProps {
  valor_entrada: number;
  valor_financiar: number;
  total_guardar: number;
  valor_mensal: number;
}

const schema = z.object({
  valor_imovel: z.coerce
    .number({
      required_error: "O Campo valor do imóvel é obrigatório!",
      invalid_type_error: "O Campo valor do imóvel é obrigatório!",
    })
    .min(1, "É necessário preencher um valor"),
  percentual_entrada: z.coerce
    .number({
      required_error: "O Campo porcentagem de entrada é obrigatória",
      invalid_type_error: "O campo de porcentagem de entrada é obrigatório!",
    })
    .min(5, "A entrada mínima é de 5%")
    .max(20, "A entrada máxima é de 20%"),
  anos_contrato: z.coerce
    .number({
      required_error: "O Campo duração de contrato é obrigatório",
      invalid_type_error: "O campo duração de contrato é obrigatório!",
    })
    .min(1, "A duração mínima do contrato é de 1 ano")
    .max(5, "A duração máxima do contrato é de 5 anos")
    .int("O valor deve ser um número inteiro"),
});

type FormData = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [result, setResult] = useState<ResultProps | null>(null);

  function onSubmit(data: FormData) {
    const valorEntrada = data.valor_imovel * (data.percentual_entrada / 100);
    const valorFinanciar = data.valor_imovel - valorEntrada;
    const totalGuardar = data.valor_imovel * 0.15;
    const valorMensal = totalGuardar / (data.anos_contrato * 12);

    setResult({
      valor_entrada: valorEntrada,
      valor_financiar: valorFinanciar,
      total_guardar: totalGuardar,
      valor_mensal: valorMensal,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <section className="w-full max-w-md rounded-md bg-slate-200 p-4 drop-shadow">
        <h1 className="mb-2 text-center font-bold">
          Simulador compra de imóvel aMORA
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            label="Valor do imóvel"
            placeholder="150000"
            type="number"
            name="valor_imovel"
            register={register}
            errors={errors.valor_imovel?.message}
          />

          <Input
            label="Percentual de entrada"
            placeholder="de 5 a 20%"
            type="number"
            name="percentual_entrada"
            register={register}
            errors={errors.percentual_entrada?.message}
          />

          <Input
            label="Durção do contrato"
            placeholder="de 1 a 5 anos"
            type="number"
            name="anos_contrato"
            register={register}
            errors={errors.anos_contrato?.message}
          />

          <button
            className="cursor-pointer rounded-md bg-green-600 p-2 font-medium text-white"
            type="submit"
          >
            Simular
          </button>
        </form>

        {result && (
          <div className="mt-2">
            <p>Valor da Entrada: {formatCurrency(result.valor_entrada)}</p>
            <p>Valor a Financiar: {formatCurrency(result.valor_financiar)}</p>
            <p>Total a Guardar: {formatCurrency(result.total_guardar)}</p>
            <p>Valor Mensal a Guardar: {formatCurrency(result.valor_mensal)}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
