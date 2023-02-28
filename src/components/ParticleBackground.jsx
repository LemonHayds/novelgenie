import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

function ParticleBackground(props) {

  const size = props.size;
  const speed = props.speed;

  const particlesInit = async (main) => {
    await loadFull(main);
  };
 
  return (
    <div className="ParticleBackground">
     <Particles className=""
          id="tsparticles"
          init={particlesInit}
              options={{
                fpsLimit: 120,
                interactivity: {
                  detectsOn: 'canvas',
                  events: {
                    resize: true
                  },
                },
              particles: {
              color: {
                value: "#f1f1f1"
              },
              number: {
                density: {
                  enable: true,
                  area: 1080
                },
                limit: 0,
                value: 500,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.5,
                  speed: speed,
                  sync: false,
                },
                random: {
                  enable: true,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              shape: {
                type: 'square',
       
              },
              size: {
                random: {
                  enable: true,
                  minimumValue: 0.5
                },
                value: size
              }
            }
          }}
      />  
    </div>
  );
}
 
export default ParticleBackground;