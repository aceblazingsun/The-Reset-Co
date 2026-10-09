const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const brochures = [
  {
    html: 'brochure-awakening.html',
    pdf: 'The-Reset-Co-Awakening-Pathway-Nov26-30.pdf'
  },
  {
    html: 'brochure-rejuvenation.html',
    pdf: 'The-Reset-Co-Deep-Rejuvenation-Nov26-30.pdf'
  },
  {
    html: 'brochure-classical-reset.html',
    pdf: 'The-Reset-Co-Classical-Reset-Nov26-30.pdf'
  }
];

function generatePdf(item) {
  return new Promise((resolve, reject) => {
    const htmlPath = path.resolve(__dirname, item.html);
    const pdfPath = path.resolve(__dirname, item.pdf);

    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdfPath}`,
      `file:///${htmlPath.replace(/\\/g, '/')}`
    ];

    console.log(`Generating PDF for ${item.html} -> ${item.pdf}...`);
    execFile(chromePath, args, { timeout: 25000 }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error generating ${item.pdf}:`, err);
        return reject(err);
      }
      if (fs.existsSync(pdfPath)) {
        const stats = fs.statSync(pdfPath);
        console.log(`✓ Successfully created ${item.pdf} (${(stats.size / 1024).toFixed(1)} KB)`);
        resolve(pdfPath);
      } else {
        reject(new Error(`PDF file not found: ${pdfPath}`));
      }
    });
  });
}

async function run() {
  for (const b of brochures) {
    try {
      await generatePdf(b);
    } catch (e) {
      console.error('Failed to generate:', b.pdf, e);
    }
  }
  console.log('All brochure PDFs generated successfully!');
}

run();
