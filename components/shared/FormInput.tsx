type Props = {
  label: string;
  type?: string;
  placeholder?: string;
};

export default function FormInput({
  label,
  type = "text",
  placeholder,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-10 px-3 border rounded-lg"
      />
    </div>
  );
}