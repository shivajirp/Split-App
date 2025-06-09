import express from "express";
import { getBalances, getSettlements, getPeople } from "../controllers/settlementController.js";

const router = express.Router();

router.get("/people", getPeople);
router.get("/balances", getBalances);
router.get("/settlements", getSettlements);

export default router;
