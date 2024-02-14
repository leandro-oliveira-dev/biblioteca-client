import { Status } from "./IStatus";

export interface IBooks {
    id: string;
    name: string;
    author: string;
    qtd: number;
    position: string;
    status: Status;
    code: number;
  }