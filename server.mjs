import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import passport from "passport";
import session from "express-session";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2";
import cors from "cors";
import axios from "axios";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// Initialize express app
const app = express();
const port = 7000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL="https://api.openweathermap.org/data/2.5";
// Load environment variables from .env file
env.config();



// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_DATABASE_URL; // Replace with your Supabase URL
const supabaseKey=process.env.SUPABASE_KEY; // Replace with your Supabase service key
const supabase = createClient(supabaseUrl, supabaseKey);




// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CLIENT_URL, // Adjust this to your React app's URL
  credentials: true, // Enable credentials for CORS
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: false,
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// PostgreSQL database connection
//const db = new pg.Client({
//user: process.env.PG_USER,
//host: process.env.PG_HOST,
//database: process.env.PG_DATABASE,
//password: process.env.PG_PASSWORD,
//port: process.env.PG_PORT,
//});
//db.connect();

// Logout endpoint
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send({ error: err.message });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).send({ message: 'Logout successful' });
  });
});

// Redirect to login page
app.get("/login", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/login`);
});

// Google OAuth authentication
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

app.get("/auth/google/login",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home
    console.log("Redirecting to home");
  res.redirect(`${process.env.CLIENT_URL}`);
 
  }
);

// Weather API endpoint
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send({ error: 'City is required' });
  }

  try {
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: process.env.OPEN_WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const { lat, lon } = currentResponse.data.coord;

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: process.env.OPEN_WEATHER_API_KEY,
        units: 'metric'
      }
    });

    res.json({ current: currentResponse.data, forecast: forecastResponse.data });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).send({ error: 'No response received from the API' });
    } else {
      res.status(500).send({ error: 'Error setting up API request' });
    }
  }
});

// Check authentication status
app.get("/check-auth", (req, res) => {
  console.log("check-auth");
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: req.user,
    });
  } else {
    res.json({
      authenticated: false,
      user: null,
    });
  }
});

// Fetch all recipes
app.get('/recipes', async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    res.json(response.data);
  } catch (error) {
    console.log('Error fetching recipes:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// Fetch recipe details by ID
app.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).json({ message: 'Error fetching recipe details' });
  }
});

// Submit quiz results
app.post('/submit-quiz', async (req, res) => {
  const { user_id, score, category } = req.body;

  try {
    const { data, error } = await supabase
      .from('quizzes')
      .insert([{ user_id, score, quiz_time: new Date().toISOString(), category }])
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error inserting quiz score:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch movies by category
app.get('/movies', async (req, res) => {
  const category = req.query.category;
  try {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        with_genres: category,
      },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch movie categories
app.get('/categories', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/genre/movie/list?language=en`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
    res.json(response.data.genres);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Fetch movie details by ID
app.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch user details by ID
app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, dp')
      .eq('id', id);

    if (error) {
      throw error;
    }

    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch quizzes by user ID
app.get('/user/:id/quizzes', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('quizzes')
      .select('quiz_time, score, category')
      .eq('user_id', id);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching quizzes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Google OAuth strategy
passport.use("google", new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.REACT_APP_SERVER_URL}/auth/google/login`,
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
}, async (accessToken, refreshToken, profile, cb) => {
  console.log('Response: ' + JSON.stringify(profile));
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select()
      .eq('email',  profile.emails[0].value);
      console.log("Data Uploaded")

    if (error) {
      console.log(error.message);
    
    }

    if (users.length === 0) {
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({ email: profile.emails[0].value, password: "google", name: profile.given_name, dp: profile.picture })
        .single();

      if (insertError) {
        console.log(insertError.message);
      }

      return cb(null, newUser);
    } else {
      return cb(null, users[0]);
    }
  } catch (err) {
    return cb(err);
  }

}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
// Catch all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
