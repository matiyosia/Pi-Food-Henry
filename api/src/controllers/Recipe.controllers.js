const axios = require("axios");
 const { Op } = require("sequelize");
const {Diet,Recipe} = require("../db")
// const {YOUR_API_KEY}=process.env;
// const {YOUR_API_KEY1}=process.env;
// const {YOUR_API_KEY2}=process.env;
const {YOUR_API_KEY13}=process.env;

 
const getApiData = async()=>{
    try {
         
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY13}&addRecipeInformation=true&number=100`)
        const apiData = apiUrl.data.results.map(recipes=>{
            
            return{
                id:recipes.id.toString(),  
                image:recipes.image, 
                name:recipes.title.toLowerCase(),
                type:recipes.diets,
                summary:recipes.summary,
                score:recipes.spoonacularScore,
                healhyScore:recipes.healthScore,
                dishTypes:recipes.dishTypes,
                steps:recipes.analyzedInstructions[0]?.steps.map(s=>{
                    return{
                        number:s.number,
                        step:s.step
                    }
                })

            }
            
            
        }) 
        return apiData;

       


    } catch (e) {
        console.log(e)
    }

    
}


const dbData = async()=>{
    const del= await Recipe.findAll({
        include:{
            model:Diet,
            attributes:["name"]
        }
    })
    return del
}

const allRecipes = async()=>{
    const api = await getApiData()
    const db = await dbData()
    const all = api.concat(db)
    return all
}


const getByName = async(req,res)=>{
    try {
        const { name } = req.query;
        
        const recipe = await allRecipes()
        if(name){
            const fil =  recipe.filter(el=> el.name.toLowerCase().includes(name.toString().toLowerCase()))
            fil.length ? res.send(fil):res.send({msg:"no se encontro el nombre"})
        }else{
            return res.send(recipe)

        }
       
    } catch (e) {
        console.log(e)
    }
}


const getIdRecipe = async (req,res)=>{
    try {
        const { id } = req.params;
        const filId = await allRecipes(id)
        if(id){
                const busqueda = filId.filter(el=> el.id.toString() === id.toString())
            
            busqueda.length ? res.send(busqueda):res.send({msg:"error"})

        
        }else{ 
            res.send({msg:"no existe ese id"})
        }
    


    } catch (error) {
         res.status(404).send({ message: 'Should enter a valid ID'})
        
    }

}


const getPost = async (req,res)=>{
    const { name, summary, score, healthyScore, steps,type,image} = req.body;
    try {

        

        const nuevaReceta = await Recipe.create({
            name,
            summary,
            score,
            healthyScore,
            steps,
            image,
            type

        })

        const dietas = await Diet.findAll({
            where:{name:type},
            
        })
        nuevaReceta.addDiet(dietas)
 

        return res.status(200).send({message:"creada exitosamente"});
    } catch (e) {
        console.log(e) 
    }
}


module.exports={
    getApiData,
    getByName,
    getIdRecipe,
    getPost,
    dbData,
    allRecipes

}

