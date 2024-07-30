const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    const newPerson = new Person(data); // Creates new person doc using the model

    // now save the new person to db
    const saved = await newPerson.save();
    console.log("data saved");
    return res.json(saved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});

// get person data
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    return res.send(
      `
        <ul>
          ${data
            .map((p) => `<li> ${p.name} -  ${p.age} -  ${p.email} - </li>`)
            .join(" ")}
        <ul/>
          `
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const work = req.params.work;
    if (work === "chef" || work === "waiter" || work === "manager") {
      //search in db
      const response = await Person.find({ work: work });
      return res.json({ msg: response });
    }
    return res.status(404).json({ msg: "invalid work type" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal server error" });
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const modifications = req.body;

    const response = await Person.findByIdAndUpdate(uid, modifications, {
      new: true, // returns the updated doc
      runValidators: true, // runs the mongoose validations in the schema, [checks required : true..etc] 
    });

    if(!response) res.status(404).json({msg  : "person not found"})

    return res.json(response)

  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal server error" });
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;

    const response = await Person.findByIdAndDelete(uid);

    if(!response) return res.status(404).json({msg  : "person not found"})

    return res.status(200).json({msg  : `${response.name} deleted successfully`})

  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal server error" });
  }
})

module.exports = router;
