import {Grid} from '@mui/material'

import {useQuery} from '@tanstack/react-query'
import {fetchMealsFn} from '../http'
import {useCallback, useState} from 'react'
import MealItem from '../components/MealItem'
import {Error} from '../components/Error'
import {SearchInput} from '../components/UI/Input'

export default function Meals() {
    const [searchTerm, setSearchTerm] = useState(null)

    const {
        data: meals,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['foods'],
        queryFn: fetchMealsFn,
        staleTime: 5000,
        gcTime: 1200000,
    })

    const handleSetSearchTerm = useCallback(function handleSetSearchTerm(searchText) {
        setSearchTerm(searchText)
    }, [])

    if (isLoading) {
        return (
            <div className="text-center py-2 w-[40rem] my-8 mx-[auto] bg-[#343b3f] rounded-lg overflow-hidden ">
                <p>data is being fetched...</p>
            </div>
        )
    }

    if (isError) {
        throw new Error(error)
    }

    let searchedMeals = null
    if (searchTerm && searchTerm.trim() !== '') {
        searchedMeals = meals.filter(
            meal =>
                meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                meal.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    } else {
        searchedMeals = meals
    }



    return (
        <main>
            <SearchInput search={handleSetSearchTerm} />
            <Grid container width="90%" m="0 auto" spacing={1.5}>
                {searchedMeals.length > 0 &&
                    searchedMeals.map(meal => (
                        <MealItem
                            key={meal.id || meal._id}
                            id={meal.id || meal._id}
                            title={meal.name}
                            price={meal.price}
                            image={meal.image}
                            description={meal.description}
                            date={meal.date}
                            searchTerm={searchTerm}
                        />
                    ))}
            </Grid>
            {searchedMeals.length === 0 && (
                <p className="text-center mt-10">
                    No food found related to the current search term.
                </p>
            )}
        </main>
    )
}
