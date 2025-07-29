import { Text, type TextProps } from 'react-native';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

export type ThemedTextProps = TextProps & UnistylesVariants<typeof styles> & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type,
  ...rest
}: ThemedTextProps) {
  styles.useVariants({ type })

  return (
    <Text
      style={[
        styles.textColor,
        styles.textType,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  textColor: {
    color: theme.colors.typography,
  },
  textType: {
    variants: {
      type: {
        default: {
          fontSize: 16,
          lineHeight: 24,
        },
        defaultSemiBold: {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '600',
        },
        title: {
          fontSize: 32,
          fontWeight: 'bold',
          lineHeight: 32,
        },
        subtitle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        link: {
          lineHeight: 30,
          fontSize: 16,
          color: theme.colors.link,
        },
      }
    }
  }
}));
