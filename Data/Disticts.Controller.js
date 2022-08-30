import { ApiClient, StatusCodeHelper } from "../Utilities";

export const GetDistictCount = async (tokeyKey = null) => {
    return await ApiClient(tokeyKey).get(`/districts`)
        .then(resp => {
            return resp.data.meta.pagination.total;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;
        });

}