//Global constants
const imageContainer = document.querySelector('#image-container');
//console.log(imageContainer);
const loader = document.querySelector('#loader');
//console.log(loader);

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];



//Unsplash API
const count = 30;
const apiKey = 'cmo4gGZYLXHXsw4Buo1uq-pfCa7YW9qdFUwvPKF95X4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Helper function to set attributes on DOM elements
function setAttributes(elements, attributes) {
    for (const key in attributes) {
        elements.setAttribute(key, attributes[key]);
    }
}

//helper function to check for image load
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =' + ready);
    }


}

//Create elements for links to Unslpash API
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log('total Images' + totalImages);
    photoArray.forEach((photo) => {
        //Create an <a></a> element to link to Unsplash API
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //Creat image 
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Check load listener
        img.addEventListener('load', imageLoaded);

        //Put image inside anchor element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

//Infinite Scroll functionality
window.addEventListener('scroll', () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) && (ready === true)) {
        getPhotos();
        ready = false;

    }
});

//execute
getPhotos();