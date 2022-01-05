const { Router } = require("express");
const { Recipe, TypeRecipe } = require("../db");
const router = Router();

router.post("/", async function (req, res) {
  try {
    console.log(req.body);
    let { title, dishSummary, score, healthyFoodLevel, steps, dietTypes } = req.body;
    if (!title)
      return res.status(400).send({ error: "El titulo es obligatorio" });
    if (!dishSummary)
      return res
        .status(400)
        .send({ error: "El resumen del plato es obligatorio" });
    const recipe = await Recipe.create({
      title,
      dishSummary,
      score,
      healthyFoodLevel,
      steps
    });

    for (let i = 0; i < dietTypes.length; i++) {
      recipe.addTypeRecipe(
        await TypeRecipe.findOne({
          where: { title: dietTypes[i] },
        })
      );
    }

    res.send("Se ha creado");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
