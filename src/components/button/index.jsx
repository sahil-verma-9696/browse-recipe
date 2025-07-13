export default function Button({ children, className }) {
  return (
    <button
      className={`${className} flex items-center gap-2 px-2 py-1 rounded-lg`}
    >
      {children}
    </button>
  );
}
