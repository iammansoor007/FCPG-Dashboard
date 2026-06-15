const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\dell\\Desktop\\RealRoof\\src\\components\\QAForm.tsx', 'utf8');

const lines = content.split('\n');
const matches = [];
lines.forEach((line, i) => {
  if (line.includes('onSubmit') || line.includes('api') || line.includes('fetch') || line.includes('axios') || line.includes('submit') || line.includes('POST')) {
    matches.push(`${i+1}: ${line.trim()}`);
  }
});
console.log('Matches in QAForm.tsx:');
console.log(matches.slice(0, 30).join('\n'));
