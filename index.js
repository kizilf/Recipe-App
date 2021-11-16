const DBOperator = require("./DBOperator");

async function main(){
    const dbOperator = new DBOperator();

    await dbOperator.connectToDB();
    const allRecipes = await dbOperator.getAllRecipies();
    //await dbOperator.addANewRecipe({title: "Dummy"});
    await dbOperator.closeDBConnection();
}

main();