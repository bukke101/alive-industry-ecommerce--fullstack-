import { useState } from "react";
import { Input } from "../../../components/ui/input";
export default function PasswordInput({ value, onChange }) {
  const [type, setType] = useState("password");

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="flex items-center relative mb-1">
      <Input
        type={type}
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="max-w-sm"
        required
      />
      {type === "password" ? (
        <i
          className="fa fa-eye absolute right-0 pr-2"
          aria-hidden="true"
          onClick={handleToggle}
        />
      ) : (
        <i
          className="fa fa-eye-slash absolute right-0 pr-2"
          aria-hidden="true"
          onClick={handleToggle}
        />
      )}
    </div>
  );
}
