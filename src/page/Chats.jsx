import React, { useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { MdSummarize } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { BsSend } from "react-icons/bs";

const Chats = () => {
    const [messages, setMessages] = useState([]);
      const [userInput, setUserInput] = useState("");
      const [loading, setLoading] = useState(false);
    
      const languages = [
        { name: "English", code: "en" },
        { name: "Portuguese", code: "pt" },
        { name: "Spanish", code: "es" },
        { name: "Russian", code: "ru" },
        { name: "Turkish", code: "tr" },
        { name: "French", code: "fr" },
      ];
    
      const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        const newMessage = { text: userInput, detectedLanguage: null, summary: null, translation: null };
        setMessages((prev) => [...prev, newMessage]);
        setUserInput("");
        await detectLanguage(newMessage);
      };
    
      const detectLanguage = async (message) => {
        setLoading(true);
        try {
          const detector = await self.ai.languageDetector.create();
          const result = await detector.detect(message.text);
          const detectedLang = result?.[0]?.detectedLanguage || "Unknown";
          updateMessage(message, { detectedLanguage: detectedLang });
        } catch (error) {
          console.error("Language detection failed:", error);
        }
        setLoading(false);
      };
    
      const handleSummarize = async (message) => {
        setLoading(true);
        try {
          const summarizer = await self.ai.summarizer.create();
          const summaryResult = await summarizer.summarize(message.text);
          updateMessage(message, { summary: summaryResult || "No summary available." });
        } catch (error) {
          console.error("Summarization failed:", error);
        }
        setLoading(false);
      };
    
      const handleTranslate = async (message, targetLang) => {
        setLoading(true);
        try {
          const translator = await self.ai.translator.create();
          const translatedText = await translator.translate(message.text, targetLang);
          updateMessage(message, { translation: translatedText });
        } catch (error) {
          console.error("Translation failed:", error);
        }
        setLoading(false);
      };
    
      const updateMessage = (message, updates) => {
        setMessages((prev) =>
          prev.map((msg) => (msg === message ? { ...msg, ...updates } : msg))
        );
      };

    return (
        <div className="bg-[#a4caeb] text-Oswald min-h-screen md:h-auto h-auto w-full flex justify-cente py-4">
            <div className="bg-[#09122C] text-white rounded-[30px] md:w-full my-10 mx-auto md:mx-10 md:my-10 w-[350px] h-[120vh] flex flex-col gap-[37px] md:pt-20 pt-10 px-10">
                
                {/* Title Section */}
                <div>
                    <h1 className="md:text-4xl text-3xl font-extrabold text-[rgb(255,105,140)] font-Oswald">Hi dear,</h1>
                    <h1 className="md:text-3xl text-blue-500 text-2xl font-Sigmar">
                        Summarize, Translate and Detect Language with <span className="text-blue-700">PGpt</span>
                    </h1>
                </div>

                {/* Chat Messages */}
                <div className="h-[60vh] overflow-y-auto">
                     {messages.map((msg, index) => (
                                <div key={index} className="p-3 rounded-lg bg-">
                                  <p className="text-">{msg.text}</p>
                                  <div className="flex my-2 text-blue-500 gap-4 border md:w-[200px] w-44 px-2 py-2 border-blue-300 rounded-xl ">
                                  <p className="text-sm text"><span className="font-extrabold">Language:</span> {msg.detectedLanguage}</p>
                                  {msg.text.length > 150 && msg.detectedLanguage === "en" && (
                                    <button className="text-blue-500 flex-col  cursor-pointer" onClick={() => handleSummarize(msg)}>
                                   <span className="font-extrabold underline hover:text-blue-300 "> Summarize </span> <MdSummarize /> 
                                    </button>
                                  )}
                                
                                  </div>
                                  
                                  {msg.summary && <p className="mt-2 text-blue-500 "> <span className="block font-extrabold text-2xl">Summary:</span> {msg.summary}</p>}
                                  {msg.translation && <p className="mt-2 text-gray-700">Translation: {msg.translation}</p>}
                                </div>
                              ))}
                </div>

                {/* Input Field */}
                <div className="absolute md:-bottom-20 -bottom-36 w-[290px] md:w-[1200px]">
                    <div className="border border-blue-500 rounded-[24px] relative">
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Enter text here..."
                            className="px-4 py-2 w-full"
                        ></textarea>

                              

                        <div className="flex text-blue-500 absolute right-4 text-2xl bottom-1 gap-2">
                            
                        <div className="mt-2 flex space-x-2">
                                    <select className=" text-xl" onChange={(e) => handleTranslate(msg, e.target.value)}>
                                      <option value=""></option>
                                      {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                                      ))}
                                    </select>
                                    {/* <button className="text-green-500" onClick={() => handleTranslate(msg, msg.targetLang)}>
                                      <MdOutlineLanguage /> Translate
                                    </button> */}
                                  </div>
                            
                            <div className="cursor-pointer" onClick={handleSendMessage}>
                                <BsSend />
                                <p className="text-[8px]">Send</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Chats;
