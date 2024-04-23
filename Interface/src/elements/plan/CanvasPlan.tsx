import {useEffect, useState} from 'react';
import {SampleContext} from "@/contexts/SampleContext.tsx";
import {Data, Esp, getToken} from "@/contexts/lib.tsx";

export default function CanvasPlan() {
    const [espData, setEspData] = useState<Esp[]>([]);
    const [groupedData, setGroupedData] = useState<{ [key: string]: Data[] }>({});


    useEffect(() => {
        fetch(`${SampleContext.urlData}/esp`, {"headers": {"Authorization": `Bearer ${getToken()}`}})
            .then(response => response.json())
            .then((dataEsp: Esp[]) => {
                setEspData(dataEsp);
                console.log(dataEsp)
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, []);
    useEffect(() => {
        fetch(`${SampleContext.urlData}/data`, {"headers": {"Authorization": `Bearer ${getToken()}`}})
            .then(response => response.json())
            .then((apiData: Data[]) => {
                const groupedData: { [key: string]: Data[] } = {};
                espData.forEach((esp) => {
                    groupedData[esp.name] = apiData.filter((data) => data.ip === esp.ip);
                });
                setGroupedData(groupedData);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }, [espData]);

    return (
        <div>
            <input className="" type="checkbox" id="sensors" name=""/> <label
            htmlFor="sensors"
            className="absolute mr-96 transition ease-in-out duration-300 cursor-pointer text-xl leading-20vh font-sans text-uppercase user-select-none"
        >Sensors</label>

            <style>{`  
  * {box-sizing: border-box;}

svg {
  display: block;
  height: 100vh;
  width: 40vw;
}

text {
  font-size: 3px;
}


input[type="radio"],
input[type="checkbox"] {
  opacity: 0;
}

.downstairs {
  opacity: 1;
}

input + label {
  transform: scale(0.96) translate(-1em, 0);
  transition: 0.3s ease;
}

label {
  whitespace: nowrap;
  font-size: 1rem;
}
input:checked + label {
  background-color: #fff;
  color: #345;
  transform: scale(1);
  box-shadow: inset 0 0 0 0.1em #fff;
}


.barrier,
.wall {
  fill: none;
  stroke: currentcolor;
  stroke-width: 0.4px;
  opacity: 0.6;
}

.barrier {
  opacity: 0.3;
  stroke-width: 0.2px;
  stroke-dasharray: 0 200 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2
    0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75 0.2 0.75
    0.2 0.75 0.2 0.75 0.2;
  stroke-dashoffset: 200;

  transition: all .8s ease 0s;
}


@keyframes drawin {
  0% {
    stroke-dasharray: 0 100;
    opacity: 0;
  }

  10% {
    stroke-dasharray: 0 100;
  }

  100% {
    stroke-dasharray: 100 0;
    opacity: 1;
  }
}

label[for="sensors"] {
  top: 20vh;
}



text{transition: all 1.5s ease; }



.sensors circle{fill:currentcolor; fill-opacity:.76; stroke:currentcolor; stroke-width:0px ; stroke-opacity:1;  transition: all .3s ease .2s;}
.sensors .open{color:#6e9 ;  stroke-width: 2.5px}
#sensors:checked ~ svg .sensors {opacity:1;}
#sensors:not(:checked) ~ svg .sensors{opacity:0}
.sensors text{color:#6Ce; }
#sensors:checked ~ svg .sensors{
  opacity:1;  
  text{transform:none ; transition:none;
  }
}

.sensors .closed{fill-opacity:.05; stroke-width:.3px; color:#6e9}

svg{transition: all .5s ease}



.shade{position:absolute; top:0; left:0; width:30vw; bottom:0; background-color:rgba(5,15,25,0.75); height: 100vh;}`}
            </style>


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

                <g className="downstairs transition-all duration-500 ease-in-out">
                    <path className="barrier"
                          d="m 47.9,53.5 8.1,0 0,-3.3 m -44.9,24.7 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.2,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 58.2,-1.3 -21.6,0 m 10,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m 19.9,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 M 78,93.2 78,98.7 M 91.8,3.52 91.8,11 m -49.5,37.1 -7.9,0 0,5.4 m 57.4,-7.5 0,6.9 m 2.8,2.9 -6.3,0 0,-2.9 m -17.6,-15.6 0,6.9 m -7.4,-7.4 0,6.9 M 58.7,6.94 58.7,29.9 M 22,41.3 l 7.5,0 M 79,52.9 79,64.4 m -1.7,-11.5 0,11.5 m 5.4,-11.5 -3.7,5.8 3.6,5.7 m -11.9,-5.8 0,5.8 m 1.6,-11.5 0,11.5 M 74,52.9 74,64.4 m 1.7,-11.5 0,11.5 m 7,-5.7 -5.2,0 m -45.9,7.9 0,-5.1 22.8,0 0,5.1 z"/>
                    <path className="wall"
                          d="m 20.07,36.84 0,-1.81 2.16,0 0,1.81 z m 11.61,0 0,-1.81 -2.16,0 0,1.81 z m 29.31,8.4 2.28,0 0,-1.42 m 0,-6.84 0,-1.43 -20.29,0 0,9.52 m 15.73,-9.58 0,-5.47 m 0,-22.912 0,-5.073 33.06,0 0,2.166 m 0,6.729 0,35.05 3.42,0 0,18.36 -25.08,0 m -9.12,-28.79 0,9.75 -0.57,0.81 m 31.35,18.23 0,29.07 -25.58,0 m -8.11,-44.06 -0.57,0.85 -14.36,0 m -10.95,-5.13 10.78,0 0,4.9 0,3.54 m -2.91,0 7.86,0 0,-3.31 m 43.84,-14.65 -21.09,0 0,1.88 m 0,6.5 0,3.14 3.99,0 0,-11.52 m -44.29,14.48 0,3.48 5.01,0 m 48.97,-0.57 -13.68,0 0,5.7 6.84,0 m 17.67,-5.7 -7.41,0 m -5.07,0 0,11.4 m -21.15,-5.13 0,5.7 1.71,0 1.71,-2.28 0,-9.12 -3.42,0 0,0.57 m 4.63,18.24 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.65 m 0,0.64 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.65 m 0,0.64 0,0.64 0,0.64 m -46.75,-41.27 0,6.67 M 11,74.6 l 0,24.37 55.19,0 0,-16.39 -9.59,0 -3.65,-4.56 0,-3.42 -41.95,0 -6.271,-6.27 0,-27.02 17.101,0 m 7.52,0 2.85,0 0,3.76 -0.1,5.02 -5.13,-0.1 0,3.48"/>
                </g>


                <g className="sensors transition-all duration-500 ease-in-out">



                    <text className="font-semibold uppercase tracking-widest fill-current" x="48"
                          y="44">23&#8451;</text>
                    <text className="font-semibold uppercase tracking-widest fill-current" x="75"
                          y="80">24&#8451;</text>
                    <text className="font-semibold uppercase tracking-widest fill-current" x="79"
                          y="43">25&#8451;</text>
                    <text className="font-semibold uppercase tracking-widest fill-current" x="13"
                          y="60">24&#8451;</text>

                    <g className="sensors transition-all duration-500 ease-in-out">
                        {espData.map(esp => {
                            const espGroup = groupedData[esp.name] || [];
                            const x = espGroup.length > 0 ? esp.x : 0;
                            const y = espGroup.length > 0 ? esp.y : 0;
                            return (
                                <circle key={esp.ip} cx={x} cy={y} r="5" className="open" />
                            );
                        })}
                    </g>
                </g>
            </svg>
        </div>
    );
}

