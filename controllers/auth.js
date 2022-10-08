const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try{
                                                //You can leave just email
        const emailExists = await User.findOne({ email: email });

        if(emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }
       
        const user = new User( req.body );
        
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //save user to mongoDB
        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });


    } 
    
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check with the app administrator, there seems to be an error when creating the user'
        });
    } 
}

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try{

        const userDB = await  User.findOne({ email });

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password'
            });
        }
        
        //Generate JWT
        const token = await generateJWT( userDB.id )

        res.json({
            ok: true,
            user: userDB,
            token
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Check with admin'
        });
        
    }   
}

const renewJWT = async ( req, res = response ) => {

    const id = req.uid;

    const token = await generateJWT( id );

    const userDB = await User.findById( id );
    
    res.json({
        ok: true,
        user: userDB,
        token
    })
        
}

module.exports = {createUser, login, renewJWT}