const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors')
const app = express()
const apiPort = 5000
const uri = process.env.ATLAS_URI 
const mongoose = require('mongoose');
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
const Project = require('./models/project')
const JobsExperience = require('./models/jobExperience')
// const profileRoutes = express.Router()
// const Project = mongoose.model('Projects')
// const JobsExperience = mongoose.model('JobExperience')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const profileRoutes = require('./routes/projects')
const jobRoutes = require('./routes/jobExperience')

app.use('/jobsExperience', jobRoutes)
app.use('/profile', profileRoutes)

// app.get('/projects', (req, res) => {
//     Project.find(function(err, project) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(project);
//         }
//     });
// });

// app.get("/jobsExperience", (req, res) => {
//     JobsExperience.find(function(err, jobExperience) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(jobExperience);
//         }
//     });
// });

// app.get( "/jobsExperience/:id", (req, res) => {
//     const id = req.params.id;
//     JobsExperience.findById(id, function(err, jobExperience) {
//         res.json(jobExperience);
//     });
// });

// app.get("/projects/:id", (req, res) => {
//     const id = req.params.id;
//     Project.findById(id, (err, project) => {
//         res.json(project);
//     });
// });

// app.post('/addProjects', (req, res) => {
//     const project = new Project(req.body);
//     project
//         .save()
//             .then( (proj) => {
//                 res.json(proj)
//                 res.status(200).json({'project': 'project added successfully'});
//             })
//             .catch(err => {
//                 res.status(500).send('adding new project failed');
//             });
//         }); 

// app.post('/addJobExperience', (req, res) => {
//     let jobExperience = new JobsExperience(req.body);
//     jobExperience
//         .save()
//             .then((jobExp) => {
//                 res.json(jobExp)
//                 res.status(200).json({'jobExperience': 'jobExperience added successfully'});
//                 })
//                 .catch(err => {
//                     res.status(400).send('adding new jobExperience failed');
//                 });
//             });

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