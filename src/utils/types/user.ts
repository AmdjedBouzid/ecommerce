import { userRole } from "../enums/userRoleUnum";

export type User = {
  email: string;
  password: string;
  role: userRole;
  profileImg: string;
};
