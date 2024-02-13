import RegisterForm from "./RegisterForm";
import PasswordInput from "./PasswordInput";
import { loginInputUtil } from "../../utils/account/accountUtils";
import { initialRegisterState } from "../../utils/common/initialState";
import { useState } from "react";
import ResetPassword from "./ResetPassword";
import { generatePasswordToken } from "../../api/accountOperations";
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
  const handleLoginInput = (name, value) => {
    loginInputUtil(name, value, logInData, setAccountData);
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
    <div className="login-wrapper">
      {logInData.isLogIn ? (
        <>
          <form onSubmit={logIn} className="login-form">
            <h3>Sign in</h3>
            <input
              type="email"
              id="email"
              name="email"
              value={accountData?.logInData?.email}
              onChange={(e) => handleLoginInput("email", e.target.value)}
              placeholder="Email"
              required
            />
            <PasswordInput
              value={accountData?.logInData?.password}
              onChange={(e) => handleLoginInput("password", e.target.value)}
            />
            <button type="submit">Sign in</button>
            <p>
              Not a member?
              <span
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
            </p>
          </form>
          <ResetPassword
            handlePasswordToken={handlePasswordToken}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
      <p className="error-message">{message}</p>
    </div>
  );
}
