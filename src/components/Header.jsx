import logo from '../assets/logo.jpg'

import {Button} from './UI/Button'

import {Link, useNavigate} from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()

    return (
        <>
            <header className="main-header">
                <div id="title" onClick={() => navigate('/')}>
                    <img src={logo} alt="react food logo" />
                    <h1>reactfood</h1>
                </div>

                <Button
                    variant="text"
                    className="text-[#ffc404] px-4 rounded-xl py-3 hover:text-[#ffab04] bg-[#1d1a16] bgf-[#312c1d] font-thin"
                >
                    <Link to="/newFood">Add Food</Link>
                </Button>
            </header>
        </>
    )
}
