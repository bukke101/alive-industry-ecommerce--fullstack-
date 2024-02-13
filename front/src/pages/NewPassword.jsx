import { useState } from "react";
import { useLocation } from "react-router-dom";
import PasswordInput from "../components/account/PasswordInput";
// import { resetPassword } from "../api/accountOperations";
export default function NewPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [requestData, setRequestData] = useState({
    email: "",
    password: "",
    token: token || "",
  });

  const handleInputChange = (name, value) => {
    setRequestData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRequestInput = async (e) => {
    e.preventDefault();
    const response = await resetPassword(requestData);
    console.log(response);
  };
  return (
    <form onSubmit={handleRequestInput} className="login-form">
      <h3>Sign in</h3>
      <input
        type="email"
        id="email"
        name="email"
        value={requestData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        placeholder="Email"
        required
      />
      <PasswordInput
        value={requestData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
