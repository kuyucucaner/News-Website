document.addEventListener('DOMContentLoaded', function () {
    const isUserLogged = getCookie('userLoggedIn');
    console.log('is User Logged ? : ' , isUserLogged);
    if (isUserLogged === 'true') {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('addNewsButton').style.display = 'block';
        document.getElementById('exitButton').style.display = 'block';
        document.getElementById('profileButton').style.display = 'block';
    } else if (isUserLogged === 'false'){
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('registerButton').style.display = 'block';
        document.getElementById('addNewsButton').style.display = 'none';
        document.getElementById('exitButton').style.display = 'none';
        document.getElementById('profileButton').style.display = 'none';
        Swal.fire({
            icon: 'warning',
            title: 'Üyelik Sona Erdi!',
            html: `Lütfen Tekrar Giriş Yapınız!`,
            confirmButtonText: 'Tamam',
            timer: 5000
        });
        setCookie('userLoggedIn', 'undefined', 1); // 1 gün süreyle geçerli bir çerez
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('registerButton').style.display = 'block';
        document.getElementById('addNewsButton').style.display = 'none';
        document.getElementById('exitButton').style.display = 'none';
        document.getElementById('profileButton').style.display = 'none';
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().trim(); // trim() ekledim
}
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}
