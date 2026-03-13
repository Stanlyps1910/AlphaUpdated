import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import axios from 'axios';

export default function Chats() {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/chats/admin/conversations`, {
        headers: { "x-auth-token": token }
      });
      setConversations(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch conversations", err);
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/chats/admin/${userId}`, {
        headers: { "x-auth-token": token }
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.userId);
      const interval = setInterval(() => fetchMessages(selectedUser.userId), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/chats`, 
        { text: newMessage, recipient: selectedUser.userId },
        { headers: { "x-auth-token": token } }
      );

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="p-4 md:p-8 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-charcoal rounded-2xl flex items-center justify-center shadow-lg shadow-charcoal/20">
          <MessageSquare className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-serif text-3xl text-charcoal tracking-tight">Client Communications</h1>
          <p className="text-sm text-warmgray font-medium">Manage and view your communications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="md:col-span-1 bg-white rounded-3xl p-6 border border-[#e6e3df] shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-xs font-bold uppercase tracking-widest text-mutedbrown mb-4">Active Conversations</h2>
          <div className="flex flex-col gap-2 overflow-y-auto pr-2">
            {conversations.length === 0 && !loading && (
              <p className="text-sm text-warmgray italic p-4">No active conversations found.</p>
            )}
            {conversations.map((conv) => (conv.userId && conv.userId !== 'hardcoded-admin-id' ? (
              <button
                key={conv.userId}
                onClick={() => setSelectedUser(conv)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${selectedUser?.userId === conv.userId ? 'bg-ivory border border-[#e6e3df]' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center text-charcoal">
                  <User size={18} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-sm font-bold text-charcoal truncate">{conv.userName}</h3>
                  <p className="text-xs text-warmgray truncate opacity-70">{conv.lastMessage}</p>
                </div>
                <div className="text-[9px] text-warmgray whitespace-nowrap">
                  {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </button>
            ) : null))}
          </div>
        </div>

        {/* Message View */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-[#e6e3df] shadow-sm flex flex-col overflow-hidden relative">
          {selectedUser ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-[#e6e3df] flex items-center justify-between bg-ivory/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center text-white">
                    {selectedUser.userName ? selectedUser.userName.charAt(0) : '?'}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{selectedUser.userName}</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[10px] uppercase tracking-widest text-warmgray font-bold">Client</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#fafaf9]">
                {messages.map((msg) => (
                  <div key={msg._id} className={`flex w-full ${msg.recipient !== "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${msg.recipient !== "admin" ? "bg-charcoal text-white rounded-br-none" : "bg-white border border-[#e6e3df] text-charcoal rounded-bl-none"}`}>
                      <p>{msg.text}</p>
                      <span className={`block text-[9px] mt-2 opacity-60 ${msg.recipient !== "admin" ? "text-right" : ""}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-[#e6e3df]">
                <form className="flex gap-3" onSubmit={handleSend}>
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-5 py-3.5 bg-ivory/50 border border-[#e6e3df] rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-charcoal/20"
                  />
                  <button 
                    type="submit"
                    className="bg-charcoal text-white p-3.5 rounded-2xl flex items-center justify-center hover:bg-mutedbrown transition-all shadow-lg active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-4">
              <div className="w-20 h-20 bg-ivory rounded-full flex items-center justify-center shadow-inner">
                <MessageSquare size={40} className="text-warmgray/30" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-charcoal mb-2">Alpha Conversations</h3>
                <p className="text-sm text-warmgray max-w-xs mx-auto">Select a client conversation to begin communicating. All messages are stored securely in your dashboard.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
