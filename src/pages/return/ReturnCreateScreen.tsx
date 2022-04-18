import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout, SelectPeople } from '@components'
import { Button } from '@ui-kitten/components'
import { theme } from '@utils'
import { PageProps } from '@types'

const ReturnCreateScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <DetailLayout title='Tambah' back>
            <SelectPeople />
            <ScrollView>
                <View style={theme.content}>
                    <Button
                        appearance={"ghost"}
                        onPress={() => navigation.navigate("Product")}
                        style={theme.marginTop10}>
                        Tambah Barang
                    </Button>
                </View>
            </ScrollView>
        </DetailLayout>
    )
}

export default ReturnCreateScreen

const styles = StyleSheet.create({})