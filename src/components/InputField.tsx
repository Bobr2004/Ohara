type InputFieldProps = {
   className?: string;
   type: "text" | "password" | "number";
   title: string;
   value: any;
   onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function InputField({ className, title, ...InputFieldProps }: InputFieldProps) {
   return (
      <label className="InputField pt-3 pb-1 px-3 border border-stone-200 rounded-lg bg-white w-full block">
         <input {...InputFieldProps} className="w-full outline-none" placeholder=" "/>
         <span>{title}</span>
      </label>
   );
}

export { InputField };
