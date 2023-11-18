import RegisterForm from "./RegisterForm";
import PasswordInput from "./PasswordInput";
import { loginInputUtil } from "../../utils/account/accountUtils";
import { initialRegisterState } from "../../utils/common/initialState";
export default function LoginForm({
  logInData,
  logIn,
  registerData,
  isLogIn,
  setIsLogIn,
  message,
  handleRegister,
  setRegisterData,
  setLogInData,
}) {
  const handleLoginInput = (name, value) => {
    loginInputUtil(name, value, isLogIn, setLogInData, setRegisterData);
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
            value={logInData.email}
            onChange={(e) => handleLoginInput("email", e.target.value)}
            placeholder="Email"
            required
          />
          <PasswordInput
            value={logInData.password}
            onChange={(e) => handleLoginInput("password", e.target.value)}
          />
          <button type="submit" disabled="">
            Sign in
          </button>
          <p>
            Not a member?
            <span
              onClick={() => {
                setIsLogIn(!isLogIn), setRegisterData(initialRegisterState);
              }}
            >
              Join
            </span>
          </p>
        </form>
      ) : (
        <RegisterForm
          registerData={registerData}
          handleLoginInput={handleLoginInput}
          isLogIn={isLogIn}
          setIsLogIn={setIsLogIn}
          message={message}
          handleRegister={handleRegister}
          setLogInData={setLogInData}
        />
      )}
      <p className="error-message">{message}</p>
    </div>
  );
}
