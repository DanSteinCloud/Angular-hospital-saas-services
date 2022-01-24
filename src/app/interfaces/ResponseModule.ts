export interface ResponseModule {
  code:    number;
  message: string;
  result:  Result;
}

export interface Result {
  MODULE_PATIENT_REG:       Module;
  MODULE_PARTNER_PHYSICIAN: Module;
  MODULE_AMBULATORY_SVC:    Module;
  MODULE_ROOM_MGMT:         Module;
  MODULE_BILLING:           Module;
  MODULE_INPATIENT_SVC:     Module;
}

export interface Module {
  name:    string;
  roleIds: number[];
}

export interface ResponseAll {
  code:    number;
  message: string;
  result:  any;
}
