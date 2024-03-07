import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AuthenticationScreen} from './screens';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthenticationScreen />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
});

export default App;
