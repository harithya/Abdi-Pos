import { CartProps, TransactionResultProps } from "@types";


type RootStackList = {
    Splash: undefined,
    Welcome: undefined,
    Login: undefined,
    Home: undefined,
    ProfileEdit: undefined,
    PasswordEdit: undefined,
    Cart: undefined,
    Customer: { withSelect?: boolean },
    CartShow: { data: CartProps },
    Checkout: undefined,
    Finish: { kode: string },
    Barcode: undefined,
    CustomerImport: undefined,
    CustomerCreate: {
        id?: number
    },
    Product: undefined,
    Transaction: undefined,
    TransactionShow: { kode: string },
    Return: { data: TransactionResultProps },
    Setting: undefined,
    Layout: undefined,
    Receipt: undefined,
    Printer: undefined,
    Queue: undefined,
    QueueShow: { id: number },
}


export default RootStackList;