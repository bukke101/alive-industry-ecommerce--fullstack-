import { Link } from "react-router-dom";
import FooterMenu from "./FooterMenu";
import FooterStoreNav from "./FooterStoreNav";
export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <div className="footer-wrapper">
      <FooterStoreNav />
      <FooterMenu />
      <div className="footer">
        <p>
          <Link to="/privacy-policy">shippings & returns</Link> ||{" "}
          <Link to="/privacy-policy">terms & condition</Link> ||{" "}
          <Link to="/privacy-policy">privacy policy</Link> || ©{year}
        </p>
      </div>
    </div>
  );
}
