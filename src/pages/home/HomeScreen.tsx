import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { BottomSheet, CategorySheet, HomeLayout, Product, SelectInfo } from '@components'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { color, constant, helper, theme } from '@utils'
import { LayoutStateProps } from '@types'
import { SheetManager } from 'react-native-actions-sheet'
import CartScreen from '../cart/CartScreen'

const data = [
    { title: "Acyclovir Topikal", stok: 50, img: "http://via.placeholder.com/640x640", price: 17500 },
    { title: "Paracetamol", stok: 18, img: "http://via.placeholder.com/640x640", price: 15000 },
    { title: "Penicillin G Procaine", stok: 6, img: "http://via.placeholder.com/640x640", price: 20000 },
    { title: "Holisticare Ester C ", stok: 24, img: "http://via.placeholder.com/640x640", price: 15000 },
    { title: "Fluticasone", stok: 37, img: "http://via.placeholder.com/640x640", price: 26000 },
]


const HomeScreen = () => {
    const layoutState: LayoutStateProps = useSelector((state: State) => state.layout);

    // Layout Style
    const getColumnWrapperStyle = () => (!helper.isTablet() && layoutState.data == "grid") && theme.flexBetween
    const getContentContainerStyle = () => layoutState.data == "grid" ? styles.contentContainer : undefined
    const gridNumber = (): number => helper.isTablet() ? 3 : 2

    const handleOpenCategory = () => {
        SheetManager.show("bottomSheet")
    }

    return (
        <HomeLayout search onPressCategory={handleOpenCategory}>
            <View style={[theme.flexStart, theme.flex1, styles.relative]}>
                <View style={[theme.flex1, styles.relative]}>
                    <FlatList
                        data={data}
                        key={layoutState.data}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={getColumnWrapperStyle()}
                        contentContainerStyle={[getContentContainerStyle(), styles.containerScroll]}
                        numColumns={layoutState.data == "grid" ? gridNumber() : 1}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item, index }) =>
                            <Product
                                key={index}
                                title={item.title}
                                price={item.price}
                                stok={item.stok}
                                img={item.img}
                                layout={layoutState.data}
                            />
                        }
                    />
                    {!helper.isTablet() && <SelectInfo value={5} />}
                    <BottomSheet id='bottomSheet' title='Category'>
                        <CategorySheet />
                    </BottomSheet>
                </View>
                {helper.isTablet() &&
                    <View style={styles.cart}>
                        <CartScreen disableLayout={true} />
                    </View>}
            </View>
        </HomeLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    contentContainer: {
        paddingHorizontal: constant.container,
        paddingTop: 16,
    },
    relative: {
        position: "relative"
    },
    containerScroll: {
        paddingBottom: 200
    },
    cart: {
        flex: 0.7,
        borderLeftWidth: 0.8,
        borderLeftColor: color.border
    }
})