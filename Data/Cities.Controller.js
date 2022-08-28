import { ApiClient, StatusCodeHelper } from "../Utilities";

export const GetCityCount = async (tokeyKey = null) => {
    return await ApiClient(tokeyKey).get(`/cities`)
        .then(resp => {
            return resp.data.meta.pagination.total;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}