import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  ChevronRight, 
  Send, 
  Baby, 
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Users,
  Briefcase,
  HeartHandshake,
  Sprout,
  Smartphone,
  ArrowRight,
  Banknote,
  TrendingUp,
  CalendarDays,
  XCircle,
  AlertCircle,
  Instagram,
  Loader2
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

// --- Componentes de Design ---

const NavItem = ({ label, active, onClick }: { label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold tracking-tight transition-colors hover:text-brand-gold ${active ? 'text-brand-gold' : 'text-github-muted'}`}
  >
    {label}
  </button>
);

const LogoSVG = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`w-10 h-10 sm:w-12 sm:h-12 ${className}`}
  >
    <path d="M20 45C20 45 22 25 45 25C68 25 70 45 70 45" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M45 25V45" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
    <path d="M30 30L45 45" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
    <path d="M60 30L45 45" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
    <path d="M20 45H75C78 45 80 47 80 50V60C80 65 75 70 48 70C21 70 16 65 16 60V50" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 48C12 48 10 45 10 40C10 35 14 35 14 35" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M35 70L65 85" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M65 70L35 85" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
    <g>
      <circle cx="35" cy="85" r="7" stroke="#d4af37" strokeWidth="1.2" />
      <path d="M35 78V92M28 85H42" stroke="#d4af37" strokeWidth="0.5" />
    </g>
    <g>
      <circle cx="65" cy="85" r="7" stroke="#d4af37" strokeWidth="1.2" />
      <path d="M65 78V92M58 85H72" stroke="#d4af37" strokeWidth="0.5" />
    </g>
    <text x="48" y="54" fill="#d4af37" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="serif">FACILITA</text>
    <text x="48" y="62" fill="#d4af37" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="serif">MAMÃE</text>
  </svg>
);

const EligibilityCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-github-surface border border-github-border p-8 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col gap-6 hover:border-brand-gold/50 transition-all group active:scale-95"
  >
    <div className="text-brand-gold group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    <p className="text-github-muted text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const ValueCard = ({ icon, category, subtitle, monthlyValue, totalValue, description, footerNote }: any) => (
  <div className="flex flex-col bg-github-surface border-2 border-brand-gold/40 p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] transition-all h-full shadow-[0_0_30px_rgba(0,0,0,0.2)]">
    <div className="flex items-center gap-5 mb-8">
      <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center bg-brand-gold/10 text-brand-gold border border-brand-gold/20">{icon}</div>
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold">{category}</h3>
        <p className="text-white font-bold text-lg">{subtitle}</p>
      </div>
    </div>
    <div className="flex-1">
      {description ? <p className="text-github-muted leading-relaxed mb-8 text-sm">{description}</p> : (
        <div className="mb-8">
          <span className="text-[10px] text-github-muted uppercase font-black block mb-1 tracking-widest">MENSAL ESTIMADO</span>
          <span className="text-3xl sm:text-4xl font-black text-white">{monthlyValue}</span>
        </div>
      )}
    </div>
    <div className="p-6 rounded-[2rem] bg-brand-gold/10 border border-brand-gold/20 text-center sm:text-left">
      <p className="text-[10px] text-github-muted font-black uppercase tracking-widest mb-1">Total em 120 dias</p>
      <p className="text-2xl sm:text-3xl font-black text-brand-gold">{totalValue}</p>
      <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-github-muted text-[10px] font-medium"><CalendarDays size={14} /> Recebido em 4 parcelas</div>
    </div>
    {footerNote && <p className="text-[10px] text-github-muted mt-6 italic opacity-60 text-center">{footerNote}</p>}
  </div>
);

const OptionCard = ({ icon, title, text, footer }: any) => (
  <div className="flex flex-col bg-github-surface/50 border border-github-border p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] backdrop-blur-sm group hover:border-github-muted/50 transition-all">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-github-bg border border-github-border rounded-2xl flex items-center justify-center text-github-muted group-hover:text-white transition-all">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h3>
    </div>
    <p className="text-github-muted text-sm mb-12 flex-1 leading-relaxed">{text}</p>
    {footer}
  </div>
);

const SYSTEM_INSTRUCTION = `Você é a Dra. Clara, uma Inteligência Artificial especialista em Direito Previdenciário Brasileiro, focada exclusivamente em Auxílio-Maternidade.
Hoje é dia 26 de fevereiro de 2026. Uma mudança importante na lei ocorreu ontem.
Seu objetivo é ajudar a usuária a entender se ela tem direito ao benefício e quais documentos ela precisa.

DIRETRIZES:
1. Seja profissional, acolhedora e clara.
2. Informe sobre a mudança da lei de 26/02/2026: "A partir de hoje, o período de carência para contribuintes individuais foi reduzido e o valor do benefício agora considera a média das 12 últimas contribuições sem descartes".
3. Peça informações sobre:
   - Tipo de segurada (Empregada, Desempregada, Autônoma, MEI, Rural).
   - Data do nascimento ou previsão.
   - Histórico de contribuições.
4. Analise a lista de documentos que a usuária disser que tem.
5. Se faltar algo, explique por que é importante.
6. Sempre termine sugerindo que ela fale com um advogado humano (botão de WhatsApp no site) para protocolar o pedido com segurança.

Mantenha as respostas concisas e use Markdown para formatação.`;

const IATab = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { 
      role: 'model', 
      text: 'Olá, mamãe! Sou a consultora digital da Facilita Mamãe. Hoje é 26 de fevereiro de 2026 e acabo de processar as últimas atualizações da lei. Posso analisar o seu caso agora. Qual é a sua situação profissional atual? (ex: MEI, desempregada, autônoma)' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_INSTRUCTION });

      const chatHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const result = await model.generateContent({
          contents: [...chatHistory, { role: 'user', parts: [{ text: userText }] }]
      });

      const response = result.response;
      const aiText = response.text() || "Desculpe, tive um problema ao processar sua solicitação.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Ocorreu um erro na conexão. Por favor, tente novamente mais tarde." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto flex flex-col h-[80vh] sm:h-[75vh] bg-github-surface border border-github-border rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl relative mx-2"
    >
      <div className="p-6 sm:p-8 border-b border-github-border bg-github-bg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold border border-brand-gold/20"><Sparkles size={24} /></div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">Consultora IA</h3>
            <p className="text-[10px] text-whatsapp flex items-center gap-1 uppercase tracking-widest font-black">
              <span className="w-1.5 h-1.5 bg-whatsapp rounded-full animate-pulse"></span> Em Direto
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
          <AlertCircle size={14} />
          Lei Atualizada: 26/02/2026
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] sm:max-w-[85%] p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-brand-gold text-github-bg font-bold rounded-tr-none' 
                : 'bg-github-bg border border-github-border text-github-text rounded-tl-none shadow-xl'
            }`}>
              <div className="markdown-body">
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-github-bg border border-github-border p-4 rounded-2xl text-github-muted text-xs italic flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-brand-gold" />
              Processando dados previdenciários...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 sm:p-8 border-t border-github-border bg-github-bg">
        <div className="flex gap-3 sm:gap-4">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
            placeholder="Escreva aqui..." 
            className="flex-1 bg-github-surface border border-github-border rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-gold transition-all text-base text-white"
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()}
            className="p-4 bg-brand-gold text-github-bg rounded-2xl font-black hover:bg-brand-gold-dark transition-all active:scale-90 disabled:opacity-50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const HomeScreen = ({ onStartIA }: { onStartIA: () => void }) => (
  <div className="flex flex-col gap-24 sm:gap-32">
    {/* Secção Hero Responsiva */}
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center text-center gap-8 py-8 sm:py-16"
    >
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15] px-4">
        O auxílio maternidade que <span className="text-brand-gold">você merece</span>, sem burocracia.
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-github-muted max-w-2xl leading-relaxed px-4">
        Especialistas em garantir os benefícios de mães autônomas, MEIs e desempregadas. Análise técnica profunda baseada nas regras vigentes de 2026.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 w-full sm:w-auto px-4">
        <button 
          onClick={onStartIA}
          className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-github-bg rounded-xl font-black text-lg hover:bg-brand-gold-dark transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 active:scale-95"
        >
          Analisar meu Pedido Agora <ChevronRight size={22} />
        </button>
        <a 
          href="https://www.instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 bg-github-surface border border-github-border text-white rounded-xl font-black text-lg hover:border-github-muted transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          Ver Depoimentos <Instagram size={22} className="text-brand-gold" />
        </a>
      </div>
    </motion.section>

    {/* Secção Quem Tem Direito */}
    <section id="eligibility" className="scroll-mt-32">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">Quem tem direito?</h2>
        <div className="w-24 h-1.5 bg-brand-gold rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <EligibilityCard icon={<Briefcase size={32} />} title="MEIs e Autônomas" text="A carência foi flexibilizada em 2026. Se é MEI ativa ou contribuiu recentemente, o direito é seu." />
        <EligibilityCard icon={<Users size={32} />} title="Desempregadas" text="Mesmo sem trabalhar no momento do parto, pode estar no 'período de graça' e ter direito ao valor integral." />
        <EligibilityCard icon={<Sprout size={32} />} title="Trabalho Rural" text="Mães que trabalham na agricultura, pecuária ou pesca artesanal têm proteção garantida por lei." />
        <EligibilityCard icon={<HeartHandshake size={32} />} title="Adoção" text="O auxílio maternidade é um direito garantido também em casos de adoção ou guarda judicial." />
      </div>
    </section>

    {/* Secção Valores */}
    <section id="values" className="scroll-mt-32">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">Quanto vou receber?</h2>
        <div className="w-24 h-1.5 bg-brand-gold rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ValueCard 
          icon={<CheckCircle2 size={36} />} category="MEI" subtitle="Mínimo da Previdência" 
          monthlyValue="R$ 1.512,00*" totalValue="R$ 6.048,00" 
          footerNote="*Projeção do salário mínimo para 2026." 
        />
        <ValueCard 
          icon={<TrendingUp size={36} />} category="Média Salarial" subtitle="Faixa de Recebimento" 
          monthlyValue="Variável" totalValue="Até R$ 32.629,64" 
          description="Cálculo baseado na média das suas 80% maiores contribuições no sistema." 
        />
        <ValueCard 
          icon={<Banknote size={36} />} category="Teto Máximo" subtitle="Valor Máximo INSS" 
          monthlyValue="R$ 8.157,41" totalValue="R$ 32.629,64" 
          footerNote="Para contribuintes sobre o teto da previdência." 
        />
      </div>
    </section>

    {/* Secção Tenho Direito e Agora? */}
    <section id="faq" className="scroll-mt-32">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">Tenho direito e agora?</h2>
        <div className="w-24 h-1.5 bg-brand-gold rounded-full mb-8"></div>
        <p className="text-github-muted text-lg sm:text-xl max-w-3xl leading-relaxed">
          O próximo passo é formalizar o pedido. Escolha a opção que melhor se adapta à sua necessidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch px-2">
        <OptionCard 
          icon={<Smartphone size={28} />} title="Fazer Sozinha" 
          text="Gestão direta pelo aplicativo Meu INSS. Gratuito, mas exige rigor técnico nos anexos para não ser negado."
          footer={<a href="https://meu.inss.gov.br/" target="_blank" className="w-full py-4 text-center border border-github-border rounded-2xl text-sm font-bold text-github-muted hover:bg-github-surface hover:text-white transition-all block">Aceder ao Meu INSS</a>}
        />
        
        <div className="flex flex-col bg-github-surface border-2 border-brand-gold p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] relative shadow-[0_0_50px_rgba(212,175,55,0.15)] transform lg:-translate-y-4">
          <div className="absolute top-0 right-10 bg-brand-gold text-github-bg px-6 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-b-2xl">Mais Seguro</div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex items-center justify-center text-brand-gold"><Sparkles size={32} /></div>
            <h3 className="text-2xl font-black text-white">Via Facilita</h3>
          </div>
          <p className="text-github-muted text-sm mb-8 flex-1 leading-relaxed">Nós cuidamos de tudo: análise de dados, conferência de legislação 2026 e protocolo profissional para garantir aprovação rápida.</p>
          <div className="mb-8 p-6 bg-github-bg rounded-3xl border border-github-border text-center">
            <span className="text-4xl font-black text-white">R$ 199,90</span>
            <span className="text-github-muted text-xs ml-2 uppercase font-bold tracking-tighter">Taxa Única</span>
          </div>
          <a 
            href="https://wa.me/5566999562660?text=Olá! Analisei meu caso no site e gostaria de contratar a Facilita Mamãe para meu pedido de auxílio maternidade."
            target="_blank"
            className="w-full py-5 bg-brand-gold text-github-bg rounded-2xl font-black text-lg hover:bg-brand-gold-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20 active:scale-95"
          >
            CONTRATAR AGORA <ArrowRight size={20} />
          </a>
        </div>

        <OptionCard 
          icon={<XCircle size={28} className="text-red-500" />} title="O INSS Negou?" 
          text="Teve o pedido indeferido? Muitos erros ocorrem na análise automática. Nós revisamos o processo para reverter a decisão."
          footer={<a href="https://wa.me/5566999562660?text=Olá! Meu pedido de auxílio maternidade foi negado pelo INSS e preciso de ajuda especializada para recorrer." target="_blank" className="w-full py-4 text-center border-2 border-red-500/30 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 block">Falar com Especialista <MessageCircle size={18} /></a>}
        />
      </div>
    </section>
  </div>
);

import whatsappIcon from './image/whatsapp.avif';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para scroll suave até as secções
  const scrollToSection = (id: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans text-github-text bg-github-bg selection:bg-brand-gold/30 selection:text-white">
      {/* Cabeçalho Responsivo */}
      <header className="sticky top-0 z-50 border-b border-github-border bg-github-bg/80 backdrop-blur-md">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <LogoSVG />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-gold">FACILITA</span>
              <span className="text-[10px] tracking-[0.2em] font-light -mt-1 uppercase text-github-muted">Mamãe</span>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden gap-8 md:flex">
            <NavItem label="Início" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavItem label="Quem tem Direito" onClick={() => scrollToSection('eligibility')} />
            <NavItem label="Valores" onClick={() => scrollToSection('values')} />
            <NavItem label="Tenho direito?" onClick={() => scrollToSection('faq')} />
            <button 
              onClick={() => setActiveTab('ia')}
              className={`text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'ia' ? 'text-brand-gold' : 'text-github-muted hover:text-brand-gold'}`}
            >
              Consultora IA
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('ia')}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-github-bg transition-all font-bold text-sm"
            >
              <Sparkles size={16} />
              Análise Grátis
            </button>
            
            {/* Botão Menu Mobile */}
            <button 
              className="md:hidden text-brand-gold p-2 hover:bg-github-surface rounded-lg transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay do Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-github-bg flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <LogoSVG className="scale-125" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-brand-gold">FACILITA</span>
                  <span className="text-xs uppercase tracking-widest text-github-muted">Mamãe</span>
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-brand-gold"><X size={32} /></button>
            </div>
            <nav className="flex flex-col gap-8 text-3xl font-black italic">
              <button onClick={() => {setActiveTab('home'); setIsMenuOpen(false)}} className={`text-left ${activeTab === 'home' ? 'text-brand-gold' : 'text-white'}`}>INÍCIO</button>
              <button onClick={() => {setActiveTab('ia'); setIsMenuOpen(false)}} className={`text-left ${activeTab === 'ia' ? 'text-brand-gold' : 'text-white'}`}>CONSULTORA IA</button>
              <button onClick={() => scrollToSection('eligibility')} className="text-left text-white">QUEM TEM DIREITO</button>
              <button onClick={() => scrollToSection('values')} className="text-left text-white">VALORES</button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-white">COMO PEDIR</button>
            </nav>
            
            <div className="mt-auto pt-10 border-t border-github-border">
              <a 
                href="https://wa.me/5566999562660" 
                className="w-full py-5 bg-whatsapp text-white rounded-2xl font-black text-center block mb-4"
              >
                FALAR NO WHATSAPP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo Principal */}
      <main className="container px-6 py-12 mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomeScreen onStartIA={() => setActiveTab('ia')} />
            </motion.div>
          ) : (
            <motion.div
              key="ia"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IATab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Botão flutuante do WhatsApp */}
      <a 
        href="https://wa.me/5566999562660?text=Olá! Gostaria de tirar algumas dúvidas sobre o auxílio maternidade." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-24 h-24 rounded-full bg-whatsapp text-white shadow-2xl transition-transform active:scale-95 group pulsate"
      >
        <img src={whatsappIcon} alt="WhatsApp Icon" className="w-16 h-16" />
        <span className="absolute right-28 bg-github-surface text-white px-4 py-2 rounded-lg border border-github-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-sm font-bold">
          Dúvidas? Fale comigo!
        </span>
      </a>

      {/* Rodapé */}
      <footer className="border-t border-github-border py-16 mt-20 bg-github-bg">
        <div className="container flex flex-col items-center justify-between gap-10 px-6 mx-auto md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <LogoSVG className="scale-90" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-brand-gold">FACILITA MAMÃE</span>
                <span className="text-[10px] text-github-muted">ESPECIALISTAS EM DIREITO MATERNAL</span>
              </div>
            </div>
            <p className="text-sm text-github-muted max-w-xs text-center md:text-left">© 2026 Todos os direitos reservados. Sinop - Mato Grosso.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-github-muted font-medium">
            <a href="#" className="hover:text-brand-gold transition-colors uppercase tracking-widest text-xs">Termos</a>
            <a href="#" className="hover:text-brand-gold transition-colors uppercase tracking-widest text-xs">Privacidade</a>
            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              className="flex items-center gap-2 px-4 py-2 bg-github-surface border border-github-border rounded-full text-white hover:text-brand-gold transition-all"
            >
              <Instagram size={18} /> @facilitamamae
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
