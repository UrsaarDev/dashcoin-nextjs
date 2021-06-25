import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Paper } from "@material-ui/core";

const Pie = (props) => {

    //initialise
    const { count } = props;
    const menu = useRef(null);
    const curImage = useRef(null);
    const imgViewer = useRef(null);
    const title = useRef(null);
    const description = useRef(null);
    
    const [arr, setArray] = useState([0,1,2]);
    const [backs, setBacks] = useState(['/slides/img100.jpg','/slides/img101.jpg','/slides/img102.jpg','/slides/img103.jpg','/slides/img104.jpg']);

    //componentdidmount
    useEffect(() => {
        var tmp = [];
        for(let i=0;i<count;i++) tmp.push(i);

        setArray([...tmp]);
        setTimeout(() => {
            menu.current.classList.toggle("active");
            menu.current.style.transition = "transform .25s ease-out, opacity .25s ease-in";
        }, 1000);

        return () => {
        }
    }, []);

    //event when you enter image
    function hovered (i) {
        curImage.current.style.backgroundImage = `url(${backs[i%5]})`;
        imgViewer.current.classList.remove('fadeOut');
        imgViewer.current.classList.add('fadeIn');
        title.current.innerHTML = "This is Image "+(1+i);
        description.current.innerHTML = "Description "+(1+i);
    }

    //event when you leave image
    function hleave (when, e) {
        if((when === 1 && (e.relatedTarget && e.relatedTarget.classList.value.search("curImage") === -1 && e.relatedTarget.classList.value.search("imgViewer") === -1)) 
            || (when === 2)) {
            if(curImage.current !== null) {
                imgViewer.current.classList.remove('fadeIn');
                imgViewer.current.classList.add('fadeOut');
                curImage.current.classList.remove('scaleIn');
            }
        }
    }

    //draws with maths funcs
    function drawPieLine(i) {
        const endx = Math.cos((360/i-90)*Math.PI/180)*0.5+0.5;
        const endy = Math.sin((360/i-90)*Math.PI/180)*0.5+0.5;
        return "M0.5,0.5 L0.5,0 A0.5,0.5 0 0 1 "+endx+' '+endy+" z";
    }

    //event when you enter big image
    function doScaleImage () {
        if(curImage.current !== null) curImage.current.classList.add('scaleIn');
    }

    //render
    return  <div>
                <section>
                    <div className="circlemenu_container">
                        <ul className="circlemenu_ul" ref={menu}>
                            {arr.map((each,i) =>
                                <li key={i} 
                                    style={{ transform : "rotate(-" + (360/arr.length) * i + "deg)" }}
                                    onMouseEnter={() => hovered(i)}
                                    onMouseOut={(e) => hleave(1,e)}
                                >
                                    <img className='circlemenu_piece_img' 
                                        style={{ transform : "rotate(" + (360/arr.length) * i + "deg)" }} 
                                        src={backs[i%5]}
                                    />
                                    <span className='circlemenu_piespan'
                                        style={{ right : (count>6) ? 25 + count/2 + "%" : 25 + "%" , top:100/count+"%",transform:"rotate("+180/count + "deg)"}}>
                                        img-{i+1}
                                    </span>
                                </li>
                            )}
                        </ul>

                        <svg height="0" width="0">
                            <defs>
                                <clipPath clipPathUnits="objectBoundingBox" id="sector">
                                    <path fill="none" stroke="#111" d={drawPieLine(count)}></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <Paper className="circlemenu_imgViewer fadeOut" 
                        elevation={3} 
                        ref={imgViewer}
                        onMouseLeave={(e) => hleave(2,e)}
                    >
                        <div className="circlemenu_curImage"
                            ref={curImage}
                            onMouseEnter={() => doScaleImage()}
                        >
                            <div className="circlemenu_imgTitle" ref={title}></div>
                            <div className="circlemenu_imgDescription" ref={description}></div>
                        </div>
                    </Paper>
                </section>
            </div>;
};

export default Pie;