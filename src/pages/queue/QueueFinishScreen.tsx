import { Dimensions, StyleSheet, ToastAndroid } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DetailLayout, Loading } from '@components'
import WebView from 'react-native-webview'
import { http } from '@services'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import { constant } from '@utils'
import { PageProps } from '@types'

const QueueFinishScreen: FC<PageProps<'QueueFinish'>> = ({ route }) => {
    const [html, setHtml] = useState('')
    const url = constant.mainUrl + `/transaksi/${route.params.kode}?status=print&cetak=none`
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
            actionOnPress={handleConvertPdf}
            actionPack='material-community'
            back>
            <WebView
                source={{ uri: url }}
                style={{ height: Dimensions.get("window").height }}
                startInLoadingState={true}
                renderLoading={() => <Loading />}
            />
        </DetailLayout>
    )
}

export default QueueFinishScreen

const styles = StyleSheet.create({})