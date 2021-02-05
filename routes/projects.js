const router = require('express').Router()
let Project =  require('../models/project')

router.route('/').get((req, res) => {
    Project.find()
        .then(project => res.json(project))
        .catch(err => res.status(400).json("Error:" + err))
})

router.route("/addProject").post((req, res) => {
    let projectTitle = req.body.projectTitle;
    let description = req.body.description
    let url = req.body.url


    const newProject = new Project(
            {
                projectTitle,
                description,   
                url,
                })

        newProject.save()
            .then(() => res.json("Project Added"))
            .catch(err => res.status(400)
                .json("Error:" + err))
})

module.exports = router