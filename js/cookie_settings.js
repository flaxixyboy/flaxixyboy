document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveCookieSettings');

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // In a real application, you would save these preferences in localStorage or a database
            alert('Your cookie preferences have been saved successfully!');
        });
    }
});
