let username = null;
let password = null;
let sessionId = null;
let cart_size = 0;
let cart_size_p = null;


function getProductID() {
    let urlSearchParams = new URLSearchParams(document.location.search);
    return urlSearchParams.get("categoryId");
}

function getSubCategory(id) {
    let category = id.slice(id.length - 1);
    return category;
}

let id = getProductID();

fetch("https://wiki-shop.onrender.com/categories/"+id+"/products")
    .then((response) => response.json())
    .then((data) => {
        let template = {};

        template.templateFunction = Handlebars.compile(`
        <section class="navigation-sidebar">
            <nav class="navigation">
                <ol>
                    <li><a href="index.html">Αρχική</a></li>
                    <li><a href="product-categories.html">Προϊόντα</a></li>
                </ol>
            </nav>
        </section>

        <div class="content-wrapper">
            <section class="products">
                <h1>{{title}}</h1>
                <div class="product-list">
                    {{#each this}}
                    <article id="articleID-{{id}}-{{subcategory_id}}" class="product-item">
                        <img src="{{image}}" alt="{{title}}">
                        <h2>{{title}}</h2>
                        <ul>
                            <li>Κωδικός Προϊόντος: {{id}}</li>
                            <li>Τιμή: {{cost}}€</li>
                        </ul>
                        <p>{{description}}</p>
                        <div class="button-wrapper">
                        <input type="button" id="cart" name="cart" value="Προσθήκη στο καλάθι" onclick="GetProduct({{id}},'{{title}}',{{subcategory_id}},{{cost}},'{{image}}')">
                        </div>    
                    </article>
                    {{/each}}
                </div>
            </section>
        </div>`);

        let content = template.templateFunction(data);

        let main = document.getElementById("category-main");
        main.innerHTML += content;
    });




fetch("https://wiki-shop.onrender.com/categories/"+id+"/subcategories")
    .then((response) => response.json())
    .then((data) => {
        let template = {};

        template.templateFunction = Handlebars.compile(`
        <input type="radio" name="subcats" id="radio-category0">
        <label for="radio-category0">All</label><br>
        {{#each this}}
        <input type="radio" name="subcats" id="radio-category{{id}}">
        <label for="radio-category{{id}}">{{title}}</label><br>
        {{/each}}`);

        let content = template.templateFunction(data);

        let header = document.getElementById("category-choose");
        header.innerHTML += content;

        let radioButtons = document.querySelectorAll("input[type=radio]");
        let products = document.querySelectorAll("article.product-item");

        radioButtons[0].checked = true;
        radioButtons[0].onclick = function() {
            if (radioButtons[0].checked) {
                for (let i=0; i<products.length; i++) {
                    products[i].style.display = "block";
                }
            }
        };
        for (let i=1; i<radioButtons.length; i++) {
            radioButtons[i].onclick = function() {
                if (radioButtons[i].checked) {
                    let subCategory = getSubCategory(radioButtons[i].id);
                    for (let j=0; j<products.length; j++) {
                        let productsSubCategory = getSubCategory(products[j].id);
                        if (subCategory == productsSubCategory) {
                            products[j].style.display = "flex";
                        } else if (subCategory != productsSubCategory) {
                            products[j].style.display = "none";
                        }
                    }
                }
            }
        }
    });

function GetProduct(id,title,subcategory_id,cost,image){
let data = {id,title,subcategory_id,cost,image}

const options={
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({data,username,sessionId})
        }    
        fetch('http://localhost:8080/cart',options)
        .then(response=> response.json()            
        )
        .then(data => {

        if(data==400)
        {throw new Error("Failed To Add To Cart")}
        else{
            cart_size ++
            cart_size_p.innerHTML = "Πλήθος προϊόντων στο καλάθι : " + cart_size;
        }
        
    })
        .catch(error=>{alert("Παρακαλώ συνδεθείτε για προσθήκη προϊόντων στο καλάθι")})
        
}    

window.addEventListener('load',function(){
    cart_size_p = document.getElementById("cart_size")
    cart_size_p.innerHTML ="Πλήθος προϊόντων στο καλάθι : 0";
    const submit_button = document.getElementById('submit')
    submit_button.addEventListener('click',function(){
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        let user = {username,password}
        let options={
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
        }    
        fetch('http://localhost:8080/login',options)
        .then(response=> response.json()            
        )
        .then(data => {

        if(data==400)
        {   sessionId=0
            throw new Error("Ανεπιτυχής σύνδεση!")}
        else
        { 
            const erro_msg = document.getElementById("error")
            erro_msg.innerHTML = "Επιτυχής σύνδεση!"
            sessionId=data
            user = {username,sessionId}
             console.log(user)
             options={
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(user)
            }
            fetch('http://localhost:8080/cart_size',options)
            .then(response=> response.json())
                .then(data => {
                    console.log(data.size)
                    cart_size = data.size
                    cart_size_p.innerHTML = "Πλήθος προϊόντων στο καλάθι : " + cart_size;})
            
        }
        
    })
        .catch(error=>{
            const erro_msg = document.getElementById("error")
            erro_msg.innerHTML = error
        })
    })

})
