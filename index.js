// Here, we will write our server using a web framework (express.js) based on MVC architecture. 

// const { Router } = require('express');  ~ added by VS code
const express = require('express'); // MFEA 1
const port = 8000;  // MFEA 1

const db = require('./config/mongoose');   // MFEA 9
// access the configuration file (that connects our ODM mongoose to the database) just above the place where express has been fired.  

const Contact = require('./models/contactLM');   // MFEA 10
// accessing the model 

const app = express();  // MFEA 1
// firing up the server

const path = require('path');  // MFEA 3
// const { removeAllListeners } = require('process'); ~ added by VS code
app.set('view engine', 'ejs');  // MFEA 3
app.set('views', path.join(__dirname , 'views'));  // MFEA 3
/* Other option to join the "views" folder to the path of the current directory would be by hardcoding (writing the absolute path 
instead of __dirname) but that would reduce the dynamicity of the code (that path would have to be changed when running the code
on a different machine) */
// all the templates/views will be stored in the "views" folder 
// whenever we'd reference a view/template file, it will look for a folder named views inside __dirname 
app.use(express.urlencoded());   // MFEA 5
/* We are accessing the downloaded "body-parser" middleware here which reads and parses the data sent only over a form (and not the 
    data sent over params). */   // MFEA 8

// "app.use" is used to use a middleware.   // MFEA 6 
// A middleware lies in between incoming/outgoing requests/responses and the controller functions.
// A middleware can be used to change the request/response data.
/* A middleware has three arguements, the first one being the "request", second one being the "response", and the third one is called 
"next" which passes on whatever changes have been done and calls the next middleware. If there is no next middleware present, then the
control moves on to the controller function (or whatever piece of code is written subsequently). */ 

/*
//middleware1   // MFEA 6
app.use(function (req, res, next){
    console.log("middleware 1 called");
    req.myName="Aashu Singh";
    next();  // this needs to be called if we wish to move to the next middleware/controller function present in the chain.
});

//middleware2   // MFEA 6
app.use(function(req, res, next){
    console.log("middleware 2 called");
    console.log(req.myName);
    next();
});
*/
app.use(express.static('assets'));  // Again a middleware.   // MFEA 7
var contactList = [   // MFEA 4
    {
        name: "Shivank",
        phone: "1234547839"
    },
    {
        name: "Pranav",
        phone: "4563949302"
    },
    {
        name: "Abhishek",
        phone: "4758394839"
    }
];

app.get('/threeidiots', function(req,res){  // MFEA 2 
    // The first parameter i.e., '/threeidiots' is termed as a route. 
    //res.send('<h1> The corporation is in build mode </h1>');  // MFEA 2 
    //console.log(req.url);
    // console.log(req);  // MFEA 2
// GET, POST, PUT, PATCH, DELETE. The last three work only with ajax requests (and not with non-ajax or synchronous req).// MFEA 2
    //the changes made to request/response in the middleware will persist inside this route as well.
    //console.log(req.myName);   // MFEA 6
     /* console.log(__dirname);  // MFEA 3
    __dirname is inbuilt property or global variable name that adds dynamicity
    The print statement will print the absolute path of the file (i.e., index.js) through which the server was run.   */ 
    
    /* If its the last statement in the controller (whether you are rendering a view or you are sending some response back to the
      user), you need to return it. Or else it will keep looking for next statements to execute */
    // return res.render('home', {title : 'Contacts', contact_list : contactList});  // MFEA 3
   /* We will now fetch the contacts from the database, store them in a variable, and then will pass the variable to the 
   template/view named 'home' to iterate over it.  */

    Contact.find({/* we are not passing any queries rn as we want all contacts */}, function(err, contactsFromDb){     // MFEA 12 
        // Fetching data from DB 
        // contactsFromDb has been created here, and could have taken any name. 
        if(err){
            console.log('Error in fetching the elements from the database');
            return;
        }
        return res.render('home', {title : 'ContactsABC', contact_list : contactsFromDb});
    });
    
});

/*
app.get('/baghelcorporations.org', function(req,res){
    res.send('<h1> Welcome to the baghelcorp </h1>');
});
*/
app.post('/create-contact', function(req,res){   // MFEA 4

    //return res.redirect('/home');   // MFEA 4
    
    //console.log(req);   // MFEA 4
    // body-parser adds an additional key("body") to the incoming request data --> body : {name:'xyz' , phone:'1234'}  // MFEA 5
    //console.log(req.body);  // MFEA 5
    //console.log(req.body.name);
    //console.log(req.body.phone);

/*  contactList.push({    // MFEA 5
        name : req.body.name , 
        phone : req.body.phone
    });
    return res.redirect('/threeidiots');
*/

    /* contactList.push(req.body);  // MFEA 5
    return res.redirect('back'); */

    /*As long as the server keeps running, all the contacts you add to our contact-list will remain intact (even if you refresh the page).
But as soon as you kill the server, all those extra added contacts will be lost. */    // MFEA 5


    /* Now as we know how to populate a database, we no longer require to push contacts into the variable 'contactList'. 
       Instead, we will push contacts to our database using the imported model "Contact" */

    Contact.create({     //Populating the DB     // MFEA 11
        // request.body;
        name : req.body.name ,
        phone : req.body.phone
    }, function (err, newContact){
        if(err){console.log('error in creating a contact'); return; }
        console.log('********', newContact);
        return res.redirect('back');
    });   

});



/*
app.get('/delete-contact/:phoneNo' , function(req,res){   // MFEA 8
    console.log(req.params);
    let phone = req.params.phoneNo;
});
*/ 
/* Note that when we simply have a param, we only pass the value (without a key). The corresponding key to that value has been declared
 inside the route (in the above example, it is "phoneNo"). In the other two cases of query param and query string param, both the keys 
 and their corresponding values are passed.
   */
 

/*


app.get('/delete-contact/', function(req,res){     // MFEA 8
    // We have used a GET request here and therefore sensitive data shouldn't be handled by this route as the data sent over GET ends 
    // up being revealed in the URL. For sensitive data, POST request is recommended. However irrespective of request being GET or POST,
    // one could always "inspect" the page and view the data being sent under "Network" --> "payload" 
    
    console.log(req.query); 
    let phone = req.query.phone; 

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone); 
    // If the function body within the curly braces contains only a single statement, then the braces can be omitted. 
    // An arrow function with curly braces must include the return keyword. 
    let contactIndex = contactList.findIndex(function (conta){ return(conta.phone==phone); });   // MFEA 8
    // "conta" is a variable that takes each element of the array (contactList) as a value one by one until the first match is found 
    //  or all the elements have been accessed once. 
    if(contactIndex!=-1){
        contactList.splice(contactIndex, 1); 
        // The first arguement of the splice function tells which index to begin removing from, and second one tells how many elements
        // to pick for removal. 
    }
    return res.redirect('back');
});
// The findIndex() method executes a function for each array element.   // MFEA 8
// The findIndex() method returns the index (position) of the first element that passes a test. 
// The findIndex() method returns -1 if no match is found. 
// The findIndex() method does not execute the function for empty array elements. 
// The findIndex() method does not change the original array. 


 */

app.get('/delete-contact/', function(req,res){     // MFEA 13
    // Deleting from DB 

    //get the id from the query in the URL
    let id=req.query.id;

    // find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from the database');
            return;
        }
        return res.redirect('back');
    });

});    

app.listen(port, function(err){  // MFEA 1
    if(err){
        console.log('Error in running the server ', err);
    }
    console.log('The express server is up and running on port ', port)
}); 
