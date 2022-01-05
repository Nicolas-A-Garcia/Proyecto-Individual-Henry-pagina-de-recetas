import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from '../actions';
import { Link } from 'react-router-dom'
import "./recipedetails.css";


export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    
    
    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch, id]);
    
    
    const recipeDetails = useSelector(state => state.recipeDetails);
    
    return (
        
        <div className="details" key={id}>            
                  
            <div className="divimg">
                <img className="detailImg" 
                src={recipeDetails.image ? 
                recipeDetails.image : 
                'https://cdn7.kiwilimon.com/recetaimagen/38976/400x300/50316.jpg.webp'} alt="Pic not found"/>
            </div>

            <h1 className="texts">{recipeDetails.title}</h1>

            {recipeDetails.types ?
            <div className="ddsh">
                <h2 className="texts">Dish Type: </h2>
                {recipeDetails.types?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e}</h2>
                    )
                })}
            </div> :
            <br />
            }

            <div className="ddsh">
                <h2 className="texts">Diet Type: </h2> 
                {recipeDetails.diets ? recipeDetails.diets.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e}</h2>
                    )
                }) :
                recipeDetails.diets?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e.title}>{e.title}</h2>
                    )
                })}
            </div>
            <div className="ddsh">
                <h3 className = "text">Steps: </h3>
                <p className='steps'>{recipeDetails.steps?.replace(/<[^>]*>/g, '')}</p>
                </div>
            <div className="ddsh">
                <h3 className="texts">Summary: </h3>
                <p className="summary">{recipeDetails.dishSummary?.replace(/<[^>]*>/g, '')}</p> 
            </div>
            
            <div className="ddsh">
                <h3 className="scores">Score: {recipeDetails.score}</h3>
                <h3 className="scores">Healthiness points: {recipeDetails.healthyFoodLevel}</h3>
            </div>   
            
            <Link to="/home">
                <button className="backButton">Go back to recipes</button>
            </Link>
            
        </div>

    )      
        
}