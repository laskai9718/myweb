// js/contact-form.js (OPTIMALIZÁLT ÉS BIZTONSÁGOS VERZIÓ)

export function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Segédfüggvény a hiba megjelenítéséhez
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;

        // Eseményfigyelő: ha elkezd gépelni, eltűnik a piros keret
        input.addEventListener('input', () => {
            formGroup.classList.remove('error');
        }, { once: true });
    }

    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        // Összes korábbi hiba törlése
        contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        // E-mail validáció
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Érvényes e-mail címet adj meg!');
            isValid = false;
        }

        // Üres mezők és hosszak ellenőrzése
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, 'Ezt a mezőt kötelező kitölteni!');
                isValid = false;
            }
        });

        // Ha van hiba, az elsőhöz görgetünk
        if (!isValid) {
            const firstError = contactForm.querySelector('.error');
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        // 1. Honeypot védelem (Ha a rejtett 'website' mező nem üres, botról van szó)
        const honeypot = event.target.querySelector('input[name="_gotcha"]');
        if (honeypot && honeypot.value !== "") return;

        if (!validateForm()) return;

        // Gomb blokkolása a dupla küldés ellen
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Küldés...';

        const formData = new FormData(event.target);
        formStatus.className = 'form-status info show';
        formStatus.textContent = 'Üzenet küldése folyamatban...';

        try {
            const response = await fetch(event.target.action, {
                method: event.target.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.className = 'form-status success show';
                formStatus.textContent = 'Köszönöm! Az üzenetet sikeresen megkaptam.';
                contactForm.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            formStatus.className = 'form-status error show';
            formStatus.textContent = 'Sajnos hiba történt. Kérlek, próbáld meg később!';
        } finally {
            // Gomb visszaállítása
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Státuszüzenet eltüntetése 5 másodperc után
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        }
    }

    contactForm.addEventListener('submit', handleFormSubmit);
}