function applyColumns(n) {
  const ID = 'n-col-config';
  let style = document.getElementById(ID);
  if (!style) {
    style = document.createElement('style');
    style.id = ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    ytd-browse ytd-rich-grid-renderer #contents {
      grid-template-columns: repeat(${n}, minmax(0,1fr)) !important;
    }
  `;
}

// on load
chrome.storage.sync.get({ columns: 5 }, data => {
  applyColumns(data.columns);
});

// live update
chrome.runtime.onMessage.addListener(msg => {
  if (msg.action === 'updateColumns') {
    applyColumns(msg.columns);
  }
});
