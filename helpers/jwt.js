const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
    
    return new Promise( (resolve, reject) =>{

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
        expiresIn: '24h'
        }, (err, token) => {

            if( err ){
            // token wasnt created
            reject('Sorry, the JWT could not be created');
            }else{
                resolve( token );
            }
        });

    });



}

const validateJWT = ( token = '' ) =>{

    try{

        const { uid } = jwt.verify( token, process.env.JWT_KEY );

        return [ true, uid ];

    } catch(error){

        return [ false, null ];

    }
}

module. exports = {
    generateJWT,
    validateJWT
}