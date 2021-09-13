import React, {useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

import { fetchUsers } from '../../Store/actions/LoginAction'

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Deals = ({userData}) => {
    useEffect(() => {
        fetchUsers()
      }, [])
  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userData && userData.users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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

export default Deals;