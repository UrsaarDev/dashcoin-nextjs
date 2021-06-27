export default function PiePaths(props) {
    const endx = Math.cos((360/props.count-90)*Math.PI/180)*0.5+0.5;
    const endy = Math.sin((360/props.count-90)*Math.PI/180)*0.5+0.5;
    
    return  <svg height="0" width="0">
                <defs>
                    <clipPath clipPathUnits="objectBoundingBox" id={'sector'+props.count}>
                        {props.count !== 1 &&
                            <path fill="none" stroke="#111" d={"M0.5,0.5 L0.5,0 A0.5,0.5 0 0 1 "+endx+' '+endy+" z"}></path>
                        }
                        {props.count === 1 &&
                            <path fill="none" stroke="#111" d="M0.5,0.5 L0.5,0 A0.5,0.5 0 1 1 0.49899999999 0 z"></path>
                        }
                    </clipPath>
                </defs>
            </svg>;
}