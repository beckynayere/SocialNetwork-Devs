// lib/session.ts
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);



export function encrypt(text: string) {
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
}

export function decrypt(encrypted: string) {
    const { iv, content } = JSON.parse(encrypted);
    const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
}