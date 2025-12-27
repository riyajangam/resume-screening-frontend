# fix_imports.ps1
Write-Host "Fixing import statements..." -ForegroundColor Green

$files = @(
    "routes/resume_routes.py",
    "routes/auth_routes.py",
    "routes/screening_routes.py",
    "utils/resume_parser.py",
    "utils/skill_extractor.py",
    "utils/text_cleaner.py"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Checking $file..." -ForegroundColor Yellow
        $content = Get-Content $file -Raw
        
        # Fix imports
        $newContent = $content -replace "from backend\.", "from " 
                               -replace "import backend\.", "import "
        
        if ($content -ne $newContent) {
            Set-Content -Path $file -Value $newContent -Encoding UTF8
            Write-Host "  ✓ Fixed imports" -ForegroundColor Green
        } else {
            Write-Host "  ✓ No changes needed" -ForegroundColor Cyan
        }
    } else {
        Write-Host "  ✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "
Import fix complete!" -ForegroundColor Green
