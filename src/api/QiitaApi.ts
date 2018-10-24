import axios, { AxiosError, AxiosResponse } from "axios";
import {
  IFetchQiitaUserRequest,
  IFetchQiitaUserResponse
} from "../domain/Qiita";

export const requestToQiitaUserApi = async (
  request: IFetchQiitaUserRequest
): Promise<IFetchQiitaUserResponse> => {
  return axios
    .get<IFetchQiitaUserResponse>(
      `https://qiita.com/api/v2/users/${request.id}`
    )
    .then((axiosResponse: AxiosResponse) => {
      return Promise.resolve(axiosResponse.data);
    })
    .catch((axiosError: AxiosError) => {
      return Promise.reject(axiosError);
    });
};
