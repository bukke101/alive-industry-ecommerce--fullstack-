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
          shippings & returns || terms & condition || privacy policy || ©{year}
        </p>
      </div>
    </div>
  );
}
