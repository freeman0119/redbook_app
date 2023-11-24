import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';

import icon_logo_main from '../../assets/icon_main_logo.png';
import UserStore from '../../store/UserStore';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo');
    if (!cacheUserInfo) {
      startLogin();
    } else {
      const parse = JSON.parse(cacheUserInfo);
      if (cacheUserInfo && parse) {
        UserStore.setUserInfo(parse);
        startHome();
      } else {
        startLogin();
      }
    }
  };

  const startLogin = () => {
    navigation.replace('Login');
  };

  const startHome = () => {
    navigation.replace('MainTab');
  };
  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_logo_main} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
