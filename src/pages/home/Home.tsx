import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {useLocalStore} from 'mobx-react';
import {observer} from 'mobx-react';
import FlowList from '../../components/flowlist/FlowList.js';
import ResizeImage from '../../components/ResizeImage';
import Heart from '../../components/Heart';
import TitleBar from './components/TitleBar';
import HomeStore from '../../store/HomeStore';
import CategoryList from './components/CategoryList';

const {width: SCREENWIDTH} = Dimensions.get('window');

const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
  return (
    <View style={styles.item} key={index}>
      <ResizeImage uri={item.image} />
      <Text style={styles.titleTxt}>{item.title}</Text>
      <View style={styles.nameLayout}>
        <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
        <Text style={styles.nameTxt}>{item.userName}</Text>
        {/* <Image style={styles.heart} source={icon_heart_empty} /> */}
        <Heart
          value={item.isFavorite}
          onValueChanged={(value: boolean) => {
            console.log(value);
          }}
        />
        <Text style={styles.countTxt}>{item.favoriteCount}</Text>
      </View>
    </View>
  );
};

const Footer = () => {
  return <Text style={styles.footerTxt}>没有更多数据</Text>;
};

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const loadMoreData = () => {
    store.requestHomeList();
  };

  const categoryList = store.categoryList.filter(i => i.isAdd);

  return (
    <View style={styles.root}>
      <TitleBar
        tab={1}
        onTabChange={() => {
          console.log(111);
        }}
      />
      <FlowList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        data={store.homeList}
        keyExtrator={(item: Article) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        refreshing={store.refreshing}
        onRefresh={refreshNewData}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
        ListFooterComponent={<Footer />}
        ListHeaderComponent={
          <CategoryList
            categoryList={categoryList}
            allCategoryList={store.categoryList}
            onCategoryChange={(category: Category) => {
              console.log(JSON.stringify(category));
            }}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {},
  item: {
    width: (SCREENWIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerTxt: {
    width: '100%',
    fontSize: 12,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
