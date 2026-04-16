import React, { useState, useRef, useEffect } from 'react';
import { Send, Book, Sparkles, AlertCircle, X, ChevronRight, Camera, Mic, Bot, MessageSquare, Square } from 'lucide-react';
import DynamicWhiteboard from '../../components/student/DynamicWhiteboard';

export default function EduTutor() {
  const [mode, setMode] = useState('voice'); // 'voice' or 'chat'
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('edututor_msgs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, sender: 'ai', type: 'text', content: 'Loading E.D.I.T.H...' }
    ];
  });
  
  useEffect(() => {
    sessionStorage.setItem('edututor_msgs', JSON.stringify(messages));
  }, [messages]);

  const [inputText, setInputText] = useState('');
  const [testMode, setTestMode] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [dynamicQuestion, setDynamicQuestion] = useState(null);
  const [proactiveSuggestion, setProactiveSuggestion] = useState(null);
  const [suggestedTopics, setSuggestedTopics] = useState([]);

  // States specific to voice mode
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mainContentRef = useRef(null);

  const [notepadActive, setNotepadActive] = useState(false);
  const [notepadData, setNotepadData] = useState(null);
  const [voicePrompt, setVoicePrompt] = useState('Initializing E.D.I.T.H...');
  const [typedVoicePrompt, setTypedVoicePrompt] = useState("");
  const [teachingMoments, setTeachingMoments] = useState([]);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(-1);

  // Fetch proactive greeting on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('edututor_msgs');
    if (saved && JSON.parse(saved).length > 1) return; // Don't re-greet if session exists
    
    fetch('http://localhost:8000/api/student/edututor/greeting')
      .then(res => res.json())
      .then(data => {
        setMessages([{ id: 1, sender: 'ai', type: 'text', content: data.greeting }]);
        setVoicePrompt(data.greeting);
        if (data.suggested_topics) setSuggestedTopics(data.suggested_topics);
      })
      .catch(() => {
        setMessages([{ id: 1, sender: 'ai', type: 'text', content: 'Hey there! I\'m E.D.I.T.H., your personal tutor. What would you like to learn today?' }]);
        setVoicePrompt('Hey there! What would you like to learn today?');
      });
  }, []);

  // Auto-scroll to reveal new moments on the board
  useEffect(() => {
    if (notepadActive && mainContentRef.current) {
      setTimeout(() => {
        mainContentRef.current.scrollTo({
          top: mainContentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 500); // Wait for fade-in animation
    }
  }, [currentMomentIndex, notepadActive]);

  const [isRecording, setIsRecording] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  // Global immersion: set body class when notepad is active
  useEffect(() => {
    if (notepadActive) {
      document.body.classList.add('board-active');
    } else {
      document.body.classList.remove('board-active');
    }
    return () => document.body.classList.remove('board-active');
  }, [notepadActive]);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const micStreamRef = useRef(null);
  const isSpeakingRef = useRef(false);

  // Typewriter effect logic
  useEffect(() => {
    // If it's a short system message, show it immediately
    const systemMessages = ["Listening...", "Thinking...", "Listening continuously... Talk naturally!"];
    if (systemMessages.includes(voicePrompt) || voicePrompt.length < 20) {
      setTypedVoicePrompt(voicePrompt);
      return;
    }

    // Otherwise, type it out
    setTypedVoicePrompt("");
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < voicePrompt.length) {
        currentText += voicePrompt[i];
        setTypedVoicePrompt(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25); // ~40 chars per second

    return () => clearInterval(interval);
  }, [voicePrompt]);

  // Unmount cleanup
  useEffect(() => {
    return () => {
      stopContinuousSession();
    };
  }, []);

  const testQuestions = [
    { q: "What is the standard form of a quadratic equation?", options: ["ax + b = 0", "ax^2 + bx + c = 0", "y = mx + c"] },
    { q: "If the discriminant is negative, the roots are:", options: ["Real and equal", "Real and distinct", "Not real"] }
  ];

  const SILENCE_THRESHOLD = 15; // Increased threshold to avoid getting stuck on background AC/fan noise
  const SILENCE_DURATION = 1500; // 1.5s of silence triggers sending

  const startContinuousSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      
      // Connect WebSocket
      wsRef.current = new WebSocket("ws://localhost:8000/api/student/edututor/stream");
      
      wsRef.current.onopen = () => {
        setSessionActive(true);
        setVoicePrompt("Listening continuously... Talk naturally!");
        startVAD(stream);
      };

      wsRef.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        const moments = data.teaching_moments || [];
        
        if (moments.length > 0) {
          setTeachingMoments(moments);
          setNotepadActive(true);
          
          for (let i = 0; i < moments.length; i++) {
            setCurrentMomentIndex(i);
            setVoicePrompt(moments[i].speech);
            
            if (moments[i].audio_base64) {
              await new Promise((resolve) => {
                const snd = new Audio("data:audio/mp3;base64," + moments[i].audio_base64);
                setIsSpeaking(true);
                isSpeakingRef.current = true;
                snd.play();
                snd.onended = () => {
                  setIsSpeaking(false);
                  isSpeakingRef.current = false;
                  resolve();
                };
                snd.onerror = resolve;
              });
            } else {
              // Delay for moments without audio
              await new Promise(r => setTimeout(r, 2000));
            }
          }
        }

        if (data.audio_base64) { // Single reply audio (non-moment)
          const snd = new Audio("data:audio/mp3;base64," + data.audio_base64);
          setIsSpeaking(true);
          isSpeakingRef.current = true;
          snd.play();
          snd.onended = () => {
             setIsSpeaking(false);
             isSpeakingRef.current = false;
          };
        }
        
        if (data.reply) setVoicePrompt(data.reply);
        if (data.question_data) setDynamicQuestion(data.question_data);
      };

      wsRef.current.onclose = () => {
         stopContinuousSession();
      };
    } catch (err) {
      console.error("Mic error", err);
      alert("Please allow microphone access.");
    }
  };

  const startVAD = (stream) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 512;
    source.connect(analyserRef.current);

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    let currentlyRecording = false;
    
    // Internal functions
    const startSegment = () => {
      let options = { mimeType: 'audio/webm' };
      if (typeof MediaRecorder !== 'undefined' && !MediaRecorder.isTypeSupported('audio/webm')) {
          options = {}; // Use browser default (like MP4 on Safari)
      }
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => { if(e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      currentlyRecording = true;
    };

    const stopSegmentAndSend = () => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') return;
      mediaRecorderRef.current.onstop = () => {
         const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
         if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
             setVoicePrompt("Thinking...");
             setIsSpeaking(true);
             isSpeakingRef.current = true;
             wsRef.current.send(blob);
         }
      };
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      currentlyRecording = false;
    };

    const monitorLoop = () => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
      
      // Do not process microphone volumes if the AI is currently talking (avoids echo loops!)
      if (isSpeakingRef.current) {
         requestAnimationFrame(monitorLoop);
         return;
      }
      
      analyserRef.current.getByteFrequencyData(dataArray);
      let sum = 0; for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avgVolume = sum / dataArray.length;

      if (avgVolume > SILENCE_THRESHOLD) {
        if (!currentlyRecording) startSegment();
        if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
      } else {
        if (currentlyRecording && !silenceTimerRef.current) {
           silenceTimerRef.current = setTimeout(() => {
              stopSegmentAndSend();
              silenceTimerRef.current = null;
           }, SILENCE_DURATION);
        }
      }
      requestAnimationFrame(monitorLoop);
    };

    monitorLoop();
  };

  const stopContinuousSession = () => {
     setSessionActive(false);
     setIsRecording(false);
     setVoicePrompt("Session Ended.");
     if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
     if (wsRef.current) wsRef.current.close();
     if (audioContextRef.current) audioContextRef.current.close();
     if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
     }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userText = inputText.trim();
    
    // Add to history
    const newMsg = { id: Date.now(), sender: 'user', type: 'text', content: userText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setDynamicQuestion(null);

    if (mode === 'voice') {
      setVoicePrompt("Thinking...");
      setIsSpeaking(true);
    }

    try {
      const apiMessages = messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.content
      }));
      apiMessages.push({ role: 'user', content: userText });

      const response = await fetch("http://localhost:8000/api/student/edututor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, mode: mode })
      });

      if (!response.ok) throw new Error("Backend connection failed.");
      
      const data = await response.json();
      
      if (mode === 'chat') {
        const moments = data.teaching_moments || [];
        const fullReply = moments.map(m => m.speech).join(" ");
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', type: 'text', content: fullReply }]);
        
        if (moments.length > 0) {
          setTeachingMoments(moments);
          setNotepadActive(true);
          // Reveal all moments immediately in chat mode
          setCurrentMomentIndex(moments.length - 1);
        }
      } else {
        const moments = data.teaching_moments || [];
        if (moments.length > 0) {
          setTeachingMoments(moments);
          setNotepadActive(true);
          
          for (let i = 0; i < moments.length; i++) {
            setCurrentMomentIndex(i);
            setVoicePrompt(moments[i].speech);
            
            if (moments[i].audio_base64) {
              await new Promise((resolve) => {
                const snd = new Audio("data:audio/mp3;base64," + moments[i].audio_base64);
                setIsSpeaking(true);
                isSpeakingRef.current = true;
                snd.play();
                snd.onended = () => {
                  setIsSpeaking(false);
                  isSpeakingRef.current = false;
                  resolve();
                };
                snd.onerror = resolve;
              });
            }
          }
        } else {
          setVoicePrompt("I couldn't generate teaching moments for that.");
          setIsSpeaking(false);
        }
        if (data.question_data) setDynamicQuestion(data.question_data);
        if (data.proactive_suggestion) setProactiveSuggestion(data.proactive_suggestion);
      }
    } catch (err) {
      console.error(err);
      if (mode === 'chat') {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', type: 'text', content: "Error: Could not connect to the EduSync FastAPI Backend." }]);
      } else {
        setVoicePrompt("Voice processing failed. Please check the backend.");
        setIsSpeaking(false);
      }
    }
  };

  const startTest = () => {
    setTestMode(true);
    setTestStep(0);
    if (mode === 'voice') setVoicePrompt("Question 1: " + testQuestions[0].q);
  };

  const handleTestAnswer = (index) => {
    if (testStep === 0 && index !== 1) { // Incorrect answer
      setTestMode(false);
      
      if (mode === 'chat') {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), sender: 'user', type: 'text', content: 'I selected: ' + testQuestions[0].options[index] },
          { id: Date.now() + 1, sender: 'ai', type: 'diagnostic_fail', content: 'Hmm, that seems like a misconception. Let\'s step back. A quadratic equation MUST have a squared term. Which option has x^2?' }
        ]);
      } else {
        // Voice mode fail
        setIsSpeaking(true);
        setVoicePrompt("I detected a slight misconception there. A quadratic equation must have a squared term, meaning a degree of two. Let's look at the options again.");
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    } else {
      setTestStep(1);
    }
  };

  return (
    <div className="layout-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100%', 
      paddingBottom: '70px', 
      background: notepadActive ? '#fff' : 'var(--bg)',
      transition: 'background 0.5s ease'
    }}>
      {/* Header with Mode Toggle */}
      <div className="page-header" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '16px' }}>
          <h1 className="page-header-title" style={{ fontSize: '18px', textAlign: 'center' }}>E.D.I.T.H.</h1>
          <div style={{ position: 'absolute', right: 0, fontSize: '12px', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} /> Online
          </div>
        </div>

        {/* Sliding Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg)', borderRadius: '24px', padding: '4px', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            top: 4, 
            bottom: 4, 
            left: mode === 'voice' ? '4px' : '50%', 
            width: 'calc(50% - 4px)', 
            background: 'var(--surface)', 
            borderRadius: '20px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
          }} />
          <button 
            style={{ flex: 1, padding: '8px 0', border: 'none', background: 'transparent', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: mode === 'voice' ? 'var(--primary)' : 'var(--muted)', cursor: 'pointer' }}
            onClick={() => setMode('voice')}
          >
            <Mic size={16} /> Interactive Tutor
          </button>
          <button 
            style={{ flex: 1, padding: '8px 0', border: 'none', background: 'transparent', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: mode === 'chat' ? 'var(--primary)' : 'var(--muted)', cursor: 'pointer' }}
            onClick={() => setMode('chat')}
          >
            <MessageSquare size={16} /> Text Chat
          </button>
        </div>
      </div>

      {/* Syllabus Guardrail Banner */}
      <div style={{ background: 'var(--blue-light)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#1e40af', fontWeight: 600, borderBottom: '1px solid #bfdbfe', flexShrink: 0 }}>
        <Book size={14} /> Strict Maharashtra SSC Syllabus Mode Active
      </div>

      {/* Main Content Area — No internal scroll, let page-scroll handle it */}
      <div 
        ref={mainContentRef}
        style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'auto', scrollbarWidth: 'none' }}
      >
        
        {/* === VOICE MODE === */}
        {mode === 'voice' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: notepadActive ? '0' : '24px 16px', position: 'relative' }}>
            
            {/* Avatar & Speak Area (Relative when normal, floated absolute when notepad active) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: notepadActive ? 'row' : 'column', position: notepadActive ? 'absolute' : 'relative', width: '100%', zIndex: 110, padding: notepadActive ? '16px' : '0' }}>
              
              <div className={`avatar-pulse-container ${isSpeaking ? 'speaking' : ''} ${notepadActive ? 'mini' : ''}`}>
                <div className="avatar-circle">
                  <Bot size={notepadActive ? 18 : 48} color="#fff" />
                </div>
                <div className="pulse-ring ring-1"></div>
                <div className="pulse-ring ring-2"></div>
              </div>
              
              {/* Spoken Text Display */}
              {!notepadActive && (
                <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '18px', fontWeight: 500, color: 'var(--text)', maxWidth: '90%', lineHeight: 1.4, padding: '0 10px' }}>
                  {typedVoicePrompt}
                </div>
              )}

              {/* Suggestion Chips — shown when agent has topic recommendations */}
              {!notepadActive && suggestedTopics.length > 0 && !sessionActive && (
                <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '90%' }}>
                  {suggestedTopics.map((topic, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setInputText(`Explain ${topic}`);
                        setTimeout(() => {
                          const fakeEvent = { preventDefault: () => {} };
                          document.getElementById('edututor-send-btn')?.click();
                        }, 100);
                      }}
                      style={{ 
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        border: '1.5px solid var(--primary-light)', 
                        background: 'var(--surface)', 
                        fontSize: '13px', 
                        fontWeight: 600, 
                        color: 'var(--primary)', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Sparkles size={12} /> {topic}
                    </button>
                  ))}
                </div>
              )}

              {/* Proactive Nudge — shown when the agent has a suggestion */}
              {!notepadActive && proactiveSuggestion && (
                <div style={{ 
                  marginTop: '16px', padding: '12px 16px', 
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
                  borderRadius: '12px', maxWidth: '85%', 
                  fontSize: '13px', color: '#92400e', fontWeight: 500,
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                  animation: 'slideUp 0.3s ease-out',
                  border: '1px solid #fbbf24',
                }}>
                  <Sparkles size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{proactiveSuggestion}</span>
                  <button onClick={() => setProactiveSuggestion(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                    <X size={14} color="#92400e" />
                  </button>
                </div>
              )}
            </div>

            {/* Simulated Edge-to-Edge Notepad Canvas */}
            {notepadActive && (
              <div className="ai-notepad-canvas">
                
                {/* Voice Prompt shown cleanly at top of notepad */}
                <div style={{ paddingLeft: '48px', marginBottom: '24px', fontSize: '14px', fontWeight: 500, color: 'var(--primary)', lineHeight: 1.4 }}>
                  {typedVoicePrompt}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px', marginTop: '12px' }}>
                  <button onClick={() => setNotepadActive(false)} style={{ border: 'none', background: 'var(--bg)', borderRadius: '50%', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}>
                    <X size={16} color="var(--muted)" />
                  </button>
                </div>
                
                {/* Dynamic Board Rendering */}
                <DynamicWhiteboard 
                  moments={teachingMoments} 
                  currentMomentIndex={currentMomentIndex} 
                />
              </div>
            )}

            {/* Diagnostic Card Overlay (Voice Mode) */}
            {testMode && (
              <div style={{ width: '100%', background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1.5px solid var(--primary-light)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', animation: 'slideUp 0.3s ease-out' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>Q{testStep + 1} OF 5</div>
                  <button onClick={() => setTestMode(false)}><X size={16} color="var(--muted)" /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {testQuestions[testStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleTestAnswer(i)} style={{ padding: '16px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '12px', textAlign: 'left', fontSize: '15px', fontWeight: 600, color: 'var(--text)', display: 'flex', justifyContent: 'space-between' }}>
                      {opt} <ChevronRight size={18} color="var(--muted)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic AI-Generated Question (MCQ) */}
            {dynamicQuestion && (
              <div style={{ width: '100%', background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1.5px solid var(--orange-light)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', animation: 'slideUp 0.3s ease-out', marginTop: notepadActive ? '16px' : '0' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--orange)', marginBottom: '12px', letterSpacing: '0.5px' }}>CHECK YOUR UNDERSTANDING</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px', lineHeight: 1.4 }}>{dynamicQuestion.text}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dynamicQuestion.options.map((opt, i) => (
                    <button 
                      key={i} 
                      type="button"
                      aria-label={`Select option ${opt}`}
                      onClick={() => {
                        // For chat mode, we can just send it. 
                        // For voice mode, we might want to display it as a selection.
                        const newMsg = { id: Date.now(), sender: 'user', type: 'text', content: opt };
                        setMessages(prev => [...prev, newMsg]);
                        setDynamicQuestion(null);
                        
                        // Manually trigger handleSend with the option text
                        fetch("http://localhost:8000/api/student/edututor/chat", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            messages: [...messages.map(m => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.content })), { role: 'user', content: opt }], 
                            mode: mode 
                          })
                        }).then(res => res.json()).then(data => {
                          if (mode === 'chat') {
                            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', type: 'text', content: data.reply }]);
                          } else {
                            setVoicePrompt(data.reply);
                            if (data.audio_base64) {
                              const snd = new Audio("data:audio/mp3;base64," + data.audio_base64);
                              setIsSpeaking(true);
                              snd.play();
                              snd.onended = () => setIsSpeaking(false);
                            }
                          }
                          if (data.visual_aid) setNotepadData(data.visual_aid);
                          setDynamicQuestion(data.question_data || null);
                        });
                      }} 
                      style={{ padding: '14px 16px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', textAlign: 'left', fontSize: '14px', fontWeight: 500, color: 'var(--text)', display: 'flex', justifyContent: 'space-between', transition: 'all 0.2s ease', cursor: 'pointer' }}
                    >
                      {opt} <ChevronRight size={16} color="var(--muted)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* === CHAT MODE === */}
        {mode === 'chat' && (
          <div className="page-scroll" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {msg.sender === 'ai' && <div style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: '4px' }}>EduTutor</div>}
                
                <div style={{
                  background: msg.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                  color: msg.sender === 'user' ? '#fff' : 'var(--text)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  border: msg.sender === 'ai' ? '1.5px solid var(--border)' : 'none',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  position: 'relative'
                }}>
                  {msg.content}

                  {msg.type === 'diagnostic_fail' && (
                    <div style={{ marginTop: '12px', background: 'var(--red-light)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--red)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <AlertCircle size={14} /> Misconception Detected
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>
                        Switching to Socratic Tutoring mode.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {testMode && mode === 'chat' && (
              <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '16px', border: '1.5px solid var(--primary-light)', marginTop: '8px' }}>
                <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>{testQuestions[testStep].q}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {testQuestions[testStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleTestAnswer(i)} style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'left', fontSize: '14px' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Shared Input Area (Bottom) */}
      <div style={{ position: 'fixed', bottom: '65px', left: 0, right: 0, padding: '12px 16px', background: 'var(--surface)', borderTop: '1.5px solid var(--border)', zIndex: 50 }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'var(--bg)', borderRadius: '24px', border: '1.5px solid var(--border)', padding: '4px 4px 4px 16px' }}>
          
          <input 
            type="text" 
            placeholder={mode === 'voice' ? "Type or use voice..." : "Ask a doubt..."}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', outline: 'none' }}
          />

          {/* Multimodal Buttons */}
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
            <Camera size={18} />
          </button>
          
          {inputText.trim() || mode === 'chat' ? (
            <button 
              onClick={handleSend}
              style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
            >
              <Send size={18} style={{ transform: 'translateX(2px)' }} />
            </button>
          ) : sessionActive ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                title="Active Microphone"
                style={{ 
                  width: 40, height: 40, borderRadius: '50%', 
                  background: 'var(--red)', color: '#fff', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  border: 'none', cursor: 'default',
                  transform: isRecording ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  boxShadow: isRecording ? '0 0 12px var(--red)' : '0 0 4px var(--red)'
                }}
              >
                <Mic size={18} />
              </button>
              <button 
                title="End Voice Session"
                style={{ 
                  width: 40, height: 40, borderRadius: '50%', 
                  background: 'var(--surface)', color: 'var(--red)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  border: '2px solid var(--red)', cursor: 'pointer'
                }}
                onClick={stopContinuousSession}
              >
                <Square fill="var(--red)" size={14} />
              </button>
            </div>
          ) : (
            <button 
              title="Start Voice Session"
              style={{ 
                width: 40, height: 40, borderRadius: '50%', 
                background: 'var(--primary)', color: '#fff', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                border: 'none', cursor: 'pointer'
              }}
              onClick={startContinuousSession}
            >
              <Mic size={18} />
            </button>
          )}

        </div>
      </div>

    </div>
  );
}
