import axios, { AxiosResponse } from "axios";

interface LoginResponce {
    access_token: string;
};

export interface LoginParams {
    username: string;
    password: string;
}

export const login = async (params: LoginParams): Promise<AxiosResponse<LoginResponce>> => {
    return axios.post<LoginParams, AxiosResponse<LoginResponce>>(
        `${process.env.REACT_APP_ENDPOINT}/login`,
        params
    );
}
