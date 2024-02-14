import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { initialLoginState } from "../../utils/common/initialState";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
export default function RegisterForm({
  accountData,
  setAccountData,
  handleLoginInput,
  handleRegister,
  setLogInData,
}) {
  const { registerData } = accountData;
  return (
    <form onSubmit={handleRegister} className="">
      <h3 className="text-xl font-semibold py-10">Create an Account</h3>
      <Input
        type="text"
        id="first_name"
        name="first_name"
        placeholder="First Name"
        value={registerData.first_name}
        onChange={(e) => handleLoginInput("first_name", e.target.value)}
        className="max-w-sm mb-1"
        required
      />
      <Input
        type="text"
        id="last_name"
        name="last_name"
        placeholder="Last Name"
        value={registerData.last_name}
        onChange={(e) => handleLoginInput("last_name", e.target.value)}
        className="max-w-sm mb-1"
        required
      />
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) => handleLoginInput("email", e.target.value)}
        className="max-w-sm mb-1"
        required
      />
      <PasswordInput
        value={registerData.password}
        onChange={(e) => handleLoginInput("password", e.target.value)}
      />
      <span className="text-xs mb-1">
        By creating an account, you agree to our
        <br />
        <Link to="/privacy-policy" className="text-xs">
          Privacy Policy and Terms.
        </Link>
      </span>
      <Button type="submit" size="sm" className="w-full my-1">
        Register
      </Button>
      <p className="text-xs">
        Already a member?
        <span
          className="cursor-pointer hover:underline"
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
