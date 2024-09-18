import { useState } from 'react';
import { useRouter } from 'next/router';
import { account } from '../../lib/appwrite';
import { Client, Account } from 'appwrite';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      router.push('/');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Sign In</button>
      </form>
    </div>
  );
}
