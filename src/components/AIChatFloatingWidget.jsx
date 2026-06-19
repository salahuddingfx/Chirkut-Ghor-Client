import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import axios from 'axios';

const AIChatFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Chirkut Ghor. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [deliverySettings, setDeliverySettings] = useState({
    chittagongFee: 70,
    outsideChittagongFee: 150,
    freeShippingThreshold: 2500,
  });
  const [contactPhone, setContactPhone] = useState('+880 1851-075537');
  const [contactEmail, setContactEmail] = useState('salauddinkaderappy@gmail.com');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings/site');
        if (data.chittagongFee) setDeliverySettings(prev => ({ ...prev, chittagongFee: data.chittagongFee }));
        if (data.outsideChittagongFee) setDeliverySettings(prev => ({ ...prev, outsideChittagongFee: data.outsideChittagongFee }));
        if (data.freeShippingThreshold) setDeliverySettings(prev => ({ ...prev, freeShippingThreshold: data.freeShippingThreshold }));
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

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('love') || msg.includes('romantic') || msg.includes('প্রেম')) {
      return "Our Love Combo Special (৳2500) includes a handwritten chirkut, chocolates, and a teddy bear. We also have Couple Rings Set (৳3500) and Valentine Special Combo (৳6500).";
    } else if (msg.includes('anniversary') || msg.includes('বার্ষিকী')) {
      return "Our Anniversary Surprise Box (৳5500) is our best seller! It includes a necklace, bangles, and a love note. Also check out Couple Watch Set (৳7500).";
    } else if (msg.includes('birthday') || msg.includes('জন্মদিন')) {
      return "Birthday Gift Box (৳3500) is very popular. For something extra special, try Premium Luxury Gift Box (৳9500) or Proposal Gift Box (৳8500).";
    } else if (msg.includes('chocolate') || msg.includes('চকলেট')) {
      return "We have Premium Chocolate Gift Box (৳1500) with assorted chocolates, and Heart Shape Chocolate Box (৳2200) for romantic occasions!";
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('দাম')) {
      return "Products range from ৳500 (Handwritten Chirkut) to ৳9500 (Premium Luxury Gift Box). Most popular items are between ৳1500-৳5500.";
    } else if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('ডেলিভারি')) {
      return `Cox's Bazar: ৳${deliverySettings.chittagongFee} | Other districts: ৳${deliverySettings.outsideChittagongFee} | FREE delivery above ৳${deliverySettings.freeShippingThreshold}.`;
    } else if (msg.includes('payment') || msg.includes('পেমেন্ট')) {
      return "We accept: Cash on Delivery (COD), bKash, Nagad, Rocket. For mobile banking, please provide Transaction ID after payment.";
    } else if (msg.includes('track') || msg.includes('order') || msg.includes('অর্ডার')) {
      return "You can track your order from 'My Orders' page after logging in, or use the Track Order page with your order ID, email, or phone number.";
    } else if (msg.includes('contact') || msg.includes('call') || msg.includes('যোগাযোগ')) {
      return `Call us: ${contactPhone} | Email: ${contactEmail} | WhatsApp: Click the green button on left!`;
    } else if (msg.includes('gift') || msg.includes('suggest') || msg.includes('উপহার')) {
      return "What's the occasion? Love/Romance, Birthday, Anniversary, Proposal, Valentine's, or Graduation? Tell me and I'll suggest perfect gifts!";
    } else if (msg.includes('thanks') || msg.includes('thank') || msg.includes('ধন্যবাদ')) {
      return "You're welcome! Feel free to ask anything anytime. Happy shopping at Chirkut Ghor!";
    } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('হাই')) {
      return "Hello! I'm here to help you find the perfect gift. What occasion are you shopping for today?";
    } else {
      return "I'd love to help! Try asking about: Love gifts, Birthday presents, Anniversaries, Delivery, Payment options, or Gift suggestions.";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 lg:bottom-6 right-6 z-50 bg-maroon text-white rounded-full p-4 shadow-lg transition-all duration-300"
          aria-label="Open AI Chat"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[50vh] sm:h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-maroon rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.sender === 'user'
                      ? 'bg-maroon text-white rounded-br-md'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1.5 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {new Date(message.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-maroon"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-maroon text-white p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                aria-label="Send Message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              Powered by Chirkut Ghor AI
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatFloatingWidget;
