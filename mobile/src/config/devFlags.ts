/**
 * Development-only feature flags.
 *
 * `DEV_TEST`: when true (and typically only meaningful in __DEV__ builds), the app shows
 * legacy dummy testing UI (e.g. DB / Redux / backend buttons) on the Dashboard tab.
 * Set the right-hand side to `false` to hide that UI even in development.
 */
export const DEV_TEST = __DEV__ && true;
