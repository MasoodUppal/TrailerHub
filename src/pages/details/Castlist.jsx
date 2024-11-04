import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/tmdbApi'
import apiconfig from '../../api/apiconfig'

const Castlist = (props) => {
    const {category}=useParams();
    console.log('category from castList',category);

    const[cast,setCast]=useState([]);

    useEffect(() => {
      try {
        const getCredits = async()=>{
            const res = await tmdbApi.credits(category,props.id);
            setCast(res.cast.slice(0,7));
            console.log(res.cast);
        }
        getCredits();
      } catch (error) {
        console.log('error from castlis',error)
      }
    }, [category,props.id]);
    

  return (
    <div className='casts'>
        {
            cast.map((item,i)=>(
                <div key={i} className="casts__item">
                    <div className="casts__item__img" style={{backgroundImage:`url(${apiconfig.w500Img(item.profile_path)})`}}></div>
                    <p className="casts__item__name">{item.name}</p>
                    <div className='casts__item__character'>{item.character}</div>
                </div>
            ))
        }
    </div>
  )
}

export default Castlist