import {Link} from 'react-router-dom'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {Button} from './UI/Button'

const NotFoundPage = () => {
    useGSAP(() => {
        gsap.fromTo('.title', {opacity: 0, y: -50}, {opacity: 1, y: 0, duration: 1})

        gsap.fromTo('.subtitle', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 1, delay: 0.5})

        gsap.fromTo(
            '.button',
            {scale: 1},
            {
                scale: 1.5,
                duration: 1,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
            }
        )
    }, [])

    return (
        <div className="relative bgg-[#29251c] text-[#d9e2f1] min-h-max flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center p-8 md:p-16">
                <div className="mb-6 title">
                    <h1 className="text-8xl font-extrabold text-[#ffc404] drop-shadow-lg">404</h1>
                </div>
                <div className="mb-8 subtitle">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#d9e2f1]">
                        Oops! Page Not Found
                    </h2>
                </div>
                <Link to="/">
                    <Button className="button bg-[#ffc404] text-[#1d1a16] text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-[#e0b700] transition-transform duration-300">
                        Go to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
