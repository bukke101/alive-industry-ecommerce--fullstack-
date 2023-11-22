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
      <div className="profile-wrapper">
        <div className="profile-details">
          <button onClick={handleToggleProfile}>Edit</button>
          <h3>{`${user?.first_name} ${user?.last_name}`}</h3>
          <p>{user?.email}</p>
        </div>
        {profile && (
          <form onSubmit={handleUpdateProfile}>
            <div className="profile-form">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={updateForm.first_name}
                onChange={(e) =>
                  handleInputChange("first_name", e.target.value)
                }
                placeholder="First Name"
                required
              />
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={updateForm.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                value={updateForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email"
                required
              />
              <button type="submit">Update</button>
            </div>
          </form>
        )}
      </div>
    )
  );
}
