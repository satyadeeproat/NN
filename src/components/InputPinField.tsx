import React, {useCallback, useMemo, useState} from 'react';
import {Button, Platform, StyleSheet, TextInput, View} from 'react-native';

interface InputPinFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  pinSize?: number;
}

export const InputPinField: React.FC<InputPinFieldProps> = ({
  value,
  onChange,
  pinSize = 4,
}) => {
  const [showPin, setShowPin] = useState(false);

  const createArrayWithIndexValues: number[] = useMemo(() => {
    return new Array(pinSize).fill(0);
  }, [pinSize]);

  const setPin = useCallback(() => {
    setShowPin(prevPin => !prevPin);
  }, []);

  const resetPin = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <View>
      <View style={styles.container}>
        {createArrayWithIndexValues.map((_, index) => (
          <View key={index} style={styles.inputContainer}>
            {value[index] ? (
              <TextInput
                style={styles.input}
                maxLength={1}
                keyboardType="numeric"
                value={showPin ? value[index] : '*'}
              />
            ) : (
              <View style={styles.circle} />
            )}
          </View>
        ))}
      </View>
      <View style={styles.controls}>
        <Button onPress={setPin} title={showPin ? 'HIDE' : 'SHOW'} />
        <Button
          disabled={value.length === 0}
          onPress={resetPin}
          title={'RESET'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 40,
  },
  input:
    Platform.OS === 'ios'
      ? {
          padding: 10,
          width: 25,
          margin: 10,
          textAlign: 'center',
          fontSize: 18,
          color: 'black',
        }
      : {fontSize: 18},
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    margin: 10,
  },
  inputContainer: {
    marginHorizontal: 5,
  },
});
