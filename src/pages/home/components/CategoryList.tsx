import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

import CategoryModal, {CategoryModalRef} from './CategoryModal';

import icon_arrow from '../../../assets/icon_arrow.png';

type Props = {
  categoryList: Category[];
  allCategoryList: Category[];
  onCategoryChange: (category: Category) => void;
};

export default ({categoryList, allCategoryList, onCategoryChange}: Props) => {
  const modalRef = useRef<CategoryModalRef>(null);

  const [category, setCategory] = useState<Category>();
  useEffect(() => {
    setCategory(categoryList.find(i => i.name === '推荐'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCategoryPress = (category: Category) => {
    setCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categoryList.map((item: Category) => {
          const isSelected = item.name === category?.name;
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={`${item.name}`}
              onPress={() => {
                onCategoryPress(item);
              }}>
              <Text
                style={
                  isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          modalRef.current?.show();
        }}>
        <Image source={icon_arrow} style={styles.openImg} />
      </TouchableOpacity>
      <CategoryModal ref={modalRef} categoryList={allCategoryList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    marginBottom: 6,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{rotate: '-90deg'}],
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemTxtSelected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
