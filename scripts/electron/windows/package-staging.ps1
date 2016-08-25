echo "Configuring environment for staging"

$env:MY_ENV_VAR = "SOME VALUE"

ember electron:package --environment=staging --overwrite --platform=win32