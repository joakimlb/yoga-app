import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Outfit_600SemiBold } from '@expo-google-fonts/outfit';
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Heading } from '../src/components/ui';
import { c } from '../src/theme';

export const unstable_settings = { initialRouteName:'(tabs)' };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_600SemiBold, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold,
  });
  return <SafeAreaProvider>
    <StatusBar style="dark" />
    {loaded || error ? <Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:c.bg}}}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="session/[id]" />
      <Stack.Screen name="player/[id]" options={{presentation:'fullScreenModal',statusBarStyle:'light',
        contentStyle:{backgroundColor:c.dark}}} />
    </Stack> : <View style={styles.splash}><Heading style={{color:c.moss}}>Serein</Heading></View>}
  </SafeAreaProvider>;
}

const styles = StyleSheet.create({
  splash:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:c.bg},
});

