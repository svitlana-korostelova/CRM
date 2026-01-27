#!/bin/bash

# Script to fix react-native-safe-area-context build issue

set -e

echo "🔧 Fixing react-native-safe-area-context build issue..."
echo ""

cd /Users/Svitlana_Korostelova/Developer/CRM/mobile

echo "📦 Step 1: Updating npm packages..."
npm install

echo ""
echo "🧹 Step 2: Cleaning and reinstalling CocoaPods..."
cd ios
rm -rf Pods Podfile.lock
pod install

echo ""
echo "🧹 Step 3: Cleaning Xcode build cache..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*
xcodebuild clean -workspace CRM.xcworkspace -scheme CRM 2>/dev/null || true

echo ""
echo "🚀 Step 4: Building and running app..."
cd ..
npm run ios

echo ""
echo "✅ Done! If you see any errors, please share them."
