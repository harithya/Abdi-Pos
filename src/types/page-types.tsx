import { PattientScreenProps, QueueScreenProps } from "@types";

type RootStackList = {
    Splash: undefined,
    Welcome: undefined,
    Login: undefined,
    Home: undefined,
    ProfileEdit: undefined,
    PasswordEdit: undefined,
    Queues: QueueScreenProps,
    Organ: undefined,
    Medicine: undefined,
    Finish: undefined,
    MedicalRecord: PattientScreenProps,
    Patient: PattientScreenProps,
    Identity: PattientScreenProps,
    PersonResponsible: PattientScreenProps,
    MedicalRecordDetail: PattientScreenProps,
    VitalSignMonitoring: PattientScreenProps,
    Information: undefined
}


export default RootStackList;