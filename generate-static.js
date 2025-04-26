const fs = require('fs');
const path = require('path');

// 1. Leer la plantilla HTML
const templatePath = path.join(__dirname, 'templates', 'og_template.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// 2. Leer los datos del JSON
const cardsPath = path.join(__dirname, 'data', 'cards.json');
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf-8'));

// 3. Crear carpeta de salida
const outputDir = path.join(__dirname, 'public', 'cards');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 4. Generar un archivo HTML por tarjeta
cards.forEach(card => {
  const html = template
    .replace(/{{title}}/g, card.title)
    .replace(/{{description}}/g, card.description)
    .replace(/{{image}}/g, card.image)
    .replace(/{{id}}/g, card.id);

  const filePath = path.join(outputDir, `${card.id}.html`);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Página generada: ${filePath}`);
});