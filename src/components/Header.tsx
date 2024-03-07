import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: 32},
});
