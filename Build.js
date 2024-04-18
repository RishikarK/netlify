const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const sourceDir = './Templates'; // Path to your Handlebars files directory
const outputDir = './dist'; // Output directory for compiled HTML files
const cssDir = './public/css/'; // Path to your CSS files directory
const jsDir = './src/js/'; // Path to your JavaScript files directory

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Compile each Handlebars file
fs.readdirSync(sourceDir).forEach(file => {
    if (file.endsWith('.hbs')) {
        const filePath = path.join(sourceDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const template = handlebars.compile(fileContents);
        const compiledHTML = template(/* Optional data object */);

        // Write compiled HTML to output directory
        const outputFile = path.join(outputDir, file.replace('.hbs', '.html'));
        fs.writeFileSync(outputFile, compiledHTML);
    }
});
// Copy CSS files to output directory
if (fs.existsSync(cssDir)) {
    if (!fs.existsSync(path.join(outputDir, 'css'))) {
        fs.mkdirSync(path.join(outputDir, 'css'));
    }
    fs.readdirSync(cssDir).forEach(file => {
        const filePath = path.join(cssDir, file);
        const fileContents = fs.readFileSync(filePath);

        // Write CSS files to output directory
        const outputFile = path.join(outputDir, 'css', file);
        fs.writeFileSync(outputFile, fileContents);
    });
}

// Copy JS files to output directory
if (fs.existsSync(jsDir)) {
    if (!fs.existsSync(path.join(outputDir, 'js'))) {
        fs.mkdirSync(path.join(outputDir, 'js'));
    }
    fs.readdirSync(jsDir).forEach(file => {
        const filePath = path.join(jsDir, file);
        const fileContents = fs.readFileSync(filePath);

        // Write JS files to output directory
        const outputFile = path.join(outputDir, 'js', file);
        fs.writeFileSync(outputFile, fileContents);
    });
}
console.log('Build completed successfully!');
