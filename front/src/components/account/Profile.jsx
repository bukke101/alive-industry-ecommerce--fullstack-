import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import PasswordInput from "../../components/account/PasswordInput";
export default function Profile({
  showProfile,
  user,
  handleUpdateProfile,
  accountData,
  setAccountData,
  selectedData,
  setSelectedData,
  setPassword,
  handleUpdatePassword,
  password,
}) {
  const { updateForm } = accountData;
  const profile = selectedData?.profile;
  const updatePassword = selectedData?.password;

  const handleInputChange = (name, value) => {
    setAccountData((prevState) => ({
      ...prevState,
      updateForm: {
        ...prevState.updateForm,
        [name]: value,
      },
    }));
  };
  const handleToggleProfile = () => {
    setAccountData((prevState) => ({
      ...prevState,
      updateForm: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    }));

    setSelectedData((prevState) => ({
      ...prevState,
      profile: !profile,
      password: false,
    }));
  };

  const handleTogglePassword = () => {
    setSelectedData((prevState) => ({
      ...prevState,
      password: !updatePassword,
      profile: false,
    }));
  };

  const handlePassowrdChange = (value) => {
    setPassword(value);
  };

  return (
    showProfile && (
      <div className="flex">
        <div className="border-r px-4 py-4 w-64">
          <h3 className="font-semibold">{`${user?.first_name} ${user?.last_name}`}</h3>
          <p className="text-sm mb-1">{user?.email}</p>
          <Button onClick={handleToggleProfile} size="sm" className="w-full">
            {!profile ? "Edit Profile" : "Cancel"}
          </Button>
          <div className="mt-6">
            <Button className="w-full" size="sm" onClick={handleTogglePassword}>
              {!updatePassword ? "Edit Password" : "Cancel"}
            </Button>
            <span className="text-xs">
              password is not shown for security reasons
            </span>
          </div>
        </div>
        {profile && (
          <div className="flex rounded-lg px-4 py-4">
            <form onSubmit={handleUpdateProfile} className="w-80">
              <Label htmlFor="first">
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  value={updateForm.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                  className="mb-1"
                  required
                />
              </Label>
              <Label htmlFor="last_name">
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={updateForm.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                  className="mb-1"
                  required
                />
              </Label>
              <Label htmlFor="email">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={updateForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email"
                  className="mb-1"
                  required
                />
              </Label>
              <Button type="submit" size="sm" className="w-full">
                Update
              </Button>
            </form>
          </div>
        )}
        {updatePassword && (
          <div className="flex-col px-4 py-4 w-80">
            <form onSubmit={handleUpdatePassword}>
              <Label htmlFor="password">
                <PasswordInput
                  value={password}
                  onChange={(e) => handlePassowrdChange(e.target.value)}
                />
              </Label>
              <Button type="submit" size="sm" className="w-full">
                Update
              </Button>
            </form>
          </div>
        )}
      </div>
    )
  );
}
