import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, titles, btn1, hr80 } from '../globals/style';


const Categories: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                    {/* replace this icon with Starters icon */}
                    <Icon name="local-cafe" size={24} style={styles.myicon} />
                    <Text style={styles.text}>Starters</Text>
                </View>
                <View style={styles.box}>
                    {/* replace this icon with BreakFast icon */}
                    <Icon name="local-dining" size={24} style={styles.myicon} />
                    <Text style={styles.text}>BreakFast</Text>
                </View>
                <View style={styles.box}>
                    {/* replace this icon with Lunch icon */}
                    <Icon name="local-dining" size={24} style={styles.myicon} />
                    <Text style={styles.text}>Lunch</Text>
                </View>
                <View style={styles.box}>
                    {/* replace this icon with Dinner icon */}
                    <Icon name="local-dining" size={24} style={styles.myicon} />
                    <Text style={styles.text}>Dinner</Text>
                </View>
                <View style={styles.box}>
                    {/* replace this icon with Drinks icon */}
                    <Icon name="local-bar" size={24} style={styles.myicon} />
                    <Text style={styles.text}>Drinks</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.col1,
        width: '100%',
        elevation: 10,
        borderRadius: 10,
    },
    head: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: "300",
        margin: 10,
        alignSelf: 'center',
        paddingBottom: 5,
        borderBottomColor: colors.text1,
        borderBottomWidth: 1,
    },
    box: {
        backgroundColor: colors.col1,
        elevation: 10,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    myicon: {
        marginRight: 10,
        color: colors.text1,
    },
    text: {
        // color: colors.text3
    }
});
