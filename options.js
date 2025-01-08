async function saveOptions(e) {
  e.preventDefault();
  var widget_url = document.querySelector("#cookiesupload_url")
  var status_widget = document.querySelector("#cookiesupload_status")
  if (!widget_url.value.startsWith('https')) {
    status_widget.textContent = "Error: Only https:// is allowed!"
    return;
  }
  await browser.storage.local.set({
    url: widget_url.value
  });
  status_widget.textContent = "Status: OK!"
}

async function restoreOptions() {
  res = await browser.storage.local.get('url');
  document.querySelector("#cookiesupload_url").value = res.url || 'https://localhost';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);