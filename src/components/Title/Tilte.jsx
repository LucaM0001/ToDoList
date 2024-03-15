const title = (props) => {
  const titleCss = `text-center text-success ${props.css}`;
  return <h1 className={titleCss}>{props.children}</h1>;
};

export default title;
