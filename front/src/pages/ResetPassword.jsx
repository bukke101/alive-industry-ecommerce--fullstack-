import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../components/account/PasswordInput";
import { resetPassword } from "../api/accountOperations";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { removeMessage } from "../utils/common/genralUtils";
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [message, setMessage] = useState("");
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
    try {
      await resetPassword(requestData);
      setMessage("Password reset successful");
      navigate("/account");
      setRequestData({
        email: "",
        password: "",
        token: "",
      });
      removeMessage(setMessage);
    } catch (error) {
      setMessage("Password reset failed");
      removeMessage(setMessage);
    }
  };
  return (
    <div className="flex-col rounded-lg border w-21 items-center justify-center px-8 text-center">
      <form onSubmit={handleRequestInput} className="w-full">
        <h3 className="text-xl font-semibold py-10">Reset Password</h3>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={requestData.first_name}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="max-w-sm mb-1"
          required
        />
        <PasswordInput
          value={requestData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        <Button type="submit" size="sm" className="w-full">
          Submit
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
