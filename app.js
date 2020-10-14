const charsReversed = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~i!lI;:,"^`\'. '.split('');
const chars = [...charsReversed].reverse();

const fileInput = document.querySelector('input[type="file"]');
const resolutionInput = document.querySelector('input[type="number"]');
const invert = document.querySelector('input[type="checkbox"]');
const startBtn = document.querySelector('#start')
const image = document.querySelector('img');
const canvas = document.querySelector('canvas');
const result = document.querySelector('#output');

const ctx = canvas.getContext('2d');

startBtn.addEventListener('click', (e) => {
  const file = fileInput.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    image.src = url;
  }
})

image.addEventListener('load', async () => {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);
  
  let str = ''

  const pixelPackets = parseInt(resolutionInput.value);

  if (!pixelPackets || pixelPackets <= 0) {
    alert('Invalid pixel batch value');
    return;
  }

  for (let y = 0; y < image.height; y += pixelPackets * 2) {
    for (let x = 0; x < image.width; x += pixelPackets) {
      let imgData = ctx.getImageData(x, y, 10, 10);
      let pixels = imgData.data;
      if (pixels) {
        let lightness = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          lightness += parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2])/3);
        }
        lightness /= pixels.length;
        str += (invert.checked ? charsReversed : chars)[parseInt(lightness / 256 * chars.length)];
      }
    }
    str += '<br>'
  }

  
  result.innerHTML = str;
});
