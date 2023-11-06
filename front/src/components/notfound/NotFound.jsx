import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h4>
        page not found. <Link to="/">go home </Link>
      </h4>
    </div>
  );
}
