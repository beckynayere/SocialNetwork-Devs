'use client'

import { useEffect, useState } from "react"
import {account, ID} from './appwrite'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null);
console.log({user})

useEffect(() => {
async function getUser(){
setUser (await account.get())   
    }
   getUser();
    }, [])

async function handleLogin(){
        try {
            await account.createEmailSession(email, password);
            setUser(await account.get())
            setEmail('')
            setPassword('')
        } catch (e) {
            console.error(e)
        }
    }
async  function handleRegister(){
        try {
            await account.create(ID.unique(), email, password)
            await handleLogin()
        }catch (e) {
            console.error(e)
        }
    }

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Log In or Sign Up </h1>
        <form>
            <input 
            type = "email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type = "password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="buton" onClick={handleLogin} >
            Login
            </button>
            <button type="buton" onClick={handleRegister} >
            Register
            </button>
        </form>
    </main>

    )
}

