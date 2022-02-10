function PairLoading(){
    return (
        <div className='grid auto-cols-fr grid-rows-1 p-4 animate-pulse'>
            <div className='col-start-1 flex items-center justify-start'>
                <div className='w-9 h-9 rounded-full bg-secondary' />
                <div className='ml-2'>
                    <div className='w-12 h-4 rounded-full bg-secondary mb-1 lg:w-20' />
                    <div className='w-16 h-4 rounded-full bg-secondary lg:w-28' />
                </div>
                
            </div>
            <div className='col-start-2 flex items-center justify-center'>
                <div className='w-16 h-6 rounded-full bg-secondary lg:w-20' />
            </div>
            <div className='col-start-3 justify-center hidden md:flex flex-col items-center'>
                <div className=' w-16 h-4 rounded-full bg-secondary mb-1 lg:w-16'/>
                <p className=' w-20 h-4 rounded-full bg-secondary lg:w-20'></p>
            </div>
            <div className='col-start-3 md:col-start-4 flex items-center justify-end'>
                <div className='py-3 px-1 w-20 h-10 rounded-lg bg-secondary' />
            </div>
        </div>
    )
}

export default PairLoading;