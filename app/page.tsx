'use client'

import { useEffect, useState } from "react";
import { account, ID } from './appwrite';
import { Session } from "node:inspector/promises";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

   
    useEffect(() => {
        async function getUser() {
            try {
                const session = await account.get(); // Get the current session
                setUser(session); // Set the user if session is found
            } catch (e) {
                console.log("No user session found or user is not logged in");
                setUser(null); // Set user to null if no session is found
            } finally {
                setLoadingUser(false); // Loading complete
            }
        }
        getUser();
    }, []);

    async function handleLogout() {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleLogin() {
        try {
            await account.createSession(email, password); // Check the correct method for your version
    
            const session = await account.get();
    
            if (session?.userId?.length > 36) {
                throw new Error("Invalid userId length. It must be 36 characters or fewer.");
            }
    
            setUser(session);
            setEmail('');
            setPassword('');
        } catch (e) {
            if (e.code === 429) {
                // Rate limit exceeded, retry after some time
                console.error("Rate limit exceeded, retrying in 1 minute...");
                setTimeout(() => {
                    handleLogin(); // Retry after delay
                }, 60000); // 60 seconds
            } else {
                console.error('Login Error:', e);
                console.error('Error details:', JSON.stringify(e, null, 2));
            }
        }
    }
    
    
    
    // async function handleLogin() {
    //     try {
            
    //         await account.createSession(email, password); 
    
    //         const session = await account.get();
            
    //         console.log("Session Data:", session);
    
           
    //         setUser(session);
    
    //         setEmail('');
    //         setPassword('');
    
    //     } catch (e) {
            
    //         console.error('Login Error:', e);
    //     }
    // }
    

    async function handleRegister() {
        try {
            //await account.create(userId, email, password);
            //const userId = ID.unique().substr(0, 36);
            await account.create(ID.unique(), email, password); 
            setEmail('');
            setPassword('');
        } catch (e) {
            console.error('Registration Error:', e);
        }
    }

    if (loadingUser) {
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
        );
    }

    if (user) {
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
        );
    }

    return (
        <main className="dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-10">
            <h1 className="text-3xl font-bold text-white mb-6">Log In or Sign Up Page</h1>
            <form className="space-y-6">
                <input 
                    type="email" 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="dark:bg-gray-800 w-72 p-3 rounded-md border border-gray-600 dark:text-white focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="dark:bg-gray-800 w-72 p-3 m-2 rounded-md border border-gray-600 dark:text-white focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="flex space-x-4">
                                    <button 
                    type="button" 
                    onClick={handleLogin}
                    className="w-32 p-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                    Login
                    </button>

                    <button 
                        type="button" 
                        onClick={handleRegister}
                        className="w-32 p-3 rounded-md bg-gray-600 hover:bg-gray-700 text-white focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </div>
            </form>
        </main>
    );
}
