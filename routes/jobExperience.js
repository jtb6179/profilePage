const router = require('express').Router()
let JobsExperience = require('../models/jobExperience')

router.route('/').get((req, res) => {
    JobsExperience.find()
        .then(jobExperiences => res.json(jobExperiences))
        .catch(err => res.status(400).json("Error:" + err))
})

router.route("/addJobExperience").post((req, res) => {
    let position = req.body.position;
    let company = req.body.company
    let description = req.body.description


    const newJobExperience = new JobsExperience(
            {
                position,
                company,
                description,   
                })

        newJobExperience.save()
            .then(() => res.json("job Added"))
            .catch(err => res.status(400)
                .json("Error:" + err))
})

module.exports = router