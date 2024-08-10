/*=============================================='Navbar Animations and color-theme'===================================================*/
let scrollPos = 0;

function headerEffects() {
    const header = document.querySelector(".header .container");

    /*------------------------------------- Visibility -------------------------------------*/

    if (window.scrollY > scrollPos) { // scrolled up
        header.setAttribute("style", "transform:translate( 0 , -100%)");
    } else { //scrolled down
        header.setAttribute("style", "transform:translate( 0)");
    }
    scrollPos = window.scrollY;

    /*------------------------------------- Color - Theme -------------------------------------*/

    const darkLoaders = document.querySelectorAll(".load-dark");

    for (const page of darkLoaders) {
        let rect = page.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -1 * document.documentElement.clientHeight) {
            header.classList.remove("light")
            header.classList.add("dark")
            break;
        } else {
            header.classList.remove("dark")
            header.classList.add("light")
        }
    }
}

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='OnLod Effects '===================================================*/

const onLoadObjects = [];

function OnLoadEffects(sectionSelector, toNullify = true) {
    this.section = typeof sectionSelector === "string" ? document.querySelector(sectionSelector) : sectionSelector;
    onLoadObjects.push(this);
    this.toNullify = toNullify; // FIX for bug above
    this.Elements = {
        "pop": [],
        "blur": [],
        "blink": []
    };

    this.addPopEffect = function (selector, popDirection = "center", delay = "0", duration = "0.5s") {
        selector = typeof selector === "string" ? this.section.querySelector(selector) : selector;
        selector.setAttribute("style", `--delay : ${delay}; --duration : ${duration} ; --origin : ${popDirection} ;`);
        selector.classList.add("pop-hide");
        this.Elements["pop"].push(selector);
    }

    this.addBlinkEffect = function (selector, blinkDirection = null, delay = "0", duration = "0.5s") {
        selector = typeof selector === "string" ? this.section.querySelector(selector) : selector;
        selector.setAttribute("style", `--delay : ${delay}; --duration : ${duration} ; --origin : ${blinkDirection} ;`);
        this.Elements["blink"].push(selector);
    }

    this.addBlurEffect = function (selector,blurRadius = "10px" , delay = "0", duration = "0.5s") {
        selector = typeof selector === "string" ? this.section.querySelector(selector) : selector;
        selector.setAttribute("style", `--blur-radius : ${blurRadius} ;--delay : ${delay}; --duration : ${duration};`);
        selector.classList.add("blur");
        this.Elements["blur"].push(selector);
    }
    
    this.appearAll = function () {
        for (const effect in this.Elements) {
            for (const effectElement of this.Elements[effect]) {
                effectElement.classList.add(`${effect}-appear`);
            }
        }
    }
}

function onLoad() {
    for (let i = 0; i < onLoadObjects.length; i++) {
        let obj = onLoadObjects[i];
        if (obj === null) continue;
        const rect = obj.section.getBoundingClientRect();
        let height = document.documentElement.clientHeight;
        // let height =  rect.height;
        if (rect.top <= height / 2 && rect.top >= -1 * height / 2) {
            console.log(obj.section.classList , rect.top , height)
            obj.appearAll();

            /*Tip : rather than checking each section again , once reached viewport, null it value
                   * onLoadObjects[i] = null ;
             *Bug : When a section has position sticky with bottom defined , it is preloading before it is visible on viewport
                   * because once its previous section loads , it removed from `onLoadObjects` , and then even on a small scroll 
                   * the next section with bottom sticky is detected and loaded even before user is on its previous section .
                   * same thing happens when scroll bottom to top and some section has position sticky to top 
             *Fix : detect section whose just next section has position sticky bottom , or previous has position sticky top, and not null that section .
                   * Add a boolean property to `OnLoadEffects` constructor function who take value whether to null it or not.
                   * consider adding sections whose before and after sections are in these cases , before those sections in 'onLoadObjects'. 
                   * i.e if previous section has sticky top , add this section after the section next to it with nullify as false .
             */
            if (obj.toNullify) {
                onLoadObjects[i] = null;
            }
            break;
        }
    }
}

/*-----------------------------------------------------------------------------------------------------------*/
let delayCounter =  1 ;
/*------------------------------------- Hero Section Pop -------------------------------------*/

const secHero  = new OnLoadEffects(".hero-section") ;
secHero.addPopEffect(" h1:first-child"  , "center" , "0" , "0.3s");
secHero.addPopEffect(" img"  , "center" , "0.2s" , "0.3s");
secHero.addPopEffect(" h1:last-child"  , "center" , "0.4s" , "0.3s");

/*------------------------------------- Adding onLoad Pop-ing effect on about section elements  -------------------------------------*/

const secAbout = document.querySelectorAll(".section-about .container");

for (const sectionAboutElement of secAbout) {
    let About = new OnLoadEffects(sectionAboutElement, false);
    About.addPopEffect(sectionAboutElement.firstElementChild, "left");
    About.addPopEffect(sectionAboutElement.lastElementChild, "right");
    sectionAboutElement.querySelector(".image").style.transitionDelay = "0.3s";
}
/*------------------------------------- Features element Onload Pop-ing effect  -------------------------------------*/

let secFeatures = new OnLoadEffects(".section-features");
secFeatures.addPopEffect("h2");

delayCounter = 1;

for (let featureCard of document.querySelectorAll(".section-features .features .feature-card")) {
    secFeatures.addPopEffect(featureCard, "center", `${0.3 * delayCounter++}s`);
}

/*------------------------------------- Products - Blink text and Cards pop  -------------------------------------*/

let secProduct = new OnLoadEffects(".section-productsHome" , false);
secProduct.addBlinkEffect(".curved-text", "bottom", "1s")

delayCounter =  1 ;
for (let productCard of document.querySelectorAll(".section-productsHome .products-card")) {
    secProduct.addPopEffect(productCard, "center", `${0.3 * delayCounter++}s`);
}

/*------------------------------------- Recipes - cards pop -------------------------------------*/
let secRecipes = new OnLoadEffects(".section-recipes" , false);
delayCounter =  0 ;

for (let recipeCard of document.querySelectorAll(".section-recipes .recipe-card")) {
    secRecipes.addPopEffect(recipeCard, "center", `${0.3 * delayCounter++}s`);
}
/*------------------------------------- Contact-home pop and  blur effect  -------------------------------------*/
let secContactHome = new OnLoadEffects(".section-contact-home");
secContactHome.addPopEffect("h2");
secContactHome.addPopEffect("a" , "center" , "0.3s");
secContactHome.addBlurEffect("img" , "10px" , "0.3s" , "0.7s");


/*------------------------------------- Footer effects -------------------------------------*/

let secFooter = new OnLoadEffects("footer");
secFooter.addBlinkEffect(".curved-text" , "bottom" , "0.5s");

/*------------------------------------- Scroll effect -------------------------------------*/

document.addEventListener("scroll", () => {
    headerEffects();
    onLoad();
})

document.addEventListener("DOMContentLoaded" , ()=>{
    setTimeout(onLoad , 300);
})
// Todo :  notes of how to detect scroll-direction and element load 


