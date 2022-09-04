
import { ApiClient, StatusCodeHelper } from "../Utilities";

export const GetDistictCount = async (tokenKey = null) => {
    return await ApiClient(tokenKey).get(`/districts`)
        .then(resp => {
            return resp.data.meta.pagination.total;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;
        });

}
export const GetCityWithDistricts = async (tokenKey = null, cityId) => {
    return await ApiClient(tokenKey).get(`/cities/${cityId}?populate[0]=districts`)
        .then(resp => {
            return {
                CityId: resp.data.data.id,
                CityName: resp.data.data.attributes.CityName,
                DisctrictList: resp.data.data.attributes.districts.data.map((item, index) => {
                    return {
                        DisctrictId: item.id,
                        DistrictName: item.attributes.DistrictName
                    }
                })
            }
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;
        });

}
export const AddDisctrict = async (tokenKey, data) => {
    return await ApiClient(tokenKey).post(`/districts`, {
        data
    }).then(resp => {
        return {
            DistrictName: resp.data.data.attributes.DistrictName,
            DisctrictId: resp.data.data.id
        }
    }).catch(err => {
        const result = StatusCodeHelper(err);
        return result;
    });
}
export const UpdateDisctrict = async (tokenKey, districtId, data) => {

    return await ApiClient(tokenKey).put(`/districts/${districtId}`, {
        data
    }).then(resp => {
        return {
            DistrictName: resp.data.data.attributes.DistrictName,
            DisctrictId: resp.data.data.id
        }
    }).catch(err => {
        const result = StatusCodeHelper(err);
        return result;
    });
}

export const DeleteDisctrict = async (tokenKey, districtId) => {

    return await ApiClient(tokenKey).delete(`/districts/${districtId}`, {
        data: {
            id: districtId
        }
    }).then(resp => {
        return {
            DistrictName: resp.data.data.attributes.DistrictName,
            DisctrictId: resp.data.data.id
        }
    }).catch(err => {
        const result = StatusCodeHelper(err);
        return result;
    });
}