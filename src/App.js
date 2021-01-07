import React, { useEffect, useState } from "react";
// Components
import Recipe from "./Recipe";
// Styling
import "./App.css";
// Images
import backgroundImage from "./img/pexels-lukas-952478.jpg";
import happyChef from "./img/happy_little_chef.png";
// Framer Motion
import { motion } from "framer-motion";
import {
  titleAnimation,
  fade,
  photoAnimation,
  pageAnimation,
  searchBarAnimation,
  iconAnimation,
  container,
} from "./animation";

const App = () => {
  const APP_ID = "5eca7322";
  const APP_KEY = "37174276c2f985c2bc150983ba68da8e";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [appHeight, setAppHeight] = useState(null);

  useEffect(() => {
    getRecipes();
  }, [query]);

  useEffect(() => {
    const appBodyHeight = document.querySelectorAll(".app-body")[0]
      .offsetHeight;

    setAppHeight(appBodyHeight);
  }, [recipes]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <motion.div
      className="App"
      style={{ height: `${appHeight}px` }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="background"
        style={{ height: `${appHeight}px` }}
        variants={container}
      >
        <img
          src={backgroundImage}
          alt="chopping board"
          style={{ height: `${appHeight + 20}px` }}
        />
        <motion.img
          className="happy-chef"
          src={happyChef}
          alt="happy chef"
          variants={iconAnimation}
        />
      </motion.div>
      <motion.div className="app-body" variants={container}>
        <motion.h1 variants={titleAnimation} initial="hidden" animate="show">
          Kumi's kitchen
        </motion.h1>
        <motion.form
          className="search-form"
          onSubmit={getSearch}
          variants={searchBarAnimation}
          // initial="hidden"
          // animate="show"
        >
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </motion.form>
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
              query={query}
              title={recipe.recipe.label}
              serves={recipe.recipe.yield}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              shareAs={recipe.recipe.shareAs}
              time={recipe.recipe.totalTime}
              key={recipe.recipe.label}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;
