
async function register() {
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roleId = document.getElementById('roleId').value;
    
    try {
        const response = await fetch('/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password, roleId }),
        });
    
        if (response.ok) {
            // Başarılı giriş durumunda yönlendirme
            Swal.fire({
                icon: 'success',
                title: 'Başarılı Kayıt İşlemi!',
                html: '<p>Başarı ile kayıt olundu!</p>',
                confirmButtonText: 'Tamam',
            }).then(() => {
                // Yönlendirme işlemi
                window.location.href = '/'; // Hedef sayfanın URL'sini buraya ekleyin
            });
        } else {
            const statusCode = response.status;
            console.error('Hata Durum Kodu:', statusCode);

            const responseBody = await response.json();

            if (statusCode === 400) {
                throw new Error(responseBody.error || 'Geçersiz Girdi.');
            } else if (statusCode === 401) {
                throw new Error(responseBody.error || 'Zaten kayıtlı bir e-posta adresi.');
            } else {
                throw new Error(responseBody.error || `Sunucu Hatası: ${statusCode}`);
            }
        }
    } catch (error) {
        console.error('Hata Yakalandı:', error);
        Swal.fire({
            icon: 'error',
            title: 'Kayıt Başarısız!',
            text: error.message || 'Lütfen bilgilerinizi kontrol edin.',
            confirmButtonText: 'Tamam',
        }).then(() => {
            // Yönlendirme işlemi
            window.location.href = '/register'; // Hedef sayfanın URL'sini buraya ekleyin
        });
    }
}

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await register();
});