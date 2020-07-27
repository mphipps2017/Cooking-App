import React from 'react';
import Styles from './RecipeSheet.module.css';

const RecipeSheet = ({RecipeName, cookTime, prepTime}) =>{
    return(
        <div>
            <div className="header">
                <h1>{RecipeName}</h1>
                <p>{prepTime+cookTime} Minutes</p>
            </div>
            <div className="ingredients">
                // TODO
            </div>

        </div>
    );
}

export default RecipeSheet;