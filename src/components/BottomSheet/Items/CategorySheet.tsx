import { StyleSheet, View } from 'react-native'
import React, { Fragment, useState, useEffect } from 'react'
import { Text } from '@ui-kitten/components';
import { constant, theme } from '@utils';
import Input from 'src/components/Form/Input';
import { FlatList } from 'react-native-gesture-handler';
import TouchableRipple from 'src/components/Touchable/TouchableRipple';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'src/redux/reducer';
import { CategoryResultProps, CategoryStateProps } from '@types';
import { searchCategory, selectedCategory } from 'src/redux/actions/categoryAction';
import { SheetManager } from 'react-native-actions-sheet';


const CategorySheet = () => {
    const categoryState: CategoryStateProps = useSelector((state: State) => state.category);
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchCategory(search))
    }, [search])

    const handleSelected = (item: CategoryResultProps) => {
        dispatch(selectedCategory(item))
        SheetManager.hide("bottomSheet");
    }

    const remoeveSelected = () => {
        dispatch(selectedCategory({
            id: 0,
            nama: ''
        }))
        SheetManager.hide("bottomSheet");
    }


    return (
        <Fragment>
            <View style={styles.searchContainer}>
                <Input
                    placeholder='Apa yang ingin anda cari ?'
                    style={styles.searchbar}
                    containerStyle={[theme.flex1, theme.marginBottom0]}
                    leftIcon='magnify'
                    value={search}
                    rightIcon={search.length > 0 ? 'close-circle-outline' : undefined}
                    righIconOnPress={() => setSearch('')}
                    onChangeText={(val) => setSearch(val)}
                />
                {categoryState.selected.id > 0 &&
                    <Text status={"danger"} category="p2" style={styles.remove} onPress={remoeveSelected}>Hapus Filter</Text>}
            </View>
            <FlatList
                data={categoryState.data}
                nestedScrollEnabled
                style={styles.flatlist}
                keyExtractor={(item) => item.nama}
                renderItem={({ item }) =>
                    <TouchableRipple onPress={() => handleSelected(item)} key={item.nama}>
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
        ...theme.flexStart,
        marginBottom: 10
    },
    searchbar: {
        height: 45,
        paddingVertical: 0
    },
    flatlist: {
        maxHeight: 400
    },
    remove: {
        ...theme.fontSemiBold,
        marginLeft: 20
    }
})