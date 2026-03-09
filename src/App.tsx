import React, { useState } from 'react';
import {
  MessageCircle,
  ChevronRight,
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
  Shield,
  Star,
  FileText,
  Lock,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '@/src/image/logo.png';

// --- Componentes de layout ---

const NavItem = ({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-sm font-bold tracking-tight transition-colors hover:text-brand-gold ${active ? 'text-brand-gold' : 'text-github-muted'}`}
  >
    {label}
  </button>
);

const Logo = ({ className = "" }: { className?: string }) => (
  <img src={logoImg} alt="Facilita Mamãe" className={`object-contain ${className}`} />
);

// --- Modal genérico ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-github-surface border border-github-border rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 shadow-2xl custom-scrollbar"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <button onClick={onClose} className="p-2 text-github-muted hover:text-white transition-colors rounded-xl hover:bg-github-bg">
              <X size={22} />
            </button>
          </div>
          <div className="text-github-muted text-sm leading-relaxed space-y-4">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Conteúdo dos modais legais ---
const TermsContent = () => (
  <>
    <p><strong className="text-white">Facilita Mamãe — Termos de Uso</strong><br />Última atualização: março de 2026.</p>
    <p><strong className="text-white">1. Objeto do Serviço</strong><br />A Facilita Mamãe presta serviços administrativos de consultoria, organização e protocolo de requerimentos de Salário Maternidade junto ao INSS. O serviço <strong className="text-white">não constitui assessoria jurídica</strong> e não substitui profissional inscrito na OAB.</p>
    <p><strong className="text-white">2. Responsabilidade</strong><br />A Facilita Mamãe atua como intermediadora administrativa. A análise e decisão final sobre a concessão do benefício é de competência exclusiva do INSS. Resultados dependem da documentação apresentada e da legislação vigente, não sendo garantidos.</p>
    <p><strong className="text-white">3. Preço e Pagamento</strong><br />O valor do serviço é de R$ 199,90 (cento e noventa e nove reais e noventa centavos), cobrado em pagamento único, antes do início dos trabalhos.</p>
    <p><strong className="text-white">4. Direito de Arrependimento (CDC, art. 49)</strong><br />Contratações realizadas por meio eletrônico ou telefônico podem ser canceladas em até <strong className="text-white">7 (sete) dias corridos</strong> a partir da data de contratação, mediante comunicação por escrito ao WhatsApp, com reembolso integral do valor pago.</p>
    <p><strong className="text-white">5. Foro</strong><br />Fica eleito o foro da Comarca de Sinop/MT para dirimir eventuais controvérsias, sem prejuízo de outros foros admitidos pelo Código de Defesa do Consumidor.</p>
  </>
);

const PrivacyContent = () => (
  <>
    <p><strong className="text-white">Política de Privacidade — Facilita Mamãe</strong><br />Em conformidade com a Lei nº 13.709/2018 (LGPD). Última atualização: março de 2026.</p>
    <p><strong className="text-white">1. Controlador dos Dados</strong><br />Facilita Mamãe, com sede em Sinop/MT. Contato para assuntos de privacidade: via WhatsApp disponível no site.</p>
    <p><strong className="text-white">2. Dados Coletados</strong><br />Coletamos apenas dados fornecidos voluntariamente pela usuária: nome, contato (WhatsApp), situação profissional e histórico previdenciário, para a prestação do serviço contratado.</p>
    <p><strong className="text-white">3. Finalidade do Tratamento</strong><br />(a) Organização e protocolo do requerimento de Salário Maternidade; (b) atendimento ao cliente; (c) melhoria do serviço de assistente virtual, de forma anonimizada. Base legal: execução de contrato (LGPD, art. 7°, V) e consentimento (art. 7°, I).</p>
    <p><strong className="text-white">4. Compartilhamento</strong><br />Os dados não são comercializados. Podem ser compartilhados com o INSS exclusivamente quando necessário ao protocolo do benefício.</p>
    <p><strong className="text-white">5. Direitos da Titular (LGPD, art. 18)</strong><br />Você pode solicitar: acesso, correção, anonimização, portabilidade, eliminação dos dados e revogação do consentimento. Solicitações via WhatsApp, atendidas em até 15 dias.</p>
    <p><strong className="text-white">6. Retenção e Eliminação</strong><br />Os dados são mantidos pelo período de execução do serviço e pelo prazo prescricional legal (5 anos), após o qual são eliminados de forma segura.</p>
  </>
);

// --- Banner LGPD ---
const LGPDBanner = ({ onAccept, onOpenPrivacy }: { onAccept: () => void; onOpenPrivacy: () => void }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1 }}
    className="fixed bottom-0 left-0 right-0 z-[80] p-4 sm:p-6 bg-github-surface/95 border-t border-github-border shadow-2xl backdrop-blur-md"
  >
    <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-start gap-3 flex-1">
        <Shield size={20} className="text-brand-gold mt-0.5 shrink-0" />
        <p className="text-xs text-github-muted leading-relaxed">
          Este site coleta dados necessários para a prestação dos serviços, conforme nossa{' '}
          <button onClick={onOpenPrivacy} className="text-brand-gold underline hover:no-underline font-semibold">
            Política de Privacidade
          </button>
          . Em conformidade com a <strong className="text-white">Lei nº 13.709/2018 (LGPD)</strong>, ao continuar navegando, você consente com o tratamento dos seus dados para as finalidades descritas.
        </p>
      </div>
      <button
        onClick={onAccept}
        className="shrink-0 px-6 py-2.5 bg-brand-gold text-github-bg rounded-xl font-black text-sm hover:bg-brand-gold-dark transition-all active:scale-95 whitespace-nowrap"
      >
        Entendi e Aceito
      </button>
    </div>
  </motion.div>
);

// --- Cards reutilizáveis ---
const EligibilityCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-github-surface border border-github-border p-8 rounded-[2rem] flex flex-col gap-5 hover:border-brand-gold/50 transition-all group"
  >
    <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
    <p className="text-github-muted text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const ValueCard = ({ icon, category, subtitle, monthlyValue, totalValue, description, footerNote }: {
  icon: React.ReactNode; category: string; subtitle: string; monthlyValue?: string;
  totalValue: string; description?: string; footerNote?: string;
}) => (
  <div className="flex flex-col bg-github-surface border-2 border-brand-gold/30 p-8 sm:p-10 rounded-[2.5rem] transition-all h-full hover:border-brand-gold/60">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-brand-gold/10 text-brand-gold border border-brand-gold/20">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{category}</p>
        <p className="text-white font-bold text-base">{subtitle}</p>
      </div>
    </div>
    <div className="flex-1">
      {description
        ? <p className="text-github-muted leading-relaxed mb-8 text-sm">{description}</p>
        : (
          <div className="mb-8">
            <span className="text-[10px] text-github-muted uppercase font-black block mb-1 tracking-widest">Mensal estimado</span>
            <span className="text-3xl font-black text-white">{monthlyValue}</span>
          </div>
        )
      }
    </div>
    <div className="p-5 rounded-2xl bg-brand-gold/10 border border-brand-gold/20">
      <p className="text-[10px] text-github-muted font-black uppercase tracking-widest mb-1">Total em 120 dias</p>
      <p className="text-2xl font-black text-brand-gold">{totalValue}</p>
      <div className="flex items-center gap-2 mt-2 text-github-muted text-[10px] font-medium">
        <CalendarDays size={13} /> Pago em até 4 parcelas
      </div>
    </div>
    {footerNote && <p className="text-[10px] text-github-muted mt-4 italic opacity-60">{footerNote}</p>}
  </div>
);

const OptionCard = ({ icon, title, text, footer }: { icon: React.ReactNode; title: string; text: string; footer: React.ReactNode }) => (
  <div className="flex flex-col bg-github-surface/50 border border-github-border p-8 rounded-[2.5rem] backdrop-blur-sm group hover:border-github-muted/40 transition-all">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-github-bg border border-github-border rounded-2xl flex items-center justify-center text-github-muted group-hover:text-white transition-all">{icon}</div>
      <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    </div>
    <p className="text-github-muted text-sm mb-10 flex-1 leading-relaxed">{text}</p>
    {footer}
  </div>
);

// --- Depoimentos ---
const testimonials = [
  { name: "Maria S.", city: "Sinop, MT", text: "Estava completamente perdida com o processo. A equipe da Facilita Mamãe organizou toda a documentação e em menos de 40 dias recebi o primeiro pagamento.", stars: 5 },
  { name: "Jéssica O.", city: "Cuiabá, MT", text: "Sou MEI e não sabia que tinha direito ao benefício. Me explicaram tudo com clareza e me ajudaram em cada etapa. Recomendo muito!", stars: 5 },
  { name: "Renata L.", city: "Lucas do Rio Verde, MT", text: "Meu requerimento no INSS havia sido indeferido. Recorri com a Facilita Mamãe e conseguimos reverter a decisão. Atendimento excelente.", stars: 5 },
];

const TestimonialCard = ({ name, city, text, stars }: typeof testimonials[0]) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-github-surface border border-github-border p-8 rounded-[2rem] flex flex-col gap-4 hover:border-brand-gold/30 transition-all"
  >
    <div className="flex gap-1">
      {Array.from({ length: stars }).map((_, i) => (
        <Star key={i} size={15} className="text-brand-gold fill-brand-gold" />
      ))}
    </div>
    <p className="text-github-text text-sm leading-relaxed flex-1">"{text}"</p>
    <div className="pt-2 border-t border-github-border">
      <p className="text-white font-bold text-sm">{name}</p>
      <p className="text-github-muted text-xs">{city}</p>
    </div>
  </motion.div>
);

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center text-center gap-1.5 px-4">
    <span className="text-2xl sm:text-3xl font-black text-brand-gold">{value}</span>
    <span className="text-[10px] text-github-muted uppercase tracking-widest font-semibold leading-tight">{label}</span>
  </div>
);

// --- HomeScreen ---
const HomeScreen = ({ onOpenTerms, onOpenPrivacy }: {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}) => (
  <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">

    {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center text-center gap-8 py-8 sm:py-16"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold text-xs font-bold uppercase tracking-widest">
        <Shield size={13} />
        Nova Regra STF
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15] px-4">
        Salário Maternidade: agora basta{' '}
        <span className="text-brand-gold">apenas 1 contribuição</span> ao INSS.
      </h1>

      <p className="text-base sm:text-lg text-github-muted max-w-2xl leading-relaxed px-4">
        O STF derrubou a carência de 10 meses para MEIs, autônomas e contribuintes individuais. Com <strong className="text-white">apenas 1 contribuição paga</strong>, você já tem direito ao Salário Maternidade, garantido pela <strong className="text-white">Lei nº 8.213/91</strong> e pela decisão nas ADIs 2110 e 2111.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto px-4">
        <a
          href="https://wa.me/5566999562660?text=Olá! Gostaria de verificar meu direito ao Salário Maternidade."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-github-bg rounded-xl font-black text-base hover:bg-brand-gold-dark transition-all shadow-[0_0_40px_rgba(212,175,55,0.25)] flex items-center justify-center gap-3 active:scale-95"
        >
          Verificar meu Direito Gratuitamente <ChevronRight size={20} />
        </a>
        <a
          href="https://wa.me/5566999562660"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 border border-github-border text-github-muted rounded-xl font-bold text-base hover:border-brand-gold hover:text-brand-gold transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <MessageCircle size={19} />
          Falar com Especialista
        </a>
      </div>
    </motion.section>

    {/* Stats */}
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-github-surface border border-github-border rounded-[2rem] p-5 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
    >
      <StatItem value="1.200+" label="Mães Atendidas" />
      <StatItem value="98%" label="Taxa de Aprovação" />
      <StatItem value="R$ 2,3M+" label="Benefícios Recuperados" />
      <StatItem value="~30 dias" label="Prazo Médio" />
    </motion.section>

    {/* Nova Regra Banner */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-brand-gold/10 border-2 border-brand-gold/40 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
    >
      <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
        <AlertCircle size={28} />
      </div>
      <div>
        <p className="text-brand-gold font-black text-base uppercase tracking-wider mb-1">Nova Regra STF (ADIs 2110 e 2111) + IN INSS nº 188/2025</p>
        <p className="text-github-text text-sm leading-relaxed">
          O Supremo Tribunal Federal derrubou a carência de 10 meses para MEIs, autônomas e contribuintes individuais.{' '}
          <strong className="text-white">Basta apenas 1 contribuição ao INSS paga antes do parto</strong> para ter direito ao benefício.
          Quem teve o pedido <strong className="text-white">negado desde abril de 2024</strong> pode pedir revisão administrativa.
        </p>
      </div>
    </motion.div>

    {/* Quem tem direito */}
    <section id="eligibility" className="scroll-mt-20 sm:scroll-mt-28">
      <div className="flex flex-col items-center text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Quem tem direito?</h2>
        <p className="text-github-muted max-w-2xl text-base">
          Conforme a <strong className="text-white">Lei nº 8.213/91</strong> e a decisão do STF, o Salário Maternidade é devido às seguradas do INSS nas seguintes situações:
        </p>
        <div className="w-20 h-1 bg-brand-gold rounded-full mt-6" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <EligibilityCard
          icon={<Briefcase size={28} />}
          title="MEIs e Autônomas"
          text="Pela decisão do STF (ADIs 2110 e 2111), regulamentada pela IN INSS nº 188/2025, basta apenas 1 contribuição ao INSS paga antes do parto. A carência de 10 meses foi derrubada."
        />
        <EligibilityCard
          icon={<Users size={28} />}
          title="Desempregadas"
          text="Seguradas em período de graça (até 12 meses após o último vínculo empregatício) mantêm a qualidade de segurada e o direito ao benefício."
        />
        <EligibilityCard
          icon={<Sprout size={28} />}
          title="Seguradas Especiais"
          text="Trabalhadoras rurais (agricultura familiar, pesca artesanal) têm direito ao benefício sem carência, sem precisar de contribuições mensais."
        />
        <EligibilityCard
          icon={<HeartHandshake size={28} />}
          title="Adoção e Guarda"
          text="O benefício é garantido em casos de adoção ou guarda judicial, conforme art. 71-A da Lei nº 8.213/91."
        />
      </div>
      <p className="text-xs text-github-muted text-center mt-8 max-w-2xl mx-auto">
        As informações acima são de caráter geral. Cada caso possui particularidades. Consulte nossa equipe para análise individualizada.
      </p>
    </section>

    {/* Valores */}
    <section id="values" className="scroll-mt-20 sm:scroll-mt-28">
      <div className="flex flex-col items-center text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Quanto vou receber?</h2>
        <p className="text-github-muted max-w-2xl text-base">
          O valor é calculado com base na sua categoria de segurada e no histórico de contribuições, conforme a legislação vigente.
        </p>
        <div className="w-20 h-1 bg-brand-gold rounded-full mt-6" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ValueCard
          icon={<CheckCircle2 size={32} />}
          category="MEI / Segurada Especial"
          subtitle="Piso do Benefício"
          monthlyValue="R$ 1.621,00"
          totalValue="R$ 6.484,00"
          footerNote="Equivalente ao salário mínimo de 2026 (R$ 1.621,00), pago por 120 dias."
        />
        <ValueCard
          icon={<TrendingUp size={32} />}
          category="Contribuinte Individual / Autônoma"
          subtitle="Média das Contribuições"
          totalValue="Proporcional ao histórico"
          description="Calculado com base na média das contribuições previdenciárias dos últimos 12 meses. Valor mínimo de R$ 1.621,00 e máximo de R$ 8.157,40 mensais."
        />
        <ValueCard
          icon={<Banknote size={32} />}
          category="Empregada CLT"
          subtitle="Salário Integral"
          monthlyValue="Até R$ 8.157,40"
          totalValue="Até R$ 32.629,60"
          footerNote="Teto do INSS em 2026: R$ 8.157,40/mês. Valor integral pago pelo empregador e reembolsado pela Previdência."
        />
      </div>
      <p className="text-xs text-github-muted text-center mt-8 max-w-2xl mx-auto">
        Os valores são estimativas baseadas na legislação vigente. O cálculo definitivo é realizado pelo INSS. Consulte nossa equipe para análise precisa do seu caso.
      </p>
    </section>

    {/* Depoimentos */}
    <section id="testimonials" className="scroll-mt-20 sm:scroll-mt-28">
      <div className="flex flex-col items-center text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">O que dizem nossas clientes</h2>
        <div className="w-20 h-1 bg-brand-gold rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
      </div>
    </section>

    {/* Como requerer */}
    <section id="faq" className="scroll-mt-20 sm:scroll-mt-28">
      <div className="flex flex-col items-center text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Como requerer o benefício?</h2>
        <div className="w-20 h-1 bg-brand-gold rounded-full mb-6" />
        <p className="text-github-muted text-base max-w-2xl leading-relaxed">
          O Salário Maternidade deve ser requerido ao INSS em até 5 anos da data do evento. Escolha a opção mais adequada para você:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <OptionCard
          icon={<Smartphone size={26} />}
          title="Requerimento Próprio"
          text="Diretamente pelo aplicativo Meu INSS ou nas Agências da Previdência Social. Gratuito, mas exige atenção à documentação e prazos para evitar indeferimentos."
          footer={
            <a href="https://meu.inss.gov.br/" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 text-center border border-github-border rounded-2xl text-sm font-bold text-github-muted hover:bg-github-surface hover:text-white transition-all block">
              Acessar Meu INSS
            </a>
          }
        />

        <div className="flex flex-col bg-github-surface border-2 border-brand-gold p-8 rounded-[2.5rem] relative shadow-[0_0_50px_rgba(212,175,55,0.12)] lg:-translate-y-4">
          <div className="absolute top-0 right-8 bg-brand-gold text-github-bg px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-b-2xl">
            Recomendado
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-13 h-13 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex items-center justify-center text-brand-gold p-3">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-black text-white">Via Facilita</h3>
          </div>
          <p className="text-github-muted text-sm mb-6 flex-1 leading-relaxed">
            Nossa equipe cuida de toda a documentação, revisão e protocolo do requerimento junto ao INSS, aumentando suas chances de aprovação rápida.
          </p>
          <div className="mb-3 p-5 bg-github-bg rounded-2xl border border-github-border text-center">
            <span className="text-4xl font-black text-white">R$ 199,90</span>
            <span className="text-github-muted text-xs ml-2 uppercase font-bold tracking-tight">Taxa Única</span>
          </div>
          <p className="text-[10px] text-github-muted text-center mb-6 leading-relaxed">
            Direito de cancelamento em até <strong className="text-white">7 dias corridos</strong> após a contratação, com reembolso integral (CDC, art. 49).
          </p>
          <a
            href="https://wa.me/5566999562660?text=Olá! Analisei meu caso no site e gostaria de contratar a Facilita Mamãe para meu requerimento de Salário Maternidade."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-brand-gold text-github-bg rounded-2xl font-black text-base hover:bg-brand-gold-dark transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            CONTRATAR AGORA <ArrowRight size={18} />
          </a>
        </div>

        <OptionCard
          icon={<XCircle size={26} className="text-red-400" />}
          title="Benefício Negado?"
          text="Teve o pedido negado por falta de carência desde abril de 2024? Com a nova decisão do STF, você tem direito à revisão administrativa. Nossa equipe analisa o seu caso e orienta o recurso."
          footer={
            <a
              href="https://wa.me/5566999562660?text=Olá! Meu requerimento de Salário Maternidade foi indeferido e preciso de orientação para recorrer."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 text-center border-2 border-red-500/30 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 block"
            >
              Solicitar Revisão <MessageCircle size={16} />
            </a>
          }
        />
      </div>
    </section>
  </div>
);

// --- App ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('lgpd_accepted') === 'true'
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (typeof window !== 'undefined' && localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  const handleLgpdAccept = () => {
    localStorage.setItem('lgpd_accepted', 'true');
    setLgpdAccepted(true);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen font-sans text-github-text bg-github-bg selection:bg-brand-gold/30 selection:text-white" data-theme={theme}>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-github-border bg-github-bg/85 backdrop-blur-md">
        <div className="container flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 mx-auto">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="h-16 sm:h-20 w-auto" />
          </button>

          <nav className="hidden gap-8 md:flex">
            <NavItem label="Início" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            <NavItem label="Quem tem Direito" onClick={() => scrollToSection('eligibility')} />
            <NavItem label="Valores" onClick={() => scrollToSection('values')} />
            <NavItem label="Como Requerer" onClick={() => scrollToSection('faq')} />
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-github-muted hover:text-brand-gold hover:bg-github-surface transition-all"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="https://wa.me/5566999562660"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-github-bg transition-all font-bold text-sm"
            >
              <MessageCircle size={15} />
              Falar com Especialista
            </a>
            <button
              className="md:hidden text-brand-gold p-2 hover:bg-github-surface rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-github-bg flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-14">
              <div>
                <Logo className="h-24 w-auto" />
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-github-muted hover:text-white">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-7 text-2xl font-black">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }} className="text-left text-brand-gold">INÍCIO</button>
              <button onClick={() => scrollToSection('eligibility')} className="text-left text-white">QUEM TEM DIREITO</button>
              <button onClick={() => scrollToSection('values')} className="text-left text-white">VALORES</button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-white">COMO REQUERER</button>
            </nav>
            <div className="mt-auto pt-8 border-t border-github-border flex flex-col gap-3">
              <a
                href="https://wa.me/5566999562660"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-whatsapp text-white rounded-2xl font-black text-center block"
              >
                FALAR NO WHATSAPP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo principal */}
      <main className="container px-4 sm:px-6 py-8 sm:py-12 mx-auto">
        <HomeScreen onOpenTerms={() => setShowTerms(true)} onOpenPrivacy={() => setShowPrivacy(true)} />
      </main>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/5566999562660?text=Olá! Gostaria de tirar dúvidas sobre o Salário Maternidade."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 bg-whatsapp text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.6)] hover:bg-[#1ebe5d] active:scale-95 transition-all duration-200 whatsapp-fab"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="font-black text-sm leading-none hidden xs:inline sm:inline">Falar no WhatsApp</span>
      </a>

      {/* Rodapé */}
      <footer className="border-t border-github-border py-10 sm:py-16 mt-12 sm:mt-20 bg-github-bg">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-10">
            <div className="flex flex-col gap-4 max-w-sm">
              <div>
                <Logo className="h-24 w-auto" />
              </div>
              <p className="text-sm text-github-muted leading-relaxed">
                Serviços administrativos de organização e protocolo de requerimentos previdenciários. Não constitui assessoria jurídica.
              </p>
              <div className="text-xs text-github-muted space-y-1">
                <p>Sinop — Mato Grosso, Brasil</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Legal</p>
                <button onClick={() => setShowTerms(true)} className="flex items-center gap-2 text-sm text-github-muted hover:text-brand-gold transition-colors text-left">
                  <FileText size={14} /> Termos de Uso
                </button>
                <button onClick={() => setShowPrivacy(true)} className="flex items-center gap-2 text-sm text-github-muted hover:text-brand-gold transition-colors text-left">
                  <Lock size={14} /> Política de Privacidade (LGPD)
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Redes</p>
                <a
                  href="https://www.instagram.com/facilitamamae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-github-muted hover:text-brand-gold transition-colors"
                >
                  <Instagram size={14} /> @facilitamamae
                </a>
                <a
                  href="https://wa.me/5566999562660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-github-muted hover:text-brand-gold transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-github-border pt-8 flex flex-col sm:flex-row justify-between gap-4">
            <p className="text-xs text-github-muted">© 2026 Facilita Mamãe. Todos os direitos reservados.</p>
            <p className="text-xs text-github-muted max-w-md sm:text-right leading-relaxed">
              As informações deste site têm caráter informativo e não constituem assessoria jurídica. Consulte um profissional habilitado para orientação individualizada.
            </p>
          </div>
        </div>
      </footer>

      {/* Modais legais */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Termos de Uso">
        <TermsContent />
      </Modal>
      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Política de Privacidade (LGPD)">
        <PrivacyContent />
      </Modal>

      {/* Banner LGPD */}
      {!lgpdAccepted && (
        <LGPDBanner onAccept={handleLgpdAccept} onOpenPrivacy={() => setShowPrivacy(true)} />
      )}
    </div>
  );
};

export default App;
