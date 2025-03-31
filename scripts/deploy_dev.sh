#!/bin/bash

# Aller à la racine du projet
cd "$(dirname "$0")/.."

# Vérifier si des modifications existent
if [[ -n $(git status --porcelain) ]]; then
  echo "📦 Des modifications détectées, commit en cours..."
  
  # Ajouter toutes les modifications
  git add .
  
  # Faire un commit automatique avec la date et l'heure
  git commit -m "🚀 Auto-commit: $(date +'%Y-%m-%d %H:%M:%S')"
  
  # Pousser les modifications sur le repo Elysion-Dev
  git push origin main
  
  echo "✅ Code envoyé automatiquement sur Elysion-Dev ! 🚀"
else
  echo "✅ Aucun changement à pousser, tout est à jour."
fi