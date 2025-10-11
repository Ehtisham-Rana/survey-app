export class LoginRequestDTO {
  email!: string;
  password!: string;
}

export class LoginResponseDTO {
  accessToken!: string;
  user!: {
    id: string;
    email: string;
  };
}
