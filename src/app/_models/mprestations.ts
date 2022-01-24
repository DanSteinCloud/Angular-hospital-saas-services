import { patient, PhonesEntity } from './patient';


export class Prestations {
    id: string;
    Date: string;
    Time: string;
    patient: patient;
    doctor: Doctor;
    assurance: string;
    type: string;
    rates: number;
    phone?: PhonesEntity;
    folderNumber?: string;
    actes?: Acte [];
}

export class Acte {
    id: number;
    name?: string;
    doctor?: Doctor;
    type?: string;
    price?: number;
}

export class Doctor{
    id: number;
    firstName: string;
    lastName: string;
}
