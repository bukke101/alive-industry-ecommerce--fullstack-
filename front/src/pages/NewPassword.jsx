import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../components/account/PasswordInput";
import { resetPassword } from "../api/accountOperations";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
export default function NewPassword() {
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
    await resetPassword(requestData);

    setMessage("Password reset successful");
    navigate("/account");

    setRequestData({
      email: "",
      password: "",
      token: "",
    });
  };
  return (
    <>
      <form
        onSubmit={handleRequestInput}
        className="rounded-lg border flex-col px-3"
      >
        <h3 className="">Reset</h3>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={requestData.first_name}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="max-w-sm"
          required
        />
        <PasswordInput
          value={requestData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        <Button type="submit" variant="outline" size="sm">
          Submit
        </Button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
