import express from "express";
import { createTrilha, deleteTrilha, getAllTrilhas, getTrilhasById} from "../controllers/trilhasController.js";

const router = express.Router();

router.get("/", getAllTrilhas);
router.post("/", createTrilha);
router.get("/:id", getTrilhasById);
router.delete("/:id", deleteTrilha);


export default router;