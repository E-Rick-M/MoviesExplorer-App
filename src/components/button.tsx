import { useFormStatus } from "react-dom";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    } & React.ComponentPropsWithoutRef<"button">;   

export default function Button({children,...props}: ButtonProps) {
    const {pending}=useFormStatus()
    let classes=`bg-blue-500 text-white py-2 px-4 rounded ${props.className} hover:bg-blue-700 transition duration-300 ease-in-out`;

    if(props.className) {
        classes=` ${props.className}`
    }
  return (
    <button {...props} className={classes} disabled={pending}>
        {children}
    </button>
  );
}