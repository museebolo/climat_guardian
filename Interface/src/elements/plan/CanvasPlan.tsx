import {useEffect} from 'react';

const CanvasPlan = () => {
    useEffect(() => {
        // Code de manipulation du SVG ici
    }, []);

    return (
        <div>
            <style>{`  
  * {box-sizing: border-box;}

text {
  font-size: 3px;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  fill: currentcolor;
  font-weight: 300;
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
            <input type="checkbox" id="sensors" name="s"/> <label
            htmlFor="sensors"
            className="absolute top-20vh left-30vw w-30vw h-18vh transition ease-in-out duration-300 z-9 cursor-pointer text-xl leading-20vh font-sans text-uppercase user-select-none"
        >Sensors</label>


            <svg className="h-96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 100 100">

                <filter id="grayscale">
                    <feColorMatrix type="matrix"
                                   values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
                </filter>


                <g className="downstairs transition-all duration-500 ease-in-out">
                    <path className="barrier"
                          d="m 47.9,53.5 8.1,0 0,-3.3 m -44.9,24.7 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.2,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 3.1,-25.1 0,25.1 m 58.2,-1.3 -21.6,0 m 10,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m 19.9,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 m -1.6,-5.5 0,5.5 m -1.7,-5.5 0,5.5 M 78,93.2 78,98.7 M 91.8,3.52 91.8,11 m -49.5,37.1 -7.9,0 0,5.4 m 57.4,-7.5 0,6.9 m 2.8,2.9 -6.3,0 0,-2.9 m -17.6,-15.6 0,6.9 m -7.4,-7.4 0,6.9 M 58.7,6.94 58.7,29.9 M 22,41.3 l 7.5,0 M 79,52.9 79,64.4 m -1.7,-11.5 0,11.5 m 5.4,-11.5 -3.7,5.8 3.6,5.7 m -11.9,-5.8 0,5.8 m 1.6,-11.5 0,11.5 M 74,52.9 74,64.4 m 1.7,-11.5 0,11.5 m 7,-5.7 -5.2,0 m -45.9,7.9 0,-5.1 22.8,0 0,5.1 z"/>
                    <path className="wall"
                          d="m 20.07,36.84 0,-1.81 2.16,0 0,1.81 z m 11.61,0 0,-1.81 -2.16,0 0,1.81 z m 29.31,8.4 2.28,0 0,-1.42 m 0,-6.84 0,-1.43 -20.29,0 0,9.52 m 15.73,-9.58 0,-5.47 m 0,-22.912 0,-5.073 33.06,0 0,2.166 m 0,6.729 0,35.05 3.42,0 0,18.36 -25.08,0 m -9.12,-28.79 0,9.75 -0.57,0.81 m 31.35,18.23 0,29.07 -25.58,0 m -8.11,-44.06 -0.57,0.85 -14.36,0 m -10.95,-5.13 10.78,0 0,4.9 0,3.54 m -2.91,0 7.86,0 0,-3.31 m 43.84,-14.65 -21.09,0 0,1.88 m 0,6.5 0,3.14 3.99,0 0,-11.52 m -44.29,14.48 0,3.48 5.01,0 m 48.97,-0.57 -13.68,0 0,5.7 6.84,0 m 17.67,-5.7 -7.41,0 m -5.07,0 0,11.4 m -21.15,-5.13 0,5.7 1.71,0 1.71,-2.28 0,-9.12 -3.42,0 0,0.57 m 4.63,18.24 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.65 m 0,0.64 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.64 m 0,0.64 0,0.65 m 0,0.64 0,0.64 0,0.64 m -46.75,-41.27 0,6.67 M 11,74.6 l 0,24.37 55.19,0 0,-16.39 -9.59,0 -3.65,-4.56 0,-3.42 -41.95,0 -6.271,-6.27 0,-27.02 17.101,0 m 7.52,0 2.85,0 0,3.76 -0.1,5.02 -5.13,-0.1 0,3.48"/>
                </g>


                <g className="sensors transition-all duration-500 ease-in-out">
                    <circle className="front-door closed" cx="26" cy="41.25" r="1"/>
                    <circle className="dining-window closed" cx="4.75" cy="56" r="1"/>
                    <circle className="pantry open" cx="38" cy="45" r="1"/>
                    <circle className="office-sm-window open" cx="43" cy="40" r="1"/>
                    <circle className="office-window closed" cx="52" cy="35.5" r="1"/>
                    <circle className="deck-door open" cx="46" cy="74.6" r="1"/>
                    <circle className="kitchen-window closed" cx="34" cy="74.6" r="1"/>
                    <circle className="nook-window closed" cx="61" cy="82.75" r="1"/>
                    <circle className="deck-window closed" cx="20" cy="74.6" r="1"/>
                    <circle className="garage-door open" cx="59" cy="19" r="1"/>
                    <circle className="garage-back closed" cx="91.8" cy="7.5" r="1"/>
                    <circle className="guest-window closed" cx="91.75" cy="41" r="1"/>
                    <circle className="guest-ensuite closed" cx="95.2" cy="60" r="1"/>
                    <circle className="lounge-window closed" cx="73" cy="93" r="1"/>
                    <circle className="lounge-door closed" cx="66.25" cy="88" r="1"/>

                    <text x="48" y="45">23&#8451;</text>
                    <text x="75" y="80">24&#8451;</text>
                    <text x="79" y="43">25&#8451;</text>
                    <text x="13" y="60">24.5&#8451;</text>
                </g>
            </svg>
        </div>
    );
}

export default CanvasPlan;
