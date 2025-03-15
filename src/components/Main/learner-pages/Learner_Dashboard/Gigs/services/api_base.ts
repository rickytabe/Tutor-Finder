import { toast } from "react-toastify";

const token = localStorage.getItem('token');
console.log(token);

export const defaultHeaders = {
  'Accept': 'application/json',
  'Authorization': token ? `Bearer ${token}` : '',
};

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);
    toast.error(errorData.message || 'API request failed');
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json() as Promise<T>;
};
