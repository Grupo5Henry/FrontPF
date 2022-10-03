
import { getProductsName , getProductsFiltered} from '../../../redux/action';
import OrderFilt from '../OrderFiltros';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../Products/Products';
import SearchBar from '../searchBar/searchBar';
import Categories from "../Caterories/Categories";
import CarrouselHome from '../Recommended/CarrouselHome'
import Pagination from '../Pagination/Pagination';





const Home = () => {


    const products = useSelector(state => state.products);
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(getProductsName())
    // },[])


    useEffect(() =>{
        // console.log(filter, "Home")
        dispatch(getProductsFiltered(filter))
    },[filter])
    // console.log(products, "Home")
    return ( 
    <>
        <div>
            <SearchBar/>           
        </div>
        
        <div>
           
        <Categories/>
        <CarrouselHome/>
        <OrderFilt/>
        <Products/>
        <Pagination/>


        </div>
    </>
     );
}




export default Home
