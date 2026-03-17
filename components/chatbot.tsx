import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Message = {
  id: string;
  from: 'user' | 'bot';
  text: string;
};

function getBotReply(input: string): string {
  const text = input.toLowerCase();

  if (text.includes('bóng đá') || text.includes('football')) {
    return 'SportMate hiện có rất nhiều trận bóng đá ở các quận trung tâm. Bạn có thể vào mục trận đấu nổi bật để tham gia nhanh.';
  }

  if (text.includes('cầu lông') || text.includes('badminton')) {
    return 'Đối với cầu lông, bạn nên chọn level phù hợp (Beginner/Intermediate/Advanced) để có trải nghiệm tốt nhất.';
  }

  if (text.includes('đăng ký') || text.includes('register') || text.includes('signup')) {
    return 'Bạn có thể bấm nút "Đăng ký ngay" ở trang chính để tạo tài khoản và bắt đầu tham gia trận đấu.';
  }

  if (text.includes('giá') || text.includes('price') || text.includes('chi phí')) {
    return 'Mỗi trận đấu sẽ hiển thị giá cụ thể trong phần chi tiết. Bạn nên đọc kỹ phần mô tả và quy định trước khi tham gia.';
  }

  return 'Mình chưa hiểu câu hỏi lắm. Bạn có thể hỏi về: loại môn thể thao, level, địa điểm, cách đăng ký tham gia trận đấu...';
}

export default function ChatBot() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      from: 'bot',
      text: 'Xin chào, mình là SportMate Bot. Mình có thể giúp bạn tìm trận đấu, gợi ý môn thể thao hoặc giải đáp các câu hỏi cơ bản.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      from: 'user',
      text: trimmed,
    };

    const botMsg: Message = {
      id: `b-${Date.now()}`,
      from: 'bot',
      text: getBotReply(trimmed),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}>
        <View style={styles.backdrop}>
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>SportMate ChatBot</Text>
              <Pressable onPress={() => setVisible(false)}>
                <Text style={styles.closeText}>Đóng</Text>
              </Pressable>
            </View>
            <ScrollView style={styles.messages}>
              {messages.map((m) => (
                <View
                  key={m.id}
                  style={[styles.bubble, m.from === 'user' ? styles.userBubble : styles.botBubble]}>
                  <Text style={styles.bubbleText}>{m.text}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputRow}>
              <TextInput
                placeholder="Hỏi SportMate Bot..."
                placeholderTextColor="#777"
                value={input}
                onChangeText={setInput}
                style={styles.input}
              />
              <Pressable style={styles.sendBtn} onPress={handleSend}>
                <Text style={styles.sendText}>Gửi</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable style={styles.fab} onPress={() => setVisible(true)}>
        <Text style={styles.fabText}>Bot</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 96,
    backgroundColor: '#ff4d4f',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    maxHeight: '70%',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chatTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeText: {
    color: '#ff4d4f',
    fontSize: 13,
  },
  messages: {
    maxHeight: 260,
    marginBottom: 8,
  },
  bubble: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    maxWidth: '90%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff4d4f',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#222',
  },
  bubbleText: {
    color: '#fff',
    fontSize: 13,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: '#fff',
    fontSize: 13,
  },
  sendBtn: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

