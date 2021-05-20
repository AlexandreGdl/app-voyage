import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Animated, ImageBackground, Text, View, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, PanResponder, PanResponderGestureState } from 'react-native';
import { styles } from './src/style/places.style';

interface Activiti {
  title: string;
  icon: any;
  iconColor: string;
  backgroundColor: string;
}


const translateY = new Animated.Value(400);
const maxY = 40;
const minY = -190;

export default function App() {

  const [liked, setLiked] = useState<boolean>(false);
  const scale = new Animated.Value(1);

  const activities: Activiti[] = [
    { title: 'Attraction', icon: "eye", backgroundColor: 'rgba(199, 0, 57, 0.5)', iconColor: 'red' },
    { title: 'ToDo', icon: "checkbox", backgroundColor: 'rgba(40, 56, 186, 0.5)', iconColor: '#2D43FF'  },
    { title: 'Experiences', icon: "flame", backgroundColor: 'rgba(253, 235, 48, 0.5)', iconColor: '#FBE612'  },
    { title: 'Places', icon: "bookmark", backgroundColor: 'rgba(250, 203, 44, 0.5)', iconColor: '#D8AD1C'  },
    { title: 'Hotels', icon: "bed", backgroundColor: 'rgba(82, 170, 254, 0.5)', iconColor: '#0F71CC'  },
    { title: 'Restaurants', icon: "restaurant", backgroundColor: 'rgba(255, 107, 205, 0.5)', iconColor: '#F610A9'  },
    { title: 'Bars', icon: "water", backgroundColor: 'rgba(93, 224, 86, 0.5)', iconColor: '#44A93F'  },
  ];

  const pressIn = () => {
    Animated.spring(
      scale,
      {
        toValue: .8,
        useNativeDriver: true,
      }).start();
      console.log(scale);
  }

  const pressOut = () => {
    Animated.spring(
      scale,
      {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      console.log(scale);
  }

  const handleLike = () => {
    setLiked(!liked);
  }

  const translateY = new Animated.Value(1000);

  /**
   * Get gesture mouvement of the finger
   * @param gesture 
   */
  function _animateMovement(gesture: PanResponderGestureState): void {
    
    const { dy } = gesture;

    translateY.setValue(dy);
  }

  /**
   * Handle when the user stop dragging the view
   * @param gesture 
   */
  function _animateRelease(gesture: PanResponderGestureState): void {
    //
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      _animateMovement(gesture);
    },
    onPanResponderRelease: (event, gesture) => {
      _animateRelease(gesture);
    }
  });


  useEffect(() => {
    Animated.timing(
      translateY,
      { 
        toValue: -20, 
        useNativeDriver: true ,
      } 
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.backgroundImg}
        source={{ uri: 'https://images.pexels.com/photos/1929178/pexels-photo-1929178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
      >
        <View style={styles.header}>
          <View style={styles.headerIcons} >
            <Ionicons size={25} color="white" name="arrow-back" />
          </View>
          <View style={styles.headerIcons} >
            <Ionicons size={25} color="white" name="search" />
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.place}>Phuket</Text>
          <Text style={styles.country}>Thailand</Text>
        </View>
        <Animated.View style={{ ...styles.bottomContent, transform: [
          {
            translateY
          }
        ] }}
        {...panResponder.panHandlers}
        >
          <TouchableOpacity activeOpacity={1} onPressOut={pressOut} onPressIn={pressIn} onPress={handleLike}>
            <Animated.View style={{ ...styles.heartContainer, transform: [
              {
                scale
              }
            ]}}>
              <Ionicons size={25} color={liked ? "red" : "grey"} name="heart" />
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Welcome to Phuket</Text>
            <Text style={styles.text}>Phuket is an island off the south-eastern coast, which is regarded as one of Thailand's prime tourism destination</Text>
            <TouchableOpacity style={{ marginTop: 15 }}>
              <Text>Read More</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
              <Text style={{ fontSize: 20, marginRight: 10 }}>Entertainment</Text>
              <Ionicons size={15} color="black" name="arrow-forward" />
            </View>
            <View style={styles.activitiesWrapper}>
              {activities.map((activitie: Activiti) => (
                <View style={styles.activitieItem} key={activitie.title}>
                  <View style={{ ...styles.iconContainer, backgroundColor: activitie.backgroundColor }}>
                    <Ionicons name={activitie.icon} color={activitie.iconColor} />
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 7 }}>{activitie.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
