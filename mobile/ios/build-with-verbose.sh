#!/bin/bash

# Script to build with verbose output to see actual errors

cd /Users/Svitlana_Korostelova/Developer/CRM/mobile/ios

echo "🧹 Cleaning build folder..."
xcodebuild clean -workspace CRM.xcworkspace -scheme CRM -configuration Debug

echo "🔨 Building with verbose output..."
xcodebuild build \
  -workspace CRM.xcworkspace \
  -scheme CRM \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro,OS=18.6' \
  2>&1 | tee build.log

echo ""
echo "✅ Build log saved to build.log"
echo "Check the log for detailed error messages"
