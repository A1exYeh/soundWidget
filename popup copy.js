document.addEventListener('DOMContentLoaded', () => {
    const lowerVolumeButton = document.getElementById('lowerVolume');
    const raiseVolumeButton = document.getElementById('raiseVolume');
    const autoVolumeCheckbox = document.getElementById('autoVolume');
  
    // Retrieve and set the checkbox state
    browser.storage.sync.get('autoVolume').then((result) => {
      autoVolumeCheckbox.checked = result.autoVolume || false;
    });
  
    lowerVolumeButton.addEventListener('click', () => {
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: 'lowerVolume' });
      });
    });
  
    raiseVolumeButton.addEventListener('click', () => {
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: 'raiseVolume' });
      });
    });
  
    autoVolumeCheckbox.addEventListener('change', () => {
      const isChecked = autoVolumeCheckbox.checked;
      browser.storage.sync.set({ autoVolume: isChecked });
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: isChecked ? 'autoVolume' : 'autoVolumeOff', state: isChecked, });
      });
    });
  });
  

