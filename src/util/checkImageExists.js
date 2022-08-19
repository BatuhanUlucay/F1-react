function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}

export function checkUrlExists(url) {
  let res = false;

  checkIfImageExists(url, (exists) => {
    res = exists;
  });

  return res;
}
