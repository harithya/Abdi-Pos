import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout } from '@components'
import { PageProps } from '@types'

const CustomerScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <DetailLayout
            title='Pelanggan'
            back
            search
            action
            actionIcon='download-outline'
            actionOnPress={() => navigation.navigate("CustomerImport")}
        >

        </DetailLayout>
    )
}

export default CustomerScreen