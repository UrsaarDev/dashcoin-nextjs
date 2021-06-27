import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Paper } from "@material-ui/core";
import PiePaths from '/components/piepath';

const Pie = (props) => {
    //initialise
    const { count, direction } = props;
    const menu = useRef(null);
    const curImage = useRef(null);
    const imgViewer = useRef(null);
    const title = useRef(null);
    const description = useRef(null);
    
    const [arr, setArray] = useState([]);
    // const [backs, setBacks] = useState(['/slides/img100.jpg','/slides/img101.jpg','/slides/img102.jpg','/slides/img103.jpg','/slides/img104.jpg']);
    const [backs, setBacks] = useState([
        'https://gateway.pinata.cloud/ipfs/QmdJGUz66o8bkDFtgZCvEJABrHV8arpxrmFo8yqdHXQUoz',
        'https://gateway.pinata.cloud/ipfs/QmNjiYB2WYoQxAsYAhnSy98UVgemr2hdfzCEseUdVBhDs7',
        'https://gateway.pinata.cloud/ipfs/QmVKNA8ov3WGh9Gx16oVE42zmnJRZGRDsmN57oAfanQD4N',
        'https://digitalax.mypinata.cloud/ipfs/QmchBJMkvoMymYJhMjV8YpujqGGdkvUsRFhJKK7bfXgxrD',
        'https://digitalax.mypinata.cloud/ipfs/QmT7addsFk9Hj2LNqMv2s2m43J8Yh8xBKcjPpvHPUuYBCb'
    ]);

    //componentdidmount
    useEffect(() => {
        let tmp = [];
        for(let i=0;i<count;i++) tmp.push(i);

        setArray(tmp);
        setTimeout(() => {
            menu.current.classList.toggle("active");
            menu.current.style.transition = "transform .25s ease-out, opacity .25s ease-in";
        }, 1000);
    }, []);

    //event when you enter image
    function hovered (i) {
        curImage.current.style.backgroundImage = `url(${backs[i%5]})`;
        imgViewer.current.classList.remove('fadeOut' + direction);
        imgViewer.current.classList.add('fadeIn' + direction);
        title.current.innerHTML = "This is Image "+(1+i);
        description.current.innerHTML = "Description "+(1+i);
    }

    //event when you leave image
    function hleave (when, e) {
        if((when === 1 && (e.relatedTarget && e.relatedTarget.classList.value.search("circlemenu_curImage") === -1 && e.relatedTarget.classList.value.search("circlemenu_imgViewer") === -1) && e.relatedTarget.classList.value.search("circlemenu_borders") === -1)
            || (when === 2)) {
            if(curImage.current !== null) {
                imgViewer.current.classList.remove('fadeIn' + direction);
                imgViewer.current.classList.add('fadeOut' + direction);
            }
        }
    }

    //render
    return  <div>
                <section>
                    <div className="circlemenu_container">
                        <ul className="circlemenu_ul" ref={menu}>
                            <div>
                                {arr.map((each,i) =>
                                    <div className="circlemenu_borders" style={{height:184,transform:"rotate("+((360/arr.length)*i-180)+"deg)"}}></div>
                                    )}
                            </div>
                            <div className="circlemenu_outlines"></div>
                            {arr.map((each,i) =>
                                <li key={i} 
                                    style={{ transform : "rotate(-" + (360/arr.length) * i + "deg)" ,clipPath: "url(#sector"+count+")"}}
                                    onMouseEnter={() => hovered(i)}
                                    onMouseOut={(e) => hleave(1,e)}
                                >
                                    <img className='circlemenu_piece_img' 
                                        style={{ transform : "rotate(" + (360/arr.length) * i + "deg)" }} 
                                        src={backs[i%5]}
                                    />
                                    {/* <span className='circlemenu_piespan'
                                        style={{ right : (count>6) ? 25 + count/2 + "%" : 25 + "%" , top:100/count+"%",transform:"rotate("+180/count + "deg)"}}>
                                        img-{i+1}
                                    </span> */}
                                </li>
                            )}
                        </ul>
                        <PiePaths count={count} />
                    </div>
                    <Paper className={"circlemenu_imgViewer fadeOut"+direction} 
                        elevation={3} 
                        ref={imgViewer}
                        onMouseLeave={(e) => hleave(2,e)}
                    >
                        <div className="circlemenu_curImage"
                            ref={curImage}
                        >
                            <div className="circlemenu_imgTitle" ref={title}></div>
                            <div className="circlemenu_imgDescription" ref={description}></div>
                        </div>
                    </Paper>
                </section>
            </div>;
};

export default Pie;