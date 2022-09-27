import React from 'react';

const Product = ({image, name, id}) => {
    return ( 
        <div>
            <h2>{name}</h2>
            <img src={image} alt='img'/>
        </div>
     );
}
 
export default Product;