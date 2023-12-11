export interface UserAuth0Get {
  created_at: Date;
  email: Email;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  identities: Identity[];
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: Date;
  user_id: string;
  user_metadata: UserMetadata;
  last_login: Date;
  last_ip: string;
  logins_count: number;
  role: string;
}

export interface Identity {
  provider: string;
  access_token: string;
  expires_in: number;
  user_id: string;
  connection: string;
  isSocial: boolean;
}

export interface UserMetadata {
  phone_number: number;
  address: string;
  department: string;
  roleToAdd?: string;
  state: string;
}

export interface UserAuth0Post {
  email: Email;
  user_metadata: UserMetadata;
  given_name: string;
  family_name: string;
  name: string;
  password?: string;
  connection?: string;
}

export type Email = `${string}@${string}.com`;
