import { ApiClient, StatusCodeHelper } from "../Utilities";

export const GetUserCount = async (tokenKey = null) => {
    return await ApiClient(tokenKey).get(`/users`)
        .then(resp => {
            return resp.data.length;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}

