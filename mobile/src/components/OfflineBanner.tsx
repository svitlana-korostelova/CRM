import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BANNER_BG = '#ffeb3b';
const SLIDE_MS = 220;

export const OfflineBanner: React.FC = () => {
  const netInfo = useNetInfo();
  const offline = netInfo.isConnected === false;
  const insets = useSafeAreaInsets();
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: offline ? 1 : 0,
      duration: SLIDE_MS,
      useNativeDriver: true,
    }).start();
  }, [offline, slide]);

  const translateY = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [-56, 0],
  });

  return (
    <Animated.View
      pointerEvents={offline ? 'box-none' : 'none'}
      style={[
        styles.bannerOuter,
        {
          paddingTop: insets.top,
          transform: [{translateY}],
          opacity: slide,
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite">
      <View style={styles.bannerInner}>
        <Text variant="labelLarge" style={styles.text}>
          You are offline
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bannerOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
    elevation: 6,
  },
  bannerInner: {
    backgroundColor: BANNER_BG,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0,0,0,0.87)',
    fontWeight: '600',
  },
});
