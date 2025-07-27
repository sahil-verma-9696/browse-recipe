export default function Text(props) {
  const { children, htmlTag = "p", className, ...rest } = props;
  const Tag = htmlTag;
  return (
    <Tag className={`${className} text-nowrap`} {...rest}>
      {children}
    </Tag>
  );
}
