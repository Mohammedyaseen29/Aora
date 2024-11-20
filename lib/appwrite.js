import { Account, Avatars, Client, Databases, ID,Query,Storage,data } from "react-native-appwrite"
import { } from "expo-env"
export const config = {
    endpoint:"https://cloud.appwrite.io/v1",
    platform:"com.yas.Aora",
    projectId:"",
    databaseId:"",
    userCollectionId:"",
    videoCollectionId:"",
    storageId:""
}

const client = new Client();

client.setEndpoint(config.endpoint).setPlatform(config.platform).setProject(config.projectId); 

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async(email,password,username)=>{
    console.log("iam inside the create function")
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw new Error("Account creation Failed");

        const avatarUrl = avatar.getInitials(username);
        await signin(email,password);
        console.log("Creating user document...");
        const newUser = await databases.createDocument(config.databaseId,config.userCollectionId,ID.unique(),{AccountId:newAccount.$id,Email:email,username,Avatar:avatarUrl}) 
        return newUser;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function signin(email,password) {
    console.log("Inside signin function. Attempting to create session.");
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log("Error in sign in : ",error);
        throw error;
    }   
}
export async function getAccount(){
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await getAccount();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('AccountId',currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function getPosts(){
    try {
        const allPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return allPosts.documents;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLatest() {
    try {
        const latestPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return latestPosts.documents;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getQueryPost(query) {
    try {
        const queryPost = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title',query)]
        )
        return queryPost.documents;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function getUserPost(userId) {
    try {
        const userPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator',userId),Query.orderDesc('$createdAt')]
        )
        return userPosts.documents;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getFilePreview = async (fileId,type)=>{
    let fileUrl;
    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(config.storageId,fileId)
        }else if(type === "image"){
            fileUrl = storage.getFilePreview(config.storageId,fileId,2000,2000,'top',100)
        }else{
            throw new Error("Invalid file type")
        }
        if(!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async(file,type)=>{
    if(!file) return;
    const asset = {
        name: file.fileName,
        type:file.fileType,
        size:file.fileSize,
        uri:file.uri,
    }

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        )
        const fileUrl = await getFilePreview(uploadedFile.$id,type)
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form)=>{
    try {
        const [thumbnailUrl,videoUrl] = await Promise.all(
            [
                uploadFile(form.thumbnail,'image'),
                uploadFile(form.video,'video'),
            ]
        )
        const newPost = await databases.createDocument(
            config.databaseId,config.videoCollectionId,ID.unique(),{
                title:form.title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                creator:form.userId
            }
        )
        return newPost; 
    } catch (error) {
        throw new Error(error)
    }
}
