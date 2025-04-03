$time = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$message = "🚀 Auto-commit : mise à jour en local ✨ | 🕒 $time | 🔄 Synchro automatique depuis l'environnement de développement"
git add .
git commit -m "$message"
git push origin main
