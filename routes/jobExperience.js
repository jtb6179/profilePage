const router = require('express').Router()
const { json } = require('express')
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

router.route('/:id').get((req, res) => {
    JobsExperience.findById(req.params.id)
        .then(job => res.json(job))
        .catch(err => res.status(400).json("Error" + err))
})

router.route("/:id").delete((req, res) => {
    JobsExperience.findByIdAndDelete(req.params.id)
        .then(() => res.json("Job Deleted"))
        .catch(err => res.status(400).json("Error" + err))
})

router.route("/update/:id").post((req,  res) => {
    JobsExperience.findById(req.params.id)
        .then(job => {
            job.position = req.body.position
            job.company = req.body.company
            job.description = req.body.description

            job.save()
                .then(() => res.json("Job Added"))
                .catch(err => res.status(400).json("Error" + err))
            })
                .catch(err => res.status(400).json("Error" + err))
})

module.exports = router