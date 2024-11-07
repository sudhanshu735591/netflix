import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import Signin from "./models/signup.js";
import bcrypt  from "bcrypt"
const app = express();
const SALT_ROUNDS = 10;
import movieList from "./models/movieInfo.js";
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.post("/signup", async (req, res) => {
    const { username, password, confirmpassword } = req.body;
    try {
        const db_Username = await Signin.findOne({ username });
        if (db_Username) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const hashedConfirmPassword = await bcrypt.hash(confirmpassword, SALT_ROUNDS);
        const newUser = new Signin({
            username: username,
            password: hashedPassword,
            hashedConfirmPassword:hashedConfirmPassword
        });
        await newUser.save();
        
        // Generate a JWT token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );
        console.log("Token is ", token)
        
        return res.status(200).json({ 
            message: "Your profile has been created successfully", 
            token   
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});



app.post("/watchlist", async (req, res)=>{
    const {userId, movieName, movieId, movieImage} = req.body;
    try{
        if(!userId || !movieName || !movieId || !movieImage){
            return res.status(400).send({message:"All fields are required"});
        }
        const watchedMovie = new movieList({
            userId, movieName, movieId, movieImage
        })
        const newMovie = await watchedMovie.save();
        return res.status(201).json({message:"Movielist added successfully", data:newMovie});
    }
    catch(error){
        console.error(error);
    }
})

app.get("/watchlist", async (req, res)=>{
    try{
        const watchedMovies = await movieList.find();
        res.status(200).json({message:"All Data", movieList : watchedMovies})
    }
    catch(error){
        console.error(error);
    }
})

app.delete("/watchlist/delete", async (req, res) => {
    try {
        const { id } = req.body; 
        console.log("ID is", id);
        if (!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const result = await movieList.findOneAndDelete(id);
        if (result) {
            res.status(200).json({ message: "Movie deleted from watchlist" });
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});




app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});