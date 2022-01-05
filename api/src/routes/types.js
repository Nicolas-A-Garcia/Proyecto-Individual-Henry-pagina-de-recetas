const {Router} = require("express");
const {dbDietsTypes} = require("../Controllers/dietTypes");
const db = require("../db");
const {Recipe, TypeRecipe } = require("../db");

const router = Router();

router.get("/", async (req,res,next)=>{
    try{
        dbDietsTypes.forEach(e =>{
            TypeRecipe.findOrCreate({
                where:{title: e}
            })
        });
        const dietTypes = await TypeRecipe.findAll();
        res.send(dietTypes)
    } catch(err){
        next(err)
    }
});

module.exports = router;