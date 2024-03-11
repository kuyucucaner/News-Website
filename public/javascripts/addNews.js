const imageInput = document.getElementById('imageUrl');
const newsPreviewImage = document.getElementById('news-previewImage');
const addNewsForm = document.getElementById('addNewsForm');
const existingImageUrlInput = document.getElementById('existingImageUrl');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        newsPreviewImage.src = imageURL;
    }
});

async function addNews() {
    try {
        const formData = new FormData();
        const imageUrlInput = document.getElementById('imageUrl');
        const file = imageUrlInput.files[0];

        if (!file) {
            // Dosya seçilmediğinde uyarı mesajı göster
            Swal.fire({
                title: 'Uyarı!',
                text: 'Lütfen bir resim dosyası seçin.',
                icon: 'warning',
                timer: 4000,
            });
            return;
        }

        if (!file.type.startsWith('image/')) {
            // Geçerli bir resim dosyası seçilmediğinde uyarı mesajı göster
            Swal.fire({
                title: 'Uyarı!',
                text: 'Lütfen geçerli bir resim dosyası seçin.',
                icon: 'warning',
                timer: 4000,
            });
            return;
        }
        formData.append('imageUrl', file);
        formData.append('categoryID', parseInt(document.getElementById('categoryID').value, 10));
        formData.append('sourceID', parseInt(document.getElementById('sourceID').value, 10));        
        formData.append('title', document.getElementById('title').value);
        formData.append('contentText', document.getElementById('contentText').value);

        // Submit düğmesini devre dışı bırak
        document.getElementById('submitButton').disabled = true;
        if (!formData.get('categoryID')) {
            // Handle missing category ID
            console.error('Category ID is required. Please select a category.');
            return; // Prevent sending incomplete data
          }
        const response = await fetch('/addNews', {
            method: 'POST',
            body: formData,
        });

        console.log('Sunucu cevabı:', response);

        // Submit düğmesini tekrar etkinleştir
        document.getElementById('submitButton').disabled = false;

        if (response.ok) {
            const responseData = await response.json();
            console.log('Sunucu cevap verisi:', responseData);

            Swal.fire({
                title: 'Başarılı!',
                text: 'Haber başarıyla eklendi.',
                icon: 'success',
                timer: 4000,
            }).then(() => {
                window.location.href = '/'; 
            });
        } else {
            console.error('Sunucu cevap hatası:', response.status, response.statusText);

            let errorData;
            try {
                errorData = await response.json();
            } catch (error) {
                console.error('Sunucu cevabı JSON verisi içermiyor.');
            }

            Swal.fire({
                title: 'Hata!',
                text: `Haber eklenirken bir hata oluştu: ${errorData ? errorData.error : response.statusText}`,
                icon: 'error',
                timer: 4000,
            }).then(() => {
                window.location.href = '/addNews'; 
            });
            
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        Swal.fire({
            title: 'Hata!',
            text: 'Bir şeyler yanlış gitti.',
            icon: 'error',
        });
    }
}

addNewsForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addNews();
});
