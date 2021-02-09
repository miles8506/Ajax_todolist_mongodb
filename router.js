const express = require('express');
const router = express.Router();
const Todo = require('./mongo/todo.js');
//todo-查
router.get('/todo/task', (req, res, next) => {
    Todo.find((err, data) => {
        if (err) {
            return next(err);
        };
        res.send(data);
    });
});

//todo-增
router.post('/todo/addTask', (req, res, next) => {
    const title = req.body.title
    new Todo({
        title: title
    }).save();
    setTimeout(() => {
        Todo.findOne(({ title: title }), (err, data) => {
            if (err) {
                return next(err);
            };
            res.send(data);
        });
    }, 300);
});

//todo-刪
router.get('/todo/deleteTask', (req, res, next) => {
    const query = req.query._id;
    Todo.findByIdAndDelete(({ _id: query }), (err, data) => {
        if (err) {
            return next(err);
        };
        res.send(data._id);
    });
});


//todo-改(check)
router.post('/todo/modifyTask', (req, res, next) => {
    const body = req.body;
    Todo.findByIdAndUpdate({ _id: body._id }, { completed: body.completed }, (err) => {
        if (err) {
            return next(err);
        };
        Todo.findOne(({ _id: body._id }), (err, data) => {
            if (err) {
                return next(err);
            };
            res.send(data);
        });
    });
});


//todo-改(title)
router.post('/todo/modifyTaskTitle', (req, res, next) => {
    const body = req.body;
    Todo.findByIdAndUpdate({ _id: body._id }, { title: body.title }, (err) => {
        if (err) {
            return next(err);
        };
        Todo.findOne(({ _id: body._id }), (err, data) => {
            if (err) {
                return next(err);
            };
            res.send(data);
        });
    });
});


//clear-completed
router.get('/todo/clearCompleted', (req, res) => {
    Todo.remove(({ completed: true }), (err, data) => {
        if (err) {
            return next(err);
        };
        res.send(data);
    })
})

module.exports = router;
