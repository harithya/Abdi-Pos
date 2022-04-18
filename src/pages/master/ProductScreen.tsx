import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Empty, Product } from '@components'
import { PageProps, PaginationProps, ProductResultProps, SearchStateProps } from '@types'
import { http } from '@services'
import { useInfiniteQuery } from 'react-query'
import { State } from 'src/redux/reducer'
import { useSelector } from 'react-redux'
import { theme } from '@utils'

const ProductScreen: FC<PageProps> = ({ navigation }) => {
    const searchState: SearchStateProps = useSelector((state: State) => state.search)

    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`produk?page=${pageParam}&search=${searchState.data}&limit=15`);
        return req.data.result ?? []
    }

    const [isRefreshing, setIsRefreshing] = useState(false)
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
        ["product", searchState.data, 0], fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined

    const handleRefresh = () => {
        setIsRefreshing(true)
        refetch()
        setIsRefreshing(false)
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
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
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
                                <Product
                                    key={newData.kode}
                                    data={newData}
                                    onPress={() => { }}
                                    layout={"list"}
                                />)}
                        </React.Fragment>

                }
            />

        </DetailLayout>
    )
}

export default ProductScreen

const styles = StyleSheet.create({})