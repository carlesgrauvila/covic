import * as React from 'react';
import { Button, View, Text, Image, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
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

const preguntes = [
  "Critica la teva forma de vestir, d'arreglar-te perquè canvies el teu aspecte?",
  "T'impedeix anar amb els amics quan vols o amb qui vols?",
  "Intenta que t'allunyis de la família o de les teves amistats?",
  "Et fa sentir inferior i es burla constantment de les teves creències?",
  "T'ignora, mostra indiferència i et castiga amb el silenci?",
  "Es posa gelós i t'acusa de mantindre relacions amb altres persones?",
  "Es mostra molt sobreprotector amb tu?",
  "Et telefona o t'envia missatges constantment per saber que fas, amb qui estàs i a on?",
  "T'obliga a mantindre relacions sexuals o mostra insistència?",
] 

const preguntesJove = [
  "Quan et portes malament, et castiguen de forma violenta?",
  "Et solen insultar i deixar-te en ridicul?",
  "Alguna vegada has vist violència entre els teus pares?",
  "Pendent de rebre les preguntes...",
] 

export default class Test extends React.Component {
  state = {
    isReady: false,
    animation : new Animated.Value(-100),
    sizeButton: new Animated.Value(1),
    opacity: new Animated.Value(1),
    animationX: new Animated.Value(0),
    preguntes: false,
    current:0,
    disabled:false,
    finished:false,
    sos:false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../assets/adult.png'),
      require('../assets/jove.png'),
      require('../assets/petit.png'),
      require('../assets/maybe.png'),
      require('../assets/yes.png'),
      require('../assets/no.png'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    const anotherFont = Font.loadAsync({'franklin':require('../assets/franklin-gothic-heavy.ttf')})

    await Promise.all([...imageAssets, ...fontAssets, anotherFont]);
  }


  startAnimation=()=>{
      Animated.timing(this.state.animation,{
        toValue : 20,
        duration : 700
      }).start(()=>{
        //this.state.animation.setValue(0);
      });
  }

  saveCuestion = (options) => {
    this.setState({
      disabled:true
    }, () => {
      Animated.timing(this.state.opacity,{
        toValue : 0,
          duration : 300
      }).start( ()=>{
          if(this.state.selected === 1 && this.state.current === preguntesJove.length-1){
            this.setState({
              finished:true
            })
          }
          else if(this.state.selected === 2 && this.state.current === preguntes.length-1){
            this.setState({
              finished:true
            })
          }
          else{
            let object = {}
            if(options === 1){
               object = {
                sos:true
              }
            }
            this.setState({
              current:this.state.current+1,
              ...object
            }, () => {
              Animated.timing(this.state.opacity,{
                toValue : 1,
                duration : 300
              }).start( () => {
                this.setState({
                  disabled:false,
                })
              })
            })
          }
      });
    })
  }

  showThem = () => {
    Animated.timing(this.state.animationX,{
        toValue : 0,
        duration : 300
      }).start(()=>{
        //this.state.animation.setValue(0);
      });
  }

  goToCuestions = (selected) => {
    this.setState({
      preguntes:true,
      selected:selected
    }, () => {
      this.showThem()
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
      flex:1,
      flexDirection: 'column',
      justifyContent:"center",
    }

    const transformStyleTwo ={
      transform : [{ 
        translateX : this.state.animationX,
      }],
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#E6C1BA',
    }

    if(!this.state.preguntes) {
      return (
          <SafeAreaView style={styles.container}>
            <Text adjustsFontSizeToFit style={{  textAlign:"center", fontSize:25, fontFamily:'franklin', marginTop:20, color:"#CC5851"}}>SELECCIONA LA TEVA EDAT</Text>
            <Animated.View style={styles.icons, transformStyle}>
              <View style={styles.eachOption}>
                <TouchableOpacity style={styles.imageShadow} onPress={()=>this.goToCuestions(1)}>
                  <Image
                    source={require('../assets/petit.png')}
                    resizeMode='contain'
                    style={styles.imageSize}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.eachOption}>
                <TouchableOpacity style={styles.imageShadow} onPress={()=>this.goToCuestions(1)}>
                  <Image
                    source={require('../assets/jove.png')}
                    resizeMode='contain'
                    style={styles.imageSize}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.eachOption}>
                <TouchableOpacity style={styles.imageShadow} onPress={()=>this.goToCuestions(2)}>
                  <Image
                    source={require('../assets/adult.png')}
                    resizeMode='contain'
                    style={styles.imageSize}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </SafeAreaView>
      );
    }
    else if(!this.state.finished) {
      return(
        <Animated.View style={styles.container, transformStyleTwo}>
            <Animated.View style={{flex:1, justifyContent:"center", opacity:this.state.opacity}}>
              {this.state.selected === 1 && <Text style={{textAlign:"center", fontSize:25, fontFamily:'franklin', margin:20, color:"#CC5851"}}>{preguntesJove[this.state.current]}</Text> }
              {this.state.selected === 2 && <Text style={{textAlign:"center", fontSize:25, fontFamily:'franklin', margin:20, color:"#CC5851"}}>{preguntes[this.state.current]}</Text> }
            </Animated.View>
            <Animated.View style={{flex:1, flexDirection:"row"}}>
              <View style={styles.testButtons}>
                <TouchableOpacity onPress={() => this.saveCuestion(1)} disabled={this.state.disabled}>
                  <Image source={require('../assets/yes.png')} resizeMode="contain" style={{width:130, height:110}} />
                </TouchableOpacity>
              </View>
              <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity onPress={() => this.saveCuestion(0)} disabled={this.state.disabled}>
                  <Image source={require('../assets/maybe.png')} resizeMode="contain" style={{width:160, height:130}} />
                </TouchableOpacity>
              </View>
              <View style={styles.testButtons}>
                <TouchableOpacity onPress={() => this.saveCuestion(0)} disabled={this.state.disabled}>
                  <Image source={require('../assets/no.png')} resizeMode="contain" style={{width:130, height:110}} />
                </TouchableOpacity>
              </View>
            </Animated.View>
            <View style={styles.mainCard}>
              <Text style={styles.mainText}>No tinguis vergonya, aquest test és completament anònim.</Text>
              <Text style={styles.mainText}>L'objectiu és ajudar-te.</Text>
            </View>
        </Animated.View>
      );
    }
    else {
      return(
        <View style={styles.container}>
          <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            {this.state.sos && <Image source={require('../assets/yes.png')} resizeMode="contain" style={{width:200, height:200}} /> }
            {!this.state.sos && <Image source={require('../assets/no.png')} resizeMode="contain" style={{width:200, height:200}} /> }
            {this.state.sos && <Text style={{textAlign:"center", fontSize:30, fontFamily:'franklin', margin:20, color:"#CC5851"}}>Ets víctima</Text> }
            {!this.state.sos && <Text style={{textAlign:"center", fontSize:30, fontFamily:'franklin', margin:20, color:"#CC5851"}}>No ets víctima</Text> }
          </View>
          {this.state.sos && (
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
              <TouchableOpacity style={{backgroundColor:"#CC5851", height: 200, width: 200, paddingTop:65, borderRadius:400}} onPress={() => sosCall()}>
                <Text style={{fontSize:50, color:"#E6C1BA", textAlign:"center",  alignItems:"center", justifyContent:"center"}}>SOS</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#E6C1BA',
    flexDirection: 'column',
  },
  icons:{
    flex: 1,
    flexDirection: 'row',
  },
  testButtons:{
    flex:1, justifyContent:"flex-start", alignItems:"center"
  },
  eachOption: {
    alignItems:"center",
    flex:1,
  },
  imageShadow:{
    shadowOffset: {width: 5, height: 5},
    shadowRadius:5,
    shadowColor:"black",
    shadowOpacity:0.1,
  },
  imageSize:{
    width: 150,
    height: 150,
  },
  mainText:{
    textAlign:"center",
    //fontFamily: "Helvetica",
    fontSize:21,
    color:"#CC5851",
    margin:20
  },
  callButton: {
    alignItems:"center",
    backgroundColor:"#DEE3F8",
    padding:15,
    borderRadius:100,
    marginLeft:10,
    marginRight:10
  },
  callButtonText:{
    fontFamily: 'franklin',
    textAlign:"center",
    color:"#415b52",
    fontSize:25,
  },
  mainCard: {
    flex:1, 
    backgroundColor:"#E6C1BA", 
    borderTopLeftRadius:40, 
    borderTopRightRadius:40, 
    flexDirection:'column',
    shadowOffset: {width: 0, height: 0},
    shadowRadius:5,
    shadowColor:"#d79689",
    shadowOpacity:0.6,
    elevation:20,
  },
});