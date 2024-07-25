
//Code for lightbox
function openModal(imageSrc) {
    var modal = document.getElementById("galleryModal");
    modalImage = document.getElementById("modalImage");

    // Set the size of the gallery images, makes it bigger on click
    modalImage.style.width = "80%";
    modalImage.style.maxWidth = "800px";
    modalImage.style.height = "auto";

    modal.style.display = "block";
    modalImage.src = imageSrc;
    currentImageIndex = getImageIndex(imageSrc);
}

function closeModal() {
    var modal = document.getElementById("galleryModal");
    modal.style.display = "none";
}

function changeImage(n) {
    const images = document.querySelectorAll("#gallery-row .image-container img");

    currentImageIndex += n;

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    modalImage.src = images[currentImageIndex].src;
}

function getImageIndex(imageSrc) {
    const images = document.querySelectorAll("#gallery-row .image-container img");
    for (let i = 0; i < images.length; i++) {
        if (images[i].src === imageSrc) {
            return i;
        }
    }
    return 0;
}

// Close the gallery when clicking outside the image
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};


