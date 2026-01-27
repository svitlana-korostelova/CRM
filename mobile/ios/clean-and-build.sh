#!/bin/bash

# Comprehensive clean and rebuild script

cd /Users/Svitlana_Korostelova/Developer/CRM/mobile/ios

echo "🧹 Step 1: Cleaning Xcode build folder..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*
xcodebuild clean -workspace CRM.xcworkspace -scheme CRM 2>/dev/null || true

echo "🧹 Step 2: Cleaning local build artifacts..."
rm -rf build
rm -rf ~/Library/Caches/CocoaPods

echo "📦 Step 3: Reinstalling Pods..."
rm -rf Pods
rm -f Podfile.lock
pod install

echo "🔨 Step 4: Building project..."
cd ..
npm run ios
