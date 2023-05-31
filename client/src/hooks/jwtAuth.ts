import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, clearAuthTokens } from "axios-jwt";
import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "https://the-routemaster.schuetz-andreas.dev/api/" });

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
	try {
		const response = await axios.post(`https://the-routemaster.schuetz-andreas.dev/api/auth/refreshtoken`, { jwt_token: refreshToken });
   
	return {
		accessToken: response.data.token,
		refreshToken: response.data.refreshToken,
	};
	} catch (error) {
		console.log(error);
		window.location.href = "/login";
		clearAuthTokens();
		return  "";
	}
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });