import {Client ,Account , ID ,Databases , Storage } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_KEY!)

    /**
     * NEXT_PUBLIC -> specifies the following key is to be available for both client and server components in nextjs 
     */

    
export const account = new Account(client);
export const dbs = new Databases(client);
export const storage = new Storage(client);

