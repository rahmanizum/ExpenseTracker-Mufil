const Expenses = require('../models/expenses');
exports.addExpenses = async(request,response,next)=>{
    try {
        const user = request.user;
        const{category,pmethod,amount,date} = request.body;
        user.createExpense({
            category: category,
            pmethod: pmethod,
            amount: amount,
            date: date 
        })
        response.status(200).json({message:'Data succesfully added'});
        
    } catch (error) {
        console.log(error);
    }
}
exports.getExpenses = async(request,response,nex)=>{
    try {
        const user = request.user;
        const expenses = await user.getExpenses({include:['User']});
        // const expenses = await Expenses.findAll();
        response.status(200).json(expenses);
        
    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
}
exports.deletebyId = async(request,response,next)=>{
    try {
        const dID = request.params.dID;
        const result=await Expenses.destroy({where:{id:dID,userId: request.user.id }});
        if(result==0){
            return response.status(401).json({ message: 'You are not Authorized' });
        }else{
            response.status(200).json({ message: 'Succeffully deleted'});
        }
        
        
        
    } catch (error) {
        console.log(error);
    }
}