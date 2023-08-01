import axios, { AxiosResponse } from "axios";

interface LoginResponce {
    access_token: string;
};

export interface LoginParams {
    username: string;
    password: string;
}


export const login = async (params: LoginParams): Promise<AxiosResponse<LoginResponce>> => {

    const headers = {
        'Content-Type': 'application/json',
        'username': params.username,
        'password': params.password,
      };


    return axios.post<LoginParams, AxiosResponse<LoginResponce>>(
        '/api/v1/user/login',
        {}, { headers }
    );
}
