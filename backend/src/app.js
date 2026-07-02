const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const protect = require('../middlewares/auth.middleware');
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




//import routes
const authRoutes = require('../routes/auth.route');
const taskRoutes = require('../routes/task.route');


//use routes


app.use(cors({
    origin: "http://localhost:5173", 
    credentials:true
}));
app.get("/home", protect, (req, res) => {
    res.json({
        message: "Welcome Home!",
        user: req.user
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);







module.exports = app;