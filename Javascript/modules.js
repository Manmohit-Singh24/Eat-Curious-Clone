/*=============================================='Document scroll events'===================================================*/
let scrollPos = 0;

let scrollFunctions = [ onLoad ]

function addScrollCallback(functionName){
    scrollFunctions.push(functionName);
}

document.addEventListener("scroll", () => {
    for (const func of scrollFunctions) func();
    scrollPos = window.scrollY;
})

/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Document Content Load Events'===================================================*/
let DOMLoadFunctions = [ onLoad ]

function addDOMLoadCallback(callbackFunction){
    DOMLoadFunctions.push(callbackFunction);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(onLoad, 300); // 300 ms so that hide class is added to components on screen viewport
    for (const func of DOMLoadFunctions) func();
})

// Todo :  notes of how to detect scroll-direction and element load

/*-----------------------------------------------------------------------------------------------------------*/


/*=============================================='OnLod Effects '===================================================*/

const onLoadObjects = [];

function OnLoadEffects(sectionSelector, toNullify = true) {
    this.section = typeof sectionSelector === "string" ? document.querySelector(sectionSelector) : sectionSelector;
    onLoadObjects.push(this);
    this.toNullify = toNullify; //FIX for bug above
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

    this.addBlurEffect = function (selector, blurRadius = "10px", delay = "0", duration = "0.5s") {
        selector = typeof selector === "string" ? this.section.querySelector(selector) : selector;
        selector.setAttribute("style", `--blur-radius : ${blurRadius} ;--delay : ${delay}; --duration : ${duration};`);
        selector.classList.add("blur");
        this.Elements["blur"].push(selector);
    }
    this.extraToElem = function (){}
    this.extraToSec = function (){}
    this.appearAll = function () {
        for (const effect in this.Elements) {
            for (const effectElement of this.Elements[effect]) {
                effectElement.classList.add(`${effect}-appear`);
                this.extraToElem(effectElement);
            }
        }
        this.extraToSec();
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
            // console.log(obj.section.classList , rect.top , height)
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
/*=============================================='Nav-Bar'===================================================*/
// SMALL NAVBAR : 
let smNavBtn = document.querySelector(".small-navbar .nav-btn");
let smNavDisplay = document.querySelector( ".nav-btn-clicked");
smNavBtn.addEventListener("click", (e) => {
    smNavDisplay.classList.toggle("hide")
    smNavBtn.classList.toggle("clicked");
    for (const child of smNavDisplay.children) {
        // child.classList.toggle("pop-hide");
        setTimeout(()=>{child.classList.toggle("pop-appear");} , 10)
        console.log(child);
        console.log(child.classList);
    }
})
/*-----------------------------------------------------------------------------------------------------------*/
/*=============================================='Inputs'===================================================*/

function userTyping() {
    
    const inputFields = document.querySelectorAll(".input-div input , .input-div textarea");
    console.log(inputFields);
    for (const input of inputFields) {

        function action() {
            if (input.value === '') {
                input.classList.remove("writing")
            } else {
                input.classList.add("writing");
            }
        }
        action();
        input.addEventListener("input", action);
    }
}
addDOMLoadCallback(userTyping);
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Q / A'===================================================*/
let secQA= document.querySelector(".section-QA");
for (const QAElement of secQA.children) {
    QAElement.addEventListener("click", (e) => {
        QAElement.classList.toggle("expanded");
        QAElement.classList.toggle("collapsed");
    })
}
/*-----------------------------------------------------------------------------------------------------------*/