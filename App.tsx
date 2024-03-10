import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Main from './src/Main';
import { extend } from '@react-three/fiber'
import { OrbitControls, TransformControls } from 'three-stdlib'
import SuspenseComp from './src/SuspenseComp';
import 'react-native-gesture-handler'
import { SensorType, useAnimatedSensor } from 'react-native-reanimated';

export default function App() {
extend({ OrbitControls, TransformControls })

const animatedSensor: any = useAnimatedSensor(SensorType.GYROSCOPE, {
  interval: 100,
});

  return <Canvas>
    <Suspense fallback={<SuspenseComp/>} >
      <Main sensor={animatedSensor} />   
     </Suspense>

     </Canvas>;

}


