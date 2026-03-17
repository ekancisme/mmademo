import { Platform } from 'react-native';

let AnalyticsComponent: React.ComponentType | null = null;

if (Platform.OS === 'web') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vercelAnalytics = require('@vercel/analytics/react');
    AnalyticsComponent = vercelAnalytics.Analytics;
  } catch {
    AnalyticsComponent = null;
  }
}

export default function Analytics() {
  if (!AnalyticsComponent) return null;
  return <AnalyticsComponent />;
}

