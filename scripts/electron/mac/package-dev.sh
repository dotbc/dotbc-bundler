#!/usr/bin/env bash
set -e

echo "(Presumably environment is already configured for development)"

ember electron:package --environment=development --platform=darwin --overwrite
