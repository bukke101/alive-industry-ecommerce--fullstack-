import { NavLink } from "react-router-dom";
export default function FooterMenu() {
  const activeStyle = {
    textDecoration: "overline",
  };
  return (
    <div className="bottom-menu">
      <div className="bottom-contact">
        <li>
          <a href="mailto:info@alive-industry.com">info@alive-industry.com</a>
        </li>
      </div>
      <div>
        <ul>
          <li>
            <NavLink
              to="/team"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Crew
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bottom-contact">
        <li>
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
        </li>
      </div>
    </div>
  );
}
