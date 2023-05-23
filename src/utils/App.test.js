import { renderHook } from '@testing-library/react-hooks';
import useFetchTopUsers from '../hooks/useFetchTopUsers';

describe('useFetchTopUsers', () => {
  const API_ENDPOINT = 'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow';

  it('should fetch top users and update state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchTopUsers(API_ENDPOINT));
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(Array.isArray(result.current.users)).toBe(true);
    expect(result.current.users.length).toBeGreaterThan(0);
  });

  it('should toggle follow status of a user', () => {
    const { result } = renderHook(() => useFetchTopUsers(API_ENDPOINT));
    const initialUsers = [
      { userId: 1, name: 'User 1', isFollowed: false },
      { userId: 2, name: 'User 2', isFollowed: false },
    ];
    result.current.setUsers(initialUsers);

    result.current.toggleFollow(1);

    expect(result.current.users[0].isFollowed).toBe(true);
    expect(result.current.users[1].isFollowed).toBe(false);
  });

  it('should toggle block status of a user', () => {
    const { result } = renderHook(() => useFetchTopUsers(API_ENDPOINT));

    const initialUsers = [
      { userId: 1, name: 'User 1', isBlocked: false },
      { userId: 2, name: 'User 2', isBlocked: false },
    ];
    result.current.setUsers(initialUsers);
    result.current.toggleBlock(2);
    expect(result.current.users[0].isBlocked).toBe(false);
    expect(result.current.users[1].isBlocked).toBe(true);
  });
});