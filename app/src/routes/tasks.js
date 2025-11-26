const express = require('express');

const validateCreateTask = require('../middlewares/validateCreateTask.js');
const TasksController = require('../controllers/TasksController.js');

const tasksRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/tasks',
}

tasksRouter.get(`${ROUTES_PATH.INDEX}`, new TasksController().getAll)
tasksRouter.get(`${ROUTES_PATH.INDEX}/:id`, new TasksController().getById)
tasksRouter.post(`${ROUTES_PATH.INDEX}`, validateCreateTask, new TasksController().create)
tasksRouter.put(`${ROUTES_PATH.INDEX}/:id`, validateCreateTask, new TasksController().updateTask)
tasksRouter.delete(`${ROUTES_PATH.INDEX}/:id`, new TasksController().remove)
tasksRouter.patch(`${ROUTES_PATH.INDEX}/:id`, new TasksController().patchTask)

module.exports = tasksRouter