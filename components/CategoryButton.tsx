import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryButtonProps {
    category: string | null;
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

export default function CategoryButton({ category, label, isSelected, onPress }: CategoryButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.button,
                isSelected ? styles.buttonSelected : styles.buttonUnselected
            ]}
        >
            <Text style={[
                styles.text,
                isSelected ? styles.textSelected : styles.textUnselected
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 9999,
        borderWidth: 1,
    },
    buttonSelected: {
        backgroundColor: '#0f172a', // slate-900
        borderColor: '#0f172a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonUnselected: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0', // slate-200
    },
    text: {
        fontWeight: '600',
        fontSize: 14,
        textTransform: 'capitalize',
    },
    textSelected: {
        color: '#ffffff',
    },
    textUnselected: {
        color: '#475569', // slate-600
    },
});
