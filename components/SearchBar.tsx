import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
    return (
        <View className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-2 mb-4 mx-2 shadow-sm">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
                className="flex-1 ml-2 text-base text-gray-800"
                placeholder="Buscar productos..."
                placeholderTextColor="#9ca3af"
                value={value}
                onChangeText={onChangeText}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <Ionicons name="close-circle" size={20} color="#9ca3af" />
                </TouchableOpacity>
            )}
        </View>
    );
}
