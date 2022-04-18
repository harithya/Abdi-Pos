import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout, Fab } from '@components'
import { PageProps } from '@types'

const ReturnScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <DetailLayout title='Pengembalian' back search>

            <Fab onPress={() => navigation.navigate("ReturnCreate")} />
        </DetailLayout>
    )
}

export default ReturnScreen