import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

const MOCK_ADMIN_MATCHES = [
  { id: 'm1', title: 'Giao hữu bóng đá tối thứ 6', status: 'Đang mở', players: '14/20' },
  { id: 'm2', title: 'Cầu lông sáng chủ nhật', status: 'Đang mở', players: '6/8' },
  { id: 'm3', title: 'Pick-up basketball', status: 'Đã kết thúc', players: '10/10' },
];

export default function AdminDashboard() {
  const { role } = useAuth();

  if (role !== 'admin') {
    return (
      <View style={styles.container}>
        <Text style={styles.deniedTitle}>Khu vực Admin</Text>
        <Text style={styles.deniedText}>
          Bạn cần đăng nhập với quyền Admin để truy cập bảng điều khiển này.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Bảng điều khiển Admin</Text>
      <Text style={styles.subtitle}>
        Quản lý nhanh các trận đấu trên hệ thống (demo, chưa kết nối API/MySQL).
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trận đấu gần đây</Text>
        {MOCK_ADMIN_MATCHES.map((m) => (
          <View key={m.id} style={styles.card}>
            <Text style={styles.cardTitle}>{m.title}</Text>
            <Text style={styles.cardMeta}>
              Trạng thái: {m.status} • Người chơi: {m.players}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardMeta: {
    color: '#aaa',
    fontSize: 13,
  },
  deniedTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 40,
  },
  deniedText: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

