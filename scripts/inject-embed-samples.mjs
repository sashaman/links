import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'public', 'fs25_animalic_food.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const m = fs.readFileSync(path.join(root, 'public', 'samples', 'animalFood-mittellandkanal.xml'), 'utf8').trimEnd();
const h = fs.readFileSync(path.join(root, 'public', 'samples', 'animalFood-harterleiten.xml'), 'utf8').trimEnd();
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const block =
  `  const MITTELLAND_EMBEDDED_XML = \`${esc(m)}\`;\n\n  const HARTERLEITEN_EMBEDDED_XML = \`${esc(h)}\`;\n\n`;
const re =
  /(<\/animalFood>`;\r?\n\r?\n)(\s*\/\*\* FS25 base-game bale capacities \(data\/objects\/bales\)\. Merged with uploaded bale \*\.xml\. \*\/)/;
if (!re.test(html)) {
  console.error('Anchor regex did not match');
  process.exit(1);
}
html = html.replace(re, `$1${block}$2`);
fs.writeFileSync(htmlPath, html);
console.log('Embedded Mittelland + Harterleiten OK');
