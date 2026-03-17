import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type MatchDetail = {
  id: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  description: string;
  requirements: string[];
  rules: string[];
  organizer: {
    name: string;
    rating: number;
  };
  participants: {
    id: string;
    name: string;
    level: string;
  }[];
  mapUrl: string;
};

const BASE_MATCHES: Omit<MatchDetail, 'description' | 'requirements' | 'rules' | 'organizer' | 'participants'>[] =
  [
    {
      id: 'm1',
      title: 'Giao hữu bóng đá tối thứ 6',
      sport: 'Football',
      location: 'Sân Hoa Lư, Quận 1, TP.HCM',
      date: '2026-03-06',
      time: '20:00 - 21:30',
      currentPlayers: 14,
      maxPlayers: 20,
      skillLevel: 'Intermediate',
      price: '120.000đ/người',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.480222...HoaLu',
    },
    {
      id: 'm2',
      title: 'Cầu lông sáng chủ nhật',
      sport: 'Badminton',
      location: 'CLB Cầu Lông Phú Nhuận, TP.HCM',
      date: '2026-03-08',
      time: '09:00 - 11:00',
      currentPlayers: 6,
      maxPlayers: 8,
      skillLevel: 'Advanced',
      price: '80.000đ/người',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...PhuNhuan',
    },
  ];

const baseMatchDetail: Omit<
  MatchDetail,
  'id' | 'title' | 'sport' | 'location' | 'date' | 'time' | 'currentPlayers' | 'maxPlayers' | 'skillLevel' | 'price' | 'mapUrl'
> = {
  description:
    'Trận đấu giao hữu dành cho mọi người muốn vận động, kết nối bạn bè và cải thiện kỹ năng thi đấu.',
  requirements: [
    'Đến đúng giờ, có mặt trước 10 phút để khởi động.',
    'Tự chuẩn bị trang phục và giày thể thao phù hợp.',
    'Tôn trọng đồng đội và đối thủ, chơi fair-play.',
  ],
  rules: [
    'Không chơi thô bạo, tránh va chạm nguy hiểm.',
    'Tuân thủ quyết định của người điều phối trận đấu.',
    'Giữ gìn vệ sinh sân bãi, không xả rác.',
  ],
  organizer: {
    name: 'SportMate Organizer',
    rating: 4.9,
  },
  participants: [
    { id: 'u1', name: 'Minh', level: 'Intermediate' },
    { id: 'u2', name: 'Lan', level: 'Beginner' },
    { id: 'u3', name: 'Huy', level: 'Advanced' },
  ],
};

export default function MatchDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [playersDelta, setPlayersDelta] = useState<Record<string, number>>({});

  const match = useMemo<MatchDetail | undefined>(() => {
    const base = BASE_MATCHES.find((m) => m.id === params.id) ?? BASE_MATCHES[0];
    if (!base) return undefined;
    return {
      ...base,
      ...baseMatchDetail,
      currentPlayers: base.currentPlayers + (playersDelta[base.id] ?? 0),
    };
  }, [params.id, playersDelta]);

  if (!match) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy trận đấu.</Text>
      </View>
    );
  }

  const isFavorite = favorites[match.id] ?? false;
  const isJoined = joined[match.id] ?? false;

  const toggleFavorite = () => {
    setFavorites((prev) => ({ ...prev, [match.id]: !isFavorite }));
  };

  const toggleJoin = () => {
    setJoined((prev) => ({ ...prev, [match.id]: !isJoined }));
    setPlayersDelta((prev) => ({
      ...prev,
      [match.id]: (prev[match.id] ?? 0) + (isJoined ? -1 : 1),
    }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{match.title}</Text>
          <Text style={styles.subtitle}>
            {match.sport} • {match.location}
          </Text>
        </View>
        <Pressable onPress={toggleFavorite} style={styles.heartButton}>
          <Text style={[styles.heart, isFavorite && styles.heartActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Thời gian: {match.time} ({match.date})
        </Text>
        <Text style={styles.infoText}>
          Người chơi: {match.currentPlayers}/{match.maxPlayers} • Level: {match.skillLevel}
        </Text>
        <Text style={styles.infoText}>Chi phí: {match.price}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          style={[styles.joinButton, isJoined && styles.joinButtonActive]}
          onPress={toggleJoin}>
          <Text style={[styles.joinText, isJoined && styles.joinTextActive]}>
            {isJoined ? 'Hủy tham gia' : 'Tham gia ngay'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={styles.bodyText}>{match.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yêu cầu</Text>
        {match.requirements.map((r) => (
          <Text key={r} style={styles.listItem}>
            • {r}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Luật chơi</Text>
        {match.rules.map((r) => (
          <Text key={r} style={styles.listItem}>
            • {r}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tổ chức</Text>
        <Text style={styles.bodyText}>
          {match.organizer.name} • ⭐ {match.organizer.rating.toFixed(1)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Người tham gia</Text>
        {match.participants.map((p) => (
          <Text key={p.id} style={styles.listItem}>
            • {p.name} ({p.level})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bản đồ</Text>
        {Platform.OS === 'web' ? (
          <View style={styles.mapContainer}>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe src={match.mapUrl} style={styles.mapIframe as any} loading="lazy" />
          </View>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>
              Bản đồ Google Maps chỉ hiển thị trên web trong bản demo này.
            </Text>
          </View>
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 13,
  },
  heartButton: {
    padding: 8,
  },
  heart: {
    fontSize: 26,
    color: '#777',
  },
  heartActive: {
    color: '#ff4d4f',
  },
  infoCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  infoText: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#ff4d4f',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  joinButtonActive: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#ff4d4f',
  },
  joinText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  joinTextActive: {
    color: '#ff4d4f',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  bodyText: {
    color: '#ddd',
    fontSize: 13,
    lineHeight: 18,
  },
  listItem: {
    color: '#ddd',
    fontSize: 13,
    lineHeight: 18,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  mapIframe: {
    width: '100%',
    height: 260,
    border: 'none',
  },
  mapPlaceholder: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
  },
  mapPlaceholderText: {
    color: '#aaa',
    fontSize: 13,
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
});

