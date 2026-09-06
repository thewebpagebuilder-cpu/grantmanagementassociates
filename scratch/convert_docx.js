const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const docPath = "C:\\Users\\lokha\\OneDrive\\Desktop\\grant management\\GMA_Weekly_Funding_Digest_Aug_31_Sept_4_2026.docx";

mammoth.convertToHtml({path: docPath})
    .then(function(result){
        fs.writeFileSync(path.join(__dirname, "new_newsletter.html"), result.value);
        console.log("Converted successfully.");
    })
    .catch(function(err){
        console.error(err);
    });
