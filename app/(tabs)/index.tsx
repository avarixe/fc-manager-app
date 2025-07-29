import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">
        Dashboard
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    marginTop: rt.insets.top,
    paddingHorizontal: theme.gap(2),
  },
}));
