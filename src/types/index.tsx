import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackList from './page-types';

export type PageProps<RouteName extends keyof RootStackList = keyof RootStackList> = NativeStackScreenProps<RootStackList, RouteName>;
export type useNavigationProps = NativeStackNavigationProp<RootStackList>;

export interface ReducerProps {
    type: string,
    payload: any
}


export interface LayoutStateProps {
    data: "grid" | "list"
}
