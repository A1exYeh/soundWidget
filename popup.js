document.addEventListener('DOMContentLoaded', () => {
  const autoVolumeCheckbox = document.querySelector("input[name=autoVol]");
  const minVal = document.getElementById("minVal");
  const minSlider = document.getElementById("minSlider");
  const maxVal = document.getElementById("maxVal");
  const maxSlider = document.getElementById("maxSlider");


  browser.storage.sync.get(["minVal"]).then((result) => {
    minSlider.value = result.minVal;
    minVal.innerHTML = "MIN: " + result.minVal;
  });

  minSlider.oninput = function () {
    minVal.innerHTML = "MIN: " + minSlider.value;
    browser.storage.sync.set({ minVal: minSlider.value });

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: 'changeMin', minSlider: minSlider.value});
    });
  }

  //max slider

  browser.storage.sync.get(["maxVal"]).then((result) => {
    maxSlider.value = result.maxVal;
    maxVal.innerHTML = "MAX: " + result.maxVal;
  });

  maxSlider.oninput = function () {
    maxVal.innerHTML = "MAX: " + maxSlider.value;
    browser.storage.sync.set({ maxVal: maxSlider.value });

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: 'changeMax', maxSlider: maxSlider.value});
    });
  }



  // Store autoVol check status and set label for on/off
  browser.storage.sync.get(["autoVolume"]).then((result) => {
    console.log(result);
    if (result.autoVolume) {
      autoVolumeCheckbox.checked = true;
      //document.getElementById('status').innerHTML="ON";
    } else {
      autoVolumeCheckbox.checked = false;
      //document.getElementById('status').innerHTML="OFF";
    }
  });

  autoVolumeCheckbox.addEventListener('change', () => {
    const isChecked = autoVolumeCheckbox.checked;

    browser.storage.sync.set({ autoVolume: isChecked });
    browser.storage.sync.get(["autoVolume"]).then((result) => {
    //if (result.autoVolume) {
    //  document.getElementById('status').innerHTML="ON";
    //} else {
    //  document.getElementById('status').innerHTML="OFF";
    //}
      console.log(result);
    });
  
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: isChecked ? 'autoVolume' : 'autoVolumeOff', state: isChecked, });
    });
  });
});
