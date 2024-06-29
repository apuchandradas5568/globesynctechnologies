import { Router } from "express";
import { createEvent, allEvents } from "../controller/events.controller.js";



const router = Router();


router.post('/create-event', createEvent)
router.get('/all-events', allEvents)

export default router;