function updateAccordionBasedOnVisibility() {
    const sections = [
        { id: 'signup-field-container-p1', accordionId: 'flush-collapseOne' },
        { id: 'signup-field-container-p2', accordionId: 'flush-collapseTwo' },
        { id: 'signup-field-container-p3', accordionId: 'flush-collapseThree' }
    ];

    sections.forEach(section => {
        const element = document.getElementById(section.id);
        const accordion = document.getElementById(section.accordionId);
        const button = document.querySelector(`[data-bs-target="#${section.accordionId}"]`);

        if (element && accordion && button) {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight / 2) && 
                             (rect.bottom >= window.innerHeight / 2);

            // Initialize Bootstrap Collapse if not already done
            const collapseInstance = new bootstrap.Collapse(accordion, {
                toggle: false
            });

            if (isVisible) {
                collapseInstance.show();
                button.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
            } else {
                collapseInstance.hide();
                button.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {

    // DOM Elements
    const signupFieldSection = document.getElementById('signup-field-section');
    const formSections = document.querySelectorAll('.form-section');
    const progressItems = document.querySelectorAll('.stepper-item');
    const accordionButtons = document.querySelectorAll('.accordion-button');
    const accordionItems = document.querySelectorAll('.progress-item');    
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password-input');
    
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the icon between eye and eye-slash
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
      });
    } else {
      console.log("Password input or toggle button not found");
    }
    
    // Section to accordion mapping
    const sectionAccordionMap = {
        'signup-field-container-p1': 'flush-collapseOne',
        'signup-field-container-p2': 'flush-collapseTwo',
        'signup-field-container-p3': 'flush-collapseThree',
        'signup-field-container-p4': 'flush-collapseFour'
    };
    
    // Initialize
    let currentSection = 0;
    
    // Floating labels
    document.querySelectorAll('.form-control').forEach(input => {
        const label = input.nextElementSibling;
        
        if (input.value.trim() !== '') {
            label.classList.add('active');
        }
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
        
        input.addEventListener('focus', function() {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                label.classList.remove('active');
            }
        });
    });
    
    // Verification code inputs
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px 0px -40% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const accordionId = sectionAccordionMap[sectionId];
                const sectionIndex = Array.from(formSections).indexOf(entry.target);
                
                if (accordionId && sectionIndex >= 0) {
                    updateActiveSection(sectionIndex);
                    updateAccordionState(accordionId, true);
                }
            }
        });
    }, observerOptions);

    // Observe each form section
    formSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Accordion click handlers
    accordionButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(index);
        });
    });
    
    // Update accordion state
    function updateAccordionState(accordionId, shouldExpand) {
        const accordion = document.getElementById(accordionId);
        const button = document.querySelector(`[data-bs-target="#${accordionId}"]`);
        
        if (accordion && button) {
            const collapseInstance = bootstrap.Collapse.getInstance(accordion) || 
                                  new bootstrap.Collapse(accordion, { toggle: false });
            
            if (shouldExpand) {
                collapseInstance.show();
                button.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
            } else {
                collapseInstance.hide();
                button.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    // Update active section
    function updateActiveSection(index) {
        if (currentSection === index) return;
        
        currentSection = index;
        
        // Update progress bar
        progressItems.forEach((item, i) => {
            item.classList.remove('active', 'completed');
            
            if (i < index) {
                item.classList.add('completed');
                // Add this to ensure the connecting line stays colored
                if (i < progressItems.length - 1) {
                    item.classList.add('completed-line');
                }
            } else if (i === index) {
                item.classList.add('active');
            }
        });
        
        // Update form sections
        formSections.forEach((section, i) => {
            section.classList.toggle('active-section', i === index);
        });
    }
        
    // Scroll to section
    function scrollToSection(index) {
        if (index >= 0 && index < formSections.length) {
            formSections[index].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            // Force update the active section after scroll completes
            setTimeout(() => {
                updateActiveSection(index);
            }, 500);
        }
    }
        
    // Initialize
    updateActiveSection(0);
    updateAccordionState('flush-collapseOne', true);
    
    setTimeout(() => {
        formSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                updateActiveSection(index);
            }
        });
    }, 100);
    
    // Form submission
    document.getElementById('create-account')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Account created successfully!');
    });
    
    // Verify email button
    document.getElementById('verify-email')?.addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (!email) {
            alert('Please enter your email first');
            return;
        }
        
        // Simulate sending verification code
        this.disabled = true;
        const timer = document.getElementById('timer');
        timer.classList.remove('d-none');
        
        let timeLeft = 90;
        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.getElementById('resend-code').disabled = false;
                timer.classList.add('d-none');
            }
            
            timeLeft--;
        }, 1000);
        
        alert(`Verification code sent to ${email}`);
   
        // Observe all form sections
        document.querySelectorAll('.form-section').forEach(section => {
           observer.observe(section);
        });
        
        // Also update on scroll for sections leaving view
        window.addEventListener('scroll', function() {
           updateAccordionBasedOnVisibility();
        });
        
        // Initial update
        updateAccordionBasedOnVisibility();
    });
});

// Helper function to map section IDs to accordion IDs
function getAccordionIdForSection(sectionId) {
const mapping = {
    'signup-field-container-p1': 'flush-collapseOne',
    'signup-field-container-p2': 'flush-collapseTwo',
    'signup-field-container-p3': 'flush-collapseThree',
    'signup-field-container-p4': 'flush-collapseFour'
};
return mapping[sectionId];
}