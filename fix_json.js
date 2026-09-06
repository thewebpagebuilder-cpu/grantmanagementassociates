const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src/data/newsletters/aug-31-sept-4-2026.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Fix the Opening Summary (first item in the first category)
let firstCategory = data[0];
if (firstCategory.category.includes('Week of August 31') && firstCategory.grants.length > 0) {
    let summary = firstCategory.grants[0];
    let newDescription = `<p><strong>${summary.Description}</strong></p>`;
    
    // Iterate over all keys that are not 'Description'
    for (const key in summary) {
        if (key !== 'Description') {
            newDescription += `<p><strong>${key}</strong>: ${summary[key]}</p>`;
            delete summary[key];
        }
    }
    
    summary.Description = newDescription;
    // Map it to Program Focus so it renders nicely in the UI
    summary["Program Focus"] = newDescription;
    // Remove description so it doesn't render double or we can just leave Description as the title
    summary.Description = "Opening Summary";
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Fixed JSON');
