import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSidebar = ({
    search,
    setSearch,
    brand,
    setBrand,
    category,
    setCategory,
    setPriceRange,
    allProducts, priceRange }) => {

    const Categories = allProducts.map(p => p.category) // get all product categories here
    const UniqueCategory = ["All", ...new Set(Categories)]

    const Brands = allProducts.map(p => p.brand)
    const uniqueBrand = ["All", ...new Set(Brands)]
    console.log(uniqueBrand);

    const handleCategoryClick = (val) => {
        setCategory(val)
    }

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handleMinChange = (e) => {
        const value = Number(e.target.value)
        if(value <= priceRange[1]) setPriceRange([value, priceRange[1]])
    }
    const handleMaxChange = (e) => {
        const value = Number(e.target.value)
        if(value >= priceRange[0]) setPriceRange([priceRange[0], value])
    }

    const resetFilters = () => {
        setSearch(""),
        setCategory("All"),
        setBrand("All"),
        setPriceRange([0, 999999])
    }
    return (
        <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
            {/* search */}
            <Input type="text"
             placeholder="Search..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="bg-white p-2 border-gray-400 border-1 w-full" />
            {/* catogry */}
            <h1 className="mt-5 font-semibold text-xl">Categry</h1>
            <div className="flex flex-col gap-2 mt-3">
                {
                    UniqueCategory.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="radio"
                            checked={category === item} 
                            onChange={() => handleCategoryClick(item)}
                             />
                            <label htmlFor="">{item}</label>
                        </div>
                    ))
                }
            </div>
            {/* Brand */}
            <h1 className="mt-5 font-semibold text-xl">Brands</h1>
            <select className="bg-white w-full p-2 border-gray-200 border-2 rounded-md" value={brand} onChange={handleBrandChange}>
                {
                    uniqueBrand.map((item, index) => {
                        return <option key={index} value={item}>{item.toUpperCase()}</option>
                    })
                }
            </select>

            {/* price Range */}
            <h1 className="mt-5 font-semibold text-xl mb-3 ">Price Range</h1>
            <div className="flex flex-col gap-2">
                <label>
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="flex gap-2 items-center">
                    <input type="number" min="0" max="5000" value={priceRange[0]} onChange={handleMinChange} className="w-20 p-1 border border-gray-300 rounded" />
                    <span>-</span>
                    <input type="number" min="0" max="999999" value={priceRange[1]} onChange={handleMaxChange} className="w-20 p-1 border border-gray-300 rounded" />
                </div>
                <input type="range" min="0" max="500" step="100" className="w-full" value={priceRange[0]} onChange={handleMinChange}/>
                <input type="range" min="0" max="999999" step="100" className="w-full" value={priceRange[1]} onChange={handleMaxChange} />
            </div>
            {/* Reset button */}
            <Button onClick={resetFilters} className="bg-pink-600 text-white mt-5 cursor-pointer w-full">Reset Filter</Button>
        </div>
    )
}
export default FilterSidebar