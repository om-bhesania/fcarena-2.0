import Button from '../buttons/Button'
const ErrorLoader = ({ error }) => {
    return (
        <div className='flex items-center flex-col justify-center w-full h-full pt-[20%] mb-[25.4%]'> 
            <span className='text-red-600 font-bold text-3xl'>Sorry TimeSlots and pricing not visible as  {error ? error : 'Something went wrong'}</span>
            <span className='text-2xl font-medium'> please try again later or contact us</span>
            <Button
                label={'Contact Us'}
                variant={'error'}
                customClass={'mt-4 px-12'}
                url={'/contactus'}
            />
        </div>
    )
}

export default ErrorLoader