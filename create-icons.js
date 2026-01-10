const fs = require('fs');
const path = require('path');

// PNGs base64 - ícones simples azuis
const icon16 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAEElEQVR42mP8z8DwHwyGOQMANooF/4e9kFsAAAAASUVORK5CYII=';
const icon48 = 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAQElEQVRoge3SMQEAAAwCoNm/9CL4CIBQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+BhkAAAEJ7A4LAAAAAElFTkSuQmCC';
const icon128 = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAgElEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBvAMUAAAH+klMAAAAAElFTkSuQmCC';

const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');

// Criar diretório se não existir
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Criar ícones
fs.writeFileSync(path.join(iconsDir, 'icon-16.png'), Buffer.from(icon16, 'base64'));
fs.writeFileSync(path.join(iconsDir, 'icon-48.png'), Buffer.from(icon48, 'base64'));
fs.writeFileSync(path.join(iconsDir, 'icon-128.png'), Buffer.from(icon128, 'base64'));

console.log('✅ Ícones criados com sucesso!');
console.log('   - icon-16.png');
console.log('   - icon-48.png');
console.log('   - icon-128.png');
