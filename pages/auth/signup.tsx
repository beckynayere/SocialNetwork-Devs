import { useState } from 'react';
import { useRouter } from 'next/router';
import { account } from '../../lib/appwrite';
import { Client, Account } from 'appwrite';
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.create(email, password);
      router.push('/auth/signin');
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
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
        <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
      </form>
    </div>
  );
}
