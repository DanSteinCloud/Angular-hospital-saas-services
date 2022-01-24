export class PrisenCharge {
  insuranceNumber: number;
  cardNumber: number;
  startingDate: number;
  endingDate: number;
  coverateRate: number;
  paymentCap: number;
  patientId: string;
  insurerId: string;
  sponsorId: string;
  insuranceName?:string;
  sponsorName?:string;
}

export interface Insurer {
  id: string;
  name?: string;
}

export interface Sponsor {
  id: string;
  name?: string;
}
