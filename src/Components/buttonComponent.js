import React from "react";
function Button({ children, state, style, onClick }) {
  return (
    <button
      data-mdb-ripple-init
      className="btn btn-secondary"
      type="button"
      onClick={onClick}
      style={style}
      state={state}
    >
      {children}
    </button>
  );
}

export default Button;
