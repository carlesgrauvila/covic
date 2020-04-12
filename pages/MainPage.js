import * as React from 'react';
import { Button, ScrollView, View, Text, Image, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Animated,Linking } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { FontAwesome } from '@expo/vector-icons';
import { Center } from '@builderx/utils';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const etiqueta = [
  "petits",
  "joves",
  "adults"
];
const telefons = [
  "016",
  "016",
  "016",
];
const xat = [
  "https://chat.anar.org/",
  "https://chat.anar.org/",
  "https://espanol.thehotline.org/chat/"
];
const links = [
  "https://www.anar.org/que-te-preocupa/",
  "https://www.anar.org/que-te-preocupa/",
  "http://dones.gencat.cat/ca/inici"
];

dialCall = (phone) => {
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:'+phone;
    }
    else {
      phoneNumber = 'telprompt:'+phone;
    }
 
    Linking.openURL(phoneNumber);
};

export default class MainPage extends React.Component {
  state = {
    isReady: false,
    animation : new Animated.Value(-100),
    imageSizes: new Animated.Value(100),
    imageSizesJove: new Animated.Value(100),
    imageSizesAdult: new Animated.Value(100),
    optionsFlex: new Animated.Value(0),
    clicked: false,
    opacityMain:new Animated.Value(0),
    petit:require('../assets/petit.png'),
    jove:require('../assets/jove.png'),
    adult:require('../assets/adult.png'),
    currentOpened:0
  };

  constructor() {
    super()
     if (Text.defaultProps == null) {
            Text.defaultProps = {};
            Text.defaultProps.allowFontScaling = false;
        }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../assets/adult.png'),
      require('../assets/jove.png'),
      require('../assets/petit.png'),
      require('../assets/backgroundButton.png'),
      require('../assets/petit-click.png'),
      require('../assets/jove-click.png'),
      require('../assets/adult-click.png'),
      require('../assets/phone.png'),
      require('../assets/chat.png'),
      require('../assets/links.png'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    const anotherFont = Font.loadAsync({'franklin':require('../assets/franklin-gothic-heavy.ttf')})

    await Promise.all([...imageAssets, ...fontAssets, anotherFont]);
  }


  startAnimation=()=>{
      Animated.timing(this.state.animation,{
        toValue : 0,
        duration : 700
      }).start(()=>{
        //this.state.animation.setValue(0);
      });
  }

  switchInfoPetit = () => {
    this.setState({
      petit:require('../assets/petit-click.png'),
      jove:require('../assets/jove.png'),
      adult:require('../assets/adult.png'),
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.imageSizes,{
              toValue : 90,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesJove,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesAdult,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.opacityMain,{
              toValue : 0,
              duration : 300
          })
        ]).start(() => {
            this.setState({
              clicked:true,
              currentOpened:0
            }, () =>{
              Animated.timing(this.state.opacityMain,{
                  toValue : 1,
                  duration : 500
              }).start()
            })
        });
    })
  }

  switchInfoJove = () => {
    this.setState({
      petit:require('../assets/petit.png'),
      jove:require('../assets/jove-click.png'),
      adult:require('../assets/adult.png'),
      
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.imageSizes,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesJove,{
              toValue : 90,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesAdult,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.opacityMain,{
              toValue : 0,
              duration : 300
          })
        ]).start(() => {
            this.setState({
              clicked:true,
              currentOpened:1
            }, () =>{
              Animated.timing(this.state.opacityMain,{
                  toValue : 1,
                  duration : 500
              }).start()
            })
        });
    })
  }

  switchInfoAdult = () => {
    this.setState({
      petit:require('../assets/petit.png'),
      jove:require('../assets/jove.png'),
      adult:require('../assets/adult-click.png'),
      
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.imageSizes,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesJove,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesAdult,{
              toValue : 90,
              duration : 500
          }),
          Animated.timing(this.state.opacityMain,{
              toValue : 0,
              duration : 300
          })
        ]).start(() => {
            this.setState({
              clicked:true,
              currentOpened:2
            }, () =>{
              Animated.timing(this.state.opacityMain,{
                  toValue : 1,
                  duration : 500
              }).start()
            })
        });
    })
  }


  showInfoPetit = () => {
    this.setState({
      petit:require('../assets/petit-click.png'),
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.optionsFlex,{
              toValue : 1000,
              duration : 1000
          }),
          Animated.timing(this.state.imageSizes,{
              toValue : 80,
              duration : 500
          })
        ]).start(() => {
            this.setState({
              clicked:true,
              currentOpened:0
            }, () =>{
              Animated.timing(this.state.opacityMain,{
                  toValue : 1,
                  duration : 500
              }).start()
            })
        });
    })
  }

  showInfoJove = () => {
    this.setState({
      jove:require('../assets/jove-click.png'),
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.optionsFlex,{
              toValue : 1000,
              duration : 1000
          }),
          Animated.timing(this.state.imageSizesJove,{
              toValue : 80,
              duration : 500
          })
        ]).start(() => {
            this.setState({
              clicked:true,
              currentOpened:1
            }, () =>{
              Animated.timing(this.state.opacityMain,{
                  toValue : 1,
                  duration : 500
              }).start()
            })
        });
    })
  }

  showInfoAdult = () => {
    this.setState({
      adult:require('../assets/adult-click.png'),
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.optionsFlex,{
              toValue : 1000,
              duration : 1000
          }),
          Animated.timing(this.state.imageSizesAdult,{
              toValue : 80,
              duration : 500
          })
        ]).start(() => {
            this.setState({
              clicked:true,
              currentOpened:2
            }, () =>{
              Animated.timing(this.state.opacityMain,{
                  toValue : 1,
                  duration : 500
              }).start()
            })
        });
    })
  }

  goToTest = () => {
    this.props.navigation.navigate('Test')
  }

  closeLinks = () => {
    this.setState({
      jove:require('../assets/jove.png'),
      adult:require('../assets/adult.png'),
      petit:require('../assets/petit.png'),
    }, () => {
        Animated.parallel([
          Animated.timing(this.state.imageSizes,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesJove,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.imageSizesAdult,{
              toValue : 100,
              duration : 500
          }),
          Animated.timing(this.state.opacityMain,{
              toValue : 0,
              duration : 300
          })
        ]).start(() => {
            this.setState({
              clicked:false
            }, () =>{
              Animated.timing(this.state.optionsFlex,{
                toValue : 0,
                duration : 1000
              }).start()
            })
        });
    })
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true }, () => this.startAnimation())}
          onError={console.warn}
        />
      );
    }


    const transformStyle ={
      transform : [{ 
        translateY : this.state.animation,
      }],
      flexGrow:1,
      flexDirection: 'row',
      justifyContent:"center",
      alignItems:"center"
    }

    const opacity = {
      opacity:this.state.sizeButton
    }


    const transformStyleUpandDown ={
      transform : [{ 
        translateY : this.state.optionsFlex,
      }],
      flexGrow:1, 
      backgroundColor:"#E6C1BA", 
      borderTopLeftRadius:40, 
      borderTopRightRadius:40, 
      flexDirection:'column',
      shadowOffset: {width: 0, height: 0},
      shadowRadius:5,
      shadowColor:"#d79689",
      shadowOpacity:0.6,
      elevation:15
    }

    const transformStyleOpacity ={
      opacity:this.state.opacityMain,
      flexGrow:4, 
      backgroundColor:"#E6C1BA", 
      borderTopLeftRadius:40, 
      borderTopRightRadius:40, 
      flexDirection:'column',
    }

    return (
        <View style={styles.container}>
          <Animated.View style={styles.icons, transformStyle}>
            <View style={styles.eachOption}>
              <TouchableOpacity activeOpacity={0.7} style={styles.imageShadow} onPress={ (!this.state.clicked) ? this.showInfoPetit : this.switchInfoPetit}>
                <Animated.Image
                  source={this.state.petit}
                  resizeMode='contain'
                  style={styles.imageSize, {height:this.state.imageSizes, width:100}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.eachOption}>
              <TouchableOpacity activeOpacity={0.7} style={styles.imageShadow} onPress={ (!this.state.clicked) ? this.showInfoJove : this.switchInfoJove}>
                <Animated.Image
                  source={this.state.jove}
                  resizeMode='contain'
                  style={styles.imageSize, {height:this.state.imageSizesJove, width:100}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.eachOption}>
              <TouchableOpacity activeOpacity={0.7} style={styles.imageShadow} onPress={ (!this.state.clicked) ? this.showInfoAdult : this.switchInfoAdult}>
                <Animated.Image
                  source={this.state.adult}
                  resizeMode='contain'
                  style={styles.imageSize, {height:this.state.imageSizesAdult, width:100}}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
          { !this.state.clicked && (
            <Animated.View style={styles.mainCard, transformStyleUpandDown}>
              <Text adjustsFontSizeToFit style={styles.titleCard}>Actua JA!</Text>
              <Text adjustsFontSizeToFit style={styles.mainText}>A vegades et preguntes si t'estàs imaginant el maltractament o si el dolor físic i emocional que sents és real. Si això et sona familiar, pots estar patint violència domèstica. Realitza el test anónim i confirma els teus dubtes.</Text>
              <Animated.View style={opacity}>
              <TouchableOpacity activeOpacity={0.7} style={styles.callButton} onPress={this.goToTest}>
                <View style={styles.absoluteView}><Text style={styles.callButtonText}>SÓC VÍCTIMA?</Text></View>
                <Image source={require('../assets/backgroundButton.png')} />
              </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          )}

          { this.state.clicked && (
            <Animated.View style={styles.mainCard, transformStyleOpacity}>
              <Text adjustsFontSizeToFit style={styles.mainText}>Informació rellevant per gestionar la violència domèstica pels {etiqueta[this.state.currentOpened]}</Text>
              <View style={{flexDirection:"row", marginLeft:20,marginRight:20,alignItems:"center", justifyContent:"center"}}>
                <Image resizeMode="contain" source={require('../assets/phone.png')} style={{width:50, height:50}} />
                <Text onPress={()=> dialCall(telefons[this.state.currentOpened])} style={{alignItems:"center", justifyContent:"center", flex:1, fontSize:21, color:"#CC5851", marginLeft:15}}>
                  {telefons[this.state.currentOpened]}
                </Text>
              </View>
              <View style={{flexDirection:"row",marginRight:20, marginLeft:20,alignItems:"center", justifyContent:"center", marginTop:15}}>
                <Image source={require('../assets/chat.png')} style={{width:50, height:50}} resizeMode="contain" />
                <Text onPress={()=> Linking.openURL(xat[this.state.currentOpened])} style={{alignItems:"center", justifyContent:"center", flex:1, fontSize:21, color:"#CC5851", marginLeft:15}}>
                  {xat[this.state.currentOpened]}
                </Text>
              </View>
              <View style={{flexDirection:"row",marginRight:20, marginLeft:20,alignItems:"center", justifyContent:"center", marginTop:15}}>
                <Image source={require('../assets/links.png')} style={{width:50, height:50}} resizeMode="contain" />
                <Text onPress={()=> Linking.openURL(links[this.state.currentOpened])} style={{alignItems:"center", justifyContent:"center", flex:1, fontSize:21, color:"#CC5851", marginLeft:15}}>
                  {links[this.state.currentOpened]}
                </Text>
              </View>
              <Text style={{textAlign:"center", color:"#CC5851", marginTop:20, marginBottom:20}}>Pròximament més enllaços d'interés</Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.callButton} onPress={this.closeLinks}>
                <View style={styles.absoluteView}><Text style={styles.callButtonText}>ANAR AL TEST</Text></View>
                <Image source={require('../assets/backgroundButton.png')} />
              </TouchableOpacity>


            </Animated.View>
          )}
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  absoluteView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex:1
  },
  container: {
    flex:1,
    backgroundColor: '#E6C1BA',
    flexDirection: 'column',
  },
  mainCard: {
    flexGrow:1, 
    backgroundColor:"#E6C1BA", 
    borderTopLeftRadius:40, 
    borderTopRightRadius:40, 
    flexDirection:'column',
    shadowOffset: {width: 0, height: 0},
    shadowRadius:5,
    shadowColor:"#d79689",
    shadowOpacity:0.6,
    elevation:5,
  },
  titleCard:{
    fontFamily: 'franklin', 
    textAlign:"center", 
    fontSize:40, 
    marginTop:20, 
    color:"#CC5851"
  },
  icons:{
    flexGrow: 1,
    flexDirection: 'row',
  },
  eachOption: {
    alignItems:"center",
    flex:1,
  },
  imageShadow:{
    shadowOffset: {width: 0, height: 0},
    shadowRadius:5,
    shadowColor:"black",
    shadowOpacity:0.1,
  },
  imageSize:{
    width: 100,
    height: 100,
  },
  mainText:{
    textAlign:"center",
    //fontFamily: "sans-serif",
    fontSize:21,
    color:"#CC5851",
    margin:20
  },
  callButton: {
    alignItems:"center",
    justifyContent: 'center',
    marginLeft:10,
    marginRight:10,
  },
  callButtonText:{
    fontFamily: 'franklin',
    textAlign:"center",
    color:"#CC5851",
    fontSize:25,

  }
});