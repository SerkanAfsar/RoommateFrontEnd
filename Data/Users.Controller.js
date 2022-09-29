import axios from "axios";
import { ApiClient, StatusCodeHelper, UserApiClient } from "../Utilities";

export const GetUserCount = async (tokenKey = null) => {
    return await ApiClient(tokenKey).get(`/users`)
        .then(resp => {
            return resp.data.length;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}

export const GetUser = async (tokenKey = null, id) => {
    return await ApiClient(tokenKey).get(`/users/${id}?populate=*`)
        .then(resp => {
            return resp.data;
        }).catch(err => {
            const result = StatusCodeHelper(err);
            return result;

        });
}

export const GetRoleTypes = async (tokenKey) => {
    return await ApiClient(tokenKey).get(`/users-permissions/roles`)
        .then(resp => {
            return resp.data.roles
        })
        .catch(err => {
            const result = StatusCodeHelper(err);
            return result;
        })
}
export const CreateUser = async (tokenKey, data) => {
    return await ApiClient(tokenKey).post(`/users`, data)
        .then(resp => {
            return resp.data
        })
        .catch(err => {
            const result = StatusCodeHelper(err);
            return result;
        })

}
export const UpdateUser = async (tokenKey, id, data) => {
    return await ApiClient(tokenKey).put(`/users/${id}`, data)
        .then(resp => {
            return resp.data
        })
        .catch(err => {
            const result = StatusCodeHelper(err);
            return result;
        })
}
export const GetUsersList = async (tokenKey) => {
    return await ApiClient(tokenKey).get(`/users`)
        .then(resp => {
            return resp.data
        })
        .catch(err => {

            const result = StatusCodeHelper(err);
            return result;
        })
}

export const DeleteUser = async (tokenKey, id) => {
    return await ApiClient(tokenKey).delete(`/users/${id}`)
        .then(resp => {
            return resp.data
        })
        .catch(err => {

            const result = StatusCodeHelper(err);
            return result;
        })
}

