import { IDataTable } from "./global";

export interface User {
  id: string,
  username: string,
  createdAt: Date,
  updatedAt: Date
}

export interface UserDataTable extends IDataTable {
  data: User[]
}
