import {alpha, InputBase, styled, Typography} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {memo, useRef, useState} from 'react'

export default function Input({
    label,
    register,
    required,
    error,
    name,
    textarea = false,
    ...props
}) {
    return (
        <div className="flex flex-col w-[90%] items-center text-stone-100">
            <label htmlFor={name} className="self-start">
                {label}
            </label>
            {!textarea && (
                <input
                    {...register(name, required)}
                    id={name}
                    className="outline-none bg-[#ffc404] text-stone-800"
                    {...props}
                ></input>
            )}
            {textarea && (
                <textarea
                    {...register(name, {...required})}
                    id={name}
                    className="outline-none bg-[#ffc404] text-stone-800"
                    {...props}
                />
            )}
            {error && (
                <Typography variant="body2" color="error" className="self-start mt-2">
                    *{error.message}
                </Typography>
            )}
        </div>
    )
}

export const SearchInput = memo(function SearchInput({search}) {
    const timeout = useRef(null)

    function handleChange(event) {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            search(event.target.value)
            timeout.current = null
        }, 1000)
    }

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '300px',
        margin: '0 auto',
        marginBottom: '2rem',
        /* [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        }, */
    }))

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }))

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }))

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                onChange={handleChange}
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
            />
        </Search>
    )
})
