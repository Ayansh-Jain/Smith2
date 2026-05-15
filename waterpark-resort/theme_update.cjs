const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Primary Blue to Gold
  { regex: /#00B4D8/gi, replace: '#D4AF37' },
  { regex: /#0077B6/gi, replace: '#d2a635ff' },
  { regex: /#023E8A/gi, replace: '#8B6508' },
  { regex: /#48CAE4/gi, replace: '#FFD700' },
  { regex: /#90E0EF/gi, replace: '#F1C40F' },

  // Background/Text Adjustments
  { regex: /#f0faff/gi, replace: '#0A0A0A' }, 
  { regex: /#E0F7FA/gi, replace: '#1A1A1A' }, 
  { regex: /#0A2540/gi, replace: '#FFFFFF' }, 
  { regex: /#1E5F8C/gi, replace: '#E0E0E0' }, 

  // RGBA blue variants to Gold
  { regex: /rgba\(0,\s*180,\s*216/gi, replace: 'rgba(212,175,55' },
  { regex: /rgba\(0,\s*119,\s*182/gi, replace: 'rgba(184,134,11' },
  { regex: /rgba\(2,\s*62,\s*138/gi, replace: 'rgba(139,101,8' },
  { regex: /rgba\(72,\s*202,\s*228/gi, replace: 'rgba(255,215,0' },

  // Hero section gradients & backgrounds
  { regex: /#012A4A/gi, replace: '#050505' },
  { regex: /rgba\(255,255,255,0\.95\)/g, replace: 'rgba(20,20,20,0.95)' }, // Navbar scroll background
  
  // Specific fix for "0,180,216" in template literals (Hero Bubbles)
  { regex: /'0,180,216'/g, replace: "'212,175,55'" },
  { regex: /'72,202,228'/g, replace: "'255,215,0'" }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const { regex, replace } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          modified = true;
        }
      }
      
      // Additional replacements for index.css specific structure
      if (file === 'index.css') {
        if (content.includes('--white: #FFFFFF;')) {
          content = content.replace('--white: #FFFFFF;', '--white: #111111;');
          modified = true;
        }
        if (content.includes('background: #f0faff;')) {
          content = content.replace('background: #f0faff;', 'background: #0A0A0A;');
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Theme update complete!');
