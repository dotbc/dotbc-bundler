#!/usr/bin/env bash
set -e

echo "Configuring environment for staging"
export MY_ENV_VAR='SOME VALUE'

ember electron:package --environment=staging --platform=darwin --overwrite
