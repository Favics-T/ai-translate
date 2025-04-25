import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { MdSummarize } from "react-icons/md";

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("");

  const languages = [
    { name: "English", code: "en" },
    { name: "Portuguese", code: "pt" },
    { name: "Spanish", code: "es" },
    { name: "Russian", code: "ru" },
    { name: "Turkish", code: "tr" },
    { name: "French", code: "fr" },
  ];

  const addMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateMessage = (index, updates) => {
    setMessages((prev) => prev.map((msg, i) => (i === index ? { ...msg, ...updates } : msg)));
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage = { text: userInput, detectedLanguage: "Unknown", summary: null, translation: null };
    addMessage(newMessage);
    setUserInput("");
    detectLanguage(messages.length);
  };

  const detectLanguage = async (index) => {
    setLoading(true);
    try {
      const detector = await self.ai.languageDetector.create();
      const result = await detector.detect(messages[index].text);
      updateMessage(index, { detectedLanguage: result?.[0]?.detectedLanguage || "Unknown" });
    } catch (error) {
      console.error("Language detection failed:", error);
    }
    setLoading(false);
  };

  const handleSummarize = async (index) => {
    setLoading(true);
    try {
      const summarizer = await self.ai.summarizer.create();
      const summaryResult = await summarizer.summarize(messages[index].text);
      updateMessage(index, { summary: summaryResult || "No summary available." });
    } catch (error) {
      console.error("Summarization failed:", error);
    }
    setLoading(false);
  };

  const handleTranslate = async (index, targetLang) => {
    if (!targetLang) return;
    setLoading(true);
    try {
      const translator = await self.ai.translator.create();
      const translationResult = await translator.translate(messages[index].text, targetLang);
      updateMessage(index, { translation: translationResult || "Translation not available." });
    } catch (error) {
      console.error("Translation failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#a4caeb] min-h-screen w-full flex flex-col justify-center py-4">
      <div className="bg-[#09122C] text-white rounded-[30px] w-full max-w-2xl my-10 p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-[rgb(255,105,140)]">Hi dear,</h1>
          <h1 className="text-2xl text-blue-500">
            Summarize, Translate, and Detect Language with <span className="text-blue-700">PGpt</span>
          
          </h1>
          <h1>
            
          </h1>
        </div>
        <div className="h-[50vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 rounded-lg bg-gray-800">
              <p className="text-white">{msg.text}</p>
              <div className="flex my-2 text-blue-500 gap-4 border w-full px-2 py-2 border-blue-300 rounded-xl">
                <p className="text-sm">
                  <span className="font-extrabold">Language:</span> {msg.detectedLanguage}
                </p>
                {msg.text.length > 150 && msg.detectedLanguage === "en" && (
                  <button
                    className="text-blue-500 underline hover:text-blue-300"
                    onClick={() => handleSummarize(index)}
                  >
                    Summarize <MdSummarize />
                  </button>
                )}
                <select
                  className="text-black px-2 py-1 rounded-md"
                  onChange={(e) => handleTranslate(index, e.target.value)}
                  value={targetLanguage}
                >
                  <option value="">Translate</option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
              {msg.summary && <p className="mt-2 text-blue-500"><span className="font-extrabold">Summary:</span> {msg.summary}</p>}
              {msg.translation && <p className="mt-2 text-green-400"><span className="font-extrabold">Translation:</span> {msg.translation}</p>}
            </div>
          ))}
        </div>
        <div className="relative">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter text here..."
            className="w-full px-4 py-2 rounded-lg border border-blue-500"
          ></textarea>
          <div className="absolute right-4 bottom-2 flex text-blue-500 text-2xl gap-2">
            <button className="cursor-pointer" onClick={handleSendMessage}>
              <BsSend />
              <p className="text-sm">Send</p>
            </button>
          </div>
        </div>
      </div>

      <div className="h-96 bg-white">

      </div>
    </div>
  );
};

export default Chats;