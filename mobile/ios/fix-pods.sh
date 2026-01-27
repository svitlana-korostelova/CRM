#!/bin/bash

# Script to fix CocoaPods after renaming target from CRMTemp to CRM

echo "🧹 Cleaning old Pods installation..."

cd /Users/Svitlana_Korostelova/Developer/CRM/mobile/ios

# Remove old Pods
rm -rf Pods
rm -f Podfile.lock
rm -rf CRM.xcworkspace

echo "📦 Reinstalling Pods with correct target name (CRM)..."

# Reinstall pods
pod install

echo "✅ Pods reinstalled successfully!"
echo ""
echo "Next step: Run 'npm run ios' from the mobile directory"
