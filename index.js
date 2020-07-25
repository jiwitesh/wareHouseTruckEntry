
const imageURL = './truck.jpg';
const image2URL = './image2.jpg';

let vhclePromise;
// let anprPromise;
let baseModel = 'lite_mobilenet_v2';



window.onload = () => vhclePromise = cocoSsd.load({modelUrl: './models/model.json'});
init();


const { createWorker, createScheduler } = Tesseract;
const scheduler = createScheduler();
let timerId = null;



const image = document.getElementById('image');
image.src = imageURL;

const runButton = document.getElementById('run');
runButton.onclick = async () => {
   const vhcle_model = await vhclePromise;
   // const anpr_model = await model;
   // const anpr_model = await anprPromise;
   
  console.log('model loaded');
  console.time('predict1');
  const result = await vhcle_model.detect(image);
  if( result.length > 0 && result[0].class == "truck"){
    console.log("Detected the truck now go for ANPR")
    // //detection_boxes,detection_scores,detection_classes,num_detections
    // let anpr = await anprPromise.executeAsync(expandedDim);
    let anprPrediction = await getPrediction();

    if (anprPrediction[0].class == 'person'){


      console.log("Detected the number plate now go for OCR")
      let val = tf.browser.fromPixels(image)
      let numberPlateImage = val.slice(anprPrediction[0].bbox[0], anprPrediction[0].bbox[1], anprPrediction[0].bbox[2], anprPrediction[0].bbox[3])

      val = await tf.browser.toPixels(numberPlateImage)
      doOCR(val)

      console.log("OCR is done go for Lane validation")

      

      get_truck_vendor_details("KA01JK8565")
    }
    // let anpr2 = await anprPromise.executeAsync(expandedDim);

    // const anprOp = await anpr_model.detect(image);
    // console.log(anprOp)
    // const data = []
    // for (let i = 0; i < anprOp.length; i++){
    //     data.push(anpr[i].dataSync())
    // }
    console.log("data");

  // }
  console.timeEnd('predict1');


  const c = document.getElementById('canvas');
  const context = c.getContext('2d');

  
  // var sourceX = 150;
  // var sourceY = 0;
  // var sourceWidth = 687;
  // var sourceHeight = 687;
  // // var destWidth = sourceWidth;
  // // var destHeight = sourceHeight;
  // // var destX = c.width / 2 - destWidth / 2;
  // // var destY = c.height / 2 - destHeight / 2;

  // //startY, startX, endY, endX
  // var destY = result[0].bbox[0];
  // var destX = result[0].bbox[2];
  // var destWidth = result[0].bbox[1];
  // var destHeight = result[0].bbox[3];

  // // var destWidth = result[0].bbox[0];
  // // var destHeight = result[0].bbox[1];
  // // var destX = c.width / 2 - destWidth / 2;
  // // var destY = c.height / 2 - destHeight / 2;

  // context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

  // const tempVal = context.getImageData(result[0].bbox[0], result[0].bbox[1], result[0].bbox[2], result[0].bbox[3])
  // // canvas1.getContext("2d");
  // context.putImageData(imageData, 0, 0);
  // context.drawImage(tempVal, 0, 0);

  context.drawImage(image, 0, 0);
  context.font = '10px Arial';

  console.log('number of detections: ', result.length);
  for (let i = 0; i < result.length; i++) {
    context.beginPath();
    context.rect(...result[i].bbox);
    // context.stroke();
    // context.clip();
    context.lineWidth = 1;
    context.strokeStyle = 'blue';
    context.fillStyle = 'blue';
    context.stroke();
    if(result[i].class == 'person'){
	    result[i].class = 'NumberPlate';
}
    context.fillText(
        result[i].score.toFixed(3) + ' ' + result[i].class, result[i].bbox[0],
        result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
  }
  // ocrReading(context)
};

// function ocrReading(c){
	

//   const doOCR = async () => {
//     // const c = document.createElement('canvas');
//     // c.width = 640;
//     // c.height = 360;
//     // c.getContext('2d').drawImage(video, 0, 0, 640, 360);
//     const start = new Date();
//     const { data: { text } } = await scheduler.addJob('recognize', c);

//     console.log(text)
//     // const end = new Date()
//     // addMessage(`[${start.getMinutes()}:${start.getSeconds()} - ${end.getMinutes()}:${end.getSeconds()}], ${(end - start) / 1000} s`);
//     // text.split('\n').forEach((line) => {
//     //   addMessage(line);
//     // });
//   };

//   (async () => {
//     // addMessage('Initializing Tesseract.js');
//     for (let i = 0; i < 1; i++) {
//       const worker = createWorker();
//       await worker.load();
//       await worker.loadLanguage('eng');
//       await worker.initialize('eng');
//       scheduler.addWorker(worker);
//     }
//     timerId = setInterval(doOCR, 1000);
//     // // addMessage('Initialized Tesseract.js');
//     // video.addEventListener('play', () => {
//     //   timerId = setInterval(doOCR, 1000);
//     // });
//     // video.addEventListener('pause', () => {
//     //   clearInterval(timerId);
//     // });
//     // // addMessage('Now you can play the video. :)');
//     // video.controls = true;
//   })();
// }


// // const { createWorker } = require('tesseract.js')
// // const PSM = require('tesseract.js/src/constants/PSM.js')

// async function getTextFromImage() {
//   await worker.load()
//   await worker.loadLanguage('eng')
//   await worker.initialize('eng')
//   // await worker.setParameters({
//   //   tessedit_pageseg_mode: PSM.AUTO,
//   // })

//   const { data: { text } } = await worker.recognize('./car.jpeg');

//   await worker.terminate()

//   return text
// }