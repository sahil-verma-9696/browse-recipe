export default function Input({ onChange, onInput, className, placeholder }) {
  return (
    <input
      type="text"
      onInput={onInput}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} rounded-md px-2 py-1`}
    />
  );
}
