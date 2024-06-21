import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Header from '../Header';
import Card from '../Card/Card';
import './MovieDetail.css';

const Movies = () => {
  // State to store categories, selected category, and movies
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [movies, setMovies] = useState([]);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories`);
      const categoryOptions = response.data.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch movies based on the selected category
  const fetchMovies = async (category) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/movies`, {
        params: { category },
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch movies when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchMovies(selectedCategory.value);
    }
  }, [selectedCategory]);

  return (
    <div style={{ backgroundColor: "black" }}>
      <Header />
      <h2 style={{ textAlign: "center" }}>Movie Categories</h2>
      <Select
        className='select1'
        options={categories}
        onChange={setSelectedCategory}
        value={selectedCategory}
        placeholder="Select a category"
      />
      <div className='section2'>
        {movies.map((movie) => (
          <Card 
            key={movie.id} 
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            title={movie.title} 
            subtitle="" 
            button_text="BINGE" 
            link={`/movie-details/${movie.id}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
