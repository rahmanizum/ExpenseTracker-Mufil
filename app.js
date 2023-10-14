
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

const Expenses = require('./models/expenses');
const User = require('./models/user')

const mainPageRouter = require('./routes/mainpage');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

User.hasMany(Expenses);
Expenses.belongsTo(User,{constraints:true, onDelete:'CASCADE'}); 

app.use(mainPageRouter)
app.use('/user',userRouter);
app.use('/expenses',expenseRouter);

async function initiate(){
    try {
        await sequelize.sync();
        app.listen(6565,()=>{
            console.log("Server is running at 6565");
        });       
    } catch (error) {
        console.log(error);
    }
}
initiate();
