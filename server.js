import express from "express";
import dotenv from "dotenv";
import trilhasRoutes from "./src/routes/trilhasRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3003;

app.get("/", (req,res)=> {
    res.send("servidor funcionando")
});

app.use("/trilhaSonora", trilhasRoutes);

app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});