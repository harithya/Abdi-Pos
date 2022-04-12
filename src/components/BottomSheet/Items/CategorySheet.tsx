import { ScrollView, StyleSheet, View } from 'react-native'
import React, { Fragment } from 'react'
import { Text } from '@ui-kitten/components';
import { constant, theme } from '@utils';
import Input from 'src/components/Form/Input';
import { FlatList } from 'react-native-gesture-handler';
import TouchableRipple from 'src/components/Touchable/TouchableRipple';

const data = [
    {
        "nama": "Perlengkapan New Normal"
    },
    {
        "nama": "Alat Kesehatan"
    },
    {
        "nama": "Obat Lambung & Saluran Pencernaan"
    },
    {
        "nama": "Perlengkapan P3K"
    },
    {
        "nama": "Obat Saraf & Otak"
    },
    {
        "nama": "Obat Kulit"
    },
    {
        "nama": "Alat Kontrasepsi & Hormon"
    },
    {
        "nama": "Asupan Gizi & Nutrisi"
    },
    {
        "nama": "Obat Batuk dan Flu"
    },
    {
        "nama": "Obat Jantung"
    },
    {
        "nama": "Obat Alergi"
    },
    {
        "nama": "Obat Mata"
    },
    {
        "nama": "Asupan Vitamin & Suplemen"
    },
    {
        "nama": "Obat Otot, Tulang dan Sendi"
    },
    {
        "nama": "Obat Mulut & Tenggorokan"
    },
    {
        "nama": "Produk Perawatan Kecantikan"
    },
    {
        "nama": "Obat Antidot"
    },
    {
        "nama": "Asupan Makanan & Minuman Sehat"
    },
    {
        "nama": "Obat Jenis Onkologi"
    },
    {
        "nama": "Larutan Steril"
    },
    {
        "nama": "Obat Saluran Kemih & Prostat"
    },
    {
        "nama": "Obat Anestesi"
    },
    {
        "nama": "Obat Anti Virus"
    },
    {
        "nama": "Obat Antibiotik"
    },
    {
        "nama": "Suplemen Fitness"
    },
    {
        "nama": "Obat Demam"
    },
    {
        "nama": "Obat Ambeien (Wasir)"
    },
    {
        "nama": "Produk Konsumen"
    },
    {
        "nama": "Obat Kolesterol"
    },
    {
        "nama": "Produk Ibu Hamil dan Menyusui"
    },
    {
        "nama": "Obat Antiseptik"
    },
    {
        "nama": "Obat Anti Jamur"
    },
    {
        "nama": "Obat Topikal"
    },
    {
        "nama": "Obat Hipertensi"
    },
    {
        "nama": "Obat Asma"
    },
    {
        "nama": "Obat Diabetes"
    },
    {
        "nama": "Obat Herbal"
    },
    {
        "nama": "Obat Diet"
    },
    {
        "nama": "Obat Anti Nyeri"
    },
    {
        "nama": "Obat Telinga"
    },
    {
        "nama": "Obat Elektrolit"
    },
    {
        "nama": "Obat Anti Inflamasi"
    },
    {
        "nama": "Obat Asam Urat"
    },
    {
        "nama": "Produk Kesehatan Darah"
    },
    {
        "nama": "Gangguan Tidur"
    },
    {
        "nama": "Produk Bayi dan Anak"
    }
];
const CategorySheet = () => {
    return (
        <Fragment>
            <View style={styles.searchContainer}>
                <Input placeholder='Apa yang ingin anda cari ?' style={styles.searchbar} leftIcon='magnify' />
            </View>
            <FlatList
                data={data}
                nestedScrollEnabled
                style={styles.flatlist}
                keyExtractor={(item) => item.nama}
                renderItem={({ item }) =>
                    <TouchableRipple key={item.nama}>
                        <View style={styles.list}>
                            <Text>{item.nama}</Text>
                        </View>
                    </TouchableRipple>
                }
            />
        </Fragment>

    )
}

export default CategorySheet

const styles = StyleSheet.create({
    list: {
        paddingVertical: 12,
        paddingHorizontal: constant.container,
    },
    searchContainer: {
        paddingHorizontal: constant.container,
    },
    searchbar: {
        height: 45,
        paddingVertical: 0
    },
    flatlist: {
        maxHeight: 400
    }
})