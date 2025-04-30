import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ora from 'ora';

const time = new Date().toLocaleString('fr-FR');

const commits = {
  "🚀 Auto-commit (dynamique)": `🚀 Auto-commit : mise à jour en local ✨ | 🕒 ${time} | 🔄 Synchro automatique depuis l'environnement de développement`,
  "🎨 Fun et coloré": `🎨 Modifs enregistrées & poussées 💾 | 📦 Déploiement instantané | 🕒 ${time}`,
  "🛠️ Techie / Dev": `[auto-sync] 🛠️ Code update from dev @ ${time} | Triggered by local save (CTRL+S)`,
  "🔒 Pro et minimal": `🔒 Commit pro & propre | Auto-sync @ ${time}`
};

console.clear();
console.log(gradient.instagram(figlet.textSync('AutoPush', { horizontalLayout: 'fitted' })));

inquirer
  .prompt([
    {
      type: 'list',
      name: 'style',
      message: '🌟 Choisis un style de commit :',
      choices: Object.keys(commits),
    },
  ])
  .then((answers) => {
    const message = commits[answers.style] || `📝 Commit par défaut @ ${time}`;
    const spinner = ora('📡 Envoi des modifications vers GitHub...').start();

    try {
      execSync('git add .', { stdio: 'ignore' });
      const diff = execSync('git diff --cached --name-only').toString().trim();

      if (diff) {
        execSync(`git commit -m "${message}"`, { stdio: 'ignore' });
        execSync('git push origin main', { stdio: 'ignore' });

        spinner.succeed(chalk.green('✅ Push terminé avec succès !'));
        console.log('\n' + gradient.retro(figlet.textSync('PUSH OK', { horizontalLayout: 'fitted' })));

        console.log(chalk.bgGreen.black.bold('\n ✅ Commit effectué avec le message :\n'));
        console.log(chalk.green(`💬 ${message}\n`));
        console.log(chalk.gray(`🕒 Poussé le ${time}\n`));
      } else {
        spinner.stop();
        console.log(chalk.yellow('\n🧼 Rien à committer, tout est déjà propre !\n'));
      }
    } catch (err) {
      spinner.fail('❌ Une erreur est survenue lors du push.');
      console.error(chalk.red(err.message));
    }
  });
