import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from "axios-jwt";
import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "http://localhost:5000/api" });

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
	const response = await axios.post(`http://localhost:5000/api/auth/refreshtoken`, { jwt_token: refreshToken });
    console.log(response.data.token);
	return {
		accessToken: response.data.token,
		refreshToken: response.data.refreshToken,
	};
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });