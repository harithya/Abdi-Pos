import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { BottomSheet, DetailLayout, Empty, Invoice, List } from '@components'
import { SheetManager } from 'react-native-actions-sheet'
import { http } from '@services'
import { PageProps, PaginationProps, SearchStateProps, TransactionResultProps } from '@types'
import { State } from 'src/redux/reducer'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { constant, theme } from '@utils'

const TransactionScreen: FC<PageProps> = () => {

    const [status, setStatus] = useState('');
    const searchState: SearchStateProps = useSelector((state: State) => state.search)

    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`transaksi?page=${pageParam}&search=${searchState.data}&status=${status}`);
        return req.data.result ?? []
    }
    const [isRefreshing, setIsRefreshing] = useState(false)
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
        ["transaction", searchState.data, status], fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined

    const handleRefresh = () => {
        setIsRefreshing(true)
        refetch()
        setIsRefreshing(false)
    }

    const handleSetStatus = (value = '') => {
        setStatus(value);
        SheetManager.hide("filterSheet")
    }

    return (
        <DetailLayout
            title='Transaksi'
            back
            action
            loading={isLoading}
            actionIcon='tune-variant'
            actionPack='material-community'
            actionOnPress={() => SheetManager.show("filterSheet")}
            search >
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
                            {item.data?.map((newData: TransactionResultProps, key: number) => <Invoice key={key} data={newData} />)}
                        </React.Fragment>

                }
            />
            <BottomSheet id='filterSheet' title='Filter Status' icon='tune-variant'>
                <List title='Semuanya' onPress={() => handleSetStatus('')} />
                <List title='Selesai' onPress={() => handleSetStatus(constant.transactionSuccess.toString())} />
                <List title='Dibatalkan' onPress={() => handleSetStatus(constant.transactionCancel.toString())} />
                <List title='Pengembalian' onPress={() => handleSetStatus(constant.transactionReturn.toString())} />
            </BottomSheet>
        </DetailLayout>
    )
}

export default TransactionScreen

const styles = StyleSheet.create({})