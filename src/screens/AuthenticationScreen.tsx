import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ButtonTitle, KeyboardView} from '../components/KeyboardView';
import {Header, InputPinField, SuccessScreen} from '../components';

export const AuthenticationScreen = () => {
  const [pin, setPin] = useState('');

  const onPress = useCallback(
    (buttonTitle: ButtonTitle) => {
      if (ButtonTitle.empty === buttonTitle || pin.length === 4) {
        return;
      }
      let newOtp;

      if (buttonTitle === ButtonTitle.delete) {
        newOtp = pin.slice(0, -1);
      } else {
        newOtp = `${pin}${buttonTitle}`;
      }
      setPin(newOtp);
    },
    [pin],
  );

  if (pin.length === 4) {
    return <SuccessScreen reset={() => setPin('')} />;
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Header title={'PinCode'} />
      <View style={styles.inputBox}>
        <InputPinField onChange={setPin} value={pin} />
      </View>
      <KeyboardView onPress={onPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  inputBox: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
});
