import React, { useEffect } from "react";
import Header from "../Header";
import "../../css/quiz.css";
import GoogleButton from "react-google-button";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const navigate=useNavigate();
  useEffect(() => {
    // Redirect to home if the user is not logged in
    if (isLoggedIn) {
      console.log('User is not logged in, navigating to home');
      navigate("/");
      return;
    }
  });


  return (
    <div className="body">
      <Header />
      <div className='headline'>
        <h2><b>JOIN US</b></h2>
        <h4>So that we can remember you</h4>
        <div className="google">
          <GoogleButton
            onClick={() => {
              window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
