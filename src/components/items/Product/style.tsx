import { StyleSheet } from "react-native";
import { color, constant, theme } from "@utils";

const listStyle = StyleSheet.create({
    item: {
        paddingHorizontal: constant.container,
        paddingVertical: 16,
        ...theme.flexStart,

    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 10,
        resizeMode: "cover",
        marginRight: 20
    },
    body: {
        flex: 1,
    },
    container: {
        flex: 1,
        ...theme.flexStart,
        marginRight: 20
    }
})

const gridStyle = StyleSheet.create({
    main: {
        flex: 1,
        borderRadius: 10,
    },
    item: {
        borderRadius: 10,
    },
    img: {
        height: 150,
        width: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: "cover",
    },
    body: {
        flex: 1,
        padding: 10,
    },
    container: {
        flex: 1,
    },
    footer: {
        marginTop: 16
    },
    touchable: {
        borderRadius: 10,
        overflow: "hidden",
        width: "48%",
        marginBottom: 16,
        backgroundColor: color.white,
        ...theme.boxShadow,
    }
})


export { listStyle, gridStyle }