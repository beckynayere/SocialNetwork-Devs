import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const account = new Account(client);

export { account };
