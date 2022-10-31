export const parsePhotoFromWiki = (source) => {
  let result = '';

  if (!source) {
    return result;
  }

  let splitted = source.replaceAll('thumb/', '').split('/');
  splitted.pop();

  result = splitted.join('/');

  return result;
};
