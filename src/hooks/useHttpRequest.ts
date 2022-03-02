import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAsync } from "react-async-hook";

const useHttpRequest = <Data = unknown>(
  request: AxiosRequestConfig,
  callback: unknown[]
) => {
  const { loading, error, result } = useAsync<AxiosResponse<Data>>(
    async () => await axios.request(request),
    callback
  );

  return {
    data: result?.data,
    error,
    loading,
    request: result,
  };
};

export { useHttpRequest };
