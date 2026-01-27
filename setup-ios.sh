#!/bin/bash

# Script to generate iOS project structure for React Native
# Run this from the CRM root directory

set -e

echo "Creating temporary React Native project..."

# Create temp directory outside mobile folder
TEMP_DIR="/tmp/crm-ios-setup"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Create React Native project in temp location
cd "$TEMP_DIR"
npx react-native@0.73.11 init CRMTemp --skip-install --skip-git-init

echo "Copying iOS folder to mobile directory..."

# Copy iOS folder
cp -r CRMTemp/ios /Users/Svitlana_Korostelova/Developer/CRM/mobile/ios-new

# Clean up temp directory
cd /Users/Svitlana_Korostelova/Developer/CRM
rm -rf "$TEMP_DIR"

echo "iOS project structure created!"
echo "Next steps:"
echo "1. Review the new ios folder"
echo "2. Update Podfile if needed"
echo "3. Run: cd mobile/ios && pod install"
