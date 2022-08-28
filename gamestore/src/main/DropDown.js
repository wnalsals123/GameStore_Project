import React from "react";

const Dropdown = (props) => {
  const { children, visibility } = props

  return (
    <article>
      {visibility && children}
    </article>
  )
};

export default Dropdown;