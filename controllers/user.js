
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY;
exports.usergethomePage = (request, response, next) => {
    response.sendFile('index.html', { root: 'views' });
}
exports.signupAuthentication = async(request,response,next)=>{      
    const{Name,userName,password1} = request.body;
    try {
        const user = await User.findAll({
            where:{
                email:userName
            }
        });
        if(user==""){
            const hashedPassword = await bcrypt.hash(password1, 10);
            await User.create({
              name: Name,
              email: userName,
              password: hashedPassword 
            });
            response.status(200).send('Successfully registered');             
        }else{
            response.status(401).send(user);  
        }
        
    } catch (error) {
        console.log(error);
    }
}
exports.signinAuthentication = async (request, response, next) => {
    try {
        const { userName ,password} = request.body;
        const user = await User.findAll({
            where: {
                email: userName
            }
        });
        if(user.length==0){
            response.status(404).send('User not found');
        }else{
            const isPasswordValid = await bcrypt.compare(password,user[0].password);
            if (isPasswordValid ){
                const token = jwt.sign({userId : user[0].id},secretKey,{expiresIn:'1h'});
                response.status(200).json({ token:token,user:user[0]});
            }else{
                response.status(401).send('Authentication failed');
            }
        }


    } catch (error) {
        console.log(error);
        response.status(500).send('An error occurred during authentication');
    }
}

