
  export class Phone {
    id: number;
    phone: string;
    phoneType: number;
  }

  export class Address {
    id: number;
    address: string;
    street: string;
    city: number;
    state: number;
    country: number;
    addressType: number;
  }

  export class Medecins {
    id: number;
    num_dossier: string;
    sexe: number;
    nom: string;
    prenom: string;
    date_naissance: string;
    phones: Phone[];
    addresses: Address[];
  }

