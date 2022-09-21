export function parseTeamInfo(infobox) {
  let allFields = {};

  let keys = Object.keys(infobox);

  // This is really really bad solution but because of unstable wikipedia data, I have to do this..
  // Removing the keys including "engineer" word.
  keys = keys.filter((key) => {
    return !key.includes('engineer');
  });

  // Team base
  let key = findSubstring(keys, 'base');
  allFields.base = infobox[key].data.text;

  // Team owner
  key = findSubstring(keys, 'owner');
  if (key !== '') {
    allFields.owner = infobox[key].data.text;
  }

  // Principal
  key = findSubstring(keys, 'principal');
  if (key !== '') {
    allFields.owner = infobox[key].data.text;
  }

  // director
  key = findSubstring(keys, 'director');
  if (key !== '') {
    allFields.director = infobox[key].data.text;
  }

  //chassis
  key = findSubstring(keys, 'chassis');
  if (key !== '') {
    allFields.chassis = infobox[key].data.text;
  }

  //engine
  key = findSubstring(keys, 'engine');
  if (key !== '') {
    allFields.engine = infobox[key].data.text;
  }

  // //constructor champs
  // key = findSubstring(keys, 'cons_champ');
  // if (key !== '') {
  //   allFields.cons_champs = infobox[key].data.text;
  // }

  // //drivers champ
  // key = findSubstring(keys, 'drivers_champ');
  // if (key !== '') {
  //   allFields.driver_champs = infobox[key].data.text;
  // }

  //drivers
  // key = findSubstring(keys, 'drivers');
  // if (key !== '') {
  //   allFields.drivers = infobox[key].data.text;
  // }

  // console.log(keys);

  return allFields;
}

function findSubstring(strArr, str) {
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === str) {
      return strArr[i];
    }
  }
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i].indexOf(str) !== -1) {
      return strArr[i];
    }
  }

  return '';
}
