import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useLocalObservable} from 'mobx-react';
import HomeStore from '../../store/HomeStore';

export default () => {
  const store = useLocalObservable(() => new HomeStore());

  useEffect(() => {
    store.requestHomeList();
  }, []);

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
