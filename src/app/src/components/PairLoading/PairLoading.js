function PairLoading(){
    return (
        <div className='grid auto-cols-fr grid-rows-1 p-4 animate-pulse'>
            <div className='col-start-1 flex items-center'>
                <div className='w-9 h-9 rounded-full bg-secondary' />
                <div className='ml-2'>
                    <div className='w-12 h-4 rounded-full bg-secondary mb-1' />
                    <div className='w-16 h-4 rounded-full bg-secondary' />
                </div>
                
            </div>
            <div className='col-start-2 flex items-center justify-center'>
                <div className='w-14 h-6 rounded-full bg-secondary' />
            </div>
            <div className='col-start-3 justify-center hidden md:flex flex-col items-center'>
                <div className=' w-12 h-4 rounded-full bg-secondary mb-1 ml-4' />
                <p className=' w-16 h-4 rounded-full bg-secondary ml-4'></p>
            </div>
            <div className='col-start-3 md:col-start-4 flex items-center justify-end'>
                <div className='py-3 px-1 w-16 h-8 rounded-full bg-secondary' />
            </div>
        </div>
    )
}

export default PairLoading;