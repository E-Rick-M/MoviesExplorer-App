import {type ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
}&ComponentPropsWithoutRef<"input">;

type TextArea={
    label: string;
    id: string;
    isTextArea: boolean;
}&ComponentPropsWithoutRef<"textarea">;
export default function Input(props : InputProps|TextArea) {

    if('isTextArea' in props) {
        const { label,id,isTextArea, ...Otherprops } = props;
        return (
            <div className="mb-4">
                <label htmlFor={id} className="block text-gray-700">{label}</label>
                <textarea
                    id={id}
                    {...Otherprops}
                    className="border rounded w-full py-2 px-3 text-lg text-gray-900"
                    rows={4} // Set the number of rows for the textarea
                />
            </div>
        )
    }
    const { label, id, ...otherprops } = props;
  return (

    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={id}>{label}</label>
      <input
        id={id}
        {...otherprops}
        className="border rounded w-full py-2 px-3 text-lg text-gray-900"
      />
    </div>
  );
}
