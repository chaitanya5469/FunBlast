import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();  // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null);  // State to store movie details
  const [error, setError] = useState(null);  // State to store error message
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Function to fetch movie details
  const fetchMovie = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5000/movie/${movieId}`);
      setMovie(response.data);
    } catch (error) {
      console.log('Error fetching movie details:', error);
      setError("Failed to fetch: " + error.message);
    }
  };

  // Fetch movie details on component mount and when the ID changes
  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <div className='movie-body'>
      <Header />
      <div className="movie-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        {error && <p>{error}</p>}
        {movie && (
          <div className="movie-detail">
            <h1 className="movie-title">{movie.title}</h1>
            <img 
              className="movie-image" 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
            <h3>Release Date: {movie.release_date}</h3>
            <h3>Rating: {movie.vote_average}</h3>
            <p>{movie.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
