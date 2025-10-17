import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function Spacer() {
  return <View style={styles.spacer} />;
}

const styles = StyleSheet.create((theme) => ({
  spacer: {
    flex: 1,
  },
}));
