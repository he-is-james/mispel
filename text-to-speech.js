const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

const text = 'Text to synthesize';
// eslint-disable-next-line no-useless-escape
const outputFile = 'C:\Users\aksha\OneDrive\Documents\output.mp3';

const request = {
  input: { text },
  voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
  audioConfig: { audioEncoding: 'MP3' },
};

async function synthesize() {
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${outputFile}`);
}

synthesize();
