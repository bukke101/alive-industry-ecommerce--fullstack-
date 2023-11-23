export default function ShippingAddress({
  shippingData,
  cartData,
  setShippingData,
}) {
  const toggleUpdateAddress = () => {
    setShippingData((prevState) => ({
      ...prevState,
      isAddress: false,
    }));
  };
  const selectedAddress = shippingData.isAddress &&
    cartData.shipping_address && (
      <div className="selected-address-wrapper">
        <div className="selected-address">
          <p>{`${cartData.shipping_address.first_name} ${cartData.shipping_address.last_name}`}</p>
          <p>{cartData.email}</p>
          <p>{cartData.shipping_address.address_1}</p>
          <p>{cartData.shipping_address.address_2}</p>
          <p>{`${cartData.shipping_address.postal_code}, ${cartData.shipping_address.city}`}</p>
          <p>{`${cartData.shipping_address.province}, ${cartData.shipping_address.country_code}`}</p>
        </div>
        <div className="edit">
          <button onClick={toggleUpdateAddress}>Edit</button>
        </div>
      </div>
    );
  return selectedAddress;
}
