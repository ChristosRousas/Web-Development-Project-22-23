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