import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { HomeLayout, Product } from '@components'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { constant } from '@utils'
import { LayoutStateProps } from '@types'

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
    const getColumnWrapperStyle: any = () => layoutState.data == "grid" ? styles.columnWrapper : undefined
    const getContentContainerStyle = () => layoutState.data == "grid" ? styles.contentContainer : undefined

    return (
        <HomeLayout search>
            <FlatList
                data={data}
                key={layoutState.data}
                contentContainerStyle={getContentContainerStyle()}
                columnWrapperStyle={getColumnWrapperStyle()}
                numColumns={layoutState.data == "grid" ? 2 : 1}
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
        </HomeLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: "space-between",
        flex: 1
    },
    contentContainer: {
        paddingHorizontal: constant.container,
        paddingTop: 16
    }
})