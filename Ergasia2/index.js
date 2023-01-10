const express = require('express')
const path = require('path')
const app = express()
const port = 8080
const { v4: uuidv4 } = require('uuid');
app.listen(port)
users=[{
    "username" : "Username1",
    "password" : "Password1",
    "cart" : []
},{
    "username" : "Username2",
    "password" : "Password2",
    "cart" : []
}]
/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('./public/index.html', options, function(err){
        console.log(err)
    })
})

app.post('/login', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let found = false;
    var i=0;
    while(i<users.length && !found){
        if(username===users[i].username){
            if(password === users[i].password){
                found = true;
            }
            else{
                i++;
            }
        }else{
            i++;
        }
    }
    if(found){
        const sessionId = uuidv4();
        
        res.json({"sessionId" : sessionId })
        users[i].sessionId = sessionId;
    }
    else{
        res.json(400)
    }
})

app.post('/cart', (req,res)=>{
    var costumer = FindCostumer(req)
    var i = costumer.i
    let found = costumer.found
    if(found){
        var p=0;
        found = false
        while(p<users[i].cart.length && !found){
            if(users[i].cart[p].id == req.body.data.id){
                found = true
                users[i].cart[p].quantity++
            }else{
                p++
            }
        }
        if(!found){
            req.body.data.quantity =1
            users[i].cart.push(req.body.data)
        }
        
        res.json(200)
    }
    else{
        res.json(400)
    }

})
app.post('/cart_show',(req,res) => {
    var costumer = FindCostumer(req)
    let sum = 0;
    if(costumer.found){
        users[costumer.i].cart.forEach(element => {sum+=element.cost * element.quantity})
        res.json({"cartItems" : users[costumer.i].cart,"totalCost" : sum})
    }
else{
    res.json(400)
}
})

app.post('/cart_size',(req,res) => {
    var costumer = FindCostumer(req)
    var i = costumer.i
    let found = costumer.found
    if(found){
        var sum = 0;
        for(p=0;p<users[i].cart.length;p++){
            sum+= users[i].cart[p].quantity
        }
    res.json({"size" : sum})
}
else{
    res.json(400)
}
})

function FindCostumer(req){
    let found = false;
    let i =0;
    while(i<users.length&& !found){
        if(req.body.username===users[i].username){
            if(req.body.sessionId===users[i].sessionId){
                found=true;
            }
            else{
                i++;
            }
        }
        else{
            i++
        }
    }
    return {found,i};
}