import { Dimensions, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DetailLayout, Loading } from '@components'
import WebView from 'react-native-webview'
import { http } from '@services'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import { constant, theme } from '@utils'
import { PageProps } from '@types'
import { useQuery } from 'react-query'
import { Button, Icon } from '@ui-kitten/components'
import kwitansi from 'src/services/kwitansi'

const QueueFinishScreen: FC<PageProps<'QueueFinish'>> = ({ route }) => {
    const [html, setHtml] = useState('')
    const url = constant.mainUrl + `/transaksi/${route.params.kode}?status=print&cetak=none`
    const queueData = useQuery(['queueFinish', route.params.id], async () => {
        const req = await http.get(`/antrian/${route.params.id}/transaksi`)
        return req.data.result
    })

    const transactionData = useQuery(['transactionFinish', route.params.kode], async () => {
        const req = await http.get(`/transaksi/${route.params.kode}`)
        return req.data.result
    })

    useEffect(() => {
        const getCode = async () => {
            const req = await http.get(url)
            setHtml(req.data)
        }
        getCode();
    }, [])

    const handleConvertPdf = async () => {
        const file = await RNHTMLtoPDF.convert({
            html: html,
            fileName: "Invoice",
            directory: "Documents"
        })
        try {
            const open = await FileViewer.open(file.filePath ?? '/')
        } catch (error) {
            ToastAndroid.show("Opps terjadi kesalahan", ToastAndroid.SHORT)
        }
    }

    return (
        <DetailLayout
            title='Transaksi Berhasil'
            action
            actionIcon='download'
            loading={queueData.isLoading || transactionData.isLoading}
            actionOnPress={handleConvertPdf}
            actionPack='material-community'
            back>
            <WebView
                source={{ uri: url }}
                style={styles.web}
                startInLoadingState={true}
                renderLoading={() => <Loading />}
            />
            <View style={styles.footer}>
                <Button
                    onPress={() => kwitansi.print(queueData.data, transactionData.data)}
                    accessoryLeft={() => <Icon name='printer' fill="white" style={theme.icon} />}>
                    Cetak Kwitansi
                </Button>
            </View>
        </DetailLayout>
    )
}

export default QueueFinishScreen

const styles = StyleSheet.create({
    web: {
        height: Dimensions.get("window").height
    },
    footer: {
        position: 'absolute',
        bottom: constant.container,
        right: constant.container,
        left: constant.container
    }
})