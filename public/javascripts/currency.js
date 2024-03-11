document.addEventListener('DOMContentLoaded', function () {
    const currencies = ['USD', 'EUR' , 'GBP', 'AUD' , 'JPY' ,'CAD' , 'CHF' , 'AMD' , 'NZD']; // İstediğiniz diğer para birimlerini ekleyin 
    updateCurrencies(currencies);
    setInterval(() => updateCurrencies(currencies), 24 * 60 * 60 * 1000); // 24 saatte bir otomatik olarak güncelle
});

async function updateCurrencies(currencies) {
    try {
        const promises = currencies.map(async (currency) => {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/443bfb994cce6862bd1962bf/latest/${currency}`);
            if (!response.ok) {
                throw new Error(`Error fetching exchange rates for ${currency}: ${response.statusText}`);
            }
            const data = await response.json();
            const exchangeRate = data.conversion_rates.TRY; // USD'nin Türk Lirası (TRY) karşısındaki kuru

            const navLinkElement = document.querySelector(`.currency-link-currency-${currency.toLowerCase()}`);
            navLinkElement.textContent = `${currency}: ${exchangeRate.toFixed(2)} TL`;
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Error fetching exchange rates:', error.message);
    }
}
