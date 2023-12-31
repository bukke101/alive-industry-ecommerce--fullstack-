import RegisterForm from "./RegisterForm";
import PasswordInput from "./PasswordInput";
import { loginInputUtil } from "../../utils/account/accountUtils";
import { initialRegisterState } from "../../utils/common/initialState";
export default function LoginForm({
  accountData,
  setAccountData,
  logIn,
  isLogIn,
  setIsLogIn,
  message,
  handleRegister,
}) {
  const handleLoginInput = (name, value) => {
    loginInputUtil(name, value, isLogIn, setAccountData);
  };

  return (
    <div className="login-wrapper">
      {isLogIn ? (
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
          <button type="submit" disabled="">
            Sign in
          </button>
          <p>
            Not a member?
            <span
              onClick={() => {
                setIsLogIn(!isLogIn),
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
      ) : (
        <RegisterForm
          accountData={accountData}
          setAccountData={setAccountData}
          handleLoginInput={handleLoginInput}
          isLogIn={isLogIn}
          setIsLogIn={setIsLogIn}
          message={message}
          handleRegister={handleRegister}
        />
      )}
      <p className="error-message">{message}</p>
    </div>
  );
}
