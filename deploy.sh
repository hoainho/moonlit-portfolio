#!/bin/bash
# Deploy script for moonlit-portfolio
# Run this script on your local machine

set -e

echo "🌙 Moonlit Portfolio - Deploy Script"
echo "======================================"

# Check if remote exists
if git remote get-url origin 2>/dev/null; then
    echo "✓ Remote 'origin' already configured"
else
    echo "Adding remote origin..."
    git remote add origin git@github-personal.com:hoainho/moonlit-portfolio.git
    echo "✓ Remote added"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "🔗 https://github.com/hoainho/moonlit-portfolio"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/import"
echo "2. Import from GitHub: hoainho/moonlit-portfolio"
echo "3. Click Deploy"
