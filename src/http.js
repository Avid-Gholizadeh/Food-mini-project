// this is where is declare my http request functions.

import axios from 'axios'

export async function fetchMealsFn() {
    const response = await fetch('https://66e2e08c494df9a478e37081.mockapi.io/react-Food/foods')

    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.message || 'Could not fetch meals!')
    }

    return resData
}

export async function createFoodFn({newFood, image}) {
    try {
        const imageResponse = await axios.post('http://localhost:5001/upload', image, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        const uploadedImageName = imageResponse.data.newFilename

        const updatedNewFood = {...newFood, image: 'uploads/' + uploadedImageName}

        const response = await axios.post(
            'https://66e2e08c494df9a478e37081.mockapi.io/react-Food/foods',
            updatedNewFood
        )

        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message)
    }
}

export async function fetchFood({id, signal}) {
    try {
        const response = await axios.get(
            'https://66e2e08c494df9a478e37081.mockapi.io/react-Food/foods/' + id,
            {signal}
        )

        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message)
    }
}

export async function updateFoodFn(food) {
    try {
        const response = await axios.put(
            'https://66e2e08c494df9a478e37081.mockapi.io/react-Food/foods/' + food.id,
            food
        )

        console.log('update food fn')
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message)
    }
}

export async function updateImageFn({newFood, image}) {
    if (typeof image === 'string') {
        console.log('update Image fn')
        return {...newFood, image}
    } else {
        try {
            const imageResponse = await axios.post('http://localhost:5001/upload', image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            const uploadedImageName = imageResponse.data.newFilename

            return {...newFood, image: 'uploads/' + uploadedImageName}
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message)
        }
    }
}

export async function deleteFoodImage(fileName) {
    const encodedFileName = encodeURIComponent(fileName)
    try {
        const response = await axios.delete('http://localhost:5001/delete/' + encodedFileName)

        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message)
    }
}
export async function deleteFoodData(id) {
    try {
        const response = await axios.delete(
            'https://66e2e08c494df9a478e37081.mockapi.io/react-Food/foods/' + id
        )
        return response.data
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message)
    }
}
