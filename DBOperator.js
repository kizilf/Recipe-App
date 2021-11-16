const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dbUser:securePass@recipedb.bapek.mongodb.net/RecipeDB?retryWrites=true&w=majority";

class DBOperator {

    constructor(){
        this.client = new MongoClient(uri);
    }

    async connectToDB() {

        try {
            // Connect to the MongoDB cluster
            this.connection = await this.client.connect();
        } catch (e) {
            console.log("Something went wrong while connecting the mongoDB");
            console.error(e);
        }
    }

    async getAllRecipies(){
        const cursor = this.client.db("recipesDB").collection("recipes").find({});
        // Store the results in an array
        const results = await cursor.toArray();
        return results;
    } 

    async addANewRecipe(newListing){
        const result = await this.client.db("recipesDB").collection("recipes").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }

    async closeDBConnection(){
        await this.client.close();
    }
}

module.exports = DBOperator
