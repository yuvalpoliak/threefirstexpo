import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useEffect, useMemo, useRef } from "react";
import { THREE } from "expo-three";
import {useAnimatedSensor, SensorType} from 'react-native-reanimated'

export default function Main({sensor}: any) {
    const buffer: any = useLoader(THREE.FileLoader ,require('../assets/BaseMeshsculpt2.obj'));
    const obj = useMemo(() => new OBJLoader().parse(THREE.LoaderUtils.decodeText(buffer)), [buffer])
    const mesh = useRef<any>()
    
    const animatedSensor: any = useAnimatedSensor(SensorType.GYROSCOPE, {
        interval: 100,
        });
    //useFrame((state, delta) => (mesh.current.rotation.x += delta))

    useFrame((state, delta) => {
  let { x, y, z } = sensor?.sensor.value;
  x = ~~(x * 100) / 5000;
  y = ~~(y * 100) / 5000;
  z = ~~(z * 100) / 5000;
  mesh.current.rotation.x += x;
  mesh.current.rotation.y += y;
  mesh.current.rotation.z += z
});

    return(
     <mesh 
     ref={mesh}>
    <ambientLight />
    <primitive object={obj} scale={0.3} /> 
    </mesh>
    );

}