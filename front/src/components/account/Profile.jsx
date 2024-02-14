import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import PasswordInput from "../../components/account/PasswordInput";
export default function Profile({
  showProfile,
  user,
  handleUpdateProfile,
  accountData,
  setAccountData,
  selectedData,
  setSelectedData,
}) {
  const { updateForm } = accountData;
  const profile = selectedData?.profile;

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
    }));
  };

  return (
    showProfile && (
      <div className="flex">
        <div className="border-r px-4 py-4">
          <h3 className="font-semibold">{`${user?.first_name} ${user?.last_name}`}</h3>
          <p className="text-sm mb-1">{user?.email}</p>
          <Button onClick={handleToggleProfile} size="sm" className="w-full">
            {!profile ? "Edit" : "Cancel"}
          </Button>
        </div>
        {profile && (
          <div className="flex-col rounded-lg w-21 items-center justify-center px-8 py-4 text-center">
            <form onSubmit={handleUpdateProfile}>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={updateForm.first_name}
                onChange={(e) =>
                  handleInputChange("first_name", e.target.value)
                }
                className="max-w-sm mb-1"
                required
              />
              <Input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={updateForm.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                className="max-w-sm mb-1"
                required
              />
              <Input
                type="email"
                id="email"
                name="email"
                value={updateForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email"
                className="max-w-sm mb-1"
                required
              />
              <PasswordInput
                value={""}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
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
