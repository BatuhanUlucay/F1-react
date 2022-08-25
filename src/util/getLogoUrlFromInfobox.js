import { hashMessage } from './md5hash';

export function getLogoUrlFromInfobox(teamInfobox, setterFunc) {
  if (teamInfobox.data.logo !== undefined) {
    const logoFileName = teamInfobox.data.logo.data.text;

    const extracted = logoFileName.split(':').pop().replaceAll(' ', '_');
    const hash = hashMessage(extracted);
    const firstChar = hash.charAt(0);
    const firstAndSecond = firstChar + hash.charAt(1);
    const urlFirst = `https://upload.wikimedia.org/wikipedia/commons/${firstChar}/${firstAndSecond}/${extracted}`;

    const urlSecond = `https://upload.wikimedia.org/wikipedia/en/${firstChar}/${firstAndSecond}/${extracted}`;

    let img = new Image();
    img.src = urlFirst;

    img.onload = () => {
      if (img.height !== 0) {
        setterFunc(urlFirst);
      }
    };
    let img2 = new Image();

    img2.src = urlSecond;

    img2.onload = () => {
      if (img2.height !== 0) {
        setterFunc(urlSecond);
      }
    };
  }
}
