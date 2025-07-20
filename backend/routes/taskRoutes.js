import express from 'express';
import authMiddleware from '../middleware/auth.js';
// import { createTask, deleteTask, getTaskById, getTask, updateTask } from '../'
import { createTask,deleteTask,getTaskById,getTask,updateTask} from '../../backend/controller/taskController.js'

const taskRouter = express.Router();

taskRouter.route('/')
  .get(authMiddleware, getTask)
  .post(authMiddleware, createTask);

taskRouter.route('/:id')
  .get(authMiddleware, getTaskById)
  .delete(authMiddleware, deleteTask)
  .put(authMiddleware, updateTask);

export default taskRouter;