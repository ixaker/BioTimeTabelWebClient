import { useQuery } from 'react-query';

export function useUserData(url: string) {
  console.log(url)
  return useQuery('userData', async () => {
    const response = await fetch(url); 
    if (response.ok) {
      console.log(response.json)
    }
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response)
    return response.json();
  });
}