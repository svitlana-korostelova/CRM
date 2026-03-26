import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, type ViewStyle} from 'react-native';

function usePulseOpacity(): Animated.Value {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return opacity;
}

export const CardSkeleton: React.FC<{style?: ViewStyle}> = ({style}) => {
  const opacity = usePulseOpacity();
  return (
    <Animated.View style={[styles.card, style, {opacity}]}>
      <View style={styles.cardLineWide} />
      <View style={styles.cardLineNarrow} />
    </Animated.View>
  );
};

export const ListItemSkeleton: React.FC<{style?: ViewStyle}> = ({style}) => {
  const opacity = usePulseOpacity();
  return (
    <Animated.View style={[styles.listRow, style, {opacity}]}>
      <View style={styles.avatar} />
      <View style={styles.listTextCol}>
        <View style={styles.listLineTop} />
        <View style={styles.listLineBottom} />
      </View>
    </Animated.View>
  );
};

export const ScreenSkeleton: React.FC = () => {
  return (
    <View style={styles.screen} accessibilityLabel="Loading">
      <CardSkeleton style={styles.screenCard} />
      <ListItemSkeleton />
      <ListItemSkeleton />
      <ListItemSkeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 16,
    marginBottom: 12,
  },
  cardLineWide: {
    height: 14,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.12)',
    width: '72%',
    marginBottom: 10,
  },
  cardLineNarrow: {
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    width: '40%',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginRight: 12,
  },
  listTextCol: {
    flex: 1,
  },
  listLineTop: {
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.12)',
    width: '55%',
    marginBottom: 8,
  },
  listLineBottom: {
    height: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    width: '35%',
  },
  screen: {
    flex: 1,
    padding: 16,
  },
  screenCard: {
    marginBottom: 20,
  },
});
