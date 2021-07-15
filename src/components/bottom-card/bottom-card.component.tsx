// React
import React, { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
// Tools
import { Dimensions, StyleSheet, Animated, LayoutChangeEvent, View, GestureResponderEvent, PanResponderGestureState, PanResponder } from 'react-native'

type Props = {
  children?: ReactNode;
  open?: boolean;
  bouncing? : boolean;
  isHomePage?: boolean;
  withShadow?: boolean;
  closeCard?(): void;
}

const BottomCardComponent: FunctionComponent<Props> = (props: Props) => {

  // default value
  const [cardHeight, setCardHeight] = useState<number>(300);
  const translateY = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: -cardHeight,
      left: 0,
      paddingBottom: 20,
      backgroundColor: 'white',
      width: Dimensions.get('screen').width,
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,

      elevation: 15,
    },
    wrapper: {
      width: '100%',
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    draggable: { 
      marginVertical: 10, 
      width: '35%', 
      height: 4, 
      borderRadius: 20, 
      backgroundColor: 'grey' 
    }
  });

  function openBottomCard(): void {
    Animated.spring(
      translateY,
      {
        useNativeDriver: true,
        toValue: -cardHeight + ( props.isHomePage ? 50 : 0),
        bounciness: props.bouncing ? 1 : 0
      }
    ).start();
  }

  function closeBottomCard(): void {
    Animated.spring(
      translateY,
      {
        useNativeDriver: true,
        toValue: cardHeight,
      }
    ).start();
  }

  function onLayout(event: LayoutChangeEvent): void {
    const { layout } = event.nativeEvent;
    setCardHeight(layout.height);
  }

  function handleRelease (evt: GestureResponderEvent, gestureState: PanResponderGestureState) {
    if (props.closeCard) {
      if(gestureState.dy > 30) props.closeCard();
    }
  } 

  const panResponsder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => handleRelease(evt, gestureState)
    })
  )

  useEffect(() => {
    if (props.open) {
      openBottomCard();
    } else {
      closeBottomCard();
    }
  }, [props.open]);

  return (
    <Animated.View onLayout={onLayout} style={[styles.container, props.withShadow && styles.shadow, { transform: [{ translateY }]}]}>
      <Animated.View {...panResponsder.current.panHandlers} style={styles.wrapper}>
        <View style={styles.draggable} />
      </Animated.View>
      {props.children}
    </Animated.View>
  );
}

export default BottomCardComponent;