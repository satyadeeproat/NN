import React from 'react';
import {Button, ScrollView, View} from 'react-native';
import {Header} from './Header';

interface SuccessScreenProps {
  reset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({reset}) => (
  <ScrollView contentInsetAdjustmentBehavior="automatic">
    <View>
      <Header title="Login Successful" />
      <Button onPress={reset} title="Try Again" />
    </View>
  </ScrollView>
);
