import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Home() {
  return (
    <>
      <div className="home-page">
        <Link to="/products">
          <div className="home-col1">
            <div className="typewriter">
              <h3>F.T.W Frame</h3>
              <p>&quot;redesigned from the Badlands frame&quot;</p>
            </div>
          </div>
        </Link>

        <div className="home-col2">
          <img src="https://img.youtube.com/vi/pM51dEgN-MQ/0.jpg" />
          <img src="https://img.youtube.com/vi/2RhL6BcoKRA/0.jpg" />
        </div>
        <Link to="/products">
          <div className="home-col3">
            <img src="../src/assets/images/ALIVE INDUSTRY - Brave Forks2-1.jpg" />
            <div className="typewriter">
              <h3>BRAVE FORKS</h3>
              <p>&quot;designed for riders who hate big mouth forks&quot;</p>
            </div>
            <img src="../src/assets/images/ALIVE INDUSTRY - Brave Forks1-1.jpg" />
          </div>
        </Link>
      </div>
    </>
  );
}
