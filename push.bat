@echo off
echo Initializing Git repository...
git init

echo Adding files to git...
git add .

echo Committing files...
git commit -m "Initial commit"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/Naresh31122002/kk-leathers.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
