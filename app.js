// app.js

// --- Global Variables for Gallery ---
let currentImageIndex;
let modalImageElement; // Renamed to avoid conflict if 'modalImage' is an ID
let galleryImageSources = [];

// --- Sidebar Functions ---
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'flex';
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
}

// --- Lightbox/Gallery Modal Functions ---

// Function to gather images from the gallery on the current page
function initializePageGallery() {
    const imageElements = document.querySelectorAll("#gallery-row .image-container img");
    if (imageElements.length > 0) {
        galleryImageSources = Array.from(imageElements).map(img => img.src);
    } else {
        galleryImageSources = [];
    }
}

function openModal(imageSrc) {
    const modal = document.getElementById("galleryModal");
    modalImageElement = document.getElementById("modalImage"); // Assign to the global variable

    if (modal && modalImageElement) {
        // Ensure gallery sources are fresh for the current page context
        // This is helpful if initializePageGallery wasn't called or if content is dynamic
        const imageElementsOnPage = document.querySelectorAll("#gallery-row .image-container img");
        galleryImageSources = Array.from(imageElementsOnPage).map(img => img.src);

        // Set the styles for the modal image as per your original code
        modalImageElement.style.width = "80%";
        modalImageElement.style.maxWidth = "800px";
        modalImageElement.style.height = "auto";

        modal.style.display = "flex"; // Or "flex" if your CSS for .modal relies on it for centering
        modalImageElement.src = imageSrc;

        // Find the index of the clicked image
        currentImageIndex = galleryImageSources.indexOf(imageSrc);
        if (currentImageIndex === -1) { // Fallback if imageSrc not found
            currentImageIndex = 0;
            if (galleryImageSources.length > 0 && galleryImageSources[0] !== imageSrc) {
                // If the src wasn't in the list, and we have images, show the first one as a guess.
                // Or you might want to handle this error differently.
                // For now, if imageSrc is not in the list, it will show it, but prev/next might be off.
                // Best to ensure imageSrc is always part of the gallery query.
            }
        }
    }
}

function closeModal() {
    const modal = document.getElementById("galleryModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function changeImage(direction) {
    if (!galleryImageSources || galleryImageSources.length === 0) {
        // Attempt to re-initialize if galleryImageSources is empty
        initializePageGallery();
        if (galleryImageSources.length === 0) return; // No images to cycle
    }

    currentImageIndex += direction;

    if (currentImageIndex >= galleryImageSources.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImageSources.length - 1;
    }

    if (modalImageElement && galleryImageSources[currentImageIndex]) {
        modalImageElement.src = galleryImageSources[currentImageIndex];
    }
}

// Close the gallery when clicking outside the image content
window.addEventListener('click', function(event) {
    const modal = document.getElementById("galleryModal");
    // If the modal is displayed and the click is directly on the modal (the backdrop)
    if (modal && modal.style.display === "block" && event.target === modal) {
        closeModal();
    }
});

// Initialize gallery on pages that have one (e.g., portfolio.html)
// This helps to have `galleryImageSources` ready when `openModal` is called from an inline HTML attribute.
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gallery-row')) {
        initializePageGallery();
        // Your portfolio.html has onclick="openModal('path/to/image')"
        // The initializePageGallery() will populate the galleryImageSources
        // openModal() will then find the index from this prepopulated list.
    }
});