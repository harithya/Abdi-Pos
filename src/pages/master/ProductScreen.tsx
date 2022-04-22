import { FlatList, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout, Empty, ProductMaster, SelectInfo } from '@components'
import { CartStateProps, PageProps, PaginationProps, ProductResultProps, SearchStateProps } from '@types'
import { http } from '@services'
import { useInfiniteQuery } from 'react-query'
import { State } from 'src/redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { theme } from '@utils'
import { addQueueCart, deleteQueueCart } from 'src/redux/actions/queueCartAction'

const ProductScreen: FC<PageProps> = ({ navigation }) => {
    const searchState: SearchStateProps = useSelector((state: State) => state.search)

    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`produk?page=${pageParam}&search=${searchState.data}&limit=15`);
        return req.data.result ?? []
    }

    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
        ["product-master", searchState.data, 0], fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined

    const dispatch = useDispatch();
    const queueCartState: CartStateProps = useSelector((state: State) => state.queueCart);
    const handleAddQueueCart = (val: ProductResultProps) => {
        // Find Product in Cart
        const find = queueCartState.data.find((data) => data.id === val.kode)
        if (!find) {
            const data = val;
            val.harga_jual = 0;
            val.satuan_id = 0;
            val.satuan = '';
            dispatch(addQueueCart(data))
        } else {
            dispatch(deleteQueueCart(find.id))
        }
    }

    return (
        <DetailLayout
            title='Produk'
            back
            action
            loading={isLoading}
            actionIcon='barcode-scan'
            actionOnPress={() => navigation.navigate("Barcode")}
            actionPack="material-community"
            search>
            <FlatList
                data={data?.pages}
                onEndReached={handleLoadMore}
                style={theme.flatlist}
                keyExtractor={(item: PaginationProps) => item.current_page.toString()}
                renderItem={({ item }) =>
                    (item.data?.length == 0 && item.current_page == 1) ?
                        <Empty
                            title='Tidak Ada data'
                            subtitle='Untuk saat ini data tidak tersedia'
                        /> :
                        <React.Fragment key={item.current_page}>
                            {item.data?.map((newData: ProductResultProps) =>
                                <ProductMaster
                                    key={newData.kode}
                                    data={newData}
                                    checked={Boolean(queueCartState.data.find((data) => data.id === newData.kode))}
                                    onPress={() => handleAddQueueCart(newData)}
                                />)}
                        </React.Fragment>
                }
            />
            {queueCartState.data.length > 0 && <SelectInfo value={queueCartState.data.length} />}
        </DetailLayout>
    )
}

export default ProductScreen

const styles = StyleSheet.create({})