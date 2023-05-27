/* import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { getRefreshToken, setTokens, getAuthToken, ITokens } from "./auth_storage";

let isRefreshing = false;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function isTokenExpired(token: string): boolean {
	const tokenDecoded = jwtDecode<JwtPayload>(token);
	if (!tokenDecoded.exp) {
		return false;
	} else {
		return false;
	}
}

async function requestRefresh(refreshToken: string): Promise<ITokens> {
	const response = await axios.post(`https://the-routemaster.schuetz-andreas.dev/api/auth/refresh_token`, { token: refreshToken });
	console.log(response.data.token);
	return {
		authToken: response.data.token,
		refreshToken: response.data.refresh_token,
	};
}

async function refreshToken() {
	const strRefreshToken: string = await getRefreshToken();
	if (!strRefreshToken) {
		throw new Error("No refresh token available");
	}
	if (!isRefreshing) {
		try {
			if (isTokenExpired(strRefreshToken)) {
				isRefreshing = true;
				const newTokens: ITokens = await requestRefresh(strRefreshToken);
				await setTokens(newTokens);
			}
		} catch (error) {
			console.error(error);
		} finally {
			isRefreshing = false;
		}
	} else {
        await delay(1000);
        await refreshToken();
	}
}

function createAxiosJwtInstance(): AxiosInstance {
	const axiosInstance = axios.create({ baseURL: "http://localhost:5000/api" });
	axiosInstance.interceptors.request.use(authInterceptor);
	return axiosInstance;
}

async function authInterceptor(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
	await refreshToken();

	const authToken = getAuthToken();
	config.headers.Authorization = `Bearer ${authToken}`;

	return config;
}

export default createAxiosJwtInstance;
 */