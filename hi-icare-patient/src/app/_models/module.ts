export class Module {
  code:    number;
  message: string;
  result:  Result;
}

export interface Result {
  MODULE_PATIENT_REG:       MODULEAMBULATORYSVCClass;
  MODULE_PARTNER_PHYSICIAN: MODULEAMBULATORYSVCClass;
  MODULE_AMBULATORY_SVC:    MODULEAMBULATORYSVCClass;
  MODULE_ROOM_MGMT:         MODULEAMBULATORYSVCClass;
  MODULE_BILLING:           MODULEAMBULATORYSVCClass;
  MODULE_INPATIENT_SVC:     MODULEAMBULATORYSVCClass;
}

export interface MODULEAMBULATORYSVCClass {
  name:    string;
  roleIds: number[];
}
