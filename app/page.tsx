
'use client'

import { useEffect, useState } from "react"
import {account, ID} from './appwrite';


export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true)

console.log({user})

useEffect(() => {
  async function getUser(){
  setUser (await account.get())  
  setLoadingUser(false) 
      }
     getUser();
      }, [])
      async function handleLogout(){
        try {
          await account.deleteSession('current');
          setUser(null)
        } catch(e){
          console.error(e)
        }
      }  

    async function handleLogin() {
      try {
          await account.createEmailSession(email, password); 
          setEmail(''); 
          setPassword(''); 
      } catch (e) {
          console.error('Login Error:', e);
      }
  }
async  function handleRegister(){
  try {
    await account.create(ID.unique(), email, password); 
    setEmail(''); 
    setPassword(''); 
} catch (e) {
    console.error('Registration Error:', e);
}
    }
    
    if (loadingUser){
      return (
        <div className="bg-gray-800 p-8 max-w-sm mx-auto rounded-lg shadow-md mt-10">
          <div className="flex items-center space-x-4">
            <svg className="animate-spin h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-white font-semibold text-lg">Loading user...</p>
          </div>
        </div>
      )
    }

    
    if (user){
      return (
        <div className="bg-gray-800 p-8 max-w-sm mx-auto rounded-lg shadow-md mt-10">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-blue-500 mr-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="text-white font-semibold text-lg">You're already logged in</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full m-3 p-3 bg-red-600 hover:bg-red-700 text-white rounded-md focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      )
    }
    
      return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Log In or Sign Up</h1>
    <form className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Buttons */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleRegister}
          className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</main>

      )
}

