/*
  Usage:
  let base64 = await fileToBase64(file)
  -- or --
  fileToBase64(file).then((base64) => {
    // do something
  })

*/
export const fileToBase64 = (file) => {
  return new Promise(resolve => {
    let reader = new FileReader();

    reader.onload = (ev) => {
      resolve(ev.target.result);
    };

    reader.readAsDataURL(file);
  });
};