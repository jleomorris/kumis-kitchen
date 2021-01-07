import React from "react";
import style from "./recipe.module.css";
// Framer motion
import { motion } from "framer-motion";
import { titleAnimation, recipeAnimation } from "./animation";

const Recipe = ({
  title,
  calories,
  image,
  ingredients,
  shareAs,
  serves,
  query,
  time,
}) => {
  return (
    <motion.div className={style.recipe} variants={recipeAnimation}>
      <div className={style.banner}>
        <img className={style.image} src={image} alt="" />
        <p>{query} Recipes</p>
      </div>
      <div className={style.titleSection}>
        <h2 className="title">{title}</h2>
        <p>Serves: {serves} </p>
        <p>Total time: {time} min</p>
      </div>
      <div className={style.ingredientsSection}>
        <h2>Ingredients</h2>
        <ul className={style.ingredients}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Recipe;
