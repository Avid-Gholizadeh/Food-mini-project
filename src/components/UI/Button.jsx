import {Button as MuiButton} from '@mui/material'

export function Button({children, variant = 'contained', ...props}) {
    return (
        <MuiButton
            variant={variant}
            disableRipple
            sx={{
                pb: 0.5,
                textTransform: 'none',
                color: '#000',
                '&:hover': {background: 'transparent'},
            }}
            {...props}
        >
            {children}
        </MuiButton>
    )
}
