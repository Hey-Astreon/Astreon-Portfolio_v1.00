import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, AlertCircle, Loader2, Cpu } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function NeuralContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xzdkpeeg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-astra-fade card-premium border-[#34A853]/30">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(52,168,83,0.2)]">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[#e5e4e2] mb-2 font-orbitron tracking-widest">UPLINK ESTABLISHED</h3>
        <p className="text-[#4dadeb] opacity-80 font-mono text-sm max-w-sm mb-8">
          The transmission has been securely synchronized with the Astra Core. Encryption successful.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="group relative px-8 py-3 bg-[#bf94ff]/5 border border-[#bf94ff] text-[#bf94ff] font-mono text-xs uppercase tracking-widest hover:bg-[#bf94ff] hover:text-white transition-all font-bold overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:animate-shimmer" />
          New Protocol
        </button>
      </div>
    );
  }

  const InputField = ({ name, type, placeholder, isTextarea = false }: { name: keyof ContactFormData, type: string, placeholder: string, isTextarea?: boolean }) => {
    const isError = !!errors[name];
    const isActive = activeField === name;

    return (
      <div className="relative group">
        <div className={`absolute -inset-[1px] bg-gradient-to-r from-[#bf94ff]/0 via-[#bf94ff]/40 to-[#bf94ff]/0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-0 border border-[#bf94ff]/10 group-hover:border-[#bf94ff]/30 transition-colors duration-300 pointer-events-none rounded-lg`} />
        
        {/* Corner Accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 ${isActive ? 'border-[#bf94ff]' : 'border-transparent'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${isActive ? 'border-[#bf94ff]' : 'border-transparent'}`} />

        {isTextarea ? (
          <textarea
            {...register(name)}
            rows={5}
            placeholder={placeholder}
            onFocus={() => setActiveField(name)}
            onBlur={() => setActiveField(null)}
            className={`w-full bg-black/60 border-none rounded-lg px-4 py-4 text-[#e5e4e2] font-mono text-sm focus:outline-none transition-all resize-none relative z-10 placeholder:text-white/20`}
          />
        ) : (
          <input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            onFocus={() => setActiveField(name)}
            onBlur={() => setActiveField(null)}
            className={`w-full bg-black/60 border-none rounded-lg px-4 py-4 text-[#e5e4e2] font-mono text-sm focus:outline-none transition-all relative z-10 placeholder:text-white/20`}
          />
        )}

        {isError && (
          <span className="text-sky-400 text-[10px] absolute -bottom-5 left-0 font-mono tracking-tighter uppercase flex items-center gap-1">
            <AlertCircle size={10} />
            {errors[name]?.message}
          </span>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 card-premium p-8 border-[#bf94ff]/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-4 mb-2 border-l-2 border-[#bf94ff] pl-4">
        <div className="p-2 rounded bg-[#bf94ff]/10">
          <Cpu size={16} className="text-[#bf94ff]" />
        </div>
        <div>
          <h4 className="text-xs font-mono text-[#bf94ff] uppercase tracking-widest leading-none mb-1">Terminal Protocol</h4>
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] leading-none">Status: Uplink_Ready</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        <InputField name="name" type="text" placeholder="IDENTITY_DESC: NAME" />
        <InputField name="email" type="email" placeholder="NEURAL_PATH: EMAIL" />
      </div>

      <InputField name="subject" type="text" placeholder="TRANSMISSION_SUBJECT" />
      <InputField name="message" type="text" placeholder="ENCRYPT_PAYLOAD: MESSAGE_CONTENT" isTextarea />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full group relative overflow-hidden flex items-center justify-center gap-4 bg-[#bf94ff]/10 border border-[#bf94ff]/40 py-5 rounded-lg text-[#bf94ff] font-orbitron font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#bf94ff] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(191,148,255,0.05)] hover:shadow-[0_0_30px_rgba(191,148,255,0.2)]"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
        {status === 'sending' ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            SYNCHRONIZING...
          </>
        ) : (
          <>
            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            INITIATE UPLINK
          </>
        )}
      </button>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sky-400 font-mono text-[10px] uppercase justify-center animate-pulse border-y border-sky-400/20 py-2">
          <AlertCircle size={14} />
          Protocol Error: Link Failed. Verify Connection.
        </div>
      )}
    </form>
  );
}
