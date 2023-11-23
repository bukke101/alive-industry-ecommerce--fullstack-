export default function PaymentForm({
  handlePayment,
  handleCheckout,
  paymentData,
  setPaymentData,
}) {
  const paymentSession = paymentData?.paymentSessions.map((paymentSession) => (
    <div key={paymentSession.id} className="payment-option">
      <input
        type="radio"
        id={`paymentSession-${paymentSession.id}`}
        name="paymentSession"
        value={paymentSession.id}
        onChange={() => {
          handlePayment(paymentSession.id);
          setPaymentData((prevState) => ({
            ...prevState,
            isPaymentOptionSelected: true,
          }));
        }}
      />
      <label htmlFor={`paymentSession-${paymentSession.id}`}>
        {/* Display payment session details here */}
      </label>
    </div>
  ));
  return (
    <div className="payment-options">
      <h3>Payment Methods</h3>
      <form>{paymentSession}</form>
      <p>By confirming, you agree to our Privacy Policy and Terms.</p>
      <button
        onClick={handleCheckout}
        disabled={!paymentData?.isPaymentOptionSelected}
      >
        Complete Checkout
      </button>
    </div>
  );
}
