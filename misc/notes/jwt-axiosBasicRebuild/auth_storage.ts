/* import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export interface ITokens {
    authToken: string;
    refreshToken: string;
}

export async function getRefreshToken():Promise<string>{
    const refreshToken = await SecureStoragePlugin.get({key:"refreshToken"});
    return refreshToken.value;
}

export async function getAuthToken():Promise<string>{
    const refreshToken = await SecureStoragePlugin.get({key:"authToken"});
    return refreshToken.value;
}

export async function setTokens(tokens:ITokens):Promise<boolean> {
    try {
        await SecureStoragePlugin.set({key:"refreshToken", value:tokens.refreshToken});
        await SecureStoragePlugin.set({key:"authToken", value:tokens.authToken});
    } catch (error) {
        return false;
    } finally {
        return true;
    }
} */
