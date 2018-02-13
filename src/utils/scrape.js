const cheerio = require("cheerio")

const icaHtml = `
    <div id="ingredients-section" class="ingredients col-12 col-md-6 col-lg-5">
        <h2>Ingredienser</h2>
        <div class="servings-picker servings-picker--static" data-default-portions="14 st" data-current-portions="14 st">Portioner: <span class="servings-picker__servings">14 st</span></div>
        <strong>Bullar</strong>
        <ul class="ingredients__list">
            <li class="ingredients__list__item"><span class="ingredient" data-amount="25" data-type="g">25 g färsk jäst</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="2" data-type="dl">2 dl kall mjölk</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="0.75" data-type="dl">3/4 dl strösocker</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="1" data-type="tsk">1 tsk mortlade kardemummakärnor</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="1" data-type="krm">1 krm salt</span></li>                
            <li class="ingredients__list__item"><span class="ingredient" data-amount="5" data-type="dl">ca 5 dl vetemjöl (5 dl motsvarar ca 300 g)</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="75" data-type="g">75 g rumstempererat smör</span></li>
        </ul>
        <strong>Garnering</strong>
        <ul class="ingredients__list"> 
            <li class="ingredients__list__item"><span class="ingredient" data-amount="5" data-type="dl">5 dl vispgrädde</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="2" data-type="msk">2 msk florsocker</span></li>
            <li class="ingredients__list__item"><span class="ingredient" data-amount="125" data-type="g">125 g mörk bakchoklad (55%)</span></li>
        </ul>
        </div>
    </div>`;

const icaSelectors = {
    ingredients: ".ingredients__list__item .ingredient"
}

scrape = (html, selectors) => {
    // Parse HTML with Cheerio
    let $ = cheerio.load(html), pageData = {};

    // Log number of ingredients 
    console.log("Number of ingredients: " + ($(selectors['ingredients']).length));
    
    // Extract the data 
    Object.keys(selectors).forEach(k => {

        const ingredientsArray = [];

        $(selectors[k]).each(function(i, elem) {
            ingredientsArray[i] = {
                name: $(this).text(),
                amount: $(this).data('amount'),
                type: $(this).data('type')
            };
        });

        pageData[k] = ingredientsArray;
    });

    console.log(pageData);
}

scrape(icaHtml, icaSelectors);



