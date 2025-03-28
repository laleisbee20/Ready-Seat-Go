document.addEventListener("DOMContentLoaded", function () {
    // ==========================
    // Select DOM Elements
    // ==========================
    const passwordInput = document.getElementById("password-input");
    const togglePasswordIcon = document.getElementById("toggle-password");

    // ==========================
    // Toggle Password Visibility
    // ==========================
    togglePasswordIcon.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordIcon.classList.remove("fa-eye"); 
            togglePasswordIcon.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            togglePasswordIcon.classList.remove("fa-eye-slash");
            togglePasswordIcon.classList.add("fa-eye");
        }
    });

    // ==========================
    // Floating Label Effect
    // ==========================
    const floatingInputs = document.querySelectorAll(".form-control.form-control-lg"); 

    floatingInputs.forEach((input) => {
        const label = input.nextElementSibling;
        if (label && label.classList.contains("form-label")) {
         
            if (input.value.trim() !== "") {
                label.classList.add("active");
            } 

            // Handle input events
            input.addEventListener("input", function () {
                if (this.value.trim() !== "") {
                    label.classList.add("active"); 
                } else {
                    label.classList.remove("active"); 
                }
            });

            // Handle focus and blur events
            input.addEventListener("focus", function () {
                label.classList.add("active");
            });
            input.addEventListener("blur", function () {
                // Do not remove the active class if there is content
                if (this.value.trim() === "") {
                    label.classList.remove("active");
                }
            });
        }
    });
    // ==========================
    // Floating Label for Dropdown
    // ==========================
    const selectElement = document.getElementById("attendee-type");
    const selectLabel = document.getElementById("lbl-attendee");

    if (selectElement && selectLabel) {
        console.log("Select Element:", selectElement);
        console.log("Select Label:", selectLabel);

        // Check if a dropdown item is selected on page load
        if (selectElement.value !== "") {
            selectLabel.classList.add("active");
        }

        // Handle dropdown change event
        selectElement.addEventListener("change", function () {
            console.log("Dropdown value changed:", this.value);
            if (this.value !== "") {
                selectLabel.classList.add("active");
            } else {
                selectLabel.classList.remove("active");
            }
        });

        // Handle blur event
        selectElement.addEventListener("blur", function () {
            console.log("Dropdown blurred:", this.value);
            if (this.value === "") {
                selectLabel.classList.remove("active");
            }
        });
    } else {
        console.error("Select element or label not found!");
    }

    // ==========================
    // Scrolling Mechanism for Accordion and Step Progress Bar
    // ==========================

    const signupFieldSection = document.getElementById("signup-field-section");
    const p1 = document.getElementById("signup-field-container-p1");
    const p2 = document.getElementById("signup-field-container-p2");
    const p3 = document.getElementById("signup-field-container-p3");

    // accordion collapse elements
    const accordionCollapseOne = new bootstrap.Collapse(document.getElementById("flush-collapseOne"), { toggle: false });
    const accordionCollapseTwo = new bootstrap.Collapse(document.getElementById("flush-collapseTwo"), { toggle: false });
    const accordionCollapseThree = new bootstrap.Collapse(document.getElementById("flush-collapseThree"), { toggle: false });
    const accordionCollapseFour= new bootstrap.Collapse(document.getElementById("flush-collapseFour"), { toggle: false });
    
    function handleScroll() {
        const scrollPosition = signupFieldSection.scrollTop;

        // the top positions of each section
        const p1Top = p1.offsetTop;
        const p2Top = p2.offsetTop;
        const p3Top = p3.offsetTop;

        // Expand/collapse accordion items based on scroll position
        if (scrollPosition < p2Top) {
            // Expand the first accordion item
            accordionCollapseOne.show();
            accordionCollapseTwo.hide();
            accordionCollapseThree.hide();
            accordionCollapseFour.hide();
            
        } else if (scrollPosition >= p2Top && scrollPosition < p3Top) {
            // Expand the second accordion item
            accordionCollapseOne.hide();
            accordionCollapseTwo.show();
            accordionCollapseThree.hide();
            accordionCollapseFour.hide();
        } else {
            // Expand the third accordion item
            accordionCollapseOne.hide();
            accordionCollapseTwo.hide();
            accordionCollapseThree.show();
            accordionCollapseFour.hide();
        }
    }

    signupFieldSection.addEventListener("scroll", handleScroll);
    handleScroll();

});