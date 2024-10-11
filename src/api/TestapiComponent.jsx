// src/components/TestApiComponent.js

import React, { useEffect } from "react";
import tmdbApi from "./tmdbApi";
import { movieType } from "./tmdbApi"; // Adjust the path according to your file structure

const TestApiComponent = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          page: 1,
        });
        console.log(response);
      } catch (err) {
        console.error("Error fetching movies:", err.message); // Log any errors
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Check the console for API response</h1>
    </div>
  );
};

export default TestApiComponent;
