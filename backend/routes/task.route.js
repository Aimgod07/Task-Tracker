const express = require('express');
const taskController = require('../controllers/task.controller');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');


    

router.post('/create',protect, taskController.createTask);
router.get('/get/:id', protect, taskController.getTaskById);
router.put('/update/:id', protect, taskController.updateTask);
router.delete('/delete/:id', protect, taskController.deleteTask);
router.get('/',protect,taskController.getTasks)










module.exports = router;