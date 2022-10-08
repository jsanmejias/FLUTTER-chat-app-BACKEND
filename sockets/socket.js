const { io } = require("../index");
const { validateJWT } = require("../helpers/jwt");
const { connectedUser, disconnectedUser, saveMessage} = require('../controllers/socket');

// socket Mesagges
io.on("connection",  (client) =>  {
  console.log("Cliente conectado");
  
  //validate Token
  const [ valide, uid ] = validateJWT( client.handshake.headers['x-token'] );

  // Verify authenticated client
  if ( !valide ) { return client.disconnect() };

  // Authenticated client
  connectedUser( uid );

  //Get user into chat room

  // Global room, client.id
  client.join( uid )

  //listen to 'personal-message'

  client.on('personal-message', async ( payload ) =>{
    // console.log(payload);
    guardo = await saveMessage( payload );
    if(guardo){
      console.log('sisas');
    }
    else{
      console.log('nonas'); 
    }
    io.to( payload.to ).emit('personal-message', payload );
  });

  
  client.on("disconnect", () => {
    console.log("cliente desconectado");
    disconnectedUser( uid );
  });

  
});
