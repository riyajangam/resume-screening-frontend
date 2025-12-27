# fix_venv.ps1
$venvPath = "C:\Users\Admin\Desktop\resume-screening-frontend\backend\venv"
$oldPath = "C:\\Users\\riyaj"
$newPath = "C:\\Users\\Admin"

# Fix activate.ps1
$activatePath = "$venvPath\Scripts\Activate.ps1"
if (Test-Path $activatePath) {
    $content = Get-Content $activatePath -Raw
    $content = $content -replace [regex]::Escape($oldPath), $newPath
    Set-Content $activatePath $content
    Write-Host "Fixed Activate.ps1"
}

# Fix activate.bat
$activateBat = "$venvPath\Scripts\activate.bat"
if (Test-Path $activateBat) {
    $content = Get-Content $activateBat -Raw
    $content = $content -replace [regex]::Escape($oldPath), $newPath
    Set-Content $activateBat $content
    Write-Host "Fixed activate.bat"
}

# Fix pip.exe launcher (if exists)
$pipExe = "$venvPath\Scripts\pip.exe"
if (Test-Path $pipExe) {
    # You might need to reinstall pip in the venv
    Write-Host "Run: python -m ensurepip --upgrade"
}

Write-Host "Virtual environment fixed! Try activating now."