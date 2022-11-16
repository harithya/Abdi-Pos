import { View, StyleSheet, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import React from 'react'
import { DetailLayout, Section } from '@components'
import { color, constant, theme } from '@utils'
import { Text } from '@ui-kitten/components'
import { PrinterStateProps } from '@types'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { setPrinterSize } from 'src/redux/actions/printerAction'

const printer = [
    {
        title: 'Kertas 58mm',
        id: 0,
        image: require('../../../assets/img/58mm.png'),
    },
    {
        title: 'Kertas 80mm',
        id: 1,
        image: require('../../../assets/img/80mm.png'),
    },
]
const layout = [
    {
        id: 0,
        image: require('../../../assets/img/struk1.jpg'),
        title: 'Terperinci'
    },
    {
        id: 1,
        image: require('../../../assets/img/struk1.jpg'),
        title: 'Sederhana',
    },
]
const ReceiptLayoutScreen = () => {
    const { data }: PrinterStateProps = useSelector((state: State) => state.printer);

    return (
        <DetailLayout title='Struk' back>
            <ScrollView>
                <Section title='Ukuran Printer' style={styles.section}>
                    <View style={styles.layout}>
                        {printer.map((val, key) => <View style={theme.toCenter} key={`printer-${key}`}>
                            <TouchableNativeFeedback onPress={() => setPrinterSize(val.id)}>
                                <View style={[styles.printer, (data.size == val.id) && styles.active]}>
                                    <Image source={val.image} style={styles.imgPrinter} />
                                </View>
                            </TouchableNativeFeedback>
                            <Text>{val.title}</Text>
                        </View>)}
                    </View>
                </Section>
                <Section title='Layout Struk' style={styles.section}>
                    <View style={styles.layout}>
                        {layout.map((val, key) => <View style={theme.toCenter}>
                            <TouchableNativeFeedback onPress={() => setPrinterSize(val.id)}>
                                <View style={[styles.struck, (data.layout == val.id) && styles.active]} key={`struk-${key}`}>
                                    <Image source={val.image} style={styles.imgStruck} />
                                </View>
                            </TouchableNativeFeedback>
                            <Text>{val.title}</Text>
                        </View>)}
                    </View>
                </Section>
            </ScrollView>
        </DetailLayout>
    )
}

const styles = StyleSheet.create({
    layout: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: constant.container,
        marginTop: 5
    },
    section: {
        marginTop: constant.container,
        marginBottom: 10
    },
    printer: {
        backgroundColor: color.borderInput,
        padding: constant.container,
        borderRadius: 5,
        marginBottom: 5
    },
    imgPrinter: {
        height: 80,
        width: 80,
        resizeMode: "contain"
    },
    imgStruck: {
        width: 120,
        resizeMode: "contain",
        height: 200,
    },
    struck: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: color.shadow,
        marginBottom: 5
    },
    active: {
        borderColor: color.primary,
        borderWidth: 1.5,
    }

})

export default ReceiptLayoutScreen