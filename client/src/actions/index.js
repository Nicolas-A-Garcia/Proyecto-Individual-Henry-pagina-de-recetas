import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAILS, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE, GET_DIET_TYPES, LOCAL_HOST } from './types';

export function getRecipes() {
    return async function(dispatch) {
        try {            
            var response = await axios.get(`${LOCAL_HOST}/recipes`);
           const payload = response.data.map((e) => {
                if(e.hasOwnProperty('diets')){
                    return e;
                }else {
                    let diets = (e.typeRecipes.map(l=>l.title))
                    return {
                        ...e, 
                        diets
                    };
                }

			}).filter(Boolean);
            return dispatch({type: GET_RECIPES, payload})
        } catch(error) {
            console.log(error)
        }
    }
};

export function getRecipesByName(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipes?name=${payload}`);
            return dispatch({type: SEARCH_RECIPE, payload: response.data})
        } catch {
            return alert ('Recipe Not Found')
        }
    }
}

export function getDietTypes() {
    return async function(dispatch) {
        try{
            var response = await axios.get(`${LOCAL_HOST}/types`);
            return dispatch({type: GET_DIET_TYPES, payload: response.data.map(d => d.title)});
        } catch (error) {
            console.log(error)
        }
    }
}

export async function addRecipe(payload) {
        try {
            var response = await axios.post(`${LOCAL_HOST}/recipe`, payload);
            return response;
        } catch (error) {
            console.log(error)
        }
    }

export function getRecipeDetails(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipes/${payload}`);
            return dispatch({type: GET_RECIPE_DETAILS, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function dietTypeFilter(payload) {
    return {
        type: DIET_TYPE_FILTER,
        payload
    }
};

export function aplhabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function scoreSort(payload) {
    return {
        type: SCORE_SORT,
        payload
    }
}