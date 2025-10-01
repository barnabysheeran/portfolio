import { execSync } from 'child_process';

const MAX_ERRORS_TO_LOG = 20;
const MAX_DESCRIPTION_WORDS_TO_LOG = 6;

function formatError(line) {
  const parts = line.split(':');
  if (parts.length < 3) return line; // Fallback for malformed lines
  const fileName = parts[0];
  const message = parts[parts.length - 1].trim();
  const words = message.split(' ').slice(0, MAX_DESCRIPTION_WORDS_TO_LOG).join(' ');
  return `${fileName} - ${words}`;
}

console.log('Lint With Count - Script started');

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
  let errorsToLog;
  if (formattedErrors.length <= MAX_ERRORS_TO_LOG) {
    errorsToLog = formattedErrors;
  } else {
    const third = Math.floor(MAX_ERRORS_TO_LOG / 3);
    const middleCount = MAX_ERRORS_TO_LOG - 2 * third;
    const firstErrors = formattedErrors.slice(0, third);
    const middleStart = Math.floor(formattedErrors.length / 2) - Math.floor(middleCount / 2);
    const middleErrors = formattedErrors.slice(middleStart, middleStart + middleCount);
    const lastErrors = formattedErrors.slice(-third);
    errorsToLog = [...firstErrors, ...middleErrors, ...lastErrors];
    console.log(`Showing first ${third}, middle ${middleCount}, and last ${third} errors out of ${formattedErrors.length}.`);
  }
  console.log(errorsToLog.join('\n'));
  console.log(`Found ${errorLines.length} TypeScript errors.`);
  process.exit(1);
}

console.log('Lint With Count - Starting ESLint');
execSync('npx eslint .', { stdio: 'inherit' });
console.log('Lint With Count - Finished');