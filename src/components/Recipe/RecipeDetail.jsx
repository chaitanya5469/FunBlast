import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import './RecipeDetails.css';

const RecipeDetail = () => {
  const { id } = useParams();  // Get the recipe ID from the URL parameters
  const navigate = useNavigate();  // Hook to navigate programmatically
  const [recipe, setRecipe] = useState(null);  // State to store recipe details
  const [error, setError] = useState(null);  // State to store error message

  // Fetch recipe details from the API
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/recipes/${id}`);
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching recipe details:', error.message);
        setError('Failed to fetch recipe details');
      }
    };

    fetchRecipe();
  }, [id]);

  // Function to split instructions into steps
  const getSteps = (instructions) => {
    return instructions.split('\r\n').filter(step => step.trim() !== '');
  };

  return (
    <div className='recipe-body'>
      <Header />
      <div className="recipe-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        {error && <p>{error}</p>}
        {recipe && (
          <div className="recipe-detail">
            <h1 className="recipe-title">{recipe.strMeal}</h1>
            <img className="recipe-image" src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>Instructions</h3>
            <div className="steps">
              {getSteps(recipe.strInstructions).map((step, index) => (
                <div key={index} className="step">{step}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default RecipeDetail;
