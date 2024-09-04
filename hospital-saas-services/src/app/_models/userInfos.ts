export class UserInfos {
  id:           string;
  lastName:     string;
  middleName:   null;
  nationality:  number;
  firstName:    string;
  fullName:     string;
  tz:           number;
  doB:          number;
  createdDate:  number;
  sex:          number;
  gender:       number;
  phones:       Phone[];
  addresses:    Address[];
  userId:       string;
  prsnlRoleIds: number[];
}

export class Address {
  id:          number;
  address:     string;
  street:      string;
  city:        number;
  state:       number;
  country:     number;
  addressType: number;
}

export class Phone {
  id:        number;
  phone:     string;
  phoneType: number;
}
