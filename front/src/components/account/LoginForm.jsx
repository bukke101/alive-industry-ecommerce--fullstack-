import { useState } from "react";
import RegisterForm from "./RegisterForm";
export default function LoginForm({
  handleInputChange,
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
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
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
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Email"
            required
          />
          <div className="password">
            <input
              type={type}
              id="password"
              name="password"
              value={logInData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Password"
              required
            />
            {type === "password" ? (
              <i
                className="fa fa-eye"
                aria-hidden="true"
                onClick={handleToggle}
              />
            ) : (
              <i
                className="fa fa-eye-slash"
                aria-hidden="true"
                onClick={handleToggle}
              />
            )}
          </div>
          <button type="submit" disabled="">
            Sign in
          </button>
          <p>
            Not a member?
            <span
              onClick={() => {
                setIsLogIn(!isLogIn),
                  setRegisterData({
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                  });
              }}
            >
              Join
            </span>
          </p>
        </form>
      ) : (
        <RegisterForm
          registerData={registerData}
          handleInputChange={handleInputChange}
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
