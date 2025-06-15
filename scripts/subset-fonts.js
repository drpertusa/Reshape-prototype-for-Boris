#!/usr/bin/env node

/**
 * Font Subsetting Script
 * Reduces font file sizes by including only necessary characters
 * Target: <200KB total for all fonts combined
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Character sets for medical/clinic use
const LATIN_SUBSET = 'U+0020-007F,U+00A0-00FF,U+0100-017F,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F';
const PUNCTUATION = 'U+2010-2027,U+2030-2047';
const SYMBOLS = 'U+2190-21FF,U+2600-26FF';

const fonts = [
  {
    input: 'app/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.woff2',
    output: 'app/fonts/fraunces-subset.woff2',
    subset: `${LATIN_SUBSET},${PUNCTUATION}`, // Display font needs less
  },
  {
    input: 'app/fonts/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.woff2',
    output: 'app/fonts/fraunces-italic-subset.woff2',
    subset: `${LATIN_SUBSET},${PUNCTUATION}`,
  },
  {
    input: 'app/fonts/Inter-VariableFont_opsz,wght.woff2',
    output: 'app/fonts/inter-subset.woff2',
    subset: `${LATIN_SUBSET},${PUNCTUATION},${SYMBOLS}`, // Body font needs more
  },
  {
    input: 'app/fonts/Inter-Italic-VariableFont_opsz,wght.woff2',
    output: 'app/fonts/inter-italic-subset.woff2',
    subset: `${LATIN_SUBSET},${PUNCTUATION},${SYMBOLS}`,
  },
];

console.log('🔤 Starting font subsetting...\n');

// Check if pyftsubset is available
try {
  execSync('pyftsubset --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ pyftsubset not found. Installing fonttools...');
  console.log('Run: pip install fonttools brotli');
  process.exit(1);
}

let totalSizeBefore = 0;
let totalSizeAfter = 0;

fonts.forEach(({ input, output, subset }) => {
  if (!fs.existsSync(input)) {
    console.error(`❌ Input file not found: ${input}`);
    return;
  }

  const sizeBefore = fs.statSync(input).size;
  totalSizeBefore += sizeBefore;

  console.log(`📝 Processing ${path.basename(input)}...`);
  console.log(`   Size before: ${(sizeBefore / 1024).toFixed(1)}KB`);

  try {
    // Use pyftsubset to create subset
    const cmd = `pyftsubset "${input}" --output-file="${output}" --flavor=woff2 --unicodes="${subset}" --layout-features="*" --no-hinting --desubroutinize`;
    
    execSync(cmd, { stdio: 'inherit' });

    const sizeAfter = fs.statSync(output).size;
    totalSizeAfter += sizeAfter;
    
    console.log(`   Size after: ${(sizeAfter / 1024).toFixed(1)}KB`);
    console.log(`   Reduction: ${((1 - sizeAfter / sizeBefore) * 100).toFixed(1)}%\n`);
  } catch (error) {
    console.error(`❌ Failed to subset ${input}:`, error.message);
  }
});

console.log('\n📊 Summary:');
console.log(`Total size before: ${(totalSizeBefore / 1024).toFixed(1)}KB`);
console.log(`Total size after: ${(totalSizeAfter / 1024).toFixed(1)}KB`);
console.log(`Total reduction: ${((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(1)}%`);

if (totalSizeAfter > 200 * 1024) {
  console.log('\n⚠️  WARNING: Total size exceeds 200KB target!');
  console.log('Consider further reducing character sets or using system fonts for body text.');
}