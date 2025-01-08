document.getElementById('cookiesupload_extractButton').addEventListener('click', () => {
        browser.runtime.sendMessage({
          action: 'extractCookies'
        });
});

document.getElementById('cookiesupload_openSetting').addEventListener('click', () => {
        browser.runtime.openOptionsPage();
});