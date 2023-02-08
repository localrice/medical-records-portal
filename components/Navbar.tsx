import Link from "next/link"
import Router from "next/router"

const Navbar = () => {
    const toPortal = () => {
        Router.push('/portal')
    }

    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/staff'>Staff</Link>
            <Link href='/records'>Records</Link>
            <Link href='/portal'><button onClick={toPortal}>Portal</button></Link>
        </div>
    )
}

export default Navbar