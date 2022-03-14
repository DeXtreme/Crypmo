import PropTypes from 'prop-types';

function TradeIcon({selected}){
    return(
        <div className={`${selected && "text-accent"}`}>
            {selected ? 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
                className='md:hidden text-5xl'
                stroke="currentColor" fill="currentColor" strokeWidth="0" height="1em" width="1em">
                    <g>
                        <g>
                            <path className="fill-gray-400" d="M123.48,88.77H80.29l10.3-11.25a.57.57,0,0,0-.45-.93H87a1.08,1.08,0,0,0-.85.41L75,91.16a2.28,2.28,0,0,0,1.79,3.7h46.47a.54.54,0,0,0,.54-.54V91.15A22.84,22.84,0,0,0,123.48,88.77Z">
                            <animateTransform attributeName='transform' type='translate' dur={0.1} begin={0.1} from="0 0" to="-10" 
                                fill='freeze' />
                            </path>
                            <path id="top" d="M74.86,110.77H118L107.75,122a.57.57,0,0,0,.45.93h3.11a1.08,1.08,0,0,0,.85-.41l11.17-14.16a2.28,2.28,0,0,0-1.79-3.7H75.06a.54.54,0,0,0-.54.54v3.17A22.84,22.84,0,0,0,74.86,110.77Z">
                                <animateTransform attributeName='transform' type='translate' dur={0.1} begin={0.1} from="0 0" to="10" 
                                fill='freeze' />
                            </path>
                        </g>
                        <g>
                            <path className="fill-gray-400" d="M118.68,55.22l-2.5,4.2A43.59,43.59,0,0,0,56.33,98.76l-4.85.63a48.43,48.43,0,0,1,67.2-44.16Z">
                                <animateTransform attributeName='transform' type='translate' dur={0.1} begin={0.1} from="0 0" to="-15 -25" 
                                fill='freeze' />
                            </path>
                            <path d="M81.32,144.78l2.5-4.2a43.59,43.59,0,0,0,59.85-39.33l4.85-.63a48.43,48.43,0,0,1-67.2,44.16Z">
                            <animateTransform attributeName='transform' type='translate' dur={0.1} begin={0.1} from="0 0" to="15 25" 
                                fill='freeze' />
                            </path>
                            <animateTransform attributeName='transform' type='rotate' from="0 100 100" to="125 100 100"
                            dur={0.2} fill='freeze' />
                        </g>
                    </g>
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
                className='md:hidden text-5xl'
                stroke="currentColor" fill="currentColor" strokeWidth="0" height="1em" width="1em">
                    <g>
                        <g>
                            <path id="bottom" d="M123.48,88.77H80.29l10.3-11.25a.57.57,0,0,0-.45-.93H87a1.08,1.08,0,0,0-.85.41L75,91.16a2.28,2.28,0,0,0,1.79,3.7h46.47a.54.54,0,0,0,.54-.54V91.15A22.84,22.84,0,0,0,123.48,88.77Z"/>
                            <path id="top" d="M74.86,110.77H118L107.75,122a.57.57,0,0,0,.45.93h3.11a1.08,1.08,0,0,0,.85-.41l11.17-14.16a2.28,2.28,0,0,0-1.79-3.7H75.06a.54.54,0,0,0-.54.54v3.17A22.84,22.84,0,0,0,74.86,110.77Z"/>
                        </g>
                        <g>
                            <path d="M118.68,55.22l-2.5,4.2A43.59,43.59,0,0,0,56.33,98.76l-4.85.63a48.43,48.43,0,0,1,67.2-44.16Z"/>
                            <path d="M81.32,144.78l2.5-4.2a43.59,43.59,0,0,0,59.85-39.33l4.85-.63a48.43,48.43,0,0,1-67.2,44.16Z"/>
                        </g>
                    </g>
                </svg>
            }
            <span className='hidden md:block'>Trade</span>
        </div>
    );
}

TradeIcon.propTypes = {
    selected: PropTypes.bool
}

TradeIcon.defaultProps = {
    selected: false
}

export default TradeIcon;