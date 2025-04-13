const express = require ("express")
const routes =express.Router()

const conn = require('../database/db')

// login page
routes.get('/login',  (req, res ,next)=>{ 
    res.render('login')
})

// login comparision database
routes.post('/login1' , async (req, res )=>{
    const {username1 , password1} = req.body;

    try{

    

    const result = await conn('SELECT * FROM information WHERE username = ? AND password = ? ', [username1 , password1])

    if (!username1 || !password1){ 
        console.log('user name and password is not defind')
    }else{ 
        if(result.length > 0 ){
        
            console.log('Login successful:', result[0]);
            return res.status(200).json({ message: 'Login successful', user: result[0] });
            return;
        }else{
            console.log('Invalid credentials');
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    }

}catch{ 
    console.error('Database error:', err);
    return res.status(500).json({ message: 'Server error' });

}
    
})


module.exports = routes;