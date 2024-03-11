async function login() {
    const userNameInput = document.getElementById('loginUserName');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const userName = userNameInput.value;
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked ? 'on' : null;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password , rememberMe}),
        });

        if (response.ok) {
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
            window.location.href = '/register';
        });
    }
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await login();
});
