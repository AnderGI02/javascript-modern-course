export function countWords(str) {
  return str.split(" ").length;
}

export function countChars(str) {
  return str.split("").length;
}

export async function iterateNodes(array, callback) {
  for (var i = 0; i < array.length; ++i) {
    await callback(array[i]);
  }
}
