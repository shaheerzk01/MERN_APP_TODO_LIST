import { FC } from "react";
import { tv, type VariantProps} from "tailwind-variants";

type ButtonVariants = VariantProps<typeof buttonStyle>

interface Props extends ButtonVariants{
  onClick?: ()=> void;
  title: string;
}

const buttonStyle = tv({
    base: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ",
    variants: {
        color: {
            blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ",
            gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded ",
            red: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded ",
            green: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded "
        }
    }
})

const NoteButton: FC<Props> = ({title, color, onClick}) => {
  return (
    <button onClick={onClick} className={buttonStyle({color})}>
      {title}
    </button>
  );
};

export default NoteButton;