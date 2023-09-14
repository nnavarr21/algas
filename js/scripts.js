/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    /*
        const slidesContainer = document.getElementById("slides-container");
        const slide = document.querySelector(".slide");
        const prevButton = document.getElementById("slide-arrow-prev");
        const nextButton = document.getElementById("slide-arrow-next");
        const sliderimg = document.querySelector(".slider-img");
    
        nextButton.addEventListener("click", () => {
            const slideWidth = slide.clientWidth;
    
            slidesContainer.scrollLeft += slideWidth;
        });
    
        prevButton.addEventListener("click", () => {
            const slideWidth = slide.clientWidth;
            slidesContainer.scrollLeft -= slideWidth;
        });
    */
    // CONTACT FORM
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();

                    form.querySelectorAll(":invalid")[0].focus();
                } else {
                    /*
                     * Form Submission using fetch()
                     */

                    const formData = new FormData(form);
                    event.preventDefault();
                    event.stopPropagation();
                    const object = {};
                    formData.forEach((value, key) => {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    result.innerHTML = "Please wait...";

                    fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: json
                    })
                        .then(async (response) => {
                            let json = await response.json();
                            if (response.status == 200) {
                                result.innerHTML = json.message;
                                result.classList.remove("text-gray-500");
                                result.classList.add("text-green-500");
                            } else {
                                console.log(response);
                                result.innerHTML = json.message;
                                result.classList.remove("text-gray-500");
                                result.classList.add("text-red-500");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            result.innerHTML = "Something went wrong!";
                        })
                        .then(function () {
                            form.reset();
                            form.classList.remove("was-validated");
                            setTimeout(() => {
                                result.style.display = "none";
                            }, 5000);
                        });
                }
                form.classList.add("was-validated");
            },
            false
        );
    });

});