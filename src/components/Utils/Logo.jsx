import logo from '../../assets/logo.png'
const Logo = ({ customClass }) => {
    return (
        <>
            <img src={logo} alt="" className={`${customClass}`} />
        </>
    )
}

export default Logo;