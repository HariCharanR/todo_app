import {id , storage} from "@/appwrite"


const uploadImage = async (file:File) => {
    if(!file) return null;

    const fileUploaded = await storage.createFile(process.env.
        NEXT_PUBLIC_STORAGE_BUCKET_ID!,id.unique(), file);
        return fileUploaded;
}

export default uploadImage;