Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Drawing.Imaging

$inputDir = "$PSScriptRoot\images"
$outputDir = "$PSScriptRoot\images-resized"

if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir | Out-Null }

$targetWidth = 1242
$targetHeight = 2688

$files = Get-ChildItem $inputDir -Filter "*.PNG"
foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $ms = New-Object System.IO.MemoryStream(,$bytes)
    $src = [System.Drawing.Bitmap]::new($ms)

    Write-Host ("Original {0}: {1} x {2}" -f $file.Name, $src.Width, $src.Height)

    $srcRatio = $src.Width / $src.Height
    $targetRatio = $targetWidth / $targetHeight

    if ($srcRatio -gt $targetRatio) {
        $scaledHeight = $targetHeight
        $scaledWidth = [int]($src.Width * ($targetHeight / $src.Height))
    } else {
        $scaledWidth = $targetWidth
        $scaledHeight = [int]($src.Height * ($targetWidth / $src.Width))
    }

    $output = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
    $g = [System.Drawing.Graphics]::FromImage($output)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $offsetX = [int](($targetWidth - $scaledWidth) / 2)
    $offsetY = [int](($targetHeight - $scaledHeight) / 2)

    $g.DrawImage($src, $offsetX, $offsetY, $scaledWidth, $scaledHeight)
    $g.Dispose()

    $outPath = Join-Path $outputDir $file.Name
    $output.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    Write-Host ("Redimensionado {0}: {1} x {2}" -f $file.Name, $targetWidth, $targetHeight)

    $output.Dispose()
    $src.Dispose()
    $ms.Dispose()
}

Write-Host ""
Write-Host "=== Listo ==="
Get-ChildItem $outputDir | Format-Table Name, Length
