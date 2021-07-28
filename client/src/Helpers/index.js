// format img
export function getUploadedImageURL(imageID) {
  return `/image/${imageID}`;
}

// detect if empty value in a object
export function getEmptyValue(item) {
  let emptyTime = 0;
  for (let key in item) {
    if (!item[key] || !item[key].length) {
      emptyTime += 1;
    }
  }
  return emptyTime;
}

export function formatTime(timeString) {
  // input: 2020-06-08T00:00:00.000Z
  // output: 2020-06-08
  return timeString.split("T")[0];
}
