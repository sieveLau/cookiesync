async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.local.set({
    url: document.querySelector("#cookiesupload_url").value
  });
}

async function restoreOptions() {
  res = await browser.storage.local.get('url');
  document.querySelector("#cookiesupload_url").value = res.url || 'http://localhost';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);