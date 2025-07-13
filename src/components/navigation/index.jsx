export default function Navigation({ children, className }) {
  return (
    <nav className={`${className} flex items-center gap-4`}>{children}</nav>
  );
}
