document.addEventListener("DOMContentLoaded", function () {
    // ==========================
    // Select DOM Elements
    // ==========================
    const passwordInput = document.getElementById("password-input");
    const togglePasswordIcon = document.getElementById("toggle-password");
    const inputs = document.querySelectorAll(".form-control");

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
    inputs.forEach((input) => {
        const label = input.nextElementSibling;
        if (label) {
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
                if (this.value.trim() === "") {
                    label.classList.remove("active");
                }
            });
        }
    });
});
