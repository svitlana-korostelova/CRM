#!/bin/bash

# Script to properly create iOS Xcode project for React Native
# This creates the project in a clean location and copies it over

set -e

echo "🚀 Creating React Native iOS project structure..."

# Step 1: Create temp project in /tmp
TEMP_DIR="/tmp/crm-rn-ios-$$"
echo "Creating temporary project in: $TEMP_DIR"

cd /tmp
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# Step 2: Initialize React Native project
echo "Initializing React Native project..."
npx --yes react-native@0.82.0 init CRMTemp \
  --skip-install \
  --skip-git-init \
  --directory . \
  2>&1 | tee /tmp/rn-init.log

if [ ! -d "CRMTemp/ios" ]; then
  echo "❌ Error: iOS folder not created. Check /tmp/rn-init.log for details"
  exit 1
fi

# Step 3: Backup current iOS folder
PROJECT_DIR="/Users/Svitlana_Korostelova/Developer/CRM/mobile"
if [ -d "$PROJECT_DIR/ios" ]; then
  echo "Backing up current iOS folder..."
  mv "$PROJECT_DIR/ios" "$PROJECT_DIR/ios-backup-$(date +%Y%m%d-%H%M%S)"
fi

# Step 4: Copy iOS folder
echo "Copying iOS project structure..."
cp -r CRMTemp/ios "$PROJECT_DIR/ios"

# Step 5: Update project name in Podfile if needed
cd "$PROJECT_DIR/ios"
if grep -q "CRMTemp" Podfile; then
  echo "Updating Podfile with correct project name..."
  sed -i '' 's/CRMTemp/CRM/g' Podfile
fi

# Step 6: Rename Xcode project if needed
if [ -d "CRMTemp.xcodeproj" ]; then
  mv CRMTemp.xcodeproj CRM.xcodeproj
fi

if [ -d "CRMTemp.xcworkspace" ]; then
  mv CRMTemp.xcworkspace CRM.xcworkspace
fi

# Step 7: Clean up
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "✅ iOS project structure created successfully!"
echo ""
echo "Next steps:"
echo "1. cd mobile/ios"
echo "2. pod install"
echo "3. cd .."
echo "4. npm run ios"
