import { View, Text, FlatList } from 'react-native'
import React, { FC } from 'react'
import { PriceProductResultProps } from '@types'
import TouchanbleRipple from '../../Touchable/TouchableRipple'
import List from 'src/components/items/List'
import { helper } from '@utils'

interface Props {
    data: PriceProductResultProps[],
    onPress: (params: PriceProductResultProps) => void
}
const UnitSheet: FC<Props> = ({ data, onPress }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.satuan_id.toString()}
            renderItem={({ item }) =>
                <List
                    title={item.satuan}
                    onPress={() => onPress(item)}
                    rightValue={helper.formatNumber(item.harga_jual)}
                />}
        />
    )
}

export default UnitSheet