import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import CarsData from './CarsData';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Image source={{ uri: item.Image }} style={{ marginHorizontal: '0%', width: 40, height: 40 }} />
  </View>
);

const RecentSearches = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CarsData}
        renderItem={Item}
        keyExtractor={item => item.id}
        horizontal={true}
        scrollEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default RecentSearches;