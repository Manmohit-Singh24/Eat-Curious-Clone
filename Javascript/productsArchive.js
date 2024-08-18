const products = document.querySelectorAll('.section-productsArchive a');


for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("mouseover", (e) => {
        addColors(e.target, i);
        sideImagesAppear(e.target)
    });
    products[i].addEventListener("mouseout", (e) => {
        removeColors(e.target, i);
        sideImagesHide(e.target)
    });

}

let bgColor = ["yellow", "green", "green", "yellow", "green", "yellow", "green"]

function addColors(target, i) {
    for (const product of products) {
        if (product !== target) product.style.color = "var(--darkgreen)"
        document.querySelector("html").style.backgroundColor = `var(--${bgColor[i]})`;
        document.querySelector(".header").classList.add("dark");
    }
}

function removeColors(target, i) {
    for (const product of products) {
        if (product !== target) product.style.color = "var(--white)"
        document.querySelector("html").style.backgroundColor = "var(--darkgreen)"
        document.querySelector(".header").classList.remove("dark");
    }
}
const sideImages = document.querySelectorAll(".side-images");
for (let i = 0; i < sideImages.length; i++) {
    for (const sideImage of sideImages[i].children) {
        sideImage.style.backgroundImage = `url(Resources/Images/Products-page/products-img-${i+1}.webp)`
    }
}

function sideImagesAppear(target) {
    // console.log()
    console.log(target.nextElementSibling)
    // const sideImages = target.querySelector(`.side-images`);
    target.nextElementSibling.classList.add("appear");
    // sideImages.classList.remove("hide");
}

function sideImagesHide(target ) {
    // const sideImages = target.querySelector(`.side-images`);
    target.nextElementSibling.classList.remove("appear");
    // sideImages.classList.add("hide");
}