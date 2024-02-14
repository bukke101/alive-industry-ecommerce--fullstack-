import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
export default function ForgotPassword({
  value,
  onChange,
  toggle,
  handlePasswordToken,
}) {
  return (
    <>
      <form className="w-full" onSubmit={handlePasswordToken}>
        <h3 className="text-xl font-semibold py-10">Reset Password</h3>
        <h4 className="text-sm tracking-tight pb-4">
          Enter your account email and follow the instructions sent to your
          email.
        </h4>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={value}
          onChange={onChange}
          className="max-w-sm mb-1"
          required
        />
        <Button type="submit" size="sm" className="w-full">
          Submit
        </Button>
      </form>
      <div className="flex justify-end text-xs py-2">
        <span className="cursor-pointer hover:underline" onClick={toggle}>
          Back to login
        </span>
      </div>
    </>
  );
}
