// Including mongoose in our project & opening a connection to the 'contact_list_db' database on our locally running instance of MongoDB. 

// require the library 
const mongoose = require('mongoose'); 

// connecting the library to the database. 
// mongoose.connect('mongodb://localhost/contact_list_db',{
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     family: 4
// });

mongoose.connect('mongodb+srv://baghelshivank:Baggamongocloud971@cluster00-contactlist.jbmra3w.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // family: 4,
   
});

// acquire the connection (to check if it is successful)  
const db = mongoose.connection; 

// if error 
db.on('error', console.error.bind(console, 'error connecting to db'));

// if up and running 
db.once('open', function(){
    console.log('Successfully connected to the database');
});

/* Next we need to include this file everytime we fire our server. Therefore, we will go to the index.js file and "require" this library 
(or the configuration to setup our database that will be accessed by mongoose) there. */ 




/* 
MongooseServerSelectionError: connect ECONNREFUSED ::1:27017

If the Error states:
connect() Error :MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
Then the connection to localhost is refused on the IPv6 address ::1 . Mongoose per default uses IPv6 ..
For a quick check you can set the IPv4 address explicit:
mongoose.connect('mongodb://127.0.0.1/test')

ORRRR......

const uri = 'mongodb://localhost:27017/test';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
const connectWithDB = () => {
    mongoose.connect(uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log("database connection")
    })
}
connectWithDB();

*/

