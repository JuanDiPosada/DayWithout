Add-Type -AssemblyName System.Drawing

$sourcePath = "public/favicon.ico"
$destFolder = "public/icons"
$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)

if (!(Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

# Create icons directory if it doesn't exist
if (!(Test-Path $destFolder)) {
    New-Item -ItemType Directory -Force -Path $destFolder | Out-Null
}

try {
    # Load the icon
    $icon = [System.Drawing.Icon]::ExtractAssociatedIcon((Resolve-Path $sourcePath))
    
    # Try to get the bitmap. 
    # Note: ExtractAssociatedIcon gets a 32x32 icon usually. 
    # To get the full size allowed by the file we might need a different approach if this is too small.
    # However, standard .NET Icon class handling is tricky for multi-size Icons.
    # Let's try loading it as a Bitmap directly, which often picks the default/largest frame.
    $sourceImage = [System.Drawing.Bitmap]::FromFile((Resolve-Path $sourcePath))

    Write-Host "Source image loaded. Dimensions: $($sourceImage.Width)x$($sourceImage.Height)"

    foreach ($size in $sizes) {
        $fileName = "icon-${size}x${size}.png"
        $destPath = Join-Path $destFolder $fileName
        
        $newBitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graph = [System.Drawing.Graphics]::FromImage($newBitmap)
        
        # High quality settings
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $graph.DrawImage($sourceImage, 0, 0, $size, $size)
        
        $newBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graph.Dispose()
        $newBitmap.Dispose()
        
        Write-Host "Created $fileName"
    }

    $sourceImage.Dispose()
    Write-Host "Done!"
}
catch {
    Write-Error "Error processing image: $_"
}
