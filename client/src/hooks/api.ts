import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from "axios-jwt";
import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "https://the-routemaster.schuetz-andreas.dev/api" });

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
	const response = await axios.post(`${process.env.BACKEND_URL}/auth/refresh_token`, { token: refreshToken });
    console.log(response.data.token);
	return {
		accessToken: response.data.token,
		refreshToken: response.data.refresh_token,
	};
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });