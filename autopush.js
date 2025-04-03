const { execSync } = require('child_process');
const readline = require('readline');

const time = new Date().toLocaleString('fr-FR');
const options = {
  1: `🚀 Auto-commit : mise à jour en local ✨ | 🕒 ${time} | 🔄 Synchro automatique depuis l'environnement de développement`,
  2: `🎨 Modifs enregistrées & poussées 💾 | 📦 Déploiement instantané | 🕒 ${time}`,
  3: `[auto-sync] 🛠️ Code update from dev @ ${time} | Triggered by local save (CTRL+S)`,
  4: `🔒 Commit pro & propre | Auto-sync @ ${time}`,
};

console.log("\n🌟 Choisis un style de commit Git :");
console.log("1. 🚀 Auto-commit (dynamique)");
console.log("2. 🎨 Fun et coloré");
console.log("3. 🛠️ Techie / Dev");
console.log("4. 🔒 Pro et minimal");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("\nTape le numéro de ton choix : ", (choice) => {
  const message = options[choice] || `📝 Commit par défaut @ ${time}`;

  try {
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' }); // adapte 'main' si besoin
  } catch (err) {
    console.error('❌ Une erreur est survenue :', err.message);
  }

  rl.close();
});
