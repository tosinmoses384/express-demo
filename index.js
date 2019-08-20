const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

// app.get()
// app.post()
// app.put()
// app.delete()

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
];

app.get('/', (req, res) =>{
    res.send('Helo World!!!');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found'); //404
    res.send(course);
});

app.post('/api/courses', (req, res) => { 
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //if not existing, return 404
    const course = courses.find(c => c.d === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    //Validate
    //If invalid, return 400 i.e bad request
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);
});

function validateCourse(course) {
    
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));