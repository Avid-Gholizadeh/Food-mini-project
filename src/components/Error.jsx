import {useNavigate} from 'react-router-dom'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {Button} from './UI/Button'

export function Error() {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    useGSAP(() => {
        gsap.fromTo('.title', {opacity: 0, y: -50}, {opacity: 1, y: 0, duration: 1})

        gsap.fromTo('.subtitle', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 1, delay: 0.5})

        gsap.fromTo(
            '.button',
            {scale: 1},
            {
                scale: 1.1,
                duration: 0.3,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
            }
        )
    }, [])

    return (
        <div className="relative  text-[#d9e2f1] min-h-max flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0  bg-cover bg-center z-[-1] opacity-50"></div>
            <div className="relative z-10 text-center p-8 md:p-16">
                <div className="mb-6 title">
                    <h1 className="text-9xl font-extrabold text-[#ffc404] drop-shadow-lg">500</h1>
                </div>
                <div className="mb-8 subtitle">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#d9e2f1]">
                        Something went wrong
                    </h2>
                </div>
                <p className="text-lg md:text-xl mb-8 text-[#d9e2f1]">
                    We encountered an unexpected error. Please try again later or go back to the
                    home page.
                </p>
                <Button
                    onClick={handleGoHome}
                    className="button bg-[#ffc404] text-[#1d1a16] text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-[#e0b700] transition-transform duration-300"
                >
                    Go to Home
                </Button>
            </div>
        </div>
    )
}
