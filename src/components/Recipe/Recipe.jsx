import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import Header from '../Header';
import '../../css/index.css';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  console.log(serverUrl);

  // Fetch recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/recipes`, { withCredentials: true });
        setRecipes(response.data.meals);
      } catch (error) {
        console.log('Error fetching recipes:', error);
        setError('Failed to fetch recipes');
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className='recipes'>
      <Header />
      {error && <h2>{error}</h2>}
      <h2 style={{ textAlign: "center" }}>Explore the recipes</h2>
      <div className='section2'>
        {recipes && recipes.map((recipe) => (
          <Card 
            key={recipe.idMeal} 
            title={recipe.strMeal} 
            image={recipe.strMealThumb} 
            subtitle={recipe.strArea} 
            link={`/recipe-details/${recipe.idMeal}`} 
            button_text="Learn More" 
          />
        ))}
      </div>
    </div>
  );
}

export default Recipe;
