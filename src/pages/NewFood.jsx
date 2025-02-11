import {Container, Stack, Typography} from '@mui/material'
import AddFoodForm from '../components/AddFoodForm'

import {Fastfood} from '@mui/icons-material'
import {Button} from '../components/UI/Button'
import {useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import {createFoodFn} from '../http'
import {queryClient} from '../App'
import {Error} from '../components/Error'

export default function NewFood() {
    const navigate = useNavigate()

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: createFoodFn,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['foods']})
            navigate('/')
        },
    })

    function onSubmit(foodData) {
        mutate(foodData)
    }

    if (isError) {
        throw new Error(error)
    }

    return (
        <>
            <Container
                maxWidth="sm"
                className="py-5 rounded-lg shadow shadow-stone-700 border-3 border-[#2c2306]"
            >
                <Stack
                    direction="row"
                    columnGap={1}
                    className="bg-[#1d1a16] mb-8 rounded-xl py-2 px-4 w-fit items-center"
                >
                    <Fastfood className="text-[1.6rem]" />
                    <Typography variant="h6" className="textt-[#ffc404]">
                        Create New Food
                    </Typography>
                </Stack>

                <AddFoodForm SubmitFn={onSubmit}>
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
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Create'}
                        </Button>
                    </Stack>
                </AddFoodForm>
            </Container>
        </>
    )
}
