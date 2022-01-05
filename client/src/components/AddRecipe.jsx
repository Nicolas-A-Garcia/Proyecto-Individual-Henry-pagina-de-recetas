import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from '../actions/index'
import './addrecipe.css';


function validate(input) {
    const errors = {};
    if (!input.title) errors.name = 'Please complete with a recipe name';
    if (!input.dishSummary) errors.summary = 'Please add some comments about your recipe';
    if (input.score < 1 || input.score > 100) errors.score = 'The score must be a number between 1 and 100';
    if (input.healthyFoodLevel < 1 || input.healthyFoodLevel > 100) errors.healthScore = 'The score must be a number between 1 and 100';
    if (!input.steps.length) errors.steps = 'Please detail the steps for your recipe';
    if (!input.dietTypes.length) errors.dietTypes = 'You must select at least one diet type';
    return errors;
};


export default function AddRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        title: ''  ,
        dishSummary: '',
        score: '',
        healthyFoodLevel: '',
        steps: '',
        dietTypes: []
    })
    
    useEffect(() => {
        dispatch(getDietTypes());
    }, [dispatch]);

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {   //// de esta manera el componente muestra los cambios (componentdidupdate?) para poder ir validando
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
            return newInput
        });

    };
    
    function handleCheckBox(e) {
       
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            dietTypes: newArray
        });
        const validations = validate(input);
        setErrors(validations)
        
    }
    
    function handleSubmit(e) {
         e.preventDefault();

         if (Object.values(errors).length > 0) {
             alert(Object.values(errors))
             alert("Please complete the information required");
         } else if (
            input.title === '' && 
            input.dishSummary === '' && 
            input.score === '' &&
            input.healthyFoodLevel === '' &&
            input.steps === '' &&
            !input.dietTypes.length) {
            alert("Please complete the form");}
        else {
            addRecipe(input);
            alert('New recipe added successfully!')
            setInput({
                title: "",
                dishSummary: '',
                score: '',
                healthyFoodLevel: '',
                steps: [],
                dietTypes: []
            });
            history.push('/home')
        }
    };
    
    
    return (
        <div className="addRecipe">
            <h1 className="msg">Create new recipe</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form">
                    <div className="nameInput">
                        <label className="msgs">Title:</label>
                        <input name="title" type="text" value={input.title} onChange={e => handleChange(e)}/>
                        {errors.name && (
                            <div className="errors">{errors.name}</div>
                            )}
                            </div>
                    <div className="nameInput">
                        <label className="msgs">Summary:</label>
                        <textarea name="dishSummary" type="text" rows="4" cols="30" value={input.dishSummary} onChange={e => handleChange(e)}/>
                        {errors.summary && (
                            <span className="errors">{errors.summary}</span>
                        )}
                    </div>
                    <div className="nameInput">
                        <label className="msgs">Score:</label>
                        <input name="score" type="number" value={input.score} onChange={e => handleChange(e)}/>
                        {errors.score && (
                            <span className="errors">{errors.score}</span>
                        )}
                    </div>
                    <div className="nameInput">
                        <label className="msgs">Health Score:</label>
                        <input name="healthyFoodLevel" type="number" value={input.healthyFoodLevel} onChange={e => handleChange(e)}/>
                        {errors.healthScore && (
                            <span className="errors">{errors.healthScore}</span>
                        )}
                    </div>
                    <div className="nameInput">
                        <label className="msgs">Steps:</label>
                        <textarea name="steps" type="text" rows="4" cols="40" value={input.steps} onChange={e => handleChange(e)}/>
                        {errors.steps && (
                            <span className="errors">{errors.steps}</span>
                        )}
                    </div>
                    <div className="checkSelect">
                        <label className="msgs">Diet Types:</label>
                        {dietTypes.map(d =>{
                            return (
                                <div key={d} className="checks">
                                    <label className="dietTypes">{d}</label>
                                    <input className="checks" type="checkbox" name={d} value={d} selected={input.dietTypes.includes(d)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        {errors.dietTypes && (
                            <span className="errors">{errors.dietTypes}</span>
                        )}
                    </div>
                </div>
                <button className="submitButton" type="submit">Submit Recipe</button>
                <Link to="/home"><button className="goBackButton">Go back</button></Link>
            </form>
        </div>



    )

};