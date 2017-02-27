import HtmlMinifier from 'html-minifier';

export default html => {
  return HtmlMinifier.minify(html, {
    minifyJS: true,
    collapseWhitespace: true,
    minifyCSS: true
  });
};
