import { Injectable } from '@angular/core';
import { Prestations, Acte } from '../_models/mprestations';
@Injectable({
  providedIn: 'root',
})
export class HospitalisationServiceService {
  a: Prestations;
  ListePrestations: Prestations[];

  constructor() {
    this.ListePrestations = new Array();
    this.ListePrestations.push(
      {
        id: 'PR0001',
        Date: '29/11/19',
        Time: '15h23',
        patient: {
          id: 'P0214',
          lastName: 'Adama',
          firstName: 'Lo',
          doB: 28061998,
        },
        doctor: { id: 1, lastName: '', firstName: 'Dr A' },
        assurance: '',
        type: 'Consultation',
        phone: { id: 1, phone: '773339933', phoneType: 1 },
        rates: 52,
        folderNumber: '7788',
        actes: [
          {
            id: 1,
            name: 'Consultation gynécologique',
            doctor: { id: 1, firstName: 'Dr Diop', lastName: '' },
            type: 'consultation',
            price: 5478,
          },
          {
            id: 2,
            name: 'Échographie',
            doctor: { id: 2, firstName: 'Dr Niang', lastName: '' },
            type: 'imagerie',
            price: 5412,
          },
        ],
      },
      {
        id: 'PR0002',
        Date: '29/11/19',
        Time: '15h07',
        patient: {
          id: 'P0145',
          lastName: 'Maimouna',
          firstName: 'Sy',
          doB: 28061998,
        },
        doctor: { id: 2, lastName: '', firstName: 'Jojo' },
        assurance: '',
        type: 'Consultation',
        phone: { id: 2, phone: '773339944', phoneType: 2 },
        rates: 42,
        folderNumber: '0012',
        actes: [
          {
            id: 1,
            name: 'Consultation gynécologique',
            doctor: { id: 1, firstName: 'Dr Diop', lastName: '' },
            type: 'consultation',
            price: 1500,
          },
          {
            id: 2,
            name: 'Échographie',
            doctor: { id: 2, firstName: 'Dr Niang', lastName: '' },
            type: 'imagerie',
            price: 584,
          },
          {
            id: 3,
            name: 'Numération Formule Sanguine (NFS) + Plaquettes',
            doctor: { id: 3, firstName: 'Dr Lo', lastName: '' },
            type: 'analyse',
            price: 789,
          },
          {
            id: 4,
            name: 'Prélèvement',
            doctor: { id: 4, firstName: 'Infirmière', lastName: '' },
            type: 'analyse',
            price: 3654,
          },
        ],
      },

      {
        id: 'PR0003',
        Date: '28/11/19',
        Time: '18h10',
        patient: {
          id: 'P0365',
          lastName: 'Haby',
          firstName: 'Ndiaye',
          doB: 17031983,
        },
        doctor: { id: 3, lastName: '', firstName: 'Andre' },
        assurance: 'Ascoma IPM',
        type: 'Analyses',
        phone: { id: 3, phone: '773339977' },
        rates: 75,
        folderNumber: '1422',
        actes: [
          {
            id: 2,
            name: 'Échographie',
            doctor: { id: 2, firstName: 'Dr Niang', lastName: '' },
            type: 'imagerie',
            price: 2300,
          },
          {
            id: 3,
            name: 'Numération Formule Sanguine (NFS) + Plaquettes',
            doctor: { id: 3, firstName: 'Dr Lo', lastName: '' },
            type: 'analyse',
            price: 2510,
          },
        ],
      },
      {
        id: 'PR0004',
        Date: '28/11/19',
        Time: '17h53',
        patient: {
          id: 'P0478',
          lastName: 'Eva',
          firstName: 'Bassene',
          doB: 2403199,
        },
        doctor: { id: 4, lastName: '', firstName: 'Simpson' },
        assurance: '',
        type: 'Imagerie',
        phone: { id: 4, phone: '773339911' },
        rates: 41,
        folderNumber: '7842',

        actes: [
          {
            id: 3,
            name: 'Numération Formule Sanguine (NFS) + Plaquettes',
            doctor: { id: 3, firstName: 'Dr Lo', lastName: '' },
            type: 'analyse',
            price: 7896,
          },
          {
            id: 4,
            name: 'Prélèvement',
            doctor: { id: 4, firstName: 'Infirmière', lastName: '' },
            type: 'analyse',
            price: 4563,
          },
        ],
      },
      {
        id: 'PR0005',
        Date: '28/11/19',
        Time: '17h15',
        patient: {
          id: 'P0321',
          lastName: 'Fatou',
          firstName: 'Diouf',
          doB: 3082012,
        },
        doctor: { id: 5, lastName: '', firstName: 'Doly' },
        assurance: 'SFD',
        type: 'Consultation Soins',
        phone: { id: 5, phone: '773339999' },
        rates: 96,
        folderNumber: '1236',
        actes: [
          {
            id: 4,
            name: 'Prélèvement',
            doctor: { id: 4, firstName: 'Infirmière', lastName: '' },
            type: 'analyse',
            price: 2016,
          },
        ],
      },
      {
        id: 'PR0006',
        Date: '28/11/19',
        Time: '17h03',
        patient: {
          id: 'P0097',
          lastName: 'Ababacar',
          firstName: 'Sene',
          doB: 10012020,
        },
        doctor: { id: 6, lastName: '', firstName: 'Bintang' },
        assurance: 'Sonam',
        type: 'Consultation Analyses',
        phone: { id: 6, phone: '773339922' },
        rates: 33,
        folderNumber: '0011',
        actes: [
          {
            id: 1,
            name: 'Consultation gynécologique',
            doctor: { id: 1, firstName: 'Dr Diop', lastName: '' },
            type: 'consultation',
            price: 7852,
          },
          {
            id: 2,
            name: 'Échographie',
            doctor: { id: 2, firstName: 'Dr Niang', lastName: '' },
            type: 'imagerie',
            price: 124,
          },
          {
            id: 3,
            name: 'Numération Formule Sanguine (NFS) + Plaquettes',
            doctor: { id: 3, firstName: 'Dr Lo', lastName: '' },
            type: 'analyse',
            price: 1247,
          },
          {
            id: 4,
            name: 'Prélèvement',
            doctor: { id: 4, firstName: 'Infirmière', lastName: '' },
            type: 'analyse',
            price: 7845,
          },
        ],
      }
    );
  }

  supprimerActe(indexPrestation: number, indexActe: number) {
    if (indexActe > -1 && indexPrestation > -1) {
      this.ListePrestations[indexPrestation].actes.slice(indexActe);
    }
  }

  ajouterActe(indexPrestation: number, acte: Acte) {
    if (indexPrestation > -1) {
      this.ListePrestations[indexPrestation].actes.push(acte);
    }
  }
}
