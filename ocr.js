// // const exampleImage = 'https://tesseract.projectnaptha.com/img/eng_bw.png';

// const worker = Tesseract.createWorker({
//   logger: m => console.log(m)
// });
// Tesseract.setLogging(true);
// // work();

// async function work() {
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');

//   // let result = await worker.detect(image);
//   // console.log(result.data);

//   result = await worker.recognize(image);
//   console.log(result.data);

//   await worker.terminate();
// }


const { createWorker, createScheduler } = Tesseract;
const scheduler = createScheduler();
// const video = document.getElementById('poem-video');
// const messages = document.getElementById('messages');
let timerId = null;

// const addMessage = (m, bold) => {
//   let msg = `<p>${m}</p>`;
//   if (bold) {
//     msg = `<p class="bold">${m}</p>`;
//   }
//   messages.innerHTML += msg;
//   messages.scrollTop = messages.scrollHeight;
// }
initOcr()
async function doOCR(numberPlateImage){
  // const c = document.createElement('canvas');
  // c.width = 640;
  // c.height = 360;
  // c.getContext('2d').drawImage(video, 0, 0, 640, 360);
  const start = new Date();
  const { data: { text } } = await scheduler.addJob('recognize', numberPlateImage);
  const end = new Date()
  addMessage(`[${start.getMinutes()}:${start.getSeconds()} - ${end.getMinutes()}:${end.getSeconds()}], ${(end - start) / 1000} s`);
  text.split('\n').forEach((line) => {
    addMessage(line);
  });
};

async function initOcr(){
  for (let i = 0; i < 1; i++) {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    scheduler.addWorker(worker);
  }
}
  // addMessage('Initialized Tesseract.js');
  // video.addEventListener('play', () => {
  //   timerId = setInterval(doOCR, 1000);
  // });
  // video.addEventListener('pause', () => {
  //   clearInterval(timerId);
  // });
  // addMessage('Now you can play the video. :)');
  // video.controls = true;
// })();