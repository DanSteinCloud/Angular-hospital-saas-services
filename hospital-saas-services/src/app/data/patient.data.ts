export const PATIENTS = [
  {
    id: 'dfea596b-f185-44ba-bf5c-cbe197bd4b06',
    lastName: 'fatou sora',
    middleName: 'PATIENT_middleName',
    firstName: 'ngom',
    fullName: null,
    tz: 'UTC',
    doB: 562175523,
    sex: 1,
    gender: 1,
    phones: [
        {
            id: 2,
            phone: '77491651',
            phoneType: 2
        },
        {
            id: 3,
            phone: '339864514',
            phoneType: 1
        }
    ],
    addresses: [
        {
            id: 1,
            address: 'Gand Medine',
            street: 'Rue 271',
            city: 1,
            state: 2,
            country: 3,
            addressType: 4
        }
    ],
    patientCircles: [
        {
            id: 6,
            relative: {
                id: 'a96a729f-2c14-430c-b4c6-c281e425d080',
                lastName: 'RELATIVE_LASTNAME',
                middleName: null,
                firstName: 'RELATIVE_firstName',
                fullName: null,
                tz: 'UTC',
                doB: 983212354,
                sex: 1,
                gender: 1,
                phones: [],
                addresses: []
            },
            linkType: 1
        },
        {
            id: 7,
            relative: {
                id: 'ef94cb22-3bd0-4431-8ced-03a42f28cc57',
                lastName: 'RELATIVE2_LASTNAME',
                middleName: null,
                firstName: 'RELATIVE2_firstName',
                fullName: null,
                tz: 'GMT+5',
                doB: 68845123,
                sex: 2,
                gender: 2,
                phones: [
                    {
                        id: 9,
                        phone: '212',
                        phoneType: 2
                    },
                    {
                        id: 10,
                        phone: '871',
                        phoneType: 1
                    }
                ],
                addresses: [
                    {
                        id: 8,
                        address: 'Keur MASSAR',
                        street: 'Rue 404',
                        city: 1,
                        state: 2,
                        country: 3,
                        addressType: 4
                    }
                ]
            },
            linkType: 1
        }],
    identifiers: [
        {
            identifier: '641',
            type: '1',
            authority: 'NID'
        },
        {
            identifier: 'QEYR8',
            type: '3',
            authority: 'NATIONAL_ID'
        }
    ]
}
];
