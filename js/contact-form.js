// js/contact-form.js (TELJES, VALIDÁCIÓVAL BŐVÍTETT KÓD)

export function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const formStatus = document.getElementById('form-status');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // === HIBakezelő segédfüggvények ===
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        // Keressük meg a hibaüzenet elemét, vagy hozzuk létre, ha nincs
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearErrors() {
        const errorGroups = contactForm.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });
        formStatus.textContent = '';
        formStatus.className = '';
    }

    // === Validációs logika ===
    function validateForm() {
        let isValid = true;
        clearErrors(); // Töröljük a korábbi hibákat minden próbálkozásnál

        // Név ellenőrzése
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'A név megadása kötelező.');
            isValid = false;
        }

        // E-mail ellenőrzése
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Az e-mail cím megadása kötelező.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Kérlek, érvényes e-mail címet adj meg.');
            isValid = false;
        }

        // Üzenet ellenőrzése
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Az üzenetnek legalább 10 karakter hosszúnak kell lennie.');
            isValid = false;
        }

        return isValid;
    }
    
    // === Az eredeti formküldő függvény, kiegészítve a validációval ===
    async function handleFormSubmit(event) {
        event.preventDefault();

        // 1. LÉPÉS: ELLENŐRZÉS
        if (!validateForm()) {
            formStatus.textContent = 'Kérlek, javítsd a pirossal jelölt hibákat!';
            formStatus.className = 'error';
            return; // Ha a validáció hibát talál, nem megyünk tovább
        }

        // 2. LÉPÉS: KÜLDÉS (csak ha minden rendben van)
        const formData = new FormData(event.target);
        formStatus.textContent = 'Küldés folyamatban...';
        formStatus.className = 'info';

        try {
            const response = await fetch(event.target.action, {
                method: event.target.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formStatus.textContent = 'Köszönöm a megkeresést! Hamarosan válaszolok.';
                formStatus.className = 'success';
                contactForm.reset();
            } else {
                throw new Error('Hálózati hiba.');
            }
        } catch (error) {
            formStatus.textContent = 'Hiba történt a küldés során. Kérlek, próbáld újra!';
            formStatus.className = 'error';
        }
    }

    contactForm.addEventListener('submit', handleFormSubmit);
}