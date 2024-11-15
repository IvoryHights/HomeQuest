import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`#`} className="imageContainer">
        <img src={item.images} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`#`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="location pin" />
          <span>{item.address}</span>
        </p>
        <p className="price">${item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="bed" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="bath" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="save" />
            </div>
            <a href="tel:+233577754899" className="icon">
              <img src="/chat.png" alt="chat" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
