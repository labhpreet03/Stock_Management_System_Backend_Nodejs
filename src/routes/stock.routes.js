import { Router } from "express";
import {  getLogHistory, patchItemsDec, patchItemsInc, stockRegister, updateItems } from "../controllers/stockDetail.controller.js";

const router=Router()

router.route("/register_stock").post(stockRegister)
router.route("/update/:_id").post(updateItems)
router.route("/restock/:_id").patch(patchItemsInc)
router.route("/sell/:_id").patch(patchItemsDec)
router.route("/getStock/:_id").get(getLogHistory)

export default router;