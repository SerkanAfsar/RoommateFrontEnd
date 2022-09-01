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
export const GetCityList = async (tokenKey = null) => {
    return await ApiClient(tokenKey).get(`/cities`)
        .then(resp => {
            return resp?.data?.data?.map((item, index) => {
                return {
                    id: item.id,
                    CityName: item?.attributes?.CityName
                }
            })
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}
export const AddCity = async (tokenKey = null, CityName) => {

    return await ApiClient(tokenKey).post(`/cities`, {
        data: {
            CityName
        }
    }).then(resp => {

        return {
            id: resp.data.data.id,
            CityName: resp.data.data.attributes.CityName
        }
    }).catch(err => {
        const result = StatusCodeHelper(err);
        return result;

    });
}