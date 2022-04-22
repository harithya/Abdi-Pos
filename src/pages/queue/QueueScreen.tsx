import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Empty, List } from '@components'
import { http } from '@services'
import { PaginationProps, QueueResultProps, PageProps, SearchStateProps } from '@types'
import { State } from 'src/redux/reducer'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { theme } from '@utils'

const QueueScreen: FC<PageProps> = ({ navigation }) => {

    const searchState: SearchStateProps = useSelector((state: State) => state.search)

    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`antrian?page=${pageParam}&search=${searchState.data}&status=1`);
        return req.data.result ?? []
    }

    const [isRefreshing, setIsRefreshing] = useState(false)
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
        ["queue", searchState.data], fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined

    const handleRefresh = () => {
        setIsRefreshing(true)
        refetch()
        setIsRefreshing(false)
    }

    return (
        <DetailLayout title='Antrian Klinik' loading={isLoading} back search>
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
                            {item.data?.map((newData: QueueResultProps) =>
                                <List
                                    key={newData.id}
                                    title={newData.pasien}
                                    onPress={() => navigation.navigate('QueueShow', { id: newData.id })}
                                />)}
                        </React.Fragment>
                }
            />
        </DetailLayout>
    )
}

export default QueueScreen

const styles = StyleSheet.create({})