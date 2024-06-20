import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Quiz from './components/quiz/quiz';
import Login from "./components/SignUp/Login"
import { AuthProvider } from './AuthContext.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipe from "./components/Recipe/Recipe.jsx";
import RecipeDetail from './components/Recipe/RecipeDetail.jsx';
import Movies from './components/Movie/Movies.jsx'
import MovieDetail from './components/Movie/MovieDetail.jsx';
import Weather from './components/Weather/Weather.jsx';
import ProfilePage from './components/ProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
<Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/recipe' element={<Recipe/>}/>
      <Route path="/recipe-details/:id" element={<RecipeDetail />} />
      <Route path="/movie-details/:id" element={<MovieDetail />} />
      <Route path="/profile/:id" element={<ProfilePage/>} />
      <Route path="/movie" element={<Movies />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  </Router>
  </AuthProvider>


    
 
);

reportWebVitals();
