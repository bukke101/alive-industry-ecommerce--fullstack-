import ShippingForm from "./ShippingForm";
export default function Addresses({
  showShipping,
  user,
  handleDeleteAddress,
  handleUpdateAddress,
  shippingAddress,
  handleShippingAddress,
  regions,
  setShippingAddress,
  selectedAddress,
  setSelectedAddress,
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
          <h3>{selectedAddress ? "Edit Address" : "Add Address"}</h3>
          <ShippingForm
            showShipping={showShipping}
            shippingAddress={shippingAddress}
            handleShippingAddress={handleShippingAddress}
            user={user}
            handleDeleteAddress={handleDeleteAddress}
            handleUpdateAddress={handleUpdateAddress}
            regions={regions}
            setShippingAddress={setShippingAddress}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </div>
      </div>
    )
  );
}
