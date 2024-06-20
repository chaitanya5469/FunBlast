import quiz from './images/quiz.png';
import recipe_img from './images/recipe.jpg';
import movie_img from './images/movie.png';
import weather_img from './images/weather.jpeg';
import './App.css';
import Header from './components/Header';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import About from './components/About/About';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="App">
      {/* Section 1: Header and headline */}
      <div className="section1">
        <Header />
        <div className='headline'>
          <h2><b>Fun Blast</b></h2>
          <h4>Enjoy and Explore...</h4>
          <div className="submit-2" onClick={() => navigate("/login")}>
            {!isLoggedIn && <Button text="SIGN UP" />}
          </div>
        </div>
      </div>

      {/* Section 2: Cards for different categories */}
      <div className='section2'>
        <Card image={quiz} title="Quiz" subtitle="Test your Knowledge" button_text="PLAY" link="/quiz" />
        <Card image={recipe_img} title="Recipes" subtitle="Explore the recipes" button_text="YUMMY" link="/recipe" />
        <Card image={movie_img} title="Movies" subtitle="Explore the Films" button_text="BINGE" link="/movie" />
        <Card image={weather_img} title="Weather" subtitle="Dive into Weather Stats" button_text="TOO HUMID" link="/weather" />
      </div>

      {/* About and Footer sections */}
      <About />
      <Footer />
    </div>
  );
}

export default App;
