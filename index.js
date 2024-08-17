const core = require('@actions/core');

try {
  const commitMessage = core.getInput('commit_message');

  // Define valid prefixes
  const validPrefixes = ['feat:', 'fix:', 'docs:', 'style:', 'refactor:', 'test:', 'chore:'];
  
  // Check if the commit message starts with a valid prefix
  const hasValidPrefix = validPrefixes.some(prefix => commitMessage.startsWith(prefix));
  
  // Extract the body of the commit message
  const commitBody = commitMessage.split(':')[1]?.trim();

  // Define regex to check if body is lowercase and contains no numbers
  const isValidBody = commitBody && /^[a-z\s]+$/.test(commitBody);

  // Validation logic
  if (!hasValidPrefix) {
    core.setFailed(`Invalid commit message: "${commitMessage}". It must start with one of the following prefixes: ${validPrefixes.join(', ')}`);
  } else if (!isValidBody) {
    core.setFailed(`Invalid commit message body: "${commitBody}". The body must be all lowercase letters with no numbers.`);
  } else {
    console.log('Commit message is valid.');
  }
} catch (error) {
  core.setFailed(error.message);
}
