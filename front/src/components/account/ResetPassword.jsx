import { useState } from "react";
export default function ResetPassword({
  value,
  onChange,
  handlePasswordToken,
}) {
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset((prevState) => !prevState);
  };

  return (
    <div>
      {!reset ? (
        <button onClick={handleReset}>forgot password</button>
      ) : (
        <>
          <form onSubmit={handlePasswordToken} className="login-form">
            <h3>Reset Password</h3>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              value={value}
              placeholder="Email"
              required
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleReset}>cancel</button>
        </>
      )}
    </div>
  );
}
