function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split('&');
  searchArr.forEach((item) => {
    const index = item.indexOf('=');
    if (index !== -1) {
      const name = item.substring(0, index);
      const val = item.substring(index + 1, item.length);
      obj[name] = val;
    }
  });
  return obj;
}

module.exports = {
  param2Obj,
};
