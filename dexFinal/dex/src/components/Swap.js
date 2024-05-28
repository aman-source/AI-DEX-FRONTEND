import React, { useState } from 'react';
import { Input, Popover, Radio, Modal } from 'antd';
import {
    ArrowDownOutlined,
    DownOutlined,
    SettingOutlined,
} from '@ant-design/icons';

function Swap({
    tokenOne,
    tokenTwo,
    tokenOneAmount,
    setTokenOneAmount,
    switchTokens,
    modifyToken,
    tokenList,
}) {
    const [slippage, setSlippage] = useState(2.5);
    const [tokenTwoAmount] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [changeToken, setChangeToken] = useState(1);

    function handleSlippageChange(e) {
        setSlippage(e.target.value);
    }

    function changeAmount(e) {
        setTokenOneAmount(e.target.value);
    }

    function openModal(asset) {
        setChangeToken(asset);
        setIsOpen(true);
    }

    const handleModifyToken = (i) => {
        modifyToken(changeToken === 1 ? 'tokenOne' : 'tokenTwo', i);
        setIsOpen(false);
    };

    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    );

    return (
        <>
            <Modal
                open={isOpen}
                footer={null}
                onCancel={() => setIsOpen(false)}
                title='Select a token'
            >
                <div className='modalContent'>
                    {tokenList?.map((e, i) => (
                        <div
                            className='tokenChoice'
                            key={i}
                            onClick={() => handleModifyToken(i)}
                        >
                            <img
                                src={e.img}
                                alt={e.ticker}
                                className='tokenLogo'
                            />
                            <div className='tokenChoiceNames'>
                                <div className='tokenName'>{e.name}</div>
                                <div className='tokenTicker'>{e.ticker}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
            <div className='tradeBox'>
                <div className='tradeBoxHeader'>
                    <h4>Swap</h4>
                    <Popover
                        content={settings}
                        title='Settings'
                        trigger='click'
                        placement='bottomRight'
                    >
                        <SettingOutlined className='cog' />
                    </Popover>
                </div>
                <div className='inputs'>
                    <Input
                        placeholder='0'
                        value={tokenOneAmount}
                        onChange={changeAmount}
                    />
                    <Input
                        placeholder='0'
                        value={tokenTwoAmount}
                        disabled={true}
                    />
                    <div className='switchButton' onClick={switchTokens}>
                        <ArrowDownOutlined className='switchArrow' />
                    </div>
                    <div className='assetOne' onClick={() => openModal(1)}>
                        <img
                            src={tokenOne.img}
                            alt='assetOneLogo'
                            className='assetLogo'
                        />
                        {tokenOne.ticker}
                        <DownOutlined />
                    </div>
                    <div className='assetTwo' onClick={() => openModal(2)}>
                        <img
                            src={tokenTwo.img}
                            alt='assetTwoLogo'
                            className='assetLogo'
                        />
                        {tokenTwo.ticker}
                        <DownOutlined />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Swap;
