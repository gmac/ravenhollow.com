const fs = require('fs');
const path = require('path');
const divider = '<!--CONTENT-->';
const pages = {
  './stitch': {
    'index': 'Download',
    'about': 'About',
    'guide': 'Guide',
    'concept-art': 'Concept Art',
    'credits': 'Credits',
  },
  './wmyt': {
    'index': 'Download',
    'about': 'About',
    'guide': 'Guide',
    'concept-art': 'Concept Art',
    'credits': 'Credits',
  },
  './fishing': {
    'index': 'Play!',
    'about': 'About',
    'credits': 'Credits',
  },
  './': {
    'index': 'News',
    'about': 'About',
    'gallery': 'Gallery',
    'nodownload': 'Download',
    'download': 'Downloads',
  }
};

Object.entries(pages).forEach(([dir, files]) => {
  const header = fs.readFileSync(path.join(__dirname, dir, '_header.html'), 'utf8');
  const footer = fs.readFileSync(path.join(__dirname, dir, '_footer.html'), 'utf8');

  Object.entries(files).forEach(([slug, title]) => {
    const file = fs.readFileSync(path.join(__dirname, dir, slug+'.html'), 'utf8');
    const parts = file.split(divider);

    if (parts.length !== 3) {
      throw new Error(`document #{slug} is missing content sections`);
    }

    const contentHeader = header
      .replace(/\{title\}/g, title);

    const content = [contentHeader.trim(), divider, parts[1].trim(), divider, footer].join('\n\n\n');
    fs.writeFileSync(path.join(__dirname, dir, slug+'.html'), content, { encoding: 'utf8' });
  });
});

console.log('done.');
