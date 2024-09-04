export interface Reponse {
  code: number;
  message: string;
  result: Result[];
}

export interface Result {
  id: string;
  lastName: string;
  middleName: null;
  firstName: string;
  fullName: string;
  tz: number;
  doB: string;
  sex: number;
  gender: number;
  phones: Phone[];
  addresses: Address[];
  circle: any[];
  patientIdentifier: string;
  insurance: null;
}

export interface Address {
  id: number;
  address: string;
  street: null | string;
  city: number;
  state: number;
  country: number;
  addressType: number;
}

export interface Phone {
  id: number;
  phone: string;
  phoneType: number;
}
