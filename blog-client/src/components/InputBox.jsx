const InputBox = ({ type, name, id, defaultValue, placeholder, icon }) => {
  return (
    <div className="relative w-full mb-4">
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input-box"
      />
      <i
        className={"fi " + icon + " absolute left-4 top-1/2 -translate-y-1/2 "}
      ></i>
    </div>
  );
};
export default InputBox;
