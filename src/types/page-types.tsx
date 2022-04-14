

type RootStackList = {
    Splash: undefined,
    Welcome: undefined,
    Login: undefined,
    Home: undefined,
    ProfileEdit: undefined,
    PasswordEdit: undefined,
    Cart: undefined,
    Customer: { withSelect?: boolean },
    CartShow: undefined,
    Checkout: undefined,
    Finish: undefined,
    Barcode: undefined,
    CustomerImport: undefined,
    CustomerCreate: {
        id?: number
    }
}


export default RootStackList;