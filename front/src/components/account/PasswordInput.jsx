import { useState } from "react";

export default function PasswordInput({ value, onChange }) {
  const [type, setType] = useState("password");

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="password">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder="Password"
        required
      />
      {type === "password" ? (
        <i className="fa fa-eye" aria-hidden="true" onClick={handleToggle} />
      ) : (
        <i
          className="fa fa-eye-slash"
          aria-hidden="true"
          onClick={handleToggle}
        />
      )}
    </div>
  );
}
