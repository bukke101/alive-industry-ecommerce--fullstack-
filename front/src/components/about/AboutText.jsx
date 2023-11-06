import { Link } from "react-router-dom";
export default function AboutText() {
  return (
    <div className="about-page">
      <h3>About Alive Industry,</h3>
      <p>
        On 1st of January 2012, “Alive Industry” was started up by Rehito
        Murata, Yugo Ito,
        <br />
        and Maja Daisuke to make the Japanese BMX street scene bigger and
        better. <br />
        First of all we thought we need to make a domestic Japanese BMX brand
        and represent the
        <br />
        greatest riders that we know and think. <br />
        And to make products that we really want to ride and feel cool. <br />
        Japan BMX scene is a huge scene that lots of people doesn’t notice yet
        but also has a long history
        <br />
        and we are all proud of it.
        <br />
        The problem that we thought was the world doesn’t know about this
        because there was no <br />
        brands from Japan and no one could represent this to the world.
        <br />
        The good thing was after we started the brand in 2012, SNS gave us a
        chance to let
        <br />
        people know about what’s going on in Japan. <br />
        These days lots of riders from Japan is known through the internet and
        this made <br />
        us make the team bigger. <br />
        And now our team is getting bigger with the best friends who has the
        same mind
        <br />
        from all over the world.
      </p>
      <ul>
        <li>
          <Link>shippings & returns</Link>

          <Link>terms & condition</Link>

          <Link>privacy policy</Link>
        </li>
      </ul>
      <ul>
        <li>
          <i className="fa fa-envelope" aria-hidden="true" />{" "}
          <a href="mailto:info@alive-industry.com">info@alive-industry.com</a>
        </li>
      </ul>
    </div>
  );
}
