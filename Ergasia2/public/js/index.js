fetch("https://wiki-shop.onrender.com/categories")
    .then((response) => response.json())
    .then((data) => {
        let template = {};

        template.templateFunction = Handlebars.compile(`

        <section class="navigation-sidebar">
            <nav class="navigation">
                <ol>
                    <li><a href="index.html">Κατηγορίες Προϊόντων</a></li>
                </ol>
            </nav>
        </section>
        <div class="content-wrapper">
            <section id="product-categories">
                <h2>Κατηγορίες Προϊόντων</h2>
                <ol id="category-list">
                    {{#each this}}
                    <li>
                        <section class="product-category">
                            <h3>{{title}}</h3>
                            <a href="category.html?categoryId={{id}}">
                                <img src="{{img_url}}" alt="{{title}}"/>
                            </a>
                        </section>
                    </li>
                    {{/each}}
                </ol>
            </section>
        </div>
        
        `);

        let content = template.templateFunction(data);

        let main = document.getElementById("product-categories-main");
        main.innerHTML += content;
    });