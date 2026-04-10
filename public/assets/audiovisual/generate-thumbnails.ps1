# generate-thumbnails.ps1
# Funciona desde cualquier ubicacion — se ubica solo con $PSScriptRoot

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Error "ffmpeg no encontrado. Instala con: winget install Gyan.FFmpeg"
    exit 1
}

# Directorio de videos = misma carpeta donde esta el script
$dir = $PSScriptRoot

$videos = @(
    "Calma",
    "Donde el silencio habla",
    "Recuerdos de Humo",
    "Sombras de Amistad",
    "Trayectorias Efimeras"
)

# Nombre con acento por separado para evitar problemas de encoding
$videosConAcento = @(
    "La Mec" + [char]0x00E1 + "nica del Desencanto"
)

$todos = $videos + $videosConAcento

foreach ($nombre in $todos) {
    $input  = Join-Path $dir ($nombre + ".mp4")
    $output = Join-Path $dir ("thumb-" + $nombre + ".jpg")

    if (-not (Test-Path $input)) {
        Write-Warning "No encontrado: $input"
        continue
    }

    if (Test-Path $output) {
        Write-Host "Ya existe: thumb-$nombre.jpg" -ForegroundColor DarkGray
        continue
    }

    Write-Host "Generando: thumb-$nombre.jpg ..." -ForegroundColor Cyan
    & ffmpeg -ss 4 -i $input -frames:v 1 -q:v 2 -vf "scale=1280:-2" $output -y 2>$null

    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK" -ForegroundColor Green
    } else {
        Write-Warning "Error: $nombre"
    }
}

Write-Host ""
Write-Host "Listo." -ForegroundColor Yellow
