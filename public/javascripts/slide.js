let slideIndex = 1;

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function initializeSlides() {
    let loadingElement = document.getElementById("loading");
    if (!loadingElement) {
        console.error("loading elementi bulunamadı.");
        return;
    }

    loadingElement.style.display = "block";

    fetch('/getTopNews')
    .then(response => response.json())
    .then(data => {
        if (data && typeof data === 'object' && Array.isArray(data.news) && data.news.length > 0) {
            let slidesContainer = document.getElementById("slideshow-container");
            let dotContainer = document.getElementById("dot-container");

            slidesContainer.innerHTML = "";

            // Tüm haberleri döngü içinde işle
            data.news.forEach((news, index) => {
                let slide = document.createElement("div");
                slide.className = "slide";
            
                let link = document.createElement("a");
                link.href = `http://localhost:3000/newDetail/${news.ID}`;
            
                let img = document.createElement("img");
                img.src = news.ImageUrl;
                img.alt = news.Title;
            
                link.appendChild(img);
                slide.appendChild(link);
                slidesContainer.appendChild(slide);
            
                let dot = document.createElement("span");
                dot.className = "dot";
                dot.setAttribute("onclick", `currentSlide(${index + 1})`);
                dotContainer.appendChild(dot);
            });
            
            showSlides(slideIndex);
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

window.addEventListener('load', initializeSlides);
