/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const DBOperator = require("./DBOperator");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const dbOperator = new DBOperator();

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

/**
 * Routes Definitions
 */
app.get("/", async (req, res) => {
    await dbOperator.connectToDB();
    const allRecipes = await dbOperator.getAllRecipies();
    res.render("homepageLayout", { recipes: allRecipes });
    res.status(200);  
});

app.post("/recipeDetails", async (req, res) => {
    await dbOperator.connectToDB();
    const recipe = await dbOperator.getRecipeById(req.body.submit_param);
    res.render("recipeDetails", {recipe: recipe});  
});

app.post("/addRecipe", async (req, res) => {
    //console.log(req.body);
    await dbOperator.addANewRecipe(req.body);
    res.redirect("/")
});

app.get("/addRecipe", (req, res) => {
    res.render("addRecipeLayout");
});

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
