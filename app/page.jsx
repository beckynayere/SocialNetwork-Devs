'use client'

import { useState } from "react"
import {account, ID} from './appwrite'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

async function handleLogin(){
        try {
            await account.createEmailSession(email, password);
            setEmail('')
            password('')
        } catch (e) {
            console.error(e)
        }
    }
async  function handleRegister(){
        try {
            await account.create(ID.unique(), email, password)
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

