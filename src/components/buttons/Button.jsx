import { Link } from "react-router-dom"

const Button = ({ customClass, variant, label, icon, imgCustom, role, url,target,onClick ,type ,id}) => {
    const baseStyle = "p-3 ease-in-out duration-300 font-medium active:scale-[0.9]"
    const style = {
        primary: 'bg-primary border border-primary text-bodyTextLight rounded hover:bg-transparent hover:text-primary hover:border-outlinePrimary',
        secondary: "bg-secondary border border-secondary text-primary rounded hover:bg-primary hover:text-secondary hover:border-primary",
        outlinePrimary: "bg-transparent border border-primary text-primary rounded hover:bg-primary hover:text-white hover:border-secondary",
        outlineSecondary: "bg-transparent border border-secondary text-bodyTextLight rounded hover:bg-primary hover:text-bodyTextLight hover:border-primary",
        link: "bg-transparent text-primary p-0 rounded hover:scale-[1.1]",
    }
    return (
        <>
            {role !== 'button' ? (
                <Link
                    to={url}
                    className={`${style[variant]} ${customClass} ${baseStyle} `} 
                    onClick={onClick}
                    type={type}
                    id={id}
                >
                    {label} {icon ? <Button.Icon img={icon} customImgClass={imgCustom}></Button.Icon> : ""}
                </Link>
            ) : (

                <button
                    className={`${style[variant]} ${customClass} ${baseStyle} `}
                    onClick={onClick}
                    type={type}
                    id={id}
                >
                    {label} {icon ? <Button.Icon img={icon} customImgClass={imgCustom}></Button.Icon> : ""}
                </button>
            )}
        </>
    )
}

export default Button


const Icon = ({ img, customImgClass }) => {
    return (
        <>
            <img src={img} alt="" className={`${customImgClass}`} />
        </>
    )
}
Button.Icon = Icon;