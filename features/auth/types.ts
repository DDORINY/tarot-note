export type AuthFormState = {
  email: string;
  password: string;
};

export type Profile = {
  id: string;
  nickname: string | null;
  created_at: string;
};
