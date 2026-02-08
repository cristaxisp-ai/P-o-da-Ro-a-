
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: string | null;
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ isOpen, onClose, initialImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efeito para carregar imagem inicial se fornecida (do catálogo)
  useEffect(() => {
    if (initialImage && isOpen) {
      // Se for uma URL externa, precisamos converter para base64 para o Gemini
      if (initialImage.startsWith('http')) {
        setStatusMessage('Carregando imagem do catálogo...');
        fetch(initialImage)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              setSelectedImage(reader.result as string);
              setStatusMessage('');
            };
            reader.readAsDataURL(blob);
          })
          .catch(err => {
            console.error("Erro ao carregar imagem inicial:", err);
            setStatusMessage('');
          });
      } else {
        setSelectedImage(initialImage);
      }
      setResultImage(null);
    }
  }, [initialImage, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!selectedImage || !prompt) return;

    setIsProcessing(true);
    setStatusMessage('Preparando o forno digital...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const messages = [
        'Adicionando temperos visuais...',
        'Ajustando a iluminação da fazenda...',
        'Dando aquele toque artesanal...',
        'Quase pronto para servir!'
      ];

      let msgIndex = 0;
      const interval = setInterval(() => {
        setStatusMessage(messages[msgIndex % messages.length]);
        msgIndex++;
      }, 2000);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: `Edite esta imagem de comida artesanal seguindo este pedido: ${prompt}. Mantenha o produto principal reconhecível, mas melhore o ambiente e a estética para parecer profissional e apetitoso.` }
          ]
        }
      });

      clearInterval(interval);

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setResultImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Erro na edição:", error);
      alert("Houve um probleminha no forno. Tente novamente!");
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResultImage(null);
    setPrompt('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-orange-50/50">
          <div>
            <h2 className="text-2xl font-black text-amber-950">Estúdio de Fotos IA</h2>
            <p className="text-sm text-amber-800/70 italic">Deixe seus produtos ainda mais irresistíveis</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <svg className="w-6 h-6 text-amber-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {statusMessage && !isProcessing && (
            <div className="bg-orange-100 text-orange-800 p-3 rounded-xl text-center text-sm font-medium animate-pulse">
              {statusMessage}
            </div>
          )}

          {!resultImage ? (
            <div className="space-y-4">
              <div 
                onClick={() => !selectedImage && fileInputRef.current?.click()}
                className={`group relative aspect-video w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${selectedImage ? 'border-orange-200 bg-stone-50' : 'border-stone-300 hover:border-orange-400 bg-stone-50/50'}`}
              >
                {selectedImage ? (
                  <>
                    <img src={selectedImage} className="w-full h-full object-contain rounded-xl" alt="Preview" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleReset(); }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="font-bold text-amber-900">Clique para enviar uma foto</p>
                    <p className="text-xs text-stone-500">Ou selecione uma do catálogo</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>

              {selectedImage && (
                <div className="space-y-3 animate-in slide-in-from-top-2">
                  <label className="block text-sm font-bold text-amber-950 uppercase tracking-wider">Como deseja editar?</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Mude o fundo para uma mesa rústica de madeira com pano de prato xadrez..."
                    className="w-full p-4 rounded-xl border border-stone-200 bg-stone-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none h-24"
                  />
                  <button 
                    disabled={isProcessing || !prompt}
                    onClick={processImage}
                    className="w-full bg-amber-900 hover:bg-amber-800 disabled:bg-stone-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{statusMessage}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span>Transformar Foto</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner bg-stone-100">
                <img src={resultImage} className="w-full h-full object-contain" alt="Resultado" />
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resultImage;
                    link.download = 'pao-da-roca-editado.png';
                    link.click();
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>Baixar Foto</span>
                </button>
                <button 
                  onClick={() => {
                    setResultImage(null);
                    setPrompt('');
                  }}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-amber-950 font-bold py-4 rounded-xl transition-all"
                >
                  Editar outra
                </button>
              </div>
              <p className="text-center text-xs text-amber-900/40 italic">As fotos editadas com IA podem apresentar variações. Use para ilustrar e encantar!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditorModal;
