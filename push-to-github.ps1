# Push vers github.com/Shawarmix/ami-avocats-site
# Pre-requis : git installe (https://git-scm.com/download/win)

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

$RemoteUrl = "https://github.com/Shawarmix/ami-avocats-site.git"

Write-Host "Nettoyage de l'ancien dossier .git..." -ForegroundColor Cyan
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}

Write-Host "Initialisation git..." -ForegroundColor Cyan
git init -b main
git config user.email "thomas.sadaka@gmail.com"
git config user.name  "Thomas Sadaka"

Write-Host "Ajout des fichiers (selon .gitignore)..." -ForegroundColor Cyan
git add -A

Write-Host "Commit initial..." -ForegroundColor Cyan
git commit -m "Initial commit : prototypes site AMI Avocats"

Write-Host "Configuration du remote GitHub..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $RemoteUrl

Write-Host "Push vers GitHub (une popup d'auth peut s'ouvrir)..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "OK - Repo en ligne : https://github.com/Shawarmix/ami-avocats-site" -ForegroundColor Green
Write-Host "Pour partager : Settings > Collaborators (ou passer en Public)" -ForegroundColor Green
