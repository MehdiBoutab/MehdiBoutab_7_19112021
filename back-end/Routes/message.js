const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const auth = require("../Middlewar/auth");
const multer = require("../Middlewar/multer-config");

router.get("/", auth, messageCtrl.getAllMessage);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.post("/", auth, multer, messageCtrl.createMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;