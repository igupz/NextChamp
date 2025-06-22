const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");

router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.post("/", EventController.createEvent);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);
router.post("/subscribe/:eventId", EventController.subscribeToEvent);

module.exports = router;
