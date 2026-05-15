const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Hex colors
  { regex: /#8B6508/gi, replace: '#D4AF37' },
  { regex: /#B8860B/gi, replace: '#FFD700' },
  
  // RGB values for rgba()
  { regex: /139,\s*101,\s*8/g, replace: '212,175,55' },
  { regex: /184,\s*134,\s*11/g, replace: '255,215,0' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      
      replacements.forEach(({ regex, replace }) => {
        content = content.replace(regex, replace);
      });
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  });
}

processDirectory(srcDir);
console.log('Yellow colors lightened successfully.');
