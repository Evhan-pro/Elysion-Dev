#!/bin/bash

# Aller à la racine du projet
cd "$(dirname "$0")/.."

# Boucle infinie pour surveiller les fichiers
while true; do
    # Vérifie s'il y a des modifications non poussées
    if [[ -n $(git status --porcelain) ]]; then
        echo "📦 Des modifications détectées, commit en cours..."
        
        # Ajouter toutes les modifications
        git add .
        
        # Faire un commit automatique avec la date et l'heure
        git commit -m "🚀 Auto-commit: $(date +'%Y-%m-%d %H:%M:%S')"
        
        # Pousser les modifications sur le repo `Elysion-Dev`
        git push origin main
        
        echo "✅ Code envoyé automatiquement sur Elysion-Dev ! 🚀"
    fi
    
    # Attendre 30 secondes avant de revérifier
    sleep 30
done
