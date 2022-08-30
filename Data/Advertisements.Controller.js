import { ApiClient, StatusCodeHelper } from "../Utilities";

export const GetAdminAccessedAdvetisementCount = async (tokenKey = null) => {
    return await ApiClient(tokenKey).get(`/advertisements?filters[AdminEnabled][$eq]=true`)
        .then(resp => {
            return resp.data.meta.pagination.total;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}
export const GetAdminNotAccessedAdvertisementCount = async (tokenKey = null) => {
    return await ApiClient(tokenKey).get(`/advertisements?filters[AdminEnabled][$eq]=false`)
        .then(resp => {
            return resp.data.meta.pagination.total;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}