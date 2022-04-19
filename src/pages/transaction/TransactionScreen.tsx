import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomSheet, DetailLayout, Invoice, List } from '@components'
import { SheetManager } from 'react-native-actions-sheet'

const TransactionScreen = () => {

    return (
        <DetailLayout
            title='Transaksi'
            back
            action
            actionIcon='tune-variant'
            actionPack='material-community'
            actionOnPress={() => SheetManager.show("filterSheet")}
            search >
            <Invoice status='success' />
            <Invoice status='success' />
            <Invoice status='success' />
            <Invoice status='return' />
            <Invoice status='cancel' />
            <BottomSheet id='filterSheet' title='Filter Status' icon='tune-variant'>
                <List title='Selesai' />
                <List title='Dibatalkan' />
                <List title='Pengembalian' />
            </BottomSheet>
        </DetailLayout>
    )
}

export default TransactionScreen

const styles = StyleSheet.create({})