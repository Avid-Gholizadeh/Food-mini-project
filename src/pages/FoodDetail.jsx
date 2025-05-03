import {useMutation, useQuery} from '@tanstack/react-query'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {deleteFoodData, fetchFood} from '../http'
import {Grid} from '@mui/material'
import {Delete, Edit} from '@mui/icons-material'
import {Button} from '../components/UI/Button'
import {queryClient} from '../App'
import {formatDate} from '../util/formatter'

export default function FoodDetail() {
    const params = useParams()
    const navigate = useNavigate()

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['foods', params.id],
        queryFn: ({signal}) => fetchFood({id: params.id, signal}),
        gcTime: 1000 * 60 * 20,
    })

    // optimistic deleting using react query:
    const {
        mutate: foodDataMutate,
        isPending: dataPending,
        isError: dataIsError,
        error: dataError,
    } = useMutation({
        mutationFn: deleteFoodData,
        onMutate: async foodId => {
            await queryClient.cancelQueries(['foods'])
            const prevFoods = queryClient.getQueryData(['foods'])
            queryClient.setQueryData(['food'], oldFoods =>
                oldFoods?.filter(food => food.id !== foodId)
            )
            return {prevFoods}
        },
        onError: (error, data, context) => {
            queryClient.setQueryData(['foods'], context.prevFoods)
            console.log(error)
        },
        onSettled: () => queryClient.invalidateQueries(['foods']),
    })

    // Related To Sever Folder As Backend Not My Real-Server
    /* const {
        mutate: imageMutate,
        isPending: imagePending,
        isError: imageIsError,
        error: imageError,
    } = useMutation({
        mutationFn: deleteFoodImage,
        onSuccess: () => {
            foodDataMutate(params.id)
        },
        onError: (error, data, context) => console.log(error),
    })

    const status = {
        isPending: imagePending || dataPending,
        isError: imageIsError || dataIsError,
        error: imageError ?? dataError,
    } */

    function handleDeleteFood() {
        // const fileName = data.image.split('/')[1]
        foodDataMutate(params.id)
        navigate('../')
    }

    let content
    if (isLoading) {
        content = (
            <div className="text-center py-2 w-[40rem] my-8 mx-[auto] bg-[#343b3f] rounded-lg overflow-hidden ">
                <p>Fetching event data...</p>
            </div>
        )
    }
    if (isError || dataIsError) {
        throw new Error(error)
    }

    if (data) {
        const {image, name: title, date, price, description} = data

        content = (
            <div className="max-w-5xl mx-auto p-8 rounded-lg shadow-md mt-10 relative bg-[#29251c]">
                <Grid container spacing={4} className="relative">
                    <Grid item xs={12} md={6} className="relative">
                        <div className="flex h-full justify-center items-center relative">
                            <img
                                src={`http://localhost:3000/${image}`}
                                alt={title}
                                className="w-full h-full object-cover rounded-[20px] shadow-lg border-3 border-[#ffc404] max-h-[400px]"
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className="pl-8">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-4xl font-bold text-[#d9e2f1]">{title}</h1>
                                <span className="text-sm text-yellow-500">{formatDate(date)}</span>
                            </div>

                            <p className="text-2xl font-semibold mb-4 text-[#ffc404]">${price}</p>

                            <p className="text-lg mb-8 text-[#d9e2f1]">
                                {description} Lorem ipsum dolor, sit amet consectetur adipisicing
                                elit. At veniam aliquid consequuntur porro fugit possimus earum
                                eaque fugiat eligendi, qui veritatis et voluptatum, error voluptas
                                odio ipsam ad saepe ex?Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Animi temporibus facere impedit obcaecati, quia
                                iure? Mollitia laborum impedit illum deleniti consequuntur nam,
                                ducimus id porro voluptatem, aspernatur quas architecto maiores.
                            </p>

                            <div className="flex space-x-4">
                                <Link to="edit">
                                    <Button
                                        variant="contained"
                                        className="bg-[#ffc404] text-[#1d1a16]"
                                        startIcon={<Edit />}
                                    >
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    variant="contained"
                                    className="bg-[#1d1a16] text-[#ffc404]"
                                    startIcon={<Delete />}
                                    onClick={handleDeleteFood}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return <>{content}</>
}
