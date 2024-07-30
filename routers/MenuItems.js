const express = require("express");
const router = express.Router();

const menuItems = require("../models/MenuItems");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    const menu = new menuItems(data); // Creates new person doc using the model

    // now save the new person to db
    const saved = await menu.save();
    console.log("data saved");
    return res.json(saved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});

// get menu data
router.get("/", async (req, res) => {
  try {
    const data = await menuItems.find();
    console.log("data fetched");
    return res.send(
      `
        <ul>
          ${data
            .map((p) => `<li> ${p.name} -  ${p.price} -  ${p.taste} - </li>`)
            .join(" ")}
        <ul/>
          `
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
    try {
      const taste = req.params.taste;
      if (taste === "spicy" || taste === "sour" || taste === "sweet") {
        //search in db
        const response = await menuItems.find({ taste: taste });
        return res.json({ msg: response });
      }
      return res.status(404).json({ msg: "invalid taste type" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: "Internal server error" });
    }
  });

//   router.put()
module.exports = router;