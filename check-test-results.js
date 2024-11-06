const fs = require('fs');

// Read the test results from the JSON file
const testResults = JSON.parse(fs.readFileSync('test-results.json', 'utf8'));

// Check if the 'summary' field exists and its 'success' value is greater than 0 (indicating tests passed)
if (testResults && testResults.summary && testResults.summary.success > 0) {
  console.log("Tests passed. Proceeding with build...");
  process.exit(0);  // success
} else {
  console.error("Tests failed. Aborting build.");
  process.exit(1);  // fail
}
