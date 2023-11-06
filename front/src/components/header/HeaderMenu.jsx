import { NavLink } from "react-router-dom";
export default function HeaderMenu({
  handleShowNavbar,
  showNavbar,
  handleCloseNavbar,
}) {
  const activeStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="top-menu-wrapper">
      <nav
        className={`top-menu  ${showNavbar && "active"}`}
        onMouseLeave={handleCloseNavbar}
      >
        <ul>
          <li onClick={handleCloseNavbar}>
            <NavLink
              to="/products"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              PRODUCTS
            </NavLink>
          </li>
          <li onClick={handleCloseNavbar}>
            <NavLink
              to="/team"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              CREW
            </NavLink>
          </li>
          <li onClick={handleCloseNavbar}>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              ABOUT
            </NavLink>
          </li>
        </ul>
        <div className="top-menu-contact">
          <a className="email" href="mailto:info@alive-industry.com">
            info@alive-industry.com
          </a>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/aliveindustry/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCz0_-BRhwmcu4eQbWI_RxVw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-youtube-play" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/AliveIndustry/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook-square" aria-hidden="true" />
            </a>
          </div>
        </div>
      </nav>
      <div className="menu-icon">
        <div onClick={handleShowNavbar}>
          {!showNavbar ? (
            <i className="fa fa-bars" aria-hidden="true" />
          ) : (
            <i className="fa fa-times" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
