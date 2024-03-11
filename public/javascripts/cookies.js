document.addEventListener('DOMContentLoaded', function () {
  // Check if the 'cookieAccepted' cookie exists
  if (getCookie('cookieAccepted') === 'true') {
    // If cookie is accepted, hide the cookie popup
    document.getElementById('cookie-popup').style.display = 'none';
  }
});

function acceptCookies() {
  document.getElementById('cookie-popup').style.display = 'none';
  setCookie('cookieAccepted', 'true', 30); 
}
function deniedCookies() {
  document.getElementById('cookie-popup').style.display = 'none';
  setCookie('cookieAccepted', 'false', 1); 
}
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift().trim(); // trim() ekledim
}