const button = (props) => {
  const btnCss = `btn ${props.typeBtn} ${props.css}`;
  return (
    <button type={props.type} className={btnCss} onClick={props.clic}>
      {props.children}
    </button>
  );
};

export default button;
