import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, hr80 } from '../globals/style';


interface HomeHeadNavProps {
    navigation: any; // Replace 'any' with the appropriate type for the 'navigation' prop
}

const HomeHeadNav: React.FC<HomeHeadNavProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* replace this icon with hamburger icon */}
            <Icon name="menu" size={24} style={styles.myicon} />
            <View style={styles.containerin}>
                <Text style={styles.mytext}>Foodie</Text>
                {/* replace this icon with food icon */}
                <Icon name="restaurant" size={24} style={styles.myicon} />
            </View>
            {/* replace this icon with user profile */}
            <TouchableOpacity onPress={() => navigation.navigate("Userprofile")}>
                <Icon name="person" size={24} style={styles.myicon} />
            </TouchableOpacity>
        </View>
    );
};

export default HomeHeadNav;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.col1,
        elevation: 20,
        borderBottomRightRadius: 20,
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    myicon: {
        color: colors.text1,
    },
    mytext: {
        fontSize: 20,
        color: colors.text1,
    },
});
