import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aaryan2175be21:35789@cluster0.jipduct.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}

//mongodb+srv://aaryan2175be21:35789@cluster0.jipduct.mongodb.net/?