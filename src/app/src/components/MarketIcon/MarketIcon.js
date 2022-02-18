import PropTypes from 'prop-types';

function MarketIcon({selected, className}){
    return(
        <div className={`${selected && "text-accent"}`}>
            {selected ? 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
                className='md:hidden text-5xl'
                stroke="currentColor" fill="currentColor" strokeWidth="0" height="1em" width="1em">
                    <g>
                        <rect id="midbar" x="82" y="50" width="30" height="90" rx="3" ry="3">
                            <animate attributeName='y' values='50;80;50' keyTimes="0;0.5;1"
                            dur={0.2} fill='freeze' repeatCount={1}/>

                            <animate attributeName='height' values='90;60;90' keyTimes="0;0.5;1"
                            dur={0.2} fill='freeze' repeatCount={1}/>
                        </rect>
                        <rect id="rightbar" x="118" y="70" width="30" height="70" rx="3" ry="3">
                            <animate attributeName='y' values='70;40;70' keyTimes="0;0.5;1"
                            dur={0.2} fill='freeze' repeatCount={1}/>
                            <animate attributeName='height' values='70;100;70' keyTimes="0;0.5;1"
                            dur={0.2} fill='freeze' repeatCount={1}/>
                            
                        </rect>
                        <rect id="leftbar" x="46" y="100" width="30" height="40" rx="3" ry="3">
                            <animate attributeName='y' values='100;60;100' keyTimes="0;0.5;1"
                            dur={0.2} fill='freeze' repeatCount={1}/>
                            <animate attributeName='height' values='40;80;40' keyTimes="0;0.5;1"
                            dur={0.2} fill='freeze' repeatCount={1}/>
                        </rect>
                    </g>
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
                className='md:hidden text-5xl'
                stroke="currentColor" fill="currentColor" strokeWidth="0" height="1em" width="1em">
                    <g>
                        <rect id="midbar" x="82" y="50" width="30" height="90" rx="3" ry="3" />
                        <rect id="rightbar" x="118" y="70" width="30" height="70" rx="3" ry="3" />
                        <rect id="leftbar" x="46" y="100" width="30" height="40" rx="3" ry="3" />
                    </g>
                </svg>
            }
            <span className='hidden md:block'>Markets</span>
        </div>
    );
}

MarketIcon.propTypes = {
    selected: PropTypes.bool,
    className: PropTypes.string
}

MarketIcon.defaultProps = {
    selected: false,
    className:""
}

export default MarketIcon;


<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g>
    <rect id="midbar" x="82" y="50" width="30" height="90" rx="3" ry="3"/>
    <rect id="rightbar" x="118" y="70" width="30" height="70" rx="3" ry="3"/>
    <rect id="leftbar" x="46" y="100" width="30" height="40" rx="3" ry="3"/>
  </g>
</svg>
