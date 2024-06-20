import React from "react";
import BoltIcon from '@mui/icons-material/Bolt';
import Button from "./Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Header(props) {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header>
      {/* Main heading with icon */}
      <h1><BoltIcon /> Fun Blast</h1>
      <div className="nav">
        {/* Social media links */}
        <div>
          <a href="https://www.instagram.com/chiyan_chaitu/" className="fa fa-instagram"></a>
          <a href="https://www.twitter.com/2005Chaitu" className="fa fa-twitter"></a>
          <a href="http://www.linkedin.com/in/chaitanya-krishna-8422622a2" className="fa fa-linkedin"></a>
          <a href="https://github.com/chaitanya5469" className="fa fa-github"></a>
        </div>

        {/* Sign up button or user profile picture */}
        <div onClick={() => navigate("/login")}>
          {!isLoggedIn && <Button text="SIGN UP" />}
        </div>
        {isLoggedIn && <img id="dp" src={user.dp} alt={user.name} onClick={() => navigate(`/profile/${user.id}`)} />}
      </div>
    </header>
  );
}

export default Header;
