import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import SettingsDrawer from './components/SettingsDrawer';
import WelcomeHero from './components/WelcomeHero';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import QuickPromptChips from './components/QuickPromptChips';
import { sendMessage as apiSendMessage } from './services/api';
import { useChats } from './hooks/useChats';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const {
    chats,
    activeChatId,
    messages,
    isLoading,
    handleSelectChat,
    handleNewChat,
    handleDeleteChat,
    handleClearAll,
    handleSendMessage,
    setMessages
  } = useChats();

  const handlePromptSelect = async (prompt) => {
    setIsTyping(true);
    await handleSendMessage(prompt, async (text) => {
      return await apiSendMessage(text);
    });
    setIsTyping(false);
  };

  const onUserSend = async (text, pdfContext) => {
    setIsTyping(true);
    await handleSendMessage(text, async (msg) => {
      // In InputArea, the API takes text and { pdfContext }
      const res = await apiSendMessage(msg, { pdfContext });
      return res;
    });
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-transparent flex overflow-hidden font-sans text-text-main">
      <div className="bg-floating-farm"></div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onClearAll={handleClearAll}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopNavigation 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          toggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} 
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
          <div className="w-full max-w-5xl flex flex-col gap-10 pb-40 mt-4 md:mt-10">
            
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-12 w-full">
                 <WelcomeHero />
                 {/* Empty state chips */}
                 <div className="w-full pt-4 flex justify-center">
                   <QuickPromptChips onSelectPrompt={handlePromptSelect} />
                 </div>
              </div>
            ) : (
              <ChatWindow messages={messages} isTyping={isTyping} />
            )}
          </div>
        </div>
        
        {/* Fixed Input Area at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent">
          <div className="max-w-4xl mx-auto w-full">
            <InputArea 
              onSend={onUserSend} 
              isChatEmpty={messages.length === 0} 
              setMessages={setMessages} 
            />
          </div>
        </div>
      </main>

      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
