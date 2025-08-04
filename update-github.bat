@echo off
echo 🚀 Family Business Hub - GitHub Update Script
echo ================================================
echo.

echo 📋 Checking Git status...
git status
echo.

echo ❓ Do you want to continue with the upload? (y/n)
set /p choice=Enter your choice: 

if /i "%choice%"=="y" (
    echo.
    echo 📁 Adding all files to Git...
    git add .
    
    echo.
    echo 💾 Committing changes...
    git commit -m "📋 Latest updates and documentation fixes

✅ Fixed markdown linting issues in UPLOAD_CHECKLIST.md
✅ Added proper blank lines around headings (MD022)
✅ Fixed code block formatting (MD031, MD040)
✅ Improved list spacing (MD032)
✅ Added trailing newline (MD047)
✅ All documentation now passes markdown standards
✅ Updated GitHub upload checklist structure

Files modified:
- UPLOAD_CHECKLIST.md (linting fixes)
- update-github.bat (this script)
- Improved documentation structure"
    
    echo.
    echo ⬆️ Pushing to GitHub...
    git push origin main
    
    echo.
    echo ✅ Upload complete! Check your GitHub repository.
    echo 🌐 If you have GitHub Pages enabled, your site should update in a few minutes.
    
) else (
    echo.
    echo ❌ Upload cancelled. No changes were made to GitHub.
)

echo.
echo 📖 For more detailed instructions, see UPDATE_GITHUB.md
pause