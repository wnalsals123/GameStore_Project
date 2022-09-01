const Dropdown = (props) => {
  const { visble, children } = props

  return (
    <div>
      {visble && children}
    </div>
  )
};

export default Dropdown;