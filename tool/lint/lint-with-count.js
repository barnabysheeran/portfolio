import { execSync } from 'child_process';

const MAX_ERRORS_TO_LOG_START = 10;
const MAX_ERRORS_TO_LOG_RANDOM = 20;
const MAX_ERRORS_TO_LOG_END = 10;

const MAX_DESCRIPTION_WORDS_TO_LOG = 6;

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
  const totalToLog = MAX_ERRORS_TO_LOG_START + MAX_ERRORS_TO_LOG_RANDOM + MAX_ERRORS_TO_LOG_END;
  let errorsToLog;
  if (formattedErrors.length <= totalToLog) {
    errorsToLog = formattedErrors;
    console.log(errorsToLog.join('\n'));
  } else {
    const firstErrors = formattedErrors.slice(0, MAX_ERRORS_TO_LOG_START);
    const middleErrors = formattedErrors.slice(MAX_ERRORS_TO_LOG_START, formattedErrors.length - MAX_ERRORS_TO_LOG_END);
    const randomMiddle = shuffle(middleErrors).slice(0, MAX_ERRORS_TO_LOG_RANDOM);
    const lastErrors = formattedErrors.slice(-MAX_ERRORS_TO_LOG_END);
    console.log(firstErrors.join('\n'));
    console.log('--');
    console.log(randomMiddle.join('\n'));
    console.log('--');
    console.log(lastErrors.join('\n'));
    console.log(`Showing start ${MAX_ERRORS_TO_LOG_START}, random ${MAX_ERRORS_TO_LOG_RANDOM}, end ${MAX_ERRORS_TO_LOG_END} errors out of ${formattedErrors.length}.`);
  }
  console.log(`Found ${errorLines.length} TypeScript errors.`);

  // eslint-disable-next-line no-undef
  process.exit(1);
}

console.log('Lint With Count - Starting ESLint');
execSync('npx eslint .', { stdio: 'inherit' });
console.log('Lint With Count - Finished');