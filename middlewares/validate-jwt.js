const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {
    
    // Read token 
    const token = req.header('x-token');

    if( !token ){
        res.status(401).json({
            ok: false,
            msg: 'There is no JWT in the request'
        });
    }

    try{

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        //console.log(uid);
        
        req.uid = uid;

        next(); 

    } catch(error){

        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid JWT'
        });

    }
}

module.exports = { validateJWT }