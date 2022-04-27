import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { DetailLayout } from '@components'
import { RadioGroup, Radio } from '@ui-kitten/components'
import { theme } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutStateProps } from '@types'
import { State } from 'src/redux/reducer'
import { changeLayout } from 'src/redux/actions/layoutAction'

const LayoutScreen = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const dispatch = useDispatch();
    const layoutState: LayoutStateProps = useSelector((state: State) => state.layout);

    useEffect(() => {
        dispatch(changeLayout(selectedIndex === 0 ? 'grid' : 'list'))
    }, [selectedIndex])

    useEffect(() => {
        setSelectedIndex(layoutState.data === 'grid' ? 0 : 1)
    }, [])




    return (
        <DetailLayout title='Layout' back>
            <View style={theme.content}>
                <RadioGroup
                    selectedIndex={selectedIndex}
                    onChange={index => setSelectedIndex(index)}>
                    <Radio>Grid</Radio>
                    <Radio>List</Radio>
                </RadioGroup>
            </View>
        </DetailLayout>
    )
}

export default LayoutScreen

const styles = StyleSheet.create({})