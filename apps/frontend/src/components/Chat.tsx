import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  userId: number;
  displayName: string;
  text: string;
  createdAt: string;
}

interface ChatProps {
  spaceId: string;
  currentUserId: string | null;
  isFullscreen: boolean;
  onSendMessage: (message: string) => void;
  messages: Message[];
}

export const Chat = ({
  currentUserId,
  isFullscreen,
  onSendMessage,
  messages,
}: ChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(newMessage.trim());
    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div
      className={`bg-slate-800/90 backdrop-blur-sm border-l border-slate-700 flex flex-col ${
        isFullscreen ? 'h-full' : 'h-[60vh]'
      }`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Space Chat
        </h3>
        <p className="text-slate-400 text-xs mt-1">
          {messages.length} messages
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">Be the first to say hello!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage =
              currentUserId && message.userId === parseInt(currentUserId);
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    isOwnMessage
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-medium ${
                        isOwnMessage ? 'text-blue-100' : 'text-slate-300'
                      }`}
                    >
                      {isOwnMessage ? 'You' : message.displayName}
                    </span>
                    <span
                      className={`text-xs ${
                        isOwnMessage ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm break-words">{message.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-slate-700 bg-slate-800/50"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              // Prevent Phaser from capturing keyboard events when input is focused
              e.stopPropagation();
            }}
            onKeyUp={(e) => {
              // Prevent Phaser from capturing keyboard events when input is focused
              e.stopPropagation();
            }}
            onFocus={() => {
              // Disable Phaser input when chat input is focused
              const gameScene = document.querySelector(
                '.phaser-game-container canvas'
              ) as HTMLCanvasElement;
              if (gameScene) {
                gameScene.style.pointerEvents = 'none';
              }
            }}
            onBlur={() => {
              // Re-enable Phaser input when chat input loses focus
              const gameScene = document.querySelector(
                '.phaser-game-container canvas'
              ) as HTMLCanvasElement;
              if (gameScene) {
                gameScene.style.pointerEvents = 'auto';
              }
            }}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-slate-400">
            {newMessage.length}/500
          </span>
        </div>
      </form>
    </div>
  );
};
