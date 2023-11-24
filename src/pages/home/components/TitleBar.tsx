import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

type Props = {
  tab: number;
  onTabChange: (tabIndex: number) => void;
};

export default ({tab, onTabChange}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  useEffect(() => {
    setTabIndex(tab);
  }, [tab]);

  const styles = StyleSheet.create({
    titleLayout: {
      width: '100%',
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 16,
    },
    icon: {
      width: 28,
      height: 28,
    },
    dailyButton: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 12,
      marginRight: 42,
    },
    searchButton: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 12,
      marginLeft: 42,
    },
    tabButton: {
      flex: 1,
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      width: 28,
      height: 2,
      backgroundColor: '#ff2442',
      borderRadius: 1,
      position: 'absolute',
      bottom: 6,
    },
    tabTxt: {
      fontSize: 16,
      color: '#999',
    },
    tabTxtSelected: {
      fontSize: 17,
      color: '#333',
    },
  });
  return (
    <SafeAreaView edges={['top']} style={{backgroundColor: 'white'}}>
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.dailyButton}>
          <Image style={styles.icon} source={icon_daily} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(0);
            onTabChange?.(0);
          }}>
          <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
            关注
          </Text>
          {tabIndex === 0 && <View style={styles.line} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(1);
            onTabChange?.(1);
          }}>
          <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
            发现
          </Text>
          {tabIndex === 1 && <View style={styles.line} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setTabIndex(2);
            onTabChange?.(2);
          }}>
          <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
            北京
          </Text>
          {tabIndex === 2 && <View style={styles.line} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Image style={styles.icon} source={icon_search} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
