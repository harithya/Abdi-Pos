import axios from "axios";
import { constant } from "@utils";
import { AsyncStorage } from 'react-native'

const http = axios.create({
    baseURL: constant.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

http.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    http.interceptors.response.use(async (res: any) => {
        if (res.headers.authorization) {
            await AsyncStorage.setItem("token", res.headers.authorization);
        }
        return res;
    })
    return config;
})

export default http;