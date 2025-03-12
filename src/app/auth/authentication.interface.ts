export interface AuthenticationResponse {
  id: number;
  login: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}
