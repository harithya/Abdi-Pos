import { CartProps } from "@types";


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
    Finish: undefined,
    Barcode: undefined,
    CustomerImport: undefined,
    CustomerCreate: {
        id?: number
    },
    Product: undefined,
    Transaction: undefined,
    TransactionShow: undefined,
    Return: undefined,
    Setting: undefined,
    Layout: undefined,
    Receipt: undefined,
    Printer: undefined
}


export default RootStackList;