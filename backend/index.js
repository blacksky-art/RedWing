import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import flightRoutes from "./routes/flightRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/flights", flightRoutes);
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => console.log(error));
