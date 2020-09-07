import React from 'react';
import Styles from './RecipeSheet.module.css';
import CheckBox from '../interactiveItems/CheckBox.js';

const RecipeSheet = ({RecipeName, cookTime, prepTime, ingredients, tools, directions}) =>{
    let ingredientsList = [];
    for(let i = 0; i < ((ingredients.length%2===0)? ingredients.length:ingredients.length-1); i+=2){
        ingredientsList.push(
            <div className={Styles.ingredientBlock} key={i/2}>
                <CheckBox />
                <p>{ingredients[i]}</p>
                <br/>
                <CheckBox />
                <p>{ingredients[i+1]}</p>
            </div>
        );
    }
    if(ingredients.length %2===1){
        ingredientsList.push(
            <div className={Styles.ingredientBlock} key={(ingredients.length/2)+1}>
                <CheckBox />
                <p>{ingredients[ingredients.length-1]}</p>
            </div>
        );
    }
    return(
        <div className={Styles.sheetWrapper}>
            <div className={Styles.header}>
                <h1>{RecipeName}</h1>
                <p>{prepTime+cookTime} Minutes</p>
            </div>
            <div className={Styles.times}>
                <p>Prep Time: {prepTime} Minutes</p>
                <p>Cook Time: {cookTime} Minutes</p>
            </div>
            <h2>Ingredients</h2>
            <div className={Styles.ingredients}>
                {ingredientsList}
            </div>
            <h2>Tools</h2>
            <div className={Styles.tools}>
                {tools.map(tool =>
                    <div key={tool} >
                        <li><span>{tool}</span></li>
                    </div>
                )}
            </div>
            <br/>
            <hr />
            <h1>Directions</h1>
            <div>
                {directions.map((step, index) =>
                    <div className={Styles.step} key={`step_${index}`} >
                        <h2>Step {index + 1}</h2>
                        <CheckBox />
                        <p>{step}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeSheet;