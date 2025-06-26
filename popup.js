const select = document.getElementById('columns');

// on open load saved value
chrome.storage.sync.get({ columns: 5 }, data => {
  select.value = data.columns;
});

// when the user changes the dropdown notify the active tab
select.addEventListener('change', () => {
  const columns = Number(select.value);
  chrome.storage.sync.set({ columns }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (!tabs[0]) return;
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateColumns',
        columns
      });
    });
  });
});
