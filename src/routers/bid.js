import { Router } from "express";
import BidController from "../controllers/bid";
const bidsRouter = Router()
bidsRouter.get('/bids', BidController.getAll)
bidsRouter.post('/bids', BidController.createBid)
export default bidsRouter