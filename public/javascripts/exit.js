document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'false') {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('registerButton').style.display = 'block';
        document.getElementById('exitButton').style.display = 'none';
        document.getElementById('profileButton').style.display = 'none';
    }
});
document.getElementById('exitButton').addEventListener('click', async (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'false');
    Swal.fire({
        icon: 'success',
        title: 'Başarılı Çıkış',
        text: 'Başarıyla çıkış yaptınız.',
        confirmButtonText: 'Tamam',
        timer: 2000
    }).then(() => {
        window.location.href = '/'; 
    });
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('registerButton').style.display = 'block';
    document.getElementById('exitButton').style.display = 'none';
    document.getElementById('profileButton').style.display = 'none';

});
