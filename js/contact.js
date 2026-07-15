document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    // ফর্ম সরিয়ে সাকসেস মেসেজ দেখানো
                    contactForm.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px;">
                            <div style="width: 60px; height: 60px; background: rgba(0, 255, 65, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--primary-green);">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h2 style="color: #fff; margin-bottom: 10px;">Message Sent!</h2>
                            <p style="color: rgba(255, 255, 255, 0.7); line-height: 1.6;">Thank you, ${data.name}. I have received your message and will get back to you soon.</p>
                            <button onclick="location.reload()" style="margin-top: 25px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 12px; cursor: pointer;">Send Another Message</button>
                        </div>
                    `;
                } else {
                    alert('Error: Please try again or make sure you are online.');
                }
            })
            .catch(error => {
                alert('Connection Error: FormSubmit requires a web server to deliver emails.');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                }
            });
        });
    }
}
