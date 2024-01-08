export class AuthResponse {
  token: string;
}

export class SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export class SignInRequest {
  username: string;
  password: string;
}
