'use client';

import React, { useState } from 'react';
import {ExpandableCardDemo }from "@/components/product-list"

export default function GetBooks() {
  

  return (
    <div className="container grid grid-filter-column mt-20">
    
        <ExpandableCardDemo/>
      {/* <div className="main-product">
        <button
          onClick={fetchProducts}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Fetch Books
        </button>
  
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="p-4 border rounded-md">
                <h3 className="text-lg font-bold mb-2">{product.bookName}</h3>
                <div className="mb-2">
                  {product.bookImages && (
                    <img
                      src={product.bookImages[0]}
                      alt={product.bookName}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}
                </div>
                <p className="text-gray-700">Price: ₹{product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No books to display. Click the button above to fetch books.
            </p>
          )}
        </div>
      </div>
    </section> */}
  </div>
  )
}



const FliterSection = ()=>{
    return(
        <div>
            fliter section
        </div>
    )
}

const Sort = ()=>{
    return (
        <div>
            top sort section
        </div>
    )
}

const GridView = ()=>{
    return(
        <div className='container grid grid-three-column'>
            {
                // Products.map()
            }
        </div>
    )
}
