import ShippingForm from "./ShippingForm";
export default function Addresses({
  showShipping,
  user,
  handleDeleteAddress,
  handleUpdateAddress,
  accountData,
  setAccountData,
  handleShippingAddress,
  regions,
  selectedData,
  setSelectedData,
}) {
  const shippingAdresses =
    user?.shipping_addresses &&
    user.shipping_addresses.map((address) => {
      return (
        <div key={address.id}>
          <p>{`${address.first_name}  ${address.last_name}`}</p>
          <p>{address.address_1}</p>
          <p>{`${address.postal_code}, ${address.city}`}</p>
          <p>{`${address.province}, ${address.country_code}`}</p>
          <button onClick={() => handleUpdateAddress(address)}>edit</button>
          <button onClick={() => handleDeleteAddress(address.id)}>
            remove
          </button>
        </div>
      );
    });
  return (
    showShipping && (
      <div className="address-wrapper">
        <div className="address-shipping-wrapper">
          <h3>Shipping Addresses</h3>
          {shippingAdresses}
        </div>
        <div className="address-form-wrapper">
          <h3>
            {selectedData?.selectedAddress ? "Edit Address" : "Add Address"}
          </h3>
          <ShippingForm
            showShipping={showShipping}
            accountData={accountData}
            setAccountData={setAccountData}
            handleShippingAddress={handleShippingAddress}
            user={user}
            handleDeleteAddress={handleDeleteAddress}
            handleUpdateAddress={handleUpdateAddress}
            regions={regions}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        </div>
      </div>
    )
  );
}
