document.addEventListener('DOMContentLoaded', function () {
    const userRole = getCookie('userRole');
    console.log('User Role : ' , userRole);
    if (userRole === '1') {
        document.getElementById('addNewsButton').style.display = 'block';
    } else{
        document.getElementById('addNewsButton').style.display = 'none';
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
