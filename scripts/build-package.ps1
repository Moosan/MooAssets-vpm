# MooAssets VPM 配布用 zip を生成する。
# 出力: MooAssets-vpm/packages/com.moulabo.mooassets-<version>.zip
#       MooAssets-vpm/CHANGELOG.md（公開用ミラー）
# 使い方: MooAssets-vpm リポジトリ直下で .\scripts\build-package.ps1

$ErrorActionPreference = "Stop"

$vpmRoot = Split-Path $PSScriptRoot -Parent
$workspaceRoot = Split-Path $vpmRoot -Parent
$packageDir = Join-Path $workspaceRoot "MooAssets\Packages\com.moulabo.mooassets"
$outDir = Join-Path $vpmRoot "packages"
$changelogPath = Join-Path $packageDir "CHANGELOG.md"
$publicChangelogPath = Join-Path $vpmRoot "CHANGELOG.md"

if (-not (Test-Path $packageDir)) {
    Write-Error "Package not found: $packageDir"
}

$pkgJsonText = Get-Content (Join-Path $packageDir "package.json") -Raw -Encoding UTF8
$pkgJson = $pkgJsonText | ConvertFrom-Json
$version = $pkgJson.version
$zipName = "com.moulabo.mooassets-$version.zip"
$zipPath = Join-Path $outDir $zipName

if (-not (Test-Path $changelogPath)) {
    Write-Error "CHANGELOG.md not found: $changelogPath"
}

$changelogText = Get-Content $changelogPath -Raw -Encoding UTF8
$versionHeading = '## [' + $version + ']'
if (-not $changelogText.Contains($versionHeading)) {
    Write-Error "CHANGELOG.md missing heading: $versionHeading (must match package.json version)"
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

Copy-Item -Path $changelogPath -Destination $publicChangelogPath -Force

# zip ルートに package.json 等が来るよう、パッケージフォルダの中身を圧縮
Push-Location $packageDir
try {
    Compress-Archive -Path * -DestinationPath $zipPath -CompressionLevel Optimal
}
finally {
    Pop-Location
}

Write-Host "Created: $zipPath"
Write-Host "Mirrored: $publicChangelogPath"
Write-Host "Upload zip to GitHub Release tag v$version"
Write-Host "Release description: copy the $versionHeading section from CHANGELOG.md"
