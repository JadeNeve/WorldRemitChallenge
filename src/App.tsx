import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import useFetchTopUsers from './hooks/useFetchTopUsers';

const API_ENDPOINT = 'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow';

const App = () => {
  const { users, loading, error, toggleFollow, toggleBlock } = useFetchTopUsers(API_ENDPOINT);

  const renderItem = ({ item }: any) => {
    const { userId, name, reputation, profileImage, isFollowed, isBlocked } = item;

    return (
      <TouchableOpacity
        style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {
          if (!isBlocked) {
            // Navigate to user details screen
          }
        }}
      >
        <Image source={{ uri: profileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>{name}</Text>
          <Text>Reputation: {reputation}</Text>
        </View>
        {isFollowed && <Text style={{ color: 'blue' }}>Following</Text>}
        {isBlocked && <Text style={{ color: 'gray' }}>Blocked</Text>}
        {!isBlocked && (
          <TouchableOpacity onPress={() => toggleFollow(userId)}>
            <Text style={{ color: isFollowed ? 'red' : 'green' }}>{isFollowed ? 'Unfollow' : 'Follow'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => toggleBlock(userId)}>
          <Text style={{ color: 'red', marginLeft: 10 }}>Block</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" testID="loading-indicator" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'An error occurred while fetching users. Please try again later.'}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <FlatList data={users} keyExtractor={(item) => item.userId.toString()} renderItem={renderItem} />
    </View>
  );
};

export default App;