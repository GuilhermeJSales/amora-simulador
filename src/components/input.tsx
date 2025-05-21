import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder: string;
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: string;
  rules?: RegisterOptions;
}

export function Input({
  placeholder,
  label,
  name,
  register,
  rules,
  errors,
  type = "number",
}: InputProps) {
  return (
    <>
      <label className="font-medium" htmlFor="valor_imovel">
        {label}
      </label>
      <input
        className="rounded-md border border-zinc-950 bg-white p-2"
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </>
  );
}
