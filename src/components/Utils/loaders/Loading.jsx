import { CircularProgress } from "@chakra-ui/react"


const Loading = ({label}) => {
    return (
        <>
            <div className='flex items-center justify-center w-full h-full pt-[20%] mb-[25.4%]'>
                <div className="flex items-center flex-col gap-5">
                    <CircularProgress value={200} isIndeterminate color='#004F2D' thickness='12px' size={20} />
                    <span className='text-5xl text-primary'>
                        {label}
                    </span>
                </div>
            </div>
        </>
    )
}

export default Loading