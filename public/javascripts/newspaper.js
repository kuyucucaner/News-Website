let slideCounter = 1;
let slidesPerPage = 6; // Sayfa başına gösterilecek gazete sayısı
let itemsToScroll = 1;
let totalSlides;

function showNewspaperSlides(n) {
    let slides = document.getElementsByClassName("slide-newspaper");

    if (n >= slides.length - 4) {
        slideCounter = 1;
    }
    if (n < 1) {
        slideCounter = slides.length - slidesPerPage + 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    let startIndex = (slideCounter - 1) * itemsToScroll;
    let endIndex = startIndex + slidesPerPage;

    for (let i = startIndex; i < endIndex; i++) {
        if (slides[i]) {
            slides[i].style.display = "block";
        }
    }
}

function plusNewspaperSlides(n) {
    showNewspaperSlides(slideCounter += n);
}

function currentNewspaperSlide(n) {
    showNewspaperSlides(slideCounter = n);
}


function initializeNewspaperSlides() {
    let loadingElement = document.getElementById("loading");
    if (!loadingElement) {
        console.error("loading elementi bulunamadı.");
        return;
    }

    loadingElement.style.display = "block";

    fetch('/getTopNewspaper')
        .then(response => response.json())
        .then(data => {
            console.log('DATA : ', data);
            if (data && typeof data === 'object' && Array.isArray(data.newspaper) && data.newspaper.length > 0) {
                let slidesContainer = document.getElementById("slider-newspaper");

                slidesContainer.innerHTML = "";

                let maxSlideWidth = 230;
                let maxSlideHeight = 280;
                let totalSlides = data.newspaper.length;

                // Taşan gazeteleri kaydırmak için slider ekle
                let totalWidth = totalSlides * (maxSlideWidth + 10); // 10 is the margin between slides
                slidesContainer.style.width = totalWidth + "px";

                // Tüm haberleri döngü içinde işle
                data.newspaper.forEach((news, index) => {
                    let slide = document.createElement("div");
                    slide.className = "slide-newspaper";

                    // Yatay düzen için stil ekleyin
                    slide.style.width = maxSlideWidth + "px";
                    slide.style.height = maxSlideHeight + "px";
                    slide.style.display = "inline-block";  // Eklenen satır

                    let img = document.createElement("img");
                    img.src = news.NewspaperImage;
                    img.alt = news.NewspaperName;
                    img.style.width = "100%";
                    img.style.height = "100%";

                    
                    let overlay = document.createElement("div");
                    overlay.className = "image-overlay";

                    let overlayLink = document.createElement("a");
                    overlayLink.href = news.WebsiteUrl;
                    overlayLink.target = "_blank";
                    overlayLink.rel = "noopener noreferrer"; // Add this line
                    overlayLink.className = "overlay-link";
                    

                    let overlayText = document.createElement("div");
                    overlayText.className = "overlay-text";
                    overlayText.innerText = news.NewspaperName;

                    overlayLink.appendChild(overlayText);
                    slide.appendChild(overlay);
                    slide.appendChild(img);
                    slide.appendChild(overlayLink);

                    slidesContainer.appendChild(slide);
                });

                let buttonContainer = document.createElement("div");
                buttonContainer.className = "parent-container";

                let prevButton = document.createElement("button");
                prevButton.innerHTML = "<";
                prevButton.className = "slide-button slide-button-prev";
                prevButton.onclick = function () { plusNewspaperSlides(-1); };
                buttonContainer.appendChild(prevButton);

                let nextButton = document.createElement("button");
                nextButton.innerHTML = ">";
                nextButton.className = "slide-button slide-button-next";
                nextButton.onclick = function () { plusNewspaperSlides(1); };
                buttonContainer.appendChild(nextButton);

                slidesContainer.parentElement.appendChild(buttonContainer);


                showNewspaperSlides(slideCounter);
                loadingElement.style.display = "none";
            } else {
                console.error("API'den dönen veri bir dizi değil veya boş:", data);
                loadingElement.innerText = "Haberler bulunamadı.";
            }
        })
        .catch(error => {
            console.error('API hatası:', error);
            loadingElement.innerText = "Hata oluştu. Lütfen tekrar deneyin.";
        });
}

window.addEventListener('load', initializeNewspaperSlides);
