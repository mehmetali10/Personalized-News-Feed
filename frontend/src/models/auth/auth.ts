
export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface SignInRequest{
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
}

export interface SignUpResponse {

}

export interface TokenPayload {
    firstName: string;
    lastName: string;
    email: string;
  }
  