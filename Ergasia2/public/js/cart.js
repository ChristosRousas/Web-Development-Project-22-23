window.addEventListener('load',function(){
    let costumer = getCostumer();
    let user={"username" : costumer.username,"sessionId" : costumer.sessionId}
    let options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(user)
    }     
    
    fetch('http://localhost:8080/cart_show',options)
    .then(response=>response.json())
    .then(data=>{
        if(data==400)
        {   sessionId=0
            throw new Error("Απαιτείται πρώτα η σύνδεση του χρήστη στον λογαριασμό του για να προβληθεί το καλάθι του!")}
        else{
        let template = {}

        template.templateFunction=Handlebars.compile(
        `
        <table class="cart-table">
            <tr class="table-header">
                <th>Title</th>
                <th>Cost</th>
                <th>Quantity</th>
            </tr>
            {{#each cartItems}}
            <tr>
                <td>{{title}}</td>
                <td>{{cost}}</td> 
                <td>{{quantity}}</td>
            </tr>
            {{/each}}
        </table>
        <p> Total Cost : {{totalCost}} </p>
        `
        )

        let content = template.templateFunction(data);
        let main = document.getElementById("category-main");
        main.innerHTML += content;
    }})
    .catch(error=>{
        let template = {}

        template.templateFunction=Handlebars.compile(
        ` 
        <p> {{this}} </p>
        `)
        let content = template.templateFunction(error);
        let main = document.getElementById("category-main");
        main.innerHTML += content;

    })
})

function getCostumer() {
    let urlSearchParams = new URLSearchParams(document.location.search);
    let username = urlSearchParams.get("username");
    let sessionId = urlSearchParams.get("sessionId");
    return {username,sessionId}
}