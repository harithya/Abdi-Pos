import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackList from './page-types';

export type PageProps<RouteName extends keyof RootStackList = keyof RootStackList> = NativeStackScreenProps<RootStackList, RouteName>;
export type useNavigationProps = NativeStackNavigationProp<RootStackList>;

export interface ReducerProps {
    type: string,
    payload: any
}

export interface FileProps {
    id?: number,
    name: string,
    type: string,
    uri: string
}

//STATE Props
export interface LayoutStateProps {
    data: "grid" | "list"
}

export interface SearchStateProps {
    data: string
}

export interface AuthStateProps {
    id: number | null,
    name: string,
    avatar: string,
    spesialist: string,
    address?: string,
    phone?: string
}



// Htpp request response
export interface UserResultProps {
    id: number,
    alamat: string,
    avatar?: string,
    nama: string,
    spesialis: string,
    username: string,
    no_hp?: string
}