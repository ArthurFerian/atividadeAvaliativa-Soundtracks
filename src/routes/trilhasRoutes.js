import express from "express";
import { createTrilha, getAllTrilhas, getTrilhasById} from "../controllers/trilhasController.js";

const router = express.Router();

router.get("/", getAllTrilhas);
router.post("/", createTrilha);
router.get("/:id", getTrilhasById);

export default router;