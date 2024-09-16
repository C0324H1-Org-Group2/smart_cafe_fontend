import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Link } from 'react-router-dom';

const SellNotification = ({ onSellNotifications, isDropdownOpen, closeDropdown }) => {
    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messagesEmployee, setMessagesEmployee] = useState([]);
    const [messagesPay, setMessagesPay] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onStompError: (error) => {
                console.error('STOMP error', error);
            },
            onWebSocketClose: () => {
                console.error('WebSocket connection closed');
            }
        });

        stompClient.onConnect = () => {
            console.log('Connected to WebSocket');

            stompClient.subscribe('/topic/admin/sell/order', (messagesOrder) => {
                const newMessage = JSON.parse(messagesOrder.body);
                setMessagesOrder((prevMessages) => {
                    const updatedMessages = [...prevMessages, newMessage];
                    if (typeof onSellNotifications === 'function') {
                        onSellNotifications(updatedMessages.length);
                    }
                    return updatedMessages;
                });
            });

            stompClient.subscribe('/topic/admin/sell/callEmployee', (messagesEmployee) => {
                const newMessage = JSON.parse(messagesEmployee.body);
                setMessagesEmployee((prevMessages) => {
                    const updatedMessages = [...prevMessages, newMessage];
                    if (typeof onSellNotifications === 'function') {
                        onSellNotifications(updatedMessages.length);
                    }
                    return updatedMessages;
                });
            });

            stompClient.subscribe('/topic/admin/sell/pay', (messagesPay) => {
                const newMessage = JSON.parse(messagesPay.body);
                setMessagesPay((prevMessages) => {
                    const updatedMessages = [...prevMessages, newMessage];
                    if (typeof onSellNotifications === 'function') {
                        onSellNotifications(updatedMessages.length);
                    }
                    return updatedMessages;
                });
            });
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [onSellNotifications]);

    // Hàm xử lý khi click vào thông báo (xóa thông báo, trừ count và ẩn dropdown)
    const handleNotificationClick = (id, type) => {
        if (type === 'order') {
            setMessagesOrder((prevMessages) => prevMessages.filter((msg) => msg.tableId !== id));
        } else if (type === 'employee') {
            setMessagesEmployee((prevMessages) => prevMessages.filter((msg) => msg.tableId !== id));
        } else if (type === 'pay') {
            setMessagesPay((prevMessages) => prevMessages.filter((msg) => msg.tableId !== id));
        }

        // Trừ count đi 1
        onSellNotifications(-1);

        // Ẩn dropdown
        closeDropdown();
    };

    return (
        <div className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`} style={{ width: '300px' }}>
            {messagesOrder.length > 0 && (
                <>
                    {messagesOrder.map((msg) => (
                        <Link
                            className="dropdown-item"
                            key={msg.tableId}
                            to={`/admin/sell`}
                            onClick={() => handleNotificationClick(msg.tableId, 'order')}
                            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                            <strong>Bàn {msg.code} gọi món</strong>
                        </Link>
                    ))}
                </>
            )}
            {messagesEmployee.length > 0 && (
                <>
                    {messagesEmployee.map((msg) => (
                        <Link
                            className="dropdown-item"
                            key={msg.tableId}
                            to={`/admin/sell`}
                            onClick={() => handleNotificationClick(msg.tableId, 'employee')}
                            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                            <strong>Bàn {msg.code} gọi nhân viên</strong>
                        </Link>
                    ))}
                </>
            )}
            {messagesPay.length > 0 && (
                <>
                    {messagesPay.map((msg) => (
                        <Link
                            className="dropdown-item"
                            key={msg.tableId}
                            to={`/admin/sell`}
                            onClick={() => handleNotificationClick(msg.tableId, 'pay')}
                            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                            <strong>Bàn {msg.code} gọi thanh toán</strong>
                        </Link>
                    ))}
                </>
            )}

            {messagesOrder.length === 0 && messagesEmployee.length === 0 && messagesPay.length === 0 && (
                <div className="dropdown-item">Không có thông báo mới</div>
            )}
        </div>
    );
};

export default SellNotification;
