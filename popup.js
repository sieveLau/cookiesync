document.getElementById('extractButton').addEventListener('click', () => {
        browser.runtime.sendMessage({
          action: 'extractCookies'
        });
});