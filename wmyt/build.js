const fs = require('fs');
const path = require('path');
const header = fs.readFileSync(path.join(__dirname, 'wrapper/header.html'), 'utf8');
const footer = fs.readFileSync(path.join(__dirname, 'wrapper/footer.html'), 'utf8');
const divider = '<!--CONTENT-->';

const pages = {
  'index': 'Home',
  'about': 'About',
  'credits': 'Credits',
  'how_to_play': 'How to Play',
  'more': 'More',
};

Object.entries(pages).forEach(([slug, title]) => {
  const file = fs.readFileSync(path.join(__dirname, slug+'.html'), 'utf8');
  const parts = file.split(divider);

  if (parts.length !== 3) {
    throw new Error(`document #{slug} is missing content sections`);
  }

  const contentHeader = header
    .replace(/\{title\}/g, title)
    .replace(`{menu:${slug}}`, ' current-menu-item current_page_item')
    .replace(/\{menu:[^}]+\}/g, '');

  const content = [contentHeader.trim(), divider, parts[1].trim(), divider, footer].join('\n\n\n');
  fs.writeFileSync(path.join(__dirname, slug+'.html'), content, { encoding: 'utf8' });
});

console.log('done.');
