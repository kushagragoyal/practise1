var Form = document.getElementById('my-form')   //CALLING FORM ELEMENT BY ID
Form.addEventListener('submit', addUser);       //CALLING addUser WHEN WE CLICK ON SUBMIT BUTTON


//BELOW CODE IS TO LOAD DATA FROM SERVER AND DISPLAY IT ON WEB PAGE
function loadUserDataFromServer() {
    axios.get("https://crudcrud.com/api/a0ce359e4e4f464f9dc671cb93e98ff3/AppointmentData")
    //THIS IS GET REQUEST AND IT WORKS EXACTLY AS POST REQUEST WORKS
    .then((response) => {
        const userList = document.getElementById("list-main");  //CALLING list-main AND STROING IT IN userList
        userList.innerHTML = "";                                //REMOVING ALL THE PREVIOUS ELEMENT OF THE LIST

        //STARTING A FOREACH LOOP ON ALL THE DATA WHICH WE ARE GETTING FROM THE CRUDCRUD SERVER
        response.data.forEach((user) => {                       
        const listItem = document.createElement("li");  //CREATING THE LIST IN WHICH WE WILL STORE THE DATA
                                                        //AND ASSIGNING THE LIST TO listitem VARIABLE
        listItem.textContent = `Name: ${user.name}, Email: ${user.Email}`; //STORING DATA ONE BY ONE IN listItem
        userList.appendChild(listItem);                 //ADDING THIS listItem VARIABLE IN userList  
        
        //NOW AS PER THE TASK WE WANT ADD THE DELETE BUTTON FOR EACH AND EVERY USER
        var Del = document.createElement('button');         //CREATING A DELETE BUTTON
        Del.classList.add('btn');                           //ADDING 'btn' CLASS TO THE DELETE BUTTON
        Del.appendChild(document.createTextNode('Delete')); //GIVING 'Delete' TEXT TO THE DELETE BUTTON
        Del.onclick = () => deleteUser(user._id)            //CALLING deleteUser FUNCTION, WHEN WE CLICK ON DEL
        //BUTTON, WE ARE DEFINING THIS INSIDE FOR LOOP AS WE WANT THIS FUNCTION TO GET CALLED FOR EACH AND EVERY 
        //DELETE BUTTON
        userList.appendChild(Del)                           //ADDING THIS DELETE BUTTON IN userList
            });
        })
        .catch((error) => {
            console.error(error);
        });
        
    }

    window.onload = function() {//CALLING THE DATA FROM THE SERVER WHENEVER PAGE IS LOADED/REFRESHED AS REQ. IN TASK
    loadUserDataFromServer(); 
};


function addUser(e) {
    e.preventDefault()                          //IT PREVENTS DEFAULT ACTION OF THE EVENT FROM HAPPENING.

    var nameInput = document.getElementById('name').value;   //STROING NAME AND EMAIL VALUE IN nameInput AND
    var emailInput = document.getElementById('email').value; //emailInput VARIABLE

    let user = {                                //CREATING AN OBJECT IN WHICH WE ARE STORING NAME AND EMAIL
        name: nameInput,                        //OF THE USER
        Email: emailInput,
    }
    let user_serialized = JSON.stringify(user); //CONVERTING OBJECT TO STRING, AS IN LOCAL STROAGE ONLY STRING
                                                //CAN BE STORED

    //BELOW COMMENTED CODE STORES DATA IN LOCAL STORAGE
    //localStorage.setItem('user' + emailInput, user_serialized)    //DEFINEING KEY AS (USER+emailInput)
    
    //NOW INSTEAD OF ABOVE CODE WE WILL USE BELOW CODE IN WHICH WE WILL BE MAKING NETWORK CALL TO CRUDCRUD
    //AND STROING THE DATA THEIR
    axios.post("https://crudcrud.com/api/a0ce359e4e4f464f9dc671cb93e98ff3/AppointmentData", user)
    //1ST WE HAVE TO MENTION THE REQUEST WE ARE DOING (post), THEN THE SERVER TO WHICH WE ARE DOING THE REQUEST
    //(CRUDCRUD) AND IN LAST WE HAVE TO MENTION THE DATA WHICH WE WANT TO LOAD IN CRUDCRUD (user)
        .then((response) => {           //WHILE MAKING ANY NETWORK CALL WE WILL HAVE TO MENTION IT'S RESPECTIVE
        console.log(response);      //.then and .catch
        loadUserDataFromServer();   
        })
        .catch((err) => {
            console.log(err);
        });
}

//AS PER THE TASK WHEN WE CLICK ON DELETE BUTTON, THE USER SHOULD GET DELETED FROM CRUDCRUD AND IT SHOULD 
//ALSO NOT BE VISIBLE WHEN WE REFRESH THE PAGE.
function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/a0ce359e4e4f464f9dc671cb93e98ff3/AppointmentData/${userId}`)
        .then(() => {           
        loadUserDataFromServer();   
        })
        .catch((err) => {
            console.log(err);
        });
    
    }


    
    