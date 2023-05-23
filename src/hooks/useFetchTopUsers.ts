import { useEffect, useState } from 'react';

interface User {
  userId: number;
  profileImage: string;
  name: string;
  reputation: number;
  isFollowed: boolean;
  isBlocked: boolean;
}

const useFetchTopUsers = (API_ENDPOINT: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTopUsers();
  }, []);

  const fetchTopUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      const topUsers = data.items.map((item: any) => ({
        userId: item.user_id,
        profileImage: item.profile_image,
        name: item.display_name,
        reputation: item.reputation,
        isFollowed: false,
        isBlocked: false,
      }));
      setUsers(topUsers);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const toggleFollow = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };

  const toggleBlock = (userId: number) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.userId === userId ? { ...user, isBlocked: !user.isBlocked } : user
      );
      return [...updatedUsers];
    });
  };

  return { users, loading, error, toggleFollow, toggleBlock };
};

export default useFetchTopUsers;