module.exports = app => {
    const launches = require("../controllers/launch.controller.js");
    let router = require("express").Router();

    // Create a new Launch
    router.post("/", launches.create);

    // Retrieve all Launches
    router.get("/", launches.findAll);

    // Retrieve all published Launches
    router.get("/published", launches.findAllPublished);

    // Retrieve a single Launch with id
    router.get("/:id", launches.findOne);

    // Update a Launch with id
    router.put("/:id", launches.update)

    // Delete a Launch with id
    router.delete("/:id", launches.delete)

    // Delete all Launches
    router.delete("/", launches.deleteAll);

    router.get("/?title", launches.findAll)

    // set default route to /api/launches
    app.use('/api/launches', router);
};