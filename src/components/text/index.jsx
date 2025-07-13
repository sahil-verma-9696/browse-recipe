export default function Text(props) {
  const { children, htmlTag = "p", className } = props;
  const Tag = htmlTag;
  return <Tag className={`${className} text-nowrap`}>{children}</Tag>;
}
