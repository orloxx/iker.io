const parseTokens = (str, hash) => {
  if (hash) {
    Object.keys(hash).forEach((key) => {
      str = str.replace(new RegExp(`%${key}%`, 'g'), hash[key]);
    });
  }
  return str;
};

module.exports = (key, { hash }) => {
  if (window.i18nKeys && window.i18nKeys[key]) {
    return parseTokens(window.i18nKeys[key], hash);
  }
  return parseTokens(key, hash);
};
