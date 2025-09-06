// js/contact-form.js

export function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    if (!contactForm) return;

    async function handleFormSubmit(event) {
        event.preventDefault();
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