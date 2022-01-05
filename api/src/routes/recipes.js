const {Router} = require("express");
const axios = require("axios");
const {Recipe, TypeRecipe} = require("../db");
const{YOUR_API_KEY} = process.env;


const router = Router();
const getApiInfo = async () => {
    try
    {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
        const {results}  = resAxios.data ;
        
    
        
        if (results.length > 0) {

            let response = results?.map((result) => {
                return {
                    title: result.title,
                    vegetarian: result.vegetarian,
                    lowfodmap: result.lowFodmap,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    id: result.id, 
                    score: result.spoonacularScore,
                    healthyFoodLevel: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    dishSummary:result.summary,
                    steps: e.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }        
            })

        return response;
    } 
    }catch (e) {
       
        return ([])
    }
}


const getDBInfo = async () => {
            return await Recipe.findAll({ 
                include: {model: TypeRecipe,
                            attributes: ["title"],
                             through:{
                                 attributes: []
                            }
                        }
                    })
                }


    const getAllInfo = async () => {
            try{
                const apiInfo = await getApiInfo()
                const bdInfo = await getDBInfo()
                const infoTotal = apiInfo.concat(bdInfo)
                return infoTotal
            }catch(err) {
                return ('error')
            }
         }


const getApiByName = async (name) => {
           
            try{
                const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${YOUR_API_KEY}`);
                const { results } = resAxios.data;
            
                let response = results?.map((result) => {
                    return {
                        title: result.title,
                        vegetarian: result.vegetarian,
                        vegan: result.vegan,
                        glutenFree: result.glutenFree,
                        dairyFree: result.dairyFree, 
                        image: result.image, 
                        id: result.id, 
                        score: result.spoonacularScore,
                        healthyFoodLevel: result.healthScore,
                        types: result.dishTypes?.map(element => element),  
                        diets: result.diets?.map(element => element), 
                        dishSummary:result.summary,
                        steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                    }
                })
            return response
            }catch(err) {
                return ('error')
            }
        }


        const getDBByName = async (name) => {
            try{
                const DBInfo = await getDBInfo();
                const filtByName = DBInfo.filter(recipe => recipe.name.includes(name))
                return filtByName
            }catch(err){
                return err
            } 
        }
 
        const getInfoByName = async (name) => {
            try{
                const apiByName = await getApiByName(name)
                const DBByName = await getDBByName(name)
                const infoTotal = apiByName.concat(DBByName)
                return infoTotal
            }catch(err) {
                return ('error')
            }
        }     


router.get('/', async (req, res) => {
    
        const { name } = req.query
    
        if (name) {
      
            const infoByName = await getInfoByName(name)
            if (infoByName !== 'error'){
                infoByName.length > 0 ? res.json(infoByName) : res.status(400).json([{ name: 'not found any recipes'}]);
            }else{
                res.status(404).json([{ name: 'API Error'}])
            }
    
        }else{
    
            const allDate = await getAllInfo() 
        
            if (allDate !== 'error'){  
                res.json(allDate);
            }else{
                res.status(404).json({message:'Error en la búsqueda de datos'})
            }
    
        }
    });


    router.get('/dates', async (req, res) => {
        const allDateBD = await getDBInfo()
        if (allDateBD !== 'error') {
            res.json(allDateBD)
        } else {
            res.status(404).json({message: 'error in database '})
        }
    })



    router.put('/', async (req, res) => {
        const {id, summary} = req.query
        let resul
        try{
            resul = await Recipe.update(
                {summary},
                {where: {id: id}},
            )
      
        }catch{
            resul = null
        }
        if(resul === 1) res.status(200).send('success')
        else res.status(404).send('reject')
    })   



    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        
        try{
            if (id.length > 12){
                const dataDB = await Recipe.findByPk(id,{
                    include: {
                    model: TypeRecipe,
                    atributes: ["title"],
                    through: {
                        attributes: [],
                        },
                    },
                });
                if(dataDB){
                const obj = {
                    id: dataDB.id,
                    title: dataDB.title,
                    dishSummary: dataDB.summary,
                    score: dataDB.score,
                    healthyFoodLevel: dataDB.healthScore,
                    image: dataDB.image,
                    diets: dataDB.typeRecipes.map(s=> s.title),
                    steps: dataDB.steps,
                    
                }
                    res.json(obj)
                }else{
                    console.log('bd')
                    const objerr = {
                        name: 'Recipe not Found',
                        summary: 'None',
                        score: 0,
                        healthScore: 0,
                        image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
                        steps: 'none',
                        diets: []
                    }
                    res.json(objerr)
                }
            }else{
    
                const resAxios = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    
                let obj = {};
    
                obj = {
                    title: resAxios.data.title, 
                    vegetarian: resAxios.data.vegetarian,
                    vegan: resAxios.data.vegan,
                    glutenFree: resAxios.data.glutenFree,
                    dairyFree: resAxios.data.dairyFree,
                    image: resAxios.data.image, 
                    id: resAxios.data.id, 
                    score: resAxios.data.spoonacularScore, 
                    healthyFoodLevel: resAxios.data.healthScore, 
                    diets: resAxios.data.diets?.map(element => element),types: resAxios.data.dishTypes?.map(element => element), 
                    dishSummary:resAxios.data.summary,
                    steps: resAxios.data.instructions
                    }
                
                if (obj){
                    res.json(obj);
                }else{
    
                    let objerrors
    
                    objerrors = {
                        name: 'Recipe not Found', 
                        image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
                        score: 0, 
                        healthScore: 0, 
                        diets: [], 
                        summary:'none', 
                        steps: 'none'}
    
                    res.json(objerrors)
                }
            }
        }catch(e){
            let objerr
        
            objerr = {name: 'only enter numbers less than 100000 or UUID code', 
            image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
            score: 0, 
            healthScore: 0, 
            diets: [], 
            summary:'none', 
            steps: 'none'}
    
        res.json(objerr)
        }
    })
    

module.exports = router