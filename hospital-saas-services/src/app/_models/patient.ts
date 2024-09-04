export class patient {
  id?: string;
  patientIdentifier?:string;
  lastName?: string;
  middleName?: string;
  firstName?: string;
  fullName?: null;
  tz?: string;
  doB?: number;
  sex?: number;
  gender?: number;
  nationality?: number;
  phones?: (PhonesEntity)[] | null;
  addresses?: (AddressesEntity)[] | null;
  circle?: (PatientCirclesEntity)[] | null;
  identifiers?: (IdentifiersEntity)[] | null;
  assurances? :string;
  tel? :string;
}


export class PhonesEntity {
  id?: number;
  phone: string;
  phoneType?: number;
}
export class AddressesEntity {
  id?: number;
  address: string;
  street: string;
  city: number;
  state: number;
  country: number;
  addressType: number;
}
export class PatientCirclesEntity {
  id?: number;
  relative: Relative;
}
export class Relative {
  id: string;
  linkType: number;
  lastName: string;
  middleName?: null;
  firstName: string;
  fullName?: null;
  tz?: string;
  doB?: number;
  sex?: number;
  gender?: number;
  phones?: (PhonesEntity1 | null)[] | null;
  addresses?: (AddressesEntity1 | null)[] | null;
}
export class PhonesEntity1 {
  id: number;
  phone: string;
  phoneType: number;
}
export class AddressesEntity1 {
  id: number;
  address: string;
  street: string;
  city: number;
  state: number;
  country: number;
  addressType: number;
}
export class IdentifiersEntity {
  identifier: string;
  identifierType: string;
  authority: string;
}
