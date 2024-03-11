// Sayfa içeriği yüklendiğinde localStorage kontrolü
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('exitButton').style.display = 'block';
        document.getElementById('profileButton').style.display = 'block';
    }
});

async function login() {
    const userNameInput = document.getElementById('loginUserName');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const rememberMe = rememberMeCheckbox.checked ? 'on' : null;
    const userName = userNameInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password , rememberMe}),
        });

        if (response.ok) {
            // Giriş başarılı olduğunda localStorage'a kaydet
            localStorage.setItem('isLoggedIn', 'true');
            Swal.fire({
                icon: 'success',
                title: 'Başarılı Giriş!',
                html: `<p>Hoş Geldiniz!</p>`,
                confirmButtonText: 'Tamam',
                timer: 2000

            }).then(() => {
                window.location.href = '/'; 
            });
        } else {
            const statusCode = response.status;
            console.error('Hata Durum Kodu:', statusCode);
            const responseBody = await response.json();
            if (statusCode === 401) {
                throw new Error(responseBody.error || 'Geçersiz Öğrenci Numarası');
            } else {
                throw new Error(responseBody.error || `Sunucu Hatası: ${statusCode}`);
            }
        }
    } catch (error) {
        console.error('Hata Yakalandı:', error);
        Swal.fire({
            icon: 'error',
            title: 'Giriş Başarısız!',
            text: error.message || 'Lütfen bilgilerinizi kontrol edin.',
            confirmButtonText: 'Tamam',
        }).then(() => {
            window.location.href = '/';
        });
    }
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await login();
});
