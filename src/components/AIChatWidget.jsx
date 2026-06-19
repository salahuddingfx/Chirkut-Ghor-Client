import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader } from 'lucide-react';
import axios from 'axios';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactPhone, setContactPhone] = useState('+8801851075537');
  const [contactEmail, setContactEmail] = useState('salauddinkaderappy@gmail.com');

  useEffect(() => {
    axios.get('/api/settings/site')
      .then(res => {
        if (res.data.contactPhone) setContactPhone(res.data.contactPhone);
        if (res.data.contactEmail) setContactEmail(res.data.contactEmail);
      })
      .catch(() => {});
  }, []);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Chirkut Ghor. How can I help you find the perfect gift today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Love Combos",
    "Anniversary gifts",
    "Birthday presents",
    "Under ৳3000"
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('custom') || msg.includes('customize') || msg.includes('personalize')) {
      return "We specialize in custom gift orders! You can customize personalized chirkuts, custom gift combos, and special occasion packages. Click the WhatsApp button to chat with our team directly.";
    } else if (msg.includes('love') || msg.includes('romantic')) {
      return "Our Love Combo Special (৳2500) includes a romantic chirkut, chocolates, and a teddy. Also check out Couple Rings Set (৳3500) and Valentine Special Combo (৳6500).";
    } else if (msg.includes('anniversary')) {
      return "For anniversaries, our Anniversary Surprise Box (৳5500) is the best seller! It includes a necklace, bangles, and a love note. Also check Couple Watch Set (৳7500).";
    } else if (msg.includes('birthday')) {
      return "Birthday Gift Box (৳3500) is very popular. For something special, try Premium Luxury Gift Box (৳9500) or Proposal Gift Box (৳8500).";
    } else if (msg.includes('chocolate')) {
      return "Premium Chocolate Gift Box (৳1500) and Heart Shape Chocolate Box (৳2200) are customer favorites!";
    } else if (msg.includes('jewellery') || msg.includes('jewelry')) {
      return "Check out Gold Plated Party Necklace (৳2500), Designer Bangles Set (৳1800), or Jhumka Earrings (৳1200).";
    } else if (msg.includes('price') || msg.includes('cheap') || msg.includes('under')) {
      return "Most affordable: Handwritten Chirkut (৳500), Artificial Rose Bouquet (৳800), Jhumka Earrings (৳1200). All under ৳1500!";
    } else if (msg.includes('best seller') || msg.includes('popular')) {
      return "Top sellers: Love Combo Special (৳2500), Anniversary Surprise Box (৳5500), and Valentine Special Combo (৳6500)!";
    } else if (msg.includes('delivery') || msg.includes('shipping')) {
      return "We deliver all over Bangladesh! Cox's Bazar: ৳70, other districts: ৳150. FREE delivery above ৳2500.";
    } else if (msg.includes('payment')) {
      return "We accept: Cash on Delivery (COD), bKash, Nagad, Rocket. For mobile banking, provide Transaction ID after payment.";
    } else if (msg.includes('contact') || msg.includes('support')) {
      return `Call: ${contactPhone} | Email: ${contactEmail} | WhatsApp available too!`;
    } else if (msg.includes('thank')) {
      return "You're welcome! Happy to help you find the perfect gift!";
    } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! How can I help you find the perfect gift today?";
    } else {
      return "I can help with Love & Anniversary Combos, Birthday Gifts, Custom Orders, Jewellery, and Chocolates. What are you looking for?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (text) => {
    setInputMessage(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-49 bg-maroon text-white p-3 rounded-full shadow-lg hover:bg-maroon-light transition-all duration-300"
          title="AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-20 md:bottom-24 right-6 z-50 w-[calc(100vw-1rem)] sm:w-80 md:w-96 h-[60vh] sm:h-[65vh] md:h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-maroon rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Gift Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.sender === 'user'
                      ? 'bg-maroon text-white'
                      : 'bg-white text-gray-700 border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className={`text-xs mt-1.5 block ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-700 rounded-2xl px-4 py-3 border border-gray-100 flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin text-maroon" />
                  <span className="text-sm">Typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-white">
              <p className="text-xs text-gray-400 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-maroon/10 hover:bg-maroon/20 text-maroon px-3 py-1.5 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about gifts..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-maroon text-white p-2.5 rounded-xl hover:bg-maroon-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
