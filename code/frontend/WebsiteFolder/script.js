const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

function changeImage(element) {
    document.getElementById("mainArtifactImage").src = element.src;
}
