browser.runtime.onInstalled.addListener(async ({ reason }) => {
  await browser.alarms.clear('simplecookieupload');
  
  // Create an alarm so we have something to look at in the demo
  await browser.alarms.create('simplecookieupload', {
    delayInMinutes: 5,
    periodInMinutes: 5
  });
  console.log('Simple cookies upload installed.')
});

async function sendCookiesToServer(cookies) {
  let res = await browser.storage.local.get('url');
  let url = res.url || 'http://localhost';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/text',
    },
    body: cookies
  })
  .then(response => {
    if (response.ok) {
      console.log("Successfully uploaded cookies");
    } else {
      console.error("Error uploading cookies:", response.text());
    }
  })
  .catch(error => {
    console.error("Error uploading cookies:", error);
  });
}

// Listen for messages from content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'extractCookies') {
    browser.cookies.getAll({ domain: 'bilibili.com' }, (cookies) => {
      const cookieData = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join(';');
      sendCookiesToServer(cookieData);
    });
  }
});

browser.alarms.onAlarm.addListener(() => {
  browser.cookies.getAll({ domain: 'bilibili.com' }, (cookies) => {
      const cookieData = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join(';');
      sendCookiesToServer(cookieData);
    });
});
