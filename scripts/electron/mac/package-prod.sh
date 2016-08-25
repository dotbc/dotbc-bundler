#!/usr/bin/env bash
set -e

echo "Configuring environment for production"
export MY_ENV_VAR='SOME VALUE'

ember electron:package --environment=production --platform=darwin --overwrite
