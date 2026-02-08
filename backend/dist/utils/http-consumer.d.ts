import axios, { AxiosInstance } from "axios";
export declare const api: (baseURL: string, token?: string) => AxiosInstance;
export declare const genericHttpConsumer: (baseURL?: string) => axios.AxiosInstance;
