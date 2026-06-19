import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail, MapPin } from 'lucide-react';
import axios from 'axios';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('8801851075537');
  const [contactPhone, setContactPhone] = useState('+880 1851-075537');
  const [contactEmail, setContactEmail] = useState('chirkutghor@gmail.com');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Chirkut Ghor. How can we help you today?",
      sender: 'support',
      timestamp: new Date().toISOString()
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings/site');
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
        if (data.contactPhone) setContactPhone(data.contactPhone);
        if (data.contactEmail) setContactEmail(data.contactEmail);
      } catch {
        // keep defaults
      }
    };
    fetchSettings();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickMessages = [
    "I want to know about gift prices",
    "Track my order status",
    "Need gift suggestions",
    "What are the delivery charges?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      const confirmMessage = {
        id: Date.now() + 1,
        text: "Message sent! We'll reply on WhatsApp shortly.",
        sender: 'support',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, confirmMessage]);
    }, 500);

    setMessage('');
  };

  const handleQuickMessage = (text) => {
    setMessage(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300"
          aria-label="Open WhatsApp Chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chirkut Ghor Support</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-green-500 text-white rounded-br-md'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Messages */}
          <div className="px-4 py-2 border-t border-gray-100 bg-white">
            <p className="text-xs text-gray-400 mb-2">Quick messages:</p>
            <div className="grid grid-cols-2 gap-1.5">
              {quickMessages.map((quick, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(quick)}
                  className="text-left text-xs bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-3 py-2 transition-colors"
                >
                  {quick}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-green-500 text-white p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                aria-label="Send Message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-around text-xs text-gray-500 border-t border-gray-100 pt-2">
              <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-green-600 transition-colors">
                <Phone className="h-3 w-3" />
                <span>Call Us</span>
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-1 hover:text-green-600 transition-colors">
                <Mail className="h-3 w-3" />
                <span>Email</span>
              </a>
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <MapPin className="h-3 w-3" />
                <span>Cox's Bazar</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
