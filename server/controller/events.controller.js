import { eventsCollection } from "../db/mongoConnect.js";


export const createEvent = async (req, res) => {

    console.log(req.body);

    const eventData = {
        ...req.body,
        createdAt: new Date()
    }

    try {
        const result = await eventsCollection.insertOne(eventData);
        console.log(result);
        res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const allEvents = async (req,res) => {
    try {
        const events = await eventsCollection.find({}).toArray();
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}