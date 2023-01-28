/* Schema tells what fields would be there within each document inside a collection (so that the database is consistent). Although we 
can make changes to the schema as mongodb is flexible enough for it. 

We are going to write schema for mongoose to access the database and populate it (using this schema). Each document in our case is a 
contact. So we will define a schema for one contact and all the other contacts would be filled up following this schema. */

// Since mongoose is being used to create the schema, so we will need to require it. 
const mongoose = require('mongoose'); 
/* When we require the mongoose at multiple places, it will be required from one single instance (from the one that was created the first 
time) and thus not creating multiple instances and thereby saving a lot of memory space. This thing is done automatically by nodejs. */ 

const contactSchema = new mongoose.Schema({
    /* Simpler Version : 
{
    name : String,
    phone : Number
}
*/
    name : {
        type : String,
        required : true 
    },
    phone : {
        type : String, // Since there could be country codes with '+' sign in them
        required : true
        // Here we could put multiple validations (for e.g. phone has to be of 10 digits, such and such country codes admissible, etc.)
    }
}); 
//  So far so good. We've got a schema with properties name and phone. The next step is compiling our schema into a Model. 

const Contact = mongoose.model('Collection4ContactList', contactSchema); 
/* A model is a class with which we construct documents. 
In this case, each document will be a 'Contact' with properties and behaviors as declared in our schema.
'Contact' is nothing but the name of our 'collection'. */ 

module.exports = Contact; 
// Exporting this model so as to import it in the index.js file. 

