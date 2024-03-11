fetch('/breakingNews')
  .then(response => response.json())
  .then(data => {
    const breakingNewsElement = document.querySelector('.breakingNews-nav li');
    
    if (data.news && data.news.length > 0) {
      const latestNews = data.news[0];
      const latestNewsTitle = `Son Dakika: ${latestNews.Title}`;
      
      // Oluşturulan a elementini tanımla ve href özelliğini ayarla
      const anchorElement = document.createElement('a');
      anchorElement.href = `http://localhost:3000/newDetail/${latestNews.ID}`;
      anchorElement.textContent = latestNewsTitle;
      anchorElement.classList.add('breaking-href');
      // a elementini li elementine ekle
      breakingNewsElement.classList.add('breaking-news-item');
      breakingNewsElement.innerHTML = ''; // Önceki içeriği temizle
      breakingNewsElement.appendChild(anchorElement);
    } else {
      breakingNewsElement.textContent = 'No breaking news available';
    }
  })
  .catch(error => console.error('Error fetching breaking news:', error));
