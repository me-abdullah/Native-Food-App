import React from 'react';
import { StyleSheet, Text, TextInput, StatusBar, View, ScrollView, FlatList } from 'react-native';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/FirebaseConfig';
import 'firebase/compat/firestore';
import CardSlider from '../components/CardSlider';
import { colors } from '../globals/style';

interface FoodItem {
    foodName: string;
    foodType: string;
    foodImageUrl: string;
    foodPrice: number;
    // Add other properties as needed
}
interface HomeScreenProps {
    navigation: any; // Replace 'any' with the appropriate type for the 'navigation' prop
  }
  

  const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const [foodData, setFoodData] = useState<FoodItem[]>([]);
    const [vegData, setVegData] = useState<FoodItem[]>([]);
    const [nonVegData, setNonVegData] = useState<FoodItem[]>([]);
    const [search, setSearch] = useState<String>('');
    
    const foodRef = firebase.firestore().collection('FoodData');
    useEffect(() => {
        const unsubscribe = foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data() as FoodItem));
        });

        return () => {
            // Unsubscribe from the snapshot listener when the component unmounts
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        setVegData(foodData.filter(item => item.foodType === 'veg'));
    }, [foodData]);

    useEffect(() => {
        setVegData(foodData.filter(item => item.foodType === 'veg'));
        setNonVegData(foodData.filter(item => item.foodType === 'non-veg'));
    }, [foodData]);

    console.log(foodData);

    return (
        <ScrollView style={styles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} />
            <View style={styles.searchbox}>
                <Icon name="search" size={24} style={styles.searchicon} />
                <TextInput style={styles.input} placeholder='Search'
                    onChangeText={(text) => { setSearch(text) }}
                />
            </View>
            {search != '' && <View style={styles.searchresultsouter}>
                <FlatList style={styles.searchiresultinner}
                    data={foodData}
                    renderItem={({ item }) => {
                        if (item.foodName.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return (
                                <View style={styles.searchresult}>
                                    <Icon name="restaurant" size={24} />
                                    <Text style={styles.searchresulttext}>{item.foodName}</Text>
                                </View>
                            )
                        }
                    }}
                />
            </View>}
            <Categories />
            <OfferSlider />
            <CardSlider title={"Today's Special"} data={foodData} />
            <CardSlider title={"NonVeg Love"} data={nonVegData} />
            <CardSlider title={"Veg Hunger"} data={vegData} />
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    searchicon: {
        marginLeft: 10,
        color: colors.text1,
    },
    container: {
        // marginTop:50,
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
    },
    searchbox: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: colors.col1,
        alignItems: 'center',
        borderRadius: 30,
        // padding: 10,
        margin: 20,
        elevation: 10,
    },
    input: {
        // marginLeft: 10,
        fontSize: 15,
        width: '90%',
        color: colors.text1,
    },
    searchresultouter: {
        width: '100%',
        marginHorizontal: 30,
        // height: '100%',
        backgroundColor: colors.col1,
    },
    searchresultsinner:{
        width: '100%',
    },
    searchresult:{
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    searchresulttext:{
        marginLeft:10,
        fontSize: 18,
        color: colors.text1,
    }
});
export default HomeScreen;
