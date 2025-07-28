const { findSecret } = require('./backend/shamir.js');
const fs = require('fs');
const path = require('path');

function main() {
    try {
        console.log("=== SHAMIR'S SECRET SHARING ASSIGNMENT ===\n");
        
        // Load test case 1
        console.log("Loading Test Case 1...");
        const test1Path = path.join(__dirname, 'backend', 'test1.json');
        const test1Data = JSON.parse(fs.readFileSync(test1Path, 'utf8'));
        
        console.log("=== TEST CASE 1 ===");
        const secret1 = findSecret(test1Data);
        
        // Load test case 2
        console.log("\nLoading Test Case 2...");
        const test2Path = path.join(__dirname, 'backend', 'test2.json');
        const test2Data = JSON.parse(fs.readFileSync(test2Path, 'utf8'));
        
        console.log("\n=== TEST CASE 2 ===");
        const secret2 = findSecret(test2Data);
        
        // Final results
        console.log("\n" + "=".repeat(50));
        console.log("FINAL SUBMISSION RESULTS");
        console.log("=".repeat(50));
        console.log(`Test Case 1 Secret: ${secret1}`);
        console.log(`Test Case 2 Secret: ${secret2}`);
        console.log("=".repeat(50));
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the main function
main();