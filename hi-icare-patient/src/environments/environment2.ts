// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrlPrsnl:'https://192.168.1.50:8181/nid-api/v1',
    baseUrlModule:'https://192.168.1.50:8282/nid-api/v1',
    baseUrlRolePrivilege:'https://192.168.1.50:8383/nid-api/v1',
    baseUrlUserSecurity:'https://192.168.1.50:8484/nid-api/v1',
    baseUrlPatient:'https://192.168.1.50:8080/nid-api/v1',
    baseUrlRefDatas:'https://192.168.1.50:9090/nid-api/v1',
    baseUrlInsurance:'https://192.168.1.50:9292/nid-api/v1',
    baseUrl: 'https://192.168.1.50:8080/nid-api/v1',
    baseUrlAssurance: 'https://192.168.1.50:9292/nid-api/v1',
    baseUrlRefData: 'https://192.168.1.50:9090/nid-api/v1',
    rows_per_table:'20'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
