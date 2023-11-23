import PasswordInput from "./PasswordInput";
import { initialLoginState } from "../../utils/common/initialState";
export default function RegisterForm({
  accountData,
  setAccountData,
  handleLoginInput,
  handleRegister,
  setLogInData,
}) {
  const { registerData } = accountData;
  return (
    <form onSubmit={handleRegister} className="login-form">
      <h3>Create an Account</h3>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={registerData.first_name}
        onChange={(e) => handleLoginInput("first_name", e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={registerData.last_name}
        onChange={(e) => handleLoginInput("last_name", e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        id="email"
        name="email"
        value={registerData.email}
        onChange={(e) => handleLoginInput("email", e.target.value)}
        placeholder="Email"
        required
      />
      <PasswordInput
        value={registerData.password}
        onChange={(e) => handleLoginInput("password", e.target.value)}
      />
      <p>By creating an account, you agree to our Privacy Policy and Terms.</p>
      <button type="submit" disabled="">
        Register
      </button>
      <p>
        Already a member?
        <span
          onClick={() => {
            setLogInData((prevState) => ({
              ...prevState,
              isLogIn: true,
            })),
              setAccountData((prevState) => ({
                ...prevState,
                logInData: initialLoginState,
              }));
          }}
        >
          Sign in
        </span>
      </p>
    </form>
  );
}
