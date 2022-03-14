import PropTypes from 'prop-types';

function WalletIcon({selected}){
    return(
        <div className={`${selected && "text-accent"}`}>
            {selected ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
                className='md:hidden text-5xl'
                stroke="currentColor" fill="currentColor" strokeWidth="0" height="1em" width="1em">
                    <g>    
                        <path d="M66.86,70.5h69.75s2.91-1.5,2.91-3.11c0-4.82-3.9-8.72-8.72-12.39H64c-6.42,3.67-12,15.3-12,15.3V73H64C64.21,71.51,66.86,70.5,66.86,70.5Z">
                            <animateTransform attributeName='transform' type='rotate' dur={0.1} values='0 100 100;20 100 100;0 100 100'
                            keyTimes="0;0.5;1" fill='freeze' />
                        </path>
                        <circle cx="97.5" cy="103.5" r="24.5" className='fill-gray-400'>
                            <animateTransform attributeName='transform' type='translate' dur={0.1} begin={0.1}
                            from="0 0" to="0 -30" fill='freeze'/>
                        </circle>
                        <path d="M135.77,78.25H66.86S64,74.81,64,73.21A1.33,1.33,0,0,1,64,73H52v55.63a11.63,11.63,0,0,0,11.63,11.63h72.15c5.09,0,9.23-3.79,9.23-8.45V86.7C145,82,140.86,78.25,135.77,78.25Zm-7.88,35.64a5.81,5.81,0,1,1,5.81-5.81A5.81,5.81,0,0,1,127.89,113.89Z">
                            <animateTransform attributeName='transform' type='rotate' dur={0.1} values='0 100 100;20 100 100;0 100 100'
                            keyTimes="0;0.5;1" fill='freeze' />
                        </path>
                    </g>
                </svg>
            :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
            className='md:hidden text-5xl'
            stroke="currentColor" fill="currentColor" strokeWidth="0" height="1em" width="1em">
                <g>           
                    <path d="M66.86,70.5h69.75s2.91-1.5,2.91-3.11c0-4.82-3.9-8.72-8.72-12.39H64c-6.42,3.67-12,15.3-12,15.3V73H64C64.21,71.51,66.86,70.5,66.86,70.5Z"/>
                    <circle cx="97.5" cy="103.5" r="24.5"/>
                    <path d="M135.77,78.25H66.86S64,74.81,64,73.21A1.33,1.33,0,0,1,64,73H52v55.63a11.63,11.63,0,0,0,11.63,11.63h72.15c5.09,0,9.23-3.79,9.23-8.45V86.7C145,82,140.86,78.25,135.77,78.25Zm-7.88,35.64a5.81,5.81,0,1,1,5.81-5.81A5.81,5.81,0,0,1,127.89,113.89Z"/>
                </g>
            </svg>}
            <span className='hidden md:block'>Trade</span>
        </div>
    );
}

WalletIcon.propTypes = {
    selected: PropTypes.bool
}

WalletIcon.defaultProps = {
    selected: false
}

export default WalletIcon;