import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export default function Footer() {
  const { role } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.linksRow}>
        <Link href="/" style={styles.linkText}>
          Trang chủ
        </Link>
        <Link href="/ranking" style={styles.linkText}>
          BXH
        </Link>
        <Link href="/my-profile" style={styles.linkText}>
          Hồ sơ
        </Link>
        {role === 'admin' && (
          <Link href="/admin" style={[styles.linkText, styles.adminLink]}>
            Admin
          </Link>
        )}
      </View>
      <Text style={styles.copyright}>© {new Date().getFullYear()} SportMate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
    backgroundColor: '#050505',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  linkText: {
    color: '#f5f5f5',
    fontSize: 13,
  },
  adminLink: {
    color: '#ff4d4f',
    fontWeight: '600',
  },
  copyright: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
  },
});

