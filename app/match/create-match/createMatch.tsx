import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type MatchForm = {
  sport: string;
  title: string;
  location: string;
  date: string;
  time: string;
  maxPlayers: string;
  minSkillLevel: string;
  description: string;
  rules: string;
};

const initialForm: MatchForm = {
  sport: '',
  title: '',
  location: '',
  date: '',
  time: '',
  maxPlayers: '',
  minSkillLevel: '',
  description: '',
  rules: '',
};

export default function CreateMatch() {
  const [form, setForm] = useState<MatchForm>(initialForm);

  const handleChange = (key: keyof MatchForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Chỉ log ra console, chưa gọi API tạo match
    // eslint-disable-next-line no-console
    console.log('Create match form data:', form);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Pressable style={styles.headerBtn} onPress={() => router.back()}>
          <Text style={styles.headerBtnText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Tạo trận đấu</Text>
        <View style={styles.headerBtnPlaceholder} />
      </View>
      <Text style={styles.subtitle}>
        Điền thông tin chi tiết để các người chơi khác có thể tham gia dễ dàng.
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Môn thể thao</Text>
        <TextInput
          placeholder="VD: Football, Badminton..."
          placeholderTextColor="#777"
          style={styles.input}
          value={form.sport}
          onChangeText={(text) => handleChange('sport', text)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Tiêu đề trận đấu</Text>
        <TextInput
          placeholder="VD: Giao hữu bóng đá tối thứ 6"
          placeholderTextColor="#777"
          style={styles.input}
          value={form.title}
          onChangeText={(text) => handleChange('title', text)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Địa điểm</Text>
        <TextInput
          placeholder="VD: Sân Hoa Lư, Quận 1"
          placeholderTextColor="#777"
          style={styles.input}
          value={form.location}
          onChangeText={(text) => handleChange('location', text)}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, styles.rowItem]}>
          <Text style={styles.label}>Ngày</Text>
          <TextInput
            placeholder="2026-03-06"
            placeholderTextColor="#777"
            style={styles.input}
            value={form.date}
            onChangeText={(text) => handleChange('date', text)}
          />
        </View>
        <View style={[styles.field, styles.rowItem]}>
          <Text style={styles.label}>Giờ</Text>
          <TextInput
            placeholder="20:00 - 21:30"
            placeholderTextColor="#777"
            style={styles.input}
            value={form.time}
            onChangeText={(text) => handleChange('time', text)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.field, styles.rowItem]}>
          <Text style={styles.label}>Số người tối đa</Text>
          <TextInput
            placeholder="VD: 20"
            placeholderTextColor="#777"
            style={styles.input}
            keyboardType="number-pad"
            value={form.maxPlayers}
            onChangeText={(text) => handleChange('maxPlayers', text)}
          />
        </View>
        <View style={[styles.field, styles.rowItem]}>
          <Text style={styles.label}>Level tối thiểu</Text>
          <TextInput
            placeholder="Beginner / Intermediate / Advanced"
            placeholderTextColor="#777"
            style={styles.input}
            value={form.minSkillLevel}
            onChangeText={(text) => handleChange('minSkillLevel', text)}
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          placeholder="Giới thiệu ngắn về trận đấu, mục tiêu, không khí..."
          placeholderTextColor="#777"
          style={[styles.input, styles.inputArea]}
          multiline
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Luật chơi & lưu ý</Text>
        <TextInput
          placeholder="Các luật riêng, yêu cầu trang phục, giờ check-in..."
          placeholderTextColor="#777"
          style={[styles.input, styles.inputArea]}
          multiline
          value={form.rules}
          onChangeText={(text) => handleChange('rules', text)}
        />
      </View>

      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Tạo trận đấu (demo)</Text>
      </Pressable>
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
    paddingTop: 32,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnPlaceholder: {
    width: 34,
    height: 34,
  },
  headerBtnText: {
    color: '#aaa',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 18,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 13,
  },
  inputArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowItem: {
    flex: 1,
  },
  submitBtn: {
    marginTop: 12,
    backgroundColor: '#ff4d4f',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

