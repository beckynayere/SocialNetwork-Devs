import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { account } from '../../lib/appwrite';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch user data from Appwrite
      account.get(id as string).then(setUser).catch(console.error);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
