import { FlatList } from 'react-native'
import React, { FC } from 'react'
import { Customer, DetailLayout, Empty } from '@components'
import { PageProps, SearchStateProps, PaginationProps, CustomerResultProps } from '@types'
import { http } from '@services'
import { useInfiniteQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'

const CustomerScreen: FC<PageProps> = ({ navigation }) => {

    const searchState: SearchStateProps = useSelector((state: State) => state.search)
    const fetchData = async ({ pageParam = 1 }) => {
        const req = await http.get(`pelanggan?page=${pageParam}&search=${searchState.data}`);
        return req.data.result ?? []
    }

    const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(["customer", searchState.data], fetchData, {
        getNextPageParam: (page) => (page.current_page == page.last_page) ? undefined : page.current_page + 1
    })
    const handleLoadMore = () => hasNextPage ? fetchNextPage() : undefined


    return (
        <DetailLayout
            title='Pelanggan'
            back
            search
            action
            loading={isLoading}
            actionIcon='download-outline'
            actionOnPress={() => navigation.navigate("CustomerImport")}
        >
            <FlatList
                data={data?.pages}
                keyExtractor={(item: PaginationProps) => item.current_page.toString()}
                onEndReached={handleLoadMore}
                renderItem={({ item }) =>
                    (item.data?.length == 0 && item.current_page == 1) ?
                        <Empty
                            title='Tidak Ada data'
                            subtitle='Untuk saat ini data tidak tersedia'
                        /> :
                        <React.Fragment key={item.current_page}>
                            {item.data?.map((val: CustomerResultProps) => <Customer key={val.id} data={val} />)}
                        </React.Fragment>}
            />
        </DetailLayout>
    )
}

export default CustomerScreen