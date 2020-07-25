

// let anprPromise;

// window.onload = () => anprPromise = cocoSsd.load({modelUrl: './web_model/model.json'});

// async function init(){
//         try {
//             anprPromise = await tf.loadGraphModel('./web_model/model.json',
//                                                   {credentials: 'include'});
//             console.log("wait")
//         } catch (err) {
//             console.log(err);
//         }
// }


// async function predictAnpr(image)P
// {
//    const anpr_model = await anprPromise;
//    // const anpr_model = await anprPromise;
   
//   console.log('model loaded');
//   console.time('predict1');
//   const result = await anpr_model.detect(image);
//   if(result[0].class == "truck"){
    
//     console.log(result);

//   }

// requirejs.config({
//     baseUrl: 'lib',
//     paths: {
//         app: '../app'
//     }
// });
// import * as tf from '@tensorflow/tfjs-node'
// import * as tf from '@tensorflow/tfjs'
// requirejs('@tensorflow/tfjs-backend-cpu');
// requirejs('@tensorflow/tfjs-backend-webgl');
// const cocoSsd = requirejs('@tensorflow-models/coco-ssd');

let anprPromise;
// window.onload = () => anprPromise = cocoSsd.load({modelUrl: './web_model/model.json'});

window.onload = () => anprPromise = cocoSsd.load({modelUrl: './anprplatedetectorV2/model.json'});

// let model ;
async function init(){
  // const anpr_model = await anprPromise;
  // anpr_model.dispose();

  // anprPromise = cocoSsd.load(
  //     {modelUrl: './web_model/model.json'});

        try {
            anprPromise = await cocoSsd.load({modelUrl: './anprplatedetectorV2/model.json'});
            console.log("wait")
        } catch (err) {
            console.log(err);
        }
}

async function getPrediction () {
  // const img = document.getElementById('img');

  // Load the model.
 
  const anpr_model = await anprPromise;
  // Classify the image.
  const predictions = await anpr_model.detect(image);

  console.log('Predictions: ');
  console.log(predictions);

  // var val = tf.browser.fromPixels(image)
  // val.slice(predictions[0].bbox[0], predictions[0].bbox[1], predictions[0].bbox[2], predictions[0].bbox[3])
  return predictions;
}