const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'homepage.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('--- Verifying homepage.html ---');
console.log('File size:', (content.length / 1024).toFixed(1), 'KB');

const requiredIds = [
  'siteHeader',
  'upcomingStrip',
  'upcomingTrigger',
  'upcomingFlyout',
  'flyoutCloseBtn',
  'ambientSuryaBg',
  'suryaCompanion',
  'companionPill',
  'companionRingPath',
  'companionStepTxt',
  'companionPoseName',
  'companionCard',
  'companionCardMantra',
  'companionCardTitle',
  'companionCloseBtn',
  'companionCardBreath',
  'companionCardDesc',
  'companionScrubber',
  'experience',
  'exp-panel-1',
  'exp-panel-2',
  'exp-panel-3',
  'exp-panel-4',
  'exp-panel-5',
  'clinical-benefits',
  'welcome-kit',
  'sanctuary-essentials',
  'package-inclusions',
  'cancellationModal',
  'cancelModalCloseBtn'
];

let allIdsFound = true;
for (const id of requiredIds) {
  if (!content.includes(`id="${id}"`)) {
    console.error(`MISSING ID: ${id}`);
    allIdsFound = false;
  }
}

if (allIdsFound) {
  console.log(`✓ All ${requiredIds.length} critical component IDs are present and verified.`);
}

// Check for images
const requiredImages = [
  'images/welcome_kit.jpg',
  'images/hero_sanctuary.jpg',
  'images/dinacharya_ritual.jpg',
  'images/yoga.png',
  'images/meditation.png',
  'images/group.png',
  'images/surya_pose1.jpg',
  'images/surya_pose2.jpg',
  'images/surya_pose3.jpg',
  'images/surya_pose4.jpg',
  'images/surya_pose5.jpg',
  'images/surya_pose6.jpg',
  'images/surya_pose7.jpg',
  'images/surya_pose8.jpg'
];

let allImagesFound = true;
for (const img of requiredImages) {
  const diskPath = path.join(__dirname, img);
  if (!fs.existsSync(diskPath)) {
    console.error(`MISSING IMAGE FILE ON DISK: ${diskPath}`);
    allImagesFound = false;
  }
}

if (allImagesFound) {
  console.log(`✓ All ${requiredImages.length} referenced images exist on disk.`);
}

// Check em dash rule (Antislop R-02)
const emDashCount = (content.match(/—/g) || []).length;
console.log(`Em dashes (—) in homepage.html: ${emDashCount} (should be 0)`);

if (emDashCount === 0 && allIdsFound && allImagesFound) {
  console.log('=== ALL HOMEPAGE VERIFICATIONS PASSED ===');
}
