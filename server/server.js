import express from "express";
import cors from 'cors'
import router from './app/routers/routers.js'
import dotenv from 'dotenv';
dotenv.config()



const app = express()

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(router);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});