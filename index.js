const core = require('@actions/core');

try {
  const commitMessage = core.getInput('commit_message');

  // Simple validation example: Check if the commit message starts with a prefix
  const validPrefixes = ['feat:', 'fix:', 'docs:', 'style:', 'refactor:', 'test:', 'chore:'];
  const isValid = validPrefixes.some(prefix => commitMessage.startsWith(prefix));

  if (!isValid) {
    core.setFailed(`Invalid commit message: "${commitMessage}". It must start with one of the following: ${validPrefixes.join(', ')}`);
  } else {
    console.log('Commit message is valid.');
  }
} catch (error) {
  core.setFailed(error.message);
}
