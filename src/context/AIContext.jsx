import React, { createContext, useContext, useState, useEffect } from 'react';
import { aiService } from '../services/aiService';

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'planner' | 'budget' | 'packing' | 'safety' | 'recommendations' | 'history'
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [contextData, setContextData] = useState(null);

  // Load chat history and plans on mount
  useEffect(() => {
    const history = aiService.getAIHistory();
    if (history && history.length > 0) {
      setMessages(history);
    } else {
      // Welcome seed message
      const welcomeMsg = {
        id: 'welcome-seed',
        role: 'assistant',
        content: `👋 Namaste! I am your **AdventureX AI Smart Travel Assistant**.\n\nI can help you build custom day-by-day itineraries, optimize your travel budget in **₹ INR**, check required packing gear, and ensure Himalayan safety.\n\nHow can I help fuel your next journey today?`,
        suggestedActions: [
          'Suggest adventures under ₹15000',
          'Best trek for beginners',
          'Best destination in December',
          'Budget trip for friends'
        ],
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMsg]);
    }

    setSavedPlans(aiService.getSavedPlans());
  }, []);

  // Send message
  const sendMessage = async (userText) => {
    if (!userText || !userText.trim()) return;

    const trimmed = userText.trim();
    const userMsg = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    aiService.saveMessageToHistory(userMsg);
    setIsLoading(true);

    try {
      const response = await aiService.askAI(trimmed, contextData);
      const assistantMsg = {
        id: 'ast-' + Date.now(),
        role: 'assistant',
        content: response.text || response.content || 'I can help with that adventure!',
        adventures: response.adventures || [],
        suggestedActions: response.suggestedActions || [],
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMsg]);
      aiService.saveMessageToHistory(assistantMsg);
    } catch (err) {
      console.error('Error in AI Assistant communication:', err);
      const errorMsg = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: 'I encountered a brief trail obstruction. Let me check the route again for you.',
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Open assistant with optional tab and prompt
  const openAssistant = (tab = 'chat', initialPrompt = null, data = null) => {
    setActiveTab(tab);
    if (data) setContextData(data);
    setIsOpen(true);
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  // Clear chat history
  const clearChat = () => {
    aiService.clearAIHistory();
    const freshWelcome = {
      id: 'welcome-fresh-' + Date.now(),
      role: 'assistant',
      content: `Chat history cleared. How can I assist your adventure planning today?`,
      suggestedActions: [
        'Suggest adventures under ₹15000',
        'Best trek for beginners',
        'Packing list for Kedarkantha'
      ],
      timestamp: new Date().toISOString()
    };
    setMessages([freshWelcome]);
  };

  const refreshSavedPlans = () => {
    setSavedPlans(aiService.getSavedPlans());
  };

  const value = {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    isLoading,
    messages,
    sendMessage,
    openAssistant,
    closeAssistant,
    clearChat,
    savedPlans,
    refreshSavedPlans,
    contextData,
    setContextData
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export default AIContext;
