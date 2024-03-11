document.addEventListener('DOMContentLoaded', function () {
  const userLoggedIn = getCookie('userLoggedIn');
  if (userLoggedIn === null) {
      setCookie('userLoggedIn', 'undefined', 1); 
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