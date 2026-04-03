type Props = {
  text: string;
};

export default function FormButton({ text }: Props) {
  return (
    <button className="w-full h-10 bg-teal-700 text-white rounded-lg">
      {text}
    </button>
  );
}