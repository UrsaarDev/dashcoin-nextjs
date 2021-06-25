import React , { Component } from 'react';
import { useEffect, useState, useRef } from 'react';
import { Paper } from "@material-ui/core";

const Pie = (props) => {
    const { count } = props;
    const menu = useRef(null);
    const curImage = useRef(null);
    const imgViewer = useRef(null);
    const title = useRef(null);
    const description = useRef(null);
    
    const [arr, setArray] = useState([0,1,2]);
    const [backs, setBacks] = useState(['/slides/img100.jpg','/slides/img101.jpg','/slides/img102.jpg','/slides/img103.jpg','/slides/img104.jpg']);

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

    function hovered (i) {
        curImage.current.style.backgroundImage = `url(${backs[i%5]})`;
        imgViewer.current.classList.remove('fadeOut');
        imgViewer.current.classList.add('fadeIn');
        title.current.innerHTML = "This is Image "+(1+i);
        description.current.innerHTML = "Description "+(1+i);
    }
    function hleave (when, e) {
        if((when === 1 && (e.relatedTarget && e.relatedTarget.classList.value.search("curImage") === -1 && e.relatedTarget.classList.value.search("imgViewer") === -1)) || (when === 2)) {
            if(curImage.current !== null) {
                imgViewer.current.classList.remove('fadeIn');
                imgViewer.current.classList.add('fadeOut');
                curImage.current.classList.remove('scaleIn');
            }
        }
    }
    function drawPieLine(i) {
        const endx = Math.cos((360/i-90)*Math.PI/180)*0.5+0.5;
        const endy = Math.sin((360/i-90)*Math.PI/180)*0.5+0.5;
        return "M0.5,0.5 L0.5,0 A0.5,0.5 0 0 1 "+endx+' '+endy+" z";
    }
    function doScaleImage () {
        if(curImage.current !== null) curImage.current.classList.add('scaleIn');
    }
    return  <div>
                <section style={{position:'relative'}}>
                    <div className="menuContainer">
                        <ul className="menu" ref={menu}>
                            {arr.map((each,i) =>
                                <li key={i} ord={i} style={{transform: "rotate(-"+(360/arr.length)*i+"deg)"}} onMouseEnter={() => hovered(i)} onMouseOut={(e) => hleave(1,e)}>
                                    <img className='piece_img' src={backs[i%5]} style={{transform:"rotate("+(360/arr.length)*i+"deg)",width:400,height:400,position:'absolute'}} />
                                        <span style={{position: 'absolute',right:(count>6)? 25+count/2+"%" : 25+"%",top:100/count+"%",transform:"rotate("+180/count+"deg)",color:"white",fontFamily:"Indie Flower",fontSize: 26,userSelect:"none",pointerEvents:"none"}}>img-{i+1}</span>
                                </li>
                            )}
                        </ul>

                        <svg height="0" width="0">
                            <defs>
                                <clipPath clipPathUnits="objectBoundingBox" id="sector">
                                    <path fill="none" stroke="#111" className="sector" d={drawPieLine(count)}></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <Paper elevation={3} ref={imgViewer} className="imgViewer fadeOut" onMouseLeave={(e) => hleave(2,e)}>
                        <div className="curImage" ref={curImage} onMouseEnter={() => doScaleImage()}>
                            <div className="imgTitle" ref={title}></div>
                            <div className="imgDescription" ref={description}></div>
                        </div>
                    </Paper>
                </section>
            </div>;
};

export default Pie;