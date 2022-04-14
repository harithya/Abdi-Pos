import { FlatList, StyleSheet, ToastAndroid, View } from 'react-native'
import React from 'react'
import { BottomSheet, CategorySheet, HomeLayout, Product, SelectInfo, Empty } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { color, constant, helper, theme } from '@utils'
import {
    CategoryStateProps,
    LayoutStateProps,
    PaginationProps,
    ProductResultProps,
    SalesCartStateProps,
    SearchStateProps
} from '@types'
import { SheetManager } from 'react-native-actions-sheet'
import CartScreen from '../cart/CartScreen'
import { useInfiniteQuery } from 'react-query'
import { http } from '@services'
import { addSalesCart, updateSalesCart } from 'src/redux/actions/salesCartAction'

const HomeScreen = () => {
    //FETCH DATA
    const searchState: SearchStateProps = useSelector((state: State) => state.search)
    const categoryState: CategoryStateProps = useSelector((state: State) => state.category)

    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`produk?page=${pageParam}&search=${searchState.data}&kategori=${categoryState.selected.id}&limit=${helper.getLimitPage()}`);
        return req.data.result ?? []
    }

    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
        ["product", searchState.data, categoryState.selected.id],
        fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined

    // Layout Style
    const layoutState: LayoutStateProps = useSelector((state: State) => state.layout);
    const handleOpenCategory = () => {
        SheetManager.show("bottomSheet")
    }

    // Cart Logical
    const dispatch = useDispatch();
    const salesCartState: SalesCartStateProps = useSelector((state: State) => state.salesCart);

    const handleAddCart = (item: ProductResultProps) => {
        //Find Product in Cart
        const find = salesCartState.data.find((data) => data.id === item.kode)
        if (!find) {
            // Validation stok product
            if (parseInt(item.stok) > 0) {
                dispatch(addSalesCart(item))
            }
        } else {
            // Validation stok product
            if ((parseInt(item.stok) - find.qty) > 0) {
                const cart = salesCartState.data.map((data) => {
                    if (data.id === item.kode) {
                        data.qty += 1
                    }
                    return data
                })
                dispatch(updateSalesCart(cart));
            }
        }
    }

    return (
        <HomeLayout search onPressCategory={handleOpenCategory} onChangeLayout={refetch} loading={isLoading}>
            <View style={[theme.flexStart, theme.flex1, styles.relative]}>
                <View style={[theme.flex1, styles.relative]}>
                    <FlatList
                        data={data?.pages}
                        key={layoutState.data}
                        onEndReached={handleLoadMore}
                        style={theme.flatlist}
                        keyExtractor={(item: PaginationProps) => item.current_page.toString()}
                        renderItem={({ item }) =>
                            (item.data?.length == 0 && item.current_page == 1) ?
                                <Empty
                                    title='Tidak Ada data'
                                    subtitle='Untuk saat ini data tidak tersedia'
                                /> :
                                <View style={layoutState.data == "grid" ? styles.productContainer : undefined}>
                                    {item.data?.map((newData: ProductResultProps) =>
                                        <Product
                                            key={newData.kode}
                                            data={newData}
                                            onPress={() => handleAddCart(newData)}
                                            layout={layoutState.data}
                                        />)}
                                </View>
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
    productContainer: {
        flex: 1,
        paddingHorizontal: constant.container,
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
        justifyContent: "space-between"
    },
    relative: {
        position: "relative"
    },
    cart: {
        flex: 0.7,
        borderLeftWidth: 0.8,
        borderLeftColor: color.border
    }
})








