const fs = require('fs');
const path = require('path');

// Simple PNG generator for solid color icons
// PNG file structure for a simple solid color image

function createPNG(size, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);  // width
  ihdrData.writeUInt32BE(size, 4);  // height
  ihdrData.writeUInt8(8, 8);        // bit depth
  ihdrData.writeUInt8(2, 9);        // color type (RGB)
  ihdrData.writeUInt8(0, 10);       // compression
  ihdrData.writeUInt8(0, 11);       // filter
  ihdrData.writeUInt8(0, 12);       // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk - image data
  // Create raw image data (filter byte + RGB for each pixel per row)
  const rawData = [];
  for (let y = 0; y < size; y++) {
    rawData.push(0); // filter byte (none)
    for (let x = 0; x < size; x++) {
      // Create a simple gradient circle
      const cx = size / 2;
      const cy = size / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = size / 2;

      if (dist < maxDist * 0.85) {
        // Inside circle - cyan gradient
        const factor = 1 - (dist / (maxDist * 0.85)) * 0.3;
        rawData.push(Math.floor(6 * factor));   // R
        rawData.push(Math.floor(182 * factor)); // G
        rawData.push(Math.floor(212 * factor)); // B
      } else {
        // Background - dark
        rawData.push(10);  // R
        rawData.push(10);  // G
        rawData.push(10);  // B
      }
    }
  }

  const rawBuffer = Buffer.from(rawData);
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(rawBuffer);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type);
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  const table = makeCRCTable();

  for (let i = 0; i < buffer.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buffer[i]) & 0xff];
  }

  return crc ^ 0xffffffff;
}

function makeCRCTable() {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}

// Generate icons
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

const icon192 = createPNG(192, 6, 182, 212);
const icon512 = createPNG(512, 6, 182, 212);

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), icon192);
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), icon512);

console.log('Icons generated successfully!');
