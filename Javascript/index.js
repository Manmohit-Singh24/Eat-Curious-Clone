let counter ;
/*=============================================='Navbar Animations and color-theme'===================================================*/

function headerEffects() {
    const headerList = document.querySelectorAll(".header .container");

    for (const header of headerList) {
        /*------------------------------------- Visibility -------------------------------------*/

        if (window.scrollY > scrollPos) { // scrolled up
            header.setAttribute("style", "transform:translate( 0 , -100%)");
        } else { //scrolled down
            header.setAttribute("style", "transform:translate( 0)");
        }

        /*------------------------------------- Color - Theme -------------------------------------*/

        const darkLoaders = document.querySelectorAll(".load-dark");

        for (const page of darkLoaders) {
            let rect = page.getBoundingClientRect();
            if (rect.top <= 100 && rect.top >= -1 * document.documentElement.clientHeight) {
                header.classList.add("dark")
                break;
            } else {
                header.classList.remove("dark")
            }
        }
    }
    
}
addScrollCallback(headerEffects);

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Sticker Rotation'===================================================*/

let sticker = document.querySelector(".rotating-sicker");
let prevAngle = 0;

function rotateSticker() {
    prevAngle = (prevAngle + (window.scrollY - scrollPos) / 7) % 360;
    sticker.setAttribute("style", `transform:rotate(${prevAngle}deg)`);
}
addScrollCallback(rotateSticker);

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Hero Section Pop Effect'===================================================*/

const secHero = new OnLoadEffects(".hero-section");
secHero.addPopEffect(" .hero-heading-1", "center", "0", "0.3s");
secHero.addPopEffect(" img", "center", "0.2s", "0.3s");
secHero.addPopEffect(" .hero-heading-2", "center", "0.4s", "0.3s");

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='About sections Pop Effect'===================================================*/

const secAbout = document.querySelectorAll(".section-about .container");

for (let i = 0; i < secAbout.length; i++) {
    let About = new OnLoadEffects(secAbout[i], false);
    let textPopDir = "right";
    if (i === 0 || i===2 ){ textPopDir = "left" ; }
    About.addPopEffect("h2", textPopDir);
    About.addPopEffect("p", textPopDir);
    About.addPopEffect(".image" , textPopDir ==="right" ? "left" : "right" ,"0.3s");
}
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Features Pop Effect'===================================================*/

const secFeatures = new OnLoadEffects(".section-features");
secFeatures.addPopEffect("h2");
counter = 1;
for (let featureCard of document.querySelectorAll(".section-features .features .feature-card")) {
    secFeatures.addPopEffect(featureCard, "center", `${0.3 * counter++}s`);
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Products - Blink text and Card Pop'===================================================*/
const secProduct = new OnLoadEffects(".section-productsHome", false);
secProduct.addBlinkEffect(".curved-text", "bottom", "1s")

counter = 1;
for (let productCard of document.querySelectorAll(".section-productsHome .products-card")) {
    secProduct.addPopEffect(productCard, "center", `${0.3 * counter++}s`);
}
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Recipes Card Pop Effect'===================================================*/
const secRecipes = new OnLoadEffects(".section-recipes", false);
secRecipes.extraToElem=function (element){
    // console.log(element)
    setTimeout(()=>{
        element.style.setProperty("--delay", `0`);
    } , 500)
}

counter = 0;

for (let recipeCard of document.querySelectorAll(".section-recipes .recipe-card")) {
    secRecipes.addPopEffect(recipeCard, "center", `${0.3 * counter++}s`);
}
/*------------------------------------- Background set for recipes -------------------------------------*/

let recipeCardList = document.querySelectorAll(".section-recipes .recipe-card" )
let bgColor = [ "yellow" , "green" ,"yellow", "green" , "green" , "yellow" , "green"]

counter = 1 ;
for (const recipeCard of recipeCardList) {
    recipeCard.querySelector("span").style.backgroundColor = `var(--${bgColor[counter-1]})`;
    recipeCard.style.backgroundImage=  `url(" Resources/Images/Recipes/Recipes-${counter++}.webp")`
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='ContactHome - Pop and Blur Effect'===================================================*/

const secContactHome = new OnLoadEffects(".section-contact-home");
secContactHome.addPopEffect("h2");
secContactHome.addPopEffect("a", "center", "0.3s");
secContactHome.addBlurEffect("img", "10px", "0.3s", "0.7s");

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Footer Blink text'===================================================*/

const secFooter = new OnLoadEffects("footer");
secFooter.addBlinkEffect(".curved-text", "bottom", "0.5s");

/*-----------------------------------------------------------------------------------------------------------*/

//Todo : Add hover and click effects on recipes cards .



