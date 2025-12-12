import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
    return (
        <View className="flex-row items-center bg-white rounded-full border border-slate-200 px-5 py-3 mb-4 mx-4 shadow-sm">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
                className="flex-1 ml-3 text-base text-slate-700 font-medium"
                placeholder="Buscar productos..."
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onChangeText}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <Ionicons name="close-circle" size={20} color="#94a3b8" />
                </TouchableOpacity>
            )}
        </View>
    );
}
