import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => setShowNavbar(!showNavbar);

  const handleCloseNavbar = () => {
    if (showNavbar) handleShowNavbar();
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img
            src="../src/assets/images/logo.png"
            width="120px"
            alt="site-logo"
          />
        </Link>
      </div>
      <HeaderMenu
        handleShowNavbar={handleShowNavbar}
        showNavbar={showNavbar}
        handleCloseNavbar={handleCloseNavbar}
      />
    </header>
  );
}
