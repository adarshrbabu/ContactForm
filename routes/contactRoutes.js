const express = require("express");
const {
  getContacts,
  updateContacts,
  deleteContacts,
  getContactsByID,
  postContacts,
} = require("../controller/contactController");
const validateTokenHandler = require("../middleweare/validateTokenHandler");

const router = express.Router();

router.use(validateTokenHandler);

router.route("/").get(getContacts).post(postContacts);
router.route("/:id").put(updateContacts).delete(deleteContacts);
router.route("/getById/:id").get(getContactsByID);

module.exports = router;
