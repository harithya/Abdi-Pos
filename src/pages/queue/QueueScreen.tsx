import { FlatList, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Empty, List } from '@components'
import { http } from '@services'
import { PaginationProps, QueueResultProps, PageProps, SearchStateProps } from '@types'
import { State } from 'src/redux/reducer'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { helper, theme } from '@utils'
import { BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components'

const QueueScreen: FC<PageProps> = ({ navigation }) => {

    const searchState: SearchStateProps = useSelector((state: State) => state.search)

    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`antrian?page=${pageParam}&search=${searchState.data}&status=1&is_selesai=${tabActive}`);
        return req.data.result ?? []
    }

    const [tabActive, setTabActive] = useState(0)

    const [isRefreshing, setIsRefreshing] = useState(false)
    const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
        ["queue", searchState.data, tabActive], fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined

    const handleRefresh = () => {
        setIsRefreshing(true)
        refetch()
        setIsRefreshing(false)
    }

    const getStatus = (value: number) => {
        if (value === tabActive) {
            return {
                status: "primary",
            }
        } else {
            return {
                status: undefined,
            }
        }
    }

    const handleNavigate = (val: QueueResultProps) => {
        if (tabActive === 0) {
            navigation.navigate('QueueShow', { id: val.id })
        } else {
            navigation.navigate('QueueFinish', { kode: val.kode_transaksi })
        }
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
                                tabActive ? <List
                                    key={newData.id}
                                    title={newData.kode_transaksi}
                                    subtitle={newData.pasien}
                                    rightValue={helper.date(newData.tanggal_transaksi)}
                                    onPress={() => handleNavigate(newData)}
                                /> : <List
                                    key={newData.id}
                                    title={newData.pasien}
                                    onPress={() => handleNavigate(newData)}
                                />
                            )}
                        </React.Fragment>
                }
            />
            <BottomNavigation
                selectedIndex={tabActive}
                style={styles.bottomNavigation}
                onSelect={(val) => setTabActive(val)}>
                <BottomNavigationTab title={(eva) =>
                    <Text appearance={'hint'} style={theme.fontMedium} status={getStatus(0).status}>Antrian</Text>}
                />
                <BottomNavigationTab title={() =>
                    <Text appearance={'hint'} style={theme.fontMedium} status={getStatus(1).status}>History</Text>} />
            </BottomNavigation>
        </DetailLayout>
    )
}

export default QueueScreen

const styles = StyleSheet.create({
    bottomNavigation: {
        ...theme.boxShadow,
    }
})