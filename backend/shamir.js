const fs = require('fs');
const path = require('path');

// Function to convert from any base to decimal
function baseToDecimal(value, base) {
    return parseInt(value, parseInt(base));
}

// Lagrange interpolation to find polynomial value at x=0 (constant term)
function lagrangeInterpolation(points) {
    const n = points.length;
    let result = 0;
    
    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term = term * (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        
        result += term;
    }
    
    return Math.round(result);
}

// Function to solve for secret from JSON input
function findSecret(jsonData) {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    const { n, k } = data.keys;
    
    console.log(`Processing: n=${n}, k=${k}`);
    
    // Extract and decode points
    const points = [];
    
    for (let key in data) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = data[key].base;
            const encodedValue = data[key].value;
            
            // Convert from given base to decimal
            const y = baseToDecimal(encodedValue, base);
            
            points.push({ x, y });
            console.log(`Point: (${x}, ${y}) - decoded from "${encodedValue}" in base ${base}`);
        }
    }
    
    // We only need k points to solve the polynomial
    const selectedPoints = points.slice(0, k);
    console.log(`Using ${selectedPoints.length} points for interpolation`);
    
    // Find the constant term using Lagrange interpolation
    const secret = lagrangeInterpolation(selectedPoints);
    
    return secret;
}

// Function to load and solve from JSON files
function solveFromFiles() {
    try {
        console.log("=== READING FROM JSON FILES ===");
        
        // Read test1.json
        const test1Path = path.join(__dirname, 'test1.json');
        const test1Data = JSON.parse(fs.readFileSync(test1Path, 'utf8'));
        const secret1 = findSecret(test1Data);
        console.log(`\nSecret for Test Case 1: ${secret1}\n`);
        
        // Read test2.json
        const test2Path = path.join(__dirname, 'test2.json');
        const test2Data = JSON.parse(fs.readFileSync(test2Path, 'utf8'));
        const secret2 = findSecret(test2Data);
        console.log(`\nSecret for Test Case 2: ${secret2}\n`);
        
        // Final output
        console.log("=== FINAL RESULTS ===");
        console.log(`Test Case 1 Secret: ${secret1}`);
        console.log(`Test Case 2 Secret: ${secret2}`);
        
        return { secret1, secret2 };
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Run the program
if (require.main === module) {
    solveFromFiles();
}

module.exports = { findSecret, baseToDecimal, lagrangeInterpolation, solveFromFiles };