import React from 'react';
import './galery.css'


const Galery = ({images,img}) => {
    return ( 
       
        <div class="container_galery">
            <div class="carousel_galery">
            <input className='galery_input' type="radio" name="slides" id="slide-0"/>
                {
                    images && images.map(i => (
                        <input className='galery_input' type="radio" name="slides" id={`slide-${i.id}`}/>
                    ))
                }
            
                <ul class="carousel__slides_galery">
                <li class="carousel__slide_galery">
                <figure>
                            <div className='galery_div'>
                                <img className='galery_img' style={{objectFit:"scale-down"}} src={img} alt=""/>
                            </div>
                        </figure>
                        </li>
                    {
                        images && images.map(e => (
                            <li class="carousel__slide_galery">
                        <figure>
                            <div className='galery_div'>
                                <img className='galery_img' style={{objectFit:"scale-down"}} src={e.image} alt=""/>
                            </div>
                        </figure>
                    </li>
                        ))
                    }
                </ul>    
                <ul class="carousel__thumbnails">
                       <li className='galery_li'>
                            <label className='galery_label' for="slide-0"><img className='galery_image' src={img} alt=""/></label>
                        </li>
                    {
                        images && images.map(a => (
                            <li className='galery_li'>
                            <label className='galery_label' for={`slide-${a.id}`}><img className='galery_image' src={a.image} alt=""/></label>
                        </li>
                        ))
                    }
                </ul>
            </div>
        </div>
     );
}
 
export default Galery;