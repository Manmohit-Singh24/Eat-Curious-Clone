// let delayCounter = 0 ;
/*=============================================='Navbar'===================================================*/
function headerEffects() {
    const header = document.querySelector(".header .container");
    if (window.scrollY > scrollPos) { // scrolled up
        header.setAttribute("style", "transform:translate( 0 , -100%)");
    } else { //scrolled down
        header.setAttribute("style", "transform:translate( 0)");
    }
}
addScrollCallback(headerEffects);
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Curved Text'===================================================*/
const curveText = new OnLoadEffects(".contact-curvedText");
curveText.addPopEffect("svg")
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Contact-Form'===================================================*/
const secContactForm = new OnLoadEffects(".section-form");
secContactForm.addPopEffect(".left-text" , "left");
secContactForm.addPopEffect(".right-form" , "right" , '0.2s');
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Form '===================================================*/
const secFQA = new OnLoadEffects(".section-QA");
let QAList = document.querySelector(".section-QA").children;

for (let i = 0; i < QAList.length; i++) {
    secFQA.addPopEffect(QAList[i] , "center" , `${0.3*i}s`);
}
secFQA.extraToElem = function (element){
    setTimeout( ()=>{
        element.setAttribute("style", `--delay : 0;`) ;
    } , 100)
}
/*-----------------------------------------------------------------------------------------------------------*/

/*=============================================='Footer Blink text'===================================================*/

const secFooter = new OnLoadEffects("footer");
secFooter.addBlinkEffect(".curved-text", "bottom", "0.3s");

/*-----------------------------------------------------------------------------------------------------------*/
/*=============================================='Q/A'===================================================*/
let secQA= document.querySelector(".section-QA");
for (const QAElement of secQA.children) {
    addDropDown(QAElement);
}
/*-----------------------------------------------------------------------------------------------------------*/
