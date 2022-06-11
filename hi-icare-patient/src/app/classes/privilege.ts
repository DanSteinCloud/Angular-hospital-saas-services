export interface Privilege {
  id:     number;
  action: string;
  method: Method;
  url:    URL;
}

export enum Method {
  Delete = "DELETE",
  Post = "POST",
  Put = "PUT",
  View = "VIEW",
}

export enum URL {
  TempURL = "/temp/url",
}
