import {EditNote} from '@mui/icons-material'
import {Container, Stack, Typography} from '@mui/material'
import AddFoodForm from '../components/AddFoodForm'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useNavigate, useParams} from 'react-router-dom'
import {fetchFood, updateFoodFn} from '../http'
import {queryClient} from '../App'
import {Button} from '../components/UI/Button'

export default function EditFood() {
    const params = useParams()
    const navigate = useNavigate()

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['foods', params.id],
        queryFn: ({signal, queryKey}) => fetchFood({id: queryKey[1], signal}),
    })

    // optimistic updating using tanstack query :
    const {
        mutate: editFoodMutate,
        isPending: editIsPending,
        isError: editIsError,
        error: editError,
    } = useMutation({
        mutationFn: updateFoodFn,
        onMutate: async data => {
            await queryClient.cancelQueries(['foods'])
            const prevFood = queryClient.getQueryData(['foods', params.id])
            queryClient.setQueryData(['foods', params.id], data)
            return {prevFood}
        },
        onError: (error, data, context) => {
            queryClient.setQueryData(['foods', params.id], context.prevFood)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['foods', params.id])
        },
    })

    // Related To Sever Folder As Backend
    /* const {
        mutate: updateImageMutate,
        isPending: ImageIsPending,
        isError: ImageIsError,
        ImageError,
    } = useMutation({
        mutationFn: updateImageFn,
        onSuccess: data => {
            editFoodMutate(data)
        },
    }) 

    const status = {
        isPending: editIsPending || ImageIsPending,
        isError: editIsError || ImageIsError,
        error: editError ?? ImageError,
    } */

    function onSubmit(foodData) {
        // updateImageMutate(foodData)
        editFoodMutate({...foodData, foodId: params.id})
        navigate('/' + params.id)
    }

    let content
    if (isLoading) {
        content = (
            <div className="text-center w-[40rem] my-8 mx-[auto] bg-[#343b3f] rounded-lg overflow-hidden ">
                <p>Fetching event data...</p>
            </div>
        )
    }
    if (isError || editIsError) {
        throw new Error(error)
    }

    if (data) {
        content = (
            <Container
                maxWidth="sm"
                className="py-5 rounded-lg shadow shadow-stone-700 border-3 border-[#2c2306]"
            >
                <Stack
                    direction="row"
                    columnGap={1}
                    className="bg-[#1d1a16] mb-8 rounded-xl py-2 px-4 w-fit items-center"
                >
                    <EditNote className="text-[2rem] " />
                    <Typography variant="h6" className="textt-[#ffc404]">
                        Edit Food
                    </Typography>
                </Stack>

                <AddFoodForm food={data} SubmitFn={onSubmit}>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
                        <Button
                            type="button"
                            variant="text"
                            className="text-white"
                            onClick={() => navigate('/')}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#ffc404] hover:bg-[#ffab04]"
                            disabled={editIsPending}
                        >
                            {editIsPending ? 'Saving...' : 'Save'}
                        </Button>
                    </Stack>
                </AddFoodForm>
            </Container>
        )
    }

    return <>{content}</>
}
