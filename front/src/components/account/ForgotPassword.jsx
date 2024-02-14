import { Input } from "../../../components/ui/input";
export default function ForgotPassword({
  value,
  onChange,
  handlePasswordToken,
}) {
  return (
    <div>
      <form onSubmit={handlePasswordToken} className="login-form">
        <h3>Reset Password</h3>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={value}
          onChange={onChange}
          className="max-w-sm"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
