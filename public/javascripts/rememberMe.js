// Giriş sayfasında çerez kontrolü ve otomatik doldurma
window.addEventListener('DOMContentLoaded', (event) => {
    const rememberedUserName = getCookie('rememberedUserName');
    const rememberedPassword = getCookie('rememberedPassword');
    const userNameInput = document.getElementById('loginUserName');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const cookieAccepted = getCookie('cookieAccepted');
    if(cookieAccepted){
        if (rememberedUserName && rememberedPassword) {
            document.getElementById('loginUserName').value = rememberedUserName;
            document.getElementById('loginPassword').value = rememberedPassword;
            rememberMeCheckbox.checked = true;
            changeInputColor(userNameInput, '#ffb3b3'); // Renk değiştirme fonksiyonu
            changeInputColor(passwordInput, '#ffb3b3');  // Renk değiştirme fonksiyonu
        }
    }
});

// Çerez alma fonksiyonu
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function changeInputColor(inputElement, color) {
    inputElement.style.backgroundColor = color;
}