import axios, { AxiosError, AxiosResponse } from 'axios';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../../../models/auth/auth';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/auth', // Corrected baseURL
    timeout: 5000,
  });
  

export const makeSignIn = async (requestData: SignInRequest): Promise<SignInResponse> => {
  try {
    const response: AxiosResponse = await apiClient.post('/login', requestData);
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError); 
    throw error;
  }
};

export const makeSignUp = async (requestData: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const response: AxiosResponse = await apiClient.post('/register', requestData);
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError); 
    throw error;
  }
};

const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
      console.error('HTTP Error Code:', error.response.status);
      console.error('Error Message:', error.response.data);
    } else if (error.request) {
      console.error('Communication with the server failed:', error.request);
    } else {
      console.error('An error occurred:', error.message);
    }
  };
  