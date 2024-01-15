import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png';
import { colors, hr80 } from '../globals/style';
import { firebase } from '../../Firebase/FirebaseConfig';
import Toast from 'react-native-toast-message';
interface WelcomeScreenProps {
  navigation: any; // You should replace 'any' with the correct navigation prop type
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {

  const [userlogged, setUserlogged] = useState<null | any>(null);


  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user)
          setUserlogged(user)
        } else {
          setUserlogged(null);
          console.log("no user logged in");
        }
      })
    }
    checkLogin();
  }, []);
  // console.log(userlogged);
  const handlelogout = () => {
    firebase.auth().signOut()
      .then(() => {
        setUserlogged(null);
        console.log("user logged out");
        Toast.show({
          type: 'success',
          text1: 'User Logged Out Successfully',
      });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Foodie</Text>
      <View style={styles.logoout}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>
        Find the best food around you at the lowest price.
      </Text>
      <View style={hr80} />
      {userlogged == null ? <View style={styles.btnout}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn}>Log In</Text>
        </TouchableOpacity>
      </View>
        :
        <View style={styles.logged}>
          <Text style={styles.txtlog}>Signed in as &nbsp;<Text style={styles.txtlogin}>{userlogged.email}</Text></Text>
          <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.btn}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlelogout()}>
              <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <Toast />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4242',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    color: colors.col1,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '200',
  },
  logoout: {
    width: '60%',
    height: '30%',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: colors.col1,
    textAlign: 'center',
    width: '80%',
  },
  btnout: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  logged: {
    alignItems: 'center',
  },
  txtlog: {
    fontSize: 16,
    color: colors.col1,
  },
  txtlogin: {
    fontSize: 16,
    color: colors.col1,
    fontWeight: '600',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});


