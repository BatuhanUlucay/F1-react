async function imageExists(src) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.onload = function () {
      if (img.height !== 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
    img.onerror = function (error) {
      resolve(false);
    };
    img.src = src;
  });
}

export async function doesImageExists(src) {
  const result = await imageExists(src);

  console.log('heeyooy', result, src);

  return result;
}
