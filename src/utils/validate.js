export function validUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

export function isExternal(path) {
  return /^(https?:|mailo:|tel:)/.test(path);
}
