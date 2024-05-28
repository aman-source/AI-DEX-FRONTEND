import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Swap from './components/Swap';
import Tokens from './components/Tokens';
import Chatbot from './components/Chatbot';
import { Routes, Route } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import tokenList from './tokenList.json';

function App() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new MetaMaskConnector(),
    });

    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [tokenOneAmount, setTokenOneAmount] = useState(null);

    const switchTokens = () => {
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
    };

    const modifyToken = (token, index) => {
        if (token === 'tokenOne') {
            setTokenOne(tokenList[index]);
        } else {
            setTokenTwo(tokenList[index]);
        }
    };

    const toggleChatbox = () => {
        document.querySelector('.chatbot-container').classList.toggle('open');
    };

    return (
        <div className='App'>
            <Header
                connect={connect}
                isConnected={isConnected}
                address={address}
                toggleChatbox={toggleChatbox}
            />
            <div className='mainWindow'>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Swap
                                isConnected={isConnected}
                                address={address}
                                tokenOne={tokenOne}
                                tokenTwo={tokenTwo}
                                tokenOneAmount={tokenOneAmount}
                                setTokenOneAmount={setTokenOneAmount}
                                switchTokens={switchTokens}
                                modifyToken={modifyToken}
                                tokenList={tokenList}
                            />
                        }
                    />
                    <Route path='/tokens' element={<Tokens />} />
                </Routes>
            </div>
            <Chatbot
                isConnected={isConnected}
                address={address}
                switchTokens={switchTokens}
                modifyToken={modifyToken}
                tokenList={tokenList}
                setTokenOneAmount={setTokenOneAmount}
            />
        </div>
    );
}

export default App;
