const ButtonLoader = ({title}:any) => {
    return (
        <div className='flex gap-2 items-center justify-center font-semibold'>
            <div className="w-5 h-5 border-2 border-dashed border-white rounded-full animate-spin"></div>
            {title}
        </div>
    );
}
export default ButtonLoader