const autoprefixer = require('autoprefixer')();
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [ './hugo_stats.json' ],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  }
});
module.exports = {
   plugins: [
      autoprefixer,
      ...(process.env.HUGO_ENVIRONMENT === 'production' ? [ purgecss ] : [])
   ]
};