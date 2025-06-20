const Input = ({ value, onChange, label, placeholder, type }) => {
  return (
    <div className="">
      <label className="text-[13px] text-black/80 ">{label}</label>
      <div className="input-box">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default Input;
