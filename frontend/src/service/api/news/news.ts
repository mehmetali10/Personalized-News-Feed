import axios, { AxiosError, AxiosResponse } from 'axios';
import { NewsModel } from '../../../models/news/news';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

const addAuthHeader = () => {

  const token =JSON.parse(localStorage.getItem('userInfo')!).token;
  
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const getNews = async (filters: {
  q?: string; 
  from?: string;
  to?: string;
  sources?: string;
  author?: string;
}): Promise<NewsModel[]> => {
  addAuthHeader();
  try {
    const response: AxiosResponse = await apiClient.get('/News/Read', {
      params: filters,
    });
    return response.data as NewsModel[];
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};


const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) {
        localStorage.removeItem('userInfo')
        window.location.href = '/SignIn'
        return 
    }
    console.error('HTTP Error Code:', error.response.status);
    console.error('Error Message:', error.response.data);
  } else if (error.request) {
    console.error('Communication with the server failed:', error.request);
  } else {
    console.error('An error occurred:', error.message);
  }
};

