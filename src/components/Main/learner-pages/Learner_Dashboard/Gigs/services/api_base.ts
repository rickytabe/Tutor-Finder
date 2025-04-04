import { toast } from "react-toastify";

const token = localStorage.getItem('token');
console.log('My Token', token);

export const defaultHeaders = {
  'Content-Type':'application/json',
  'Accept': 'application/json',
  'Authorization':`Bearer ${token}`,
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
