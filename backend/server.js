const dotenv=require('dotenv').config();
const connectDB=require('./database/db');

connectDB();

const app=require('./src/app');

const PORT=process.env.PORT || 10000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});