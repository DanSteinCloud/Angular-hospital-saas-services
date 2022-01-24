// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrlPrsnl:'http://localhost:8181/nid-api/v1',
    baseUrlModule:'http://localhost:8282/nid-api/v1',
    baseUrlRolePrivilege:'http://localhost:8383/nid-api/v1',
    baseUrlUserSecurity:'http://localhost:8484/nid-api/v1',
    baseUrlPatient:'https://localhost:8080/nid-api/v1',
    baseUrlRefDatas:'http://localhost:9090/nid-api/v1',
    baseUrlInsurance:'http://localhost:9292/nid-api/v1',
    baseUrl: 'https://localhost:8080/nid-api/v1',
    baseUrlAssurance: 'http://localhost:9292/nid-api/v1',
    baseUrlRefData: 'http://localhost:9090/nid-api/v1',
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
