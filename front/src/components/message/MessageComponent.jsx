import { useState } from "react";
export default function MessageComponent() {
  const [message, setMessage] = useState({
    productMessage: null,
    cartMessage: null,
    discountMessage: null,
  });

  return <div className="display-msg">{message}</div>;
}
