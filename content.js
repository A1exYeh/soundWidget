const video = document.getElementsByTagName('video');

let minVol = 0.01;
let maxVol = 0.2;

const focusRef = () => {
  if (video[0]) {
      video[0].volume = maxVol;
  }
};

const blurRef = () => {
  console.log(minVol);
  if (video[0]) {
      video[0].volume = minVol;
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

   if (request.action === 'autoVolume') {
        console.log(request.state);
        window.addEventListener('focus', focusRef);
        window.addEventListener('blur', blurRef);

      } else if (request.action === 'autoVolumeOff') {
        console.log(request.state);
        window.removeEventListener('focus', focusRef);
        window.removeEventListener('blur', blurRef);
      } else if (request.action === 'changeMin') {
        minVol = (request.minSlider)/1000;
        console.log("minVol " + request.minSlider + " " + minVol);
        console.log("videoVol " + video[0].volume);  
      }
      else if (request.action === 'changeMax') {
        maxVol = (request.maxSlider)/1000;
        console.log("maxVol " + request.maxSlider + " " + maxVol);
        console.log("videoVolM " + video[0].volume);  
      }
  });
  
 