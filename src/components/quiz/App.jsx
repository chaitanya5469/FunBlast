import React, { useState } from "react";
import Header from "../Header";
import "../../css/quiz.css";
import Select from "react-select";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import right from "../../images/right.png";
import wrong from "../../images/wrong.png";

// Options for quiz categories
const options = [
    { value: "9", label: "General Knowledge" },
    { value: "10", label: "Books" },
    { value: "11", label: "Films" },
    { value: "12", label: "Music" },
    { value: "13", label: "Musicals and Theatres" },
    { value: "14", label: "Television" },
    { value: "15", label: "Video Games" },
    { value: "16", label: "Board Games" },
    { value: "17", label: "Science and Nature" },
    { value: "18", label: "Computers" },
    { value: "19", label: "Mathematics" },
    { value: "20", label: "Mythology" },
    { value: "21", label: "Sports" },
    { value: "22", label: "Geography" },
    { value: "23", label: "History" },
    { value: "24", label: "Politics" },
    { value: "25", label: "Art" },
    { value: "26", label: "Celebrities" },
    { value: "27", label: "Animals" },
    { value: "28", label: "Vehicles" },
    { value: "29", label: "Comics" },
    { value: "30", label: "Gadgets" },
    { value: "31", label: "Anime" },
    { value: "32", label: "Cartoons" },
];

function App() {
  // State variables
  const [categoryID, setValue] = useState("");
  const [quizStarted, startQuiz] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [revisit, setRevisit] = useState(false);

  // Fetch quiz questions from the API
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setScore(0);
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryID}&type=multiple`);
      setQuestions(response.data.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentIndex]: e.target.value,
    });
  };

  // Navigate to the next question
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Navigate to the previous question
  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
    
    // If the user is logged in, upload the score
    if (user != null) {
      try {
        await axios.post('http://localhost:5000/submit-quiz', {
          user_id: user.id,
          score: newScore,
          category: options[categoryID - 9].label
        });
        console.log('Score uploaded successfully');
      } catch (error) {
        console.error('Error uploading score:', error);
      }
    }
    setCurrentIndex(0);
  };

  const currentQuestion = questions[currentIndex];

  return quizStarted ? (
    <div className="quiz-game">
      {loading && <div className="loading"><CircularProgress /></div>}
      {error && <h4>Error: {error.message}</h4>}
      {!loading && !submitted && (
        <div>
          {revisit && <img src={userAnswers[currentIndex] === currentQuestion.correct_answer ? right : wrong} alt="result" />}
          <h4 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h4>
          <div className="option-container">
            {
              currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort().map((answer, index) => (
                <div key={index} className="quiz-option">
                  <input
                    id={`option-${index}`}
                    type="radio"
                    name={`question-${currentIndex}`}
                    value={answer}
                    checked={userAnswers[currentIndex] === answer}
                    onChange={handleAnswerChange}
                    disabled={revisit}
                  />
                  <label htmlFor={`option-${index}`} className={`option ${revisit && answer === currentQuestion.correct_answer ? 'correct' : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                  </label>
                </div>
              ))
            }
          </div>
          <button className="prev" onClick={handlePreviousQuestion} disabled={currentIndex === 0}>
            {"<"}
          </button>
          <button className="next" onClick={handleNextQuestion} disabled={currentIndex === questions.length - 1}>
            {">"}
          </button>
          {currentIndex === questions.length - 1 && !revisit && (
            <button id="submit" onClick={handleSubmit}>
              Submit
            </button>
          )}
          {revisit && (
            <button className="home" onClick={() => { window.location.href = "/" }}>
              Go to Home
            </button>
          )}
        </div>
      )}
      {submitted && !revisit && (
        <div>
          <h4>Results <br />Your score: {score} out of {questions.length}</h4>
          <button id="check" onClick={() => { setRevisit(true); setSubmitted(false) }}>
            Check answers
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="body">
      <Header />
      <div className="container">
        <h2>Select a Category</h2>
        <Select
          options={options}
          className='select'
          onChange={(option) => {
            setValue(option.value);
          }}
        />
        {isLoggedIn ? (
          <button onClick={() => {
            startQuiz(true);
            fetchQuestions();
          }}>PLAY</button>
        ) : (
          <button onClick={() => {
            startQuiz(true);
            fetchQuestions();
          }}>PLAY ANONYMOUSLY</button>
        )}
      </div>
    </div>
  );
}

export default App;
