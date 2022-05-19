// const db = require("../models");
const Launch = require("../models/launch.model")

// Create and Save new Launch Event
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title){
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    // Create a Launch 
    const launch = new Launch({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // Save Launch to the database
    launch
        .save(launch)
        .then( data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "FAILURE - An error occured while pushing the new Launch to the database."
            });
        });

};

// Retrieve all Launch Events from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = { title : { $regex: new RegExp(title), $options: "i" } }
    Launch.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "FAILURE - An error occured while trying to retrieve all Launches from the database."
            })
        })
};

// Find a Launch Event from the database
exports.findOne = (req, res) => {
    const id = req.params.id;
    Launch.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({  message: `FAILURE - Unable to find a Launch in the database with the ID: ${id}. Please make sure the right ID was used.`})
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `An error occurred while searching the database for Launch ID: ${id}.\n${err}`})
        })

};

// Update a Launch Event from the database
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "FAILURE - The body of the request returned null."
        })
    }
    const id = req.params.id;
    Launch.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `FAILURE - Unable to update Launch ID: ${id} because it was not found in the database.`
                })
            }
            else{
                res.send({ message: "SUCCESS - Launch was updated successfully."})
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `FAILURE - An error occured while trying to update Launch ID: ${id}.\n${err}`
            })
        })
};

// Delete a Launch Event from the database
exports.delete = (req, res) => {
    const id = req.params.id;
    Launch.deleteOne(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `FAILURE - Unable to delete Launch ID: ${id} because it was not found in the database.`
                })
            }
            else{
                res.send({ message: "SUCCESS - Launch was deleted successfully."})
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `FAILURE - An error occured while trying to delete Launch ID: ${id} from the database.\n${err}`
            })
        })

};

// Delete all Launch Events from the database
exports.deleteAll = (req, res) => {
    Launch.deleteMany({})
        .then(data => {
            res.send({
                message: `SUCCESS - ${data.deletedCount} Launches were deleted from the database.`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `FAILURE - An error occured while trying to delete all Launches from the database.\n${err}`
            })
        })
};

// Find all Launch Events from the database
exports.findAllPublished = (req, res) => {
    Launch.find({   published:true  })
        .then(data => {
            res.send(data)
        .catch(err => {
            res.status(500).send({
                message: `FAILURE - An error occured while trying to retrieve the Launches from the database.\n${err}`
            })
        })
    })
};
