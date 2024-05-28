import React, { useState } from 'react';
import axios from 'axios';
import MarkdownRenderer from './markdown';

const Chatbot = ({
    modifyToken,
    tokenList,
    setTokenOneAmount
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = { text: input, fromUser: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setInput('');

        try {
            const response = await axios.post(
                'http://localhost:8000/api/chatbot',
                { message: input },
            );
            const botResponse = {
                text: response.data.bot_response.message,
                fromUser: false,
            };

            const { token1, token2, amountOfToken1 } =
                response.data.bot_response;

            const token1Index = tokenList.findIndex((t) => t.ticker === token1);
            const token2Index = tokenList.findIndex((t) => t.ticker === token2);

            if (token1Index !== -1 && token2Index !== -1) {
                modifyToken('tokenOne', token1Index);
                modifyToken('tokenTwo', token2Index);
                setTokenOneAmount(amountOfToken1);
            }

            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <div className='chat-header' onClick={toggleChatbox}>
                Smart DEX
            </div>
            <div className='chat-window'>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.fromUser ? 'user-message' : 'bot-message'
                        }
                    >
                        <MarkdownRenderer markdownText={message.text} />
                    </div>
                ))}
            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
