import React from "react";
import Header from "../Header";
import "../../css/quiz.css";
import GoogleButton from "react-google-button";

function App() {
  return (
    <div className="body">
      <Header />
      <div className='headline'>
        <h2><b>JOIN US</b></h2>
        <h4>So that we can remember you</h4>
        <div className="google">
          <GoogleButton
            onClick={() => {
              window.location.href = 'http://localhost:5000/auth/google';
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
