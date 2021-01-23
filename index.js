const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 4000
const mongoose = require('mongoose');
// const profileRoutes = express.Router()
const Project = require('./models/project')
const JobsExperience = require('./models/jobExperience')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
// app.use('/profile', profileRoutes)
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/profile', {
    useNewUrlParser: true
})

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established successfully");
})

app.get('/projects', (req, res) => {
    Project.find(function(err, project) {
        if (err) {
            console.log(err);
        } else {
            res.json(project);
        }
    });
});

app.get("/jobsExperience", (req, res) => {
    JobsExperience.find(function(err, jobExperience) {
        if (err) {
            console.log(err);
        } else {
            res.json(jobExperience);
        }
    });
});

app.get( "/jobsExperience/:id", (req, res) => {
    const id = req.params.id;
    JobsExperience.findById(id, function(err, jobExperience) {
        res.json(jobExperience);
    });
});

app.get("/projects/:id", (req, res) => {
    const id = req.params.id;
    Project.findById(id, (err, project) => {
        res.json(project);
    });
});

app.post('/addProjects', (req, res) => {
    const project = new Project(req.body);
    project
        .save()
            .then( (proj) => {
                res.json(proj)
                res.status(200).json({'project': 'project added successfully'});
            })
            .catch(err => {
                res.status(500).send('adding new project failed');
            });
        }); 

app.post('/addJobExperience', (req, res) => {
    let jobExperience = new JobsExperience(req.body);
    jobExperience
        .save()
            .then((jobExp) => {
                res.json(jobExp)
                res.status(200).json({'jobExperience': 'jobExperience added successfully'});
                })
                .catch(err => {
                    res.status(400).send('adding new jobExperience failed');
                });
            });

// app.post('/projects/update/:id', (req, res) => {
//     Project.findById(req.params.id, function(err, project) {
//         if (!project)
//             res.status(404).send("data is not found");
//         else
//             project.projectTitle = req.body.projectTitle;
//             project.description = req.body.description;
//             project.url = req.body.url;
//             project
//                 .save()
//                     .then((project) => {
//                         res.json('Project updated!');
//                     })
//                         .catch(err => {
//                             res.status(400).send("Update not possible");
//                         });
//                     });
//                 });

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))