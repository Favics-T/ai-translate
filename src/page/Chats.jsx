import React, { useState } from 'react';
import { BsTranslate } from "react-icons/bs";
import { MdSummarize, MdArrowDropDownCircle } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";

const Chats = () => {
    const [userInput, setUserInput] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [detectedLanguage, setDetectedLanguage] = useState(null);

    const languages = ['English (en)', 'Portuguese (pt)', 'Spanish (es)', 'Russian (ru)', 'Turkish (tr)', 'French (fr)'];

    const handleSummarize = async () => {
        if (!userInput.trim()) {
            alert("Please enter text to summarize.");
            return;
        }

        setLoading(true);
        try {
            const summarizer = await self.ai.summarizer.create();
            const summaryResult = await summarizer.summarize(userInput);
            setSummary(summaryResult || "No summary available.");
        } catch (error) {
            console.error("Summarization failed:", error);
            setSummary("Failed to generate summary.");
        }
        setLoading(false);
    };

    const detectLanguage = async () => {
        if (!userInput.trim()) {
            alert("Please enter text to detect language.");
            return;
        }

        try {
            const detector = await self.ai.languageDetector.create();
            const result = await detector.detect(userInput);

            if (result?.length > 0 && result[0].detectedLanguage) {
                setDetectedLanguage(result[0].detectedLanguage);
            } else {
                setDetectedLanguage("Could not detect language.");
            }
        } catch (error) {
            console.error("Language detection failed:", error);
            setDetectedLanguage("Detection failed.");
        }
    };

    return (
        <div className='bg-[#a4caeb] md:h-auto h-auto w-full flex justify-center py-4'>
            <div className='bg-[#09122C] text-white rounded-[30px] md:w-[700px] w-[350px] h-[120vh] flex flex-col gap-[37px] justify-center md:pt-20 pt-10 px-10'>

                {/* Title Section */}
                <div>
                    <h1 className='md:text-4xl text-3xl font-extrabold text-[rgb(255,105,140)] font-Sigmar'>Hi dear,</h1>
                    <h1 className='md:text-3xl text-blue-500 text-2xl font-Sigmar'>
                        Summarize, Translate and Detect Language with <span className='text-blue-700 font-bold'>PGpt</span>
                    </h1>
                </div>

                {/* Feature Cards */}
                <div className='flex md:flex-row md:gap-10 gap-2'>
                    <div className='flex flex-col rounded-xl font-Oswald text-[16px] p-2 md:gap-[40px] h-40 border text-blue-500 border-blue-300 w-1/3 md:w-1/4'>
                        <h1><span className='text-blue-700 cursor-pointer md:text-xl font-extrabold'
                        onClick={handleSummarize}>                            
                            Summarize</span> words greater than 150</h1>
                        <MdSummarize className='text-3xl text-blue-500' />
                    </div>

                    <div className='flex flex-col rounded-xl font-Oswald text-[16px] p-2 md:gap-[40px] gap-4 h-40 border text-blue-500 border-blue-300 w-1/3 md:w-1/4'>
                        <h1 className='text-[12px]'><span className='text-blue-700 md:text-xl font-extrabold'>Translate</span> from one language to another with PGPT</h1>
                        <BsTranslate className='text-3xl text-blue-500' />
                    </div>

                    <div className='flex flex-col rounded-xl font-Oswald text-[16px] p-2 md:gap-[40px] gap-2 text-blue-500 border-blue-300 h-40 border w-1/3 md:w-1/4'>
                        <h1><span className='text-blue-700 cursor-pointer md:text-xl font-extrabold'
                        onClick={detectLanguage}>Language Detector</span> Detects Language</h1>
                        <MdOutlineLanguage className='text-3xl text-blue-500' />
                    </div>
                </div>

                {/* Output Section */}
                <div>
                    <textarea 
                        className='px-4 py-4 w-full overflow-y-scroll' 
                        placeholder='Output here'
                        value={loading ? "Summarizing..." : summary}
                        readOnly
                    />
                    <div><h1 className='font-bold text-blue-500'>Language Detected: <span>{detectedLanguage}</span></h1></div>
                </div>

                {/* Input Field */}
                <div className='border border-blue-500 rounded-[24px] relative'>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter text here..."
                        className='px-4 py-2 w-full'
                    ></textarea>
                    <MdArrowDropDownCircle 
                        onClick={() => setDropDown(!dropDown)}
                        className='absolute text-blue-500 right-2 bottom-2 cursor-pointer'
                    />
                </div>

                {/* Languages List */}
                {dropDown && (
                    <div className="bg-[#09122C] border border-blue-500 w-40 rounded-md ml-24 md:ml-[435px] -mt-10 p-2 max-h-40 overflow-y-auto">
                        <ul className="text-white  space-y-2">
                            {languages.map((lang, index) => (
                                <li 
                                    key={index} 
                                    className="cursor-pointer hover:bg-blue-500 px-2 py-1 rounded-md  transition duration-200"
                                    onClick={() => {
                                        setUserInput(lang);
                                        setDropDown(false);
                                    }}
                                >
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Languages List Ends Here */}
            </div>
        </div>
    );
}

export default Chats;
