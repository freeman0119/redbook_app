import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  return (
    <View style={styles.root}>
      <Text>home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});
