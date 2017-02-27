// @flow

export default () => {
  return new Promise((resolve, reject) => {
    resolve({ data: 'This is some async startup data we absolutely need' });
  });
};
