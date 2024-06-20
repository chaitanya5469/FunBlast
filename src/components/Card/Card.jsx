import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card(props) {
  // State to manage hover effect
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  // Inline styles for hover effects
  let display_style = { display: hover ? "block" : "none" };
  let img_style = { opacity: hover ? 0.4 : 1 };

  return (
    <div
      className="card"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(props.link)}
    >
      {/* Image with hover effect */}
      <img src={props.image} alt={props.title} style={img_style} />
      
      {/* Title and subtitle */}
      <h2>{props.title}</h2>
      <h4>{props.subtitle}</h4>
      
      {/* Button displayed on hover */}
      <div className="play" style={display_style}>
        <button>{props.button_text}</button>
      </div>
    </div>
  );
}

export default Card;
