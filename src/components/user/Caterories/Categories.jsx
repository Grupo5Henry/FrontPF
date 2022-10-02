import React from 'react'
import { useDispatch } from 'react-redux'
import { resetFilter, updateFilter } from '../../../redux/action';
const categories = [ 
    {
        id: 1,
        name: 'Computadoras',
        imageSrc: "https://todotintasysuministros.com/assets/media/computador/hg/hg01081.png?u=1654958571",
    },
    {
        id: 2,
        name: 'Celulares',
        imageSrc: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/298615-800-600?v=637837572184630000&width=800&height=600&aspect=true",
    },
    // {
    //     id: 3,
    //     name: 'Televisores',
    //     imageSrc: "https://cdn.shopify.com/s/files/1/0485/4566/1094/products/iPhone13ProMax-1_900x.jpg?v=1634758315",
    //     href: '#',

    // },
    // {
    //     id: 4,
    //     name: 'Accesorios',
    //     imageSrc: "https://www.lg.com/co/images/televisores/md07553134/gallery/D-1.jpg",
    //     href: '#',

    // },
    
]

export default function Categories() {
  const dispatch = useDispatch();


  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-6 sm:py-4 lg:max-w-none lg:py-12">
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categories.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.imageSrc}
                    alt=''
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href="#" onClick={()=> {
                    dispatch(resetFilter());
                    dispatch(updateFilter({category: callout.name}));
                    return
                    }}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900"></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

