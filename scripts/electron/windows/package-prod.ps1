echo "Configuring environment for production"

$env:MY_ENV_VAR = "SOME VALUE"

ember electron:package --environment=production --overwrite --platform=win32