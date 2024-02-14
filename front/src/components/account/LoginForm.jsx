import { useState } from "react";
import RegisterForm from "./RegisterForm";
import PasswordInput from "./PasswordInput";
import { loginInputUtil } from "../../utils/account/accountUtils";
import { initialRegisterState } from "../../utils/common/initialState";
import ForgotPassword from "./ForgotPassword";
import { generatePasswordToken } from "../../api/accountOperations";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
export default function LoginForm({
  accountData,
  setAccountData,
  logIn,
  message,
  handleRegister,
  logInData,
  setLogInData,
}) {
  const [email, setEmail] = useState("");
  const [reset, setReset] = useState(false);

  const handleLoginInput = (name, value) => {
    loginInputUtil(name, value, logInData, setAccountData);
  };

  const handleReset = () => {
    setReset((prevState) => !prevState);
  };

  // add success and errpr message
  const handlePasswordToken = async (e) => {
    e.preventDefault();
    try {
      await generatePasswordToken(email);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };
  return (
    <div className="flex-col rounded-lg border w-21 items-center justify-center px-2 py-2 text-center">
      {logInData.isLogIn ? (
        <>
          <form onSubmit={logIn} className="w-full">
            <h3>Sign in</h3>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={accountData?.logInData?.email}
              onChange={(e) => handleLoginInput("email", e.target.value)}
              className="max-w-sm mb-1"
              required
            />
            <PasswordInput
              value={accountData?.logInData?.password}
              onChange={(e) => handleLoginInput("password", e.target.value)}
            />
            <Button type="submit" variant="outline" size="sm">
              Sign in
            </Button>
            <div className="flex justify-between text-xs">
              <div>
                Not a member?
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setLogInData((prevState) => ({
                      ...prevState,
                      isLogIn: false,
                    })),
                      setAccountData((prevState) => ({
                        ...prevState,
                        registerData: initialRegisterState,
                      }));
                  }}
                >
                  Join
                </span>
              </div>
              <div>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={handleReset}
                >
                  forgot password?
                </span>
              </div>
            </div>
          </form>
          {/* <ForgotPassword
            handlePasswordToken={handlePasswordToken}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
        </>
      ) : (
        <RegisterForm
          accountData={accountData}
          setAccountData={setAccountData}
          handleLoginInput={handleLoginInput}
          setLogInData={setLogInData}
          message={message}
          handleRegister={handleRegister}
        />
      )}
      <span className="error-message text-xs">{message}</span>
    </div>
  );
}
