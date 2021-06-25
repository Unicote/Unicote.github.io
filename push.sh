#!/bin/bash
cd /public
git remote rm origin
git remote add origin https://github.com/Unicote/unicote.github.io

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
cd /app
hugo -d /public

# Go To Public folder
cd /public

# Add changes to git.
git add .

# Commit changes.
git commit -m "[UniCI]: Push Built Site"

# Push source and build repos.
git push origin main
