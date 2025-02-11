import {Box, Grid, Stack} from '@mui/material'
import {currencyFormatter} from '../util/formatter'
import {Button} from './UI/Button'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {Link} from 'react-router-dom'
import {Info, InfoOutlined} from '@mui/icons-material'

export default function MealItem({image, title, price, description, id, date, searchTerm}) {
    useGSAP(() => {
        gsap.fromTo(
            '.meal-item',
            {y: -200, opacity: 0},
            {
                opacity: 1,
                duration: 0.2,
                stagger: 0.2,
                ease: 'power1.inOut',
                y: 0,
            }
        )
    }, [searchTerm])

    return (
        <Grid item className="meal-item" xs={12} sm={6} lg={4} xl={3}>
            <article>
                <img src={`http://localhost:5001/${image}`} alt={title} />
                <h3>{title}</h3>
                <span className="meal-item-price">{currencyFormatter.format(price)}</span>
                <p className="meal-item-description"> {description}</p>

                <Stack
                    direction="row"
                    className="flex justify-between w-full mb-5 px-5 md:px-10 items-baseline"
                >
                    <Box className="bg-[#312c1d] rounded py-1 pt-[0.4rem]  px-4 text-sm text-yellow-600">
                        {date}
                    </Box>

                    <Link to={`/${id}`}>
                        <Button
                            startIcon={<InfoOutlined className="text-[1.35rem] mb-1" />}
                            className=" px-4 md:pxx-8 bg-[#ffc404] pt-[] hover:bg-[#ffab04]"
                        >
                            Detail
                        </Button>
                    </Link>
                </Stack>
            </article>
        </Grid>
    )
}
