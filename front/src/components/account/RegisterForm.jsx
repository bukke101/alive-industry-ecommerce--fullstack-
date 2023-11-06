import { useState } from "react";
export default function RegisterForm({
  registerData,
  handleInputChange,
  handleRegister,
  isLogIn,
  setIsLogIn,
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
    <form onSubmit={handleRegister} className="login-form">
      <h3>Create an Account</h3>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={registerData.first_name}
        onChange={(e) => handleInputChange("first_name", e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={registerData.last_name}
        onChange={(e) => handleInputChange("last_name", e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        id="email"
        name="email"
        value={registerData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        placeholder="Email"
        required
      />
      <div className="password">
        <input
          type={type}
          id="password"
          name="password"
          value={registerData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Password"
          required
        />
        {type === "password" ? (
          <i className="fa fa-eye" aria-hidden="true" onClick={handleToggle} />
        ) : (
          <i
            className="fa fa-eye-slash"
            aria-hidden="true"
            onClick={handleToggle}
          />
        )}
      </div>
      <p>By creating an account, you agree to our Privacy Policy and Terms.</p>
      <button type="submit" disabled="">
        Register
      </button>
      <p>
        Already a member?
        <span
          onClick={() => {
            setIsLogIn(!isLogIn),
              setLogInData({
                email: "",
                password: "",
              });
          }}
        >
          Sign in
        </span>
      </p>
    </form>
  );
}
