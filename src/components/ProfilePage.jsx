import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/ProfilePage.css';
import Header from './Header';
import { format } from 'date-fns';
import Button from './Button/Button';
import { useAuth } from '../AuthContext';

function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    // Redirect to home if the user is not logged in
    if (!isLoggedIn) {
      console.log('User is not logged in, navigating to home');
      navigate("/");
      return;
    }

    // Fetch user details
    fetch(`http://localhost:5000/user/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));

    // Fetch quizzes
    fetch(`http://localhost:5000/user/${id}/quizzes`)
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, [id, isLoggedIn, navigate]);

  
  const handleLogout = async () => {
    try {
      console.log('Logging out user from ProfilePage'); // Add this log
      await logout();
      console.log('User logged out, navigating to home'); // Add this log
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.dp} alt={`${user.name}'s profile`} className="profile-picture" />
          <h3>{user.name && user.name.toUpperCase()}</h3>
          <h1>{user.email}</h1>
        </div>
        <div className="profile-quizzes">
          <h2>Quizzes Played</h2>
          <ul>
            {quizzes.map((quiz, index) => (
              <li key={index}>
                <span className="quiz-name">{quiz.category}</span>
                <span className="quiz-score">{quiz.score}/10</span>
                <span>{format(new Date(quiz.quiz_time), 'PPpp')}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }} onClick={handleLogout}>
          <Button text="Log Out" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
