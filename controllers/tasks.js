const Task = require('../models/task');

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

const getSingleTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) {
            const err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ task });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id });
        if (!task) {
            const err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ task });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            const err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ task });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}