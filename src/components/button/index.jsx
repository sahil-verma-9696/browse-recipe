export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`${className} flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer`}
    >
      {children}
    </button>
  );
}
