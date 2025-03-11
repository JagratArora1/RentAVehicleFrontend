// import { Leva, useControls } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '@/components/CanvasLoader.jsx';
import { HackerRoom } from '@/components/HackerRoom.jsx';

const Hero = () => {
  // const x = useControls(
  //   'HackerRoom',
  //   {
  //     positionX:{
  //       value:2.5,
  //       min:-10,
  //       max:10
  //     },
  //     positionY:{
  //       value:2.5,
  //       min:-10,
  //       max:10
  //     },
  //     positionZ:{
  //       value:2.5,
  //       min:-10,
  //       max:10
  //     },
  //     rotationX:{
  //       value:0,
  //       min:-10,
  //       max:10
  //     },
  //     rotationY:{
  //       value:0,
  //       min:-10,
  //       max:10
  //     },
  //     rotationZ:{
  //       value:0,
  //       min:-10,
  //       max:10
  //     },
  //     scale:{
  //       value:1,
  //       min:0.1,
  //       max:10
  //     }
  //   }
  // )
  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full h-full absolute inset-0">
        {/* <Leva /> */}
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            {/* <Leva hidden /> */}
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <HackerRoom 
                position={[0.3,0.7,4.3]}
                rotation={[-6.2,-1.6,0]}
                scale={[1.2,1.2,1.2]}
                // position={[x.positionX,x.positionY,x.positionZ]}
                // scale={[x.scale,x.scale,x.scale]}
                // rotation={[x.rotationX,x.rotationY,x.rotationZ]}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};
export default Hero;