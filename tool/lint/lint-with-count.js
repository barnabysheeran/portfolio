import { execSync } from 'child_process';

function formatError(line) {
  const parts = line.split(':');
  if (parts.length < 3) return line; // Fallback for malformed lines
  const fileName = parts[0];
  const message = parts[parts.length - 1].trim();
  const words = message.split(' ').slice(0, 6).join(' ');
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
  console.log(formattedErrors.join('\n')); // Print formatted errors
  console.log(`Found ${errorLines.length} TypeScript errors.`);
  process.exit(1);
}

console.log('Lint With Count - Starting ESLint');
execSync('npx eslint .', { stdio: 'inherit' });
console.log('Lint With Count - Finished');