import Task from "../models/taskModel.js";

// Enhanced createTask with better error handling
export const createTask = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Authenticated user:', req.user);
        
        const { title, description, priority, dueDate, status } = req.body;
        
        if (!title || !description || !priority || !dueDate || !status) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            status,
            owner: req.user.id
        });

        const savedTask = await task.save();
        
        res.status(201).json({
            success: true,
            task: savedTask
        });
        
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Enhanced getTask with pagination
export const getTask = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const tasks = await Task.find({ owner: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalTasks = await Task.countDocuments({ owner: req.user.id });

        res.json({ 
            success: true, 
            tasks,
            totalTasks,
            page,
            totalPages: Math.ceil(totalTasks / limit)
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};



// get single task by id belong to that user
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
        if (!task) return res.status(404).json({
            success: false,
            message: "Task not found"
        });
        res.json({ success: true, task });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// update a task
export const updateTask = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.completed !== undefined) {
            data.completed = data.completed === 'Yes' || data.completed === true;
        }
        const updated = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            data,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({
            success: false,
            message: "Task not found or not yours"
        });
        res.json({ success: true, task: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// delete task
export const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!deleted) return res.status(404).json({ success: false, message: "Task not found or not yours" });
        res.json({ success: true, message: "Task Deleted" });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};