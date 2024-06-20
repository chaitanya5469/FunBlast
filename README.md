# Fun Blast

Welcome to Fun Blast, an engaging web application developed using React and Express for my college project. This application showcases a variety of fun and useful features including a Quiz Game, a Recipes List, a Movie Suggestor, and a Weather Dashboard. Additionally, users can view their profile, which includes their quiz scores. Dive into the details of movies and recipes through the dedicated detail pages.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [APIs Used](#apis-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Quiz Game**: Challenge yourself with a variety of quiz questions and track your scores.
- **Recipes List**: Browse a list of recipes fetched from the Meal DB API.
- **Movie Suggestor**: Get movie suggestions from the TMDB API.
- **Weather Dashboard**: Check the current weather using the Open Weather API.
- **Profile Page**: View your profile and quiz scores.
- **Movie Detail Page**: Get detailed information about a specific movie.
- **Recipe Detail Page**: Get detailed information about a specific recipe.

## Demo

Check out the demo video of Fun Blast [here](./demo.mp4).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/fun-blast.git
    cd fun-blast
    ```

2. **Install server dependencies:**
    ```sh
    cd server
    npm install
    ```

3. **Install client dependencies:**
    ```sh
    cd ../client
    npm install
    ```

4. **Set up environment variables:**
    - Create a `.env` file in the `server` directory with the following content:
        ```env
        MEAL_DB_API_KEY=your_meal_db_api_key
        TMDB_API_KEY=your_tmdb_api_key
        OPEN_WEATHER_API_KEY=your_open_weather_api_key
        ```

5. **Start the development server:**
    - In the `server` directory, run:
        ```sh
        npm start
        ```

    - In the `client` directory, run:
        ```sh
        npm start
        ```

6. **Open your browser:**
    - Navigate to `http://localhost:3000` to view the application.

## Usage

- **Quiz Game**: Navigate to the Quiz section, answer questions, and view your score on your profile page.
- **Recipes List**: Browse the recipes, click on any recipe to view its details.
- **Movie Suggestor**: Browse suggested movies, click on any movie to view its details.
- **Weather Dashboard**: Enter a city name to get the current weather.
- **Profile Page**: View your quiz scores and personal information.

## APIs Used

- **[Meal DB API](https://www.themealdb.com/api.php)**: Provides data for the Recipes List and Recipe Detail Page.
- **[TMDB API](https://www.themoviedb.org/documentation/api)**: Provides data for the Movie Suggestor and Movie Detail Page.
- **[Open Weather API](https://openweathermap.org/api)**: Provides data for the Weather Dashboard.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or feedback, feel free to contact me at chaitudec2005@gmail.com *
---

Thank you for checking out Fun Blast! Enjoy exploring the various features and have fun! 🎉