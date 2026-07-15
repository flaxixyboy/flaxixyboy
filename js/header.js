document.addEventListener('DOMContentLoaded', () => {
    console.log('Flaxixy Boy Header Initialized');

    // Add scroll effect
    const header = document.querySelector('.iris-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});

/**
 * Function to load header dynamically if needed
 * This can be used in main.js
 */
async function loadHeader(elementId) {
    try {
        const response = await fetch('html/header.html');
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
    } catch (error) {
        console.error('Error loading header:', error);
    }
}
