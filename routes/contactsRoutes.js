const express = require('express');
const router = express.Router();
const {getContacts, createNewContacts, getContact, updateContact, deleteContact } = require('../controllers/contactsController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.use(validateTokenHandler); // Apply token validation to all routes in this file
router.route("/").get(getContacts).post(createNewContacts);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;