const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({   
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Status:{
        type: String,
        enum: ['pending', 'in-progress', 'completed']
    },
    Project:{
        type: String,
        enum: ['Website Redesign', 'No-Project', 'Mobile App','Marketing']
    },
    Priority:{
        type: mongoose.Schema.Types.Mixed,
    },
    dueDate: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true
    
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
   

})
module.exports = mongoose.model('Task', taskSchema);