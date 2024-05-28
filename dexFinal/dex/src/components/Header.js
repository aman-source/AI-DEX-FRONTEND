import React from 'react';
import Logo from '../moralis-logo.svg';
import Eth from '../eth.svg';
import { Link } from 'react-router-dom';
// import AILogo from '../AILogo.png';
import Lottie from 'react-lottie';
import animationData from '../animationData.json';

function Header(props) {
  const { address, isConnected, connect, toggleChatbox } = props;
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
      },
  };


  return (
      <header>
          <div className='leftH'>
              <img src={Logo} alt='logo' className='logo' />
              <Link to='/' className='link'>
                  <div className='headerItem'>Swap</div>
              </Link>
              <Link to='/tokens' className='link'>
                  <div className='headerItem'>Tokens</div>
              </Link>
          </div>
          <div className='rightH'>
              <div className='headerItem'>
                  <img src={Eth} alt='eth' className='eth' />
                  Ethereum
              </div>
              <div className='connectButton' onClick={connect}>
                  {isConnected
                      ? address.slice(0, 4) + '...' + address.slice(38)
                      : 'Connect'}
              </div>
              <div className='headerItem' onClick={toggleChatbox}>
                  <img
                      src='https://img.icons8.com/glyph-neue/64/000000/robot-2.png'
                      alt='robot-2'
                      width='64'
                      height='64'
                      style={{ cursor: 'pointer' }} // Add cursor style to indicate clickable element
                      // onClick={toggleChatbox} // Call toggleChatbox function when clicked
                  />
                  AI
              </div>
          </div>
      </header>
  );
}

export default Header;
