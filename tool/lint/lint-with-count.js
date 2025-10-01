import { execSync } from 'child_process';
import path from 'path';

const MAX_ERRORS_TO_LOG = 15;
const ERROR_WORDS_TO_PRINT = 10;

function formatError(line) {
  const parts = line.split(':');
  if (parts.length < 3) return line; // Fallback for malformed lines
  const fileName = parts[0];
  const filename = path.basename(fileName); // Extract only the filename
  const message = parts[parts.length - 1].trim();
  const words = message.split(' ').slice(0, ERROR_WORDS_TO_PRINT).join(' ');
  return `${filename} - ${words}`;
}

try {
  console.log('Lint With Count - Running tsc...');
  const output = execSync('npx tsc --build --pretty false', { encoding: 'utf8', stdio: 'pipe' });
  console.log('Lint With Count - tsc succeeded, output length:', output.length);
  console.log('No TypeScript errors found.');
} catch (error) {
  console.log('Lint With Count - tsc failed');
  const fullOutput = error.stdout + error.stderr;
  const lines = fullOutput.split('\n');
  const errorLines = lines.filter(line => line.includes('error TS'));
  const formattedErrors = errorLines.map(formatError);
  const errorsToLog = formattedErrors.slice(0, MAX_ERRORS_TO_LOG);
  console.log(' - ' + errorsToLog.join('\n')); // Print up to MAX_ERRORS_TO_LOG errors
  if (formattedErrors.length > MAX_ERRORS_TO_LOG) {
    console.log(`... and ${formattedErrors.length - MAX_ERRORS_TO_LOG} more errors.`);
  }
  console.log(`Found ${errorLines.length} TypeScript errors.`);
  process.exit(1);
}

console.log('Lint With Count - Starting ESLint');
execSync('npx eslint .', { stdio: 'inherit' });
console.log('Lint With Count - Finished');