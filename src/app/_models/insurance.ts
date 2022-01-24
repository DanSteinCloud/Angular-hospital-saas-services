export class Insurance {
  id:              string;
  name:            string;
  address?:         string;
  contacts:        Contact[];
  identifier:      Identifier;
  insuranceType:   number;
  insuranceStatus: number;
  convention:      number;
}

export class Contact {
  phone: string;
  name:  string;
}



export class Identifier {
  identifier:     string;
  identifierType: number;
  authority:      string;
}




export class aInsurance
{
  InsuranceDatas: Insurance[];
}
