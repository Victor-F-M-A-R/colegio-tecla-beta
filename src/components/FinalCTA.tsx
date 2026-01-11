'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'; // Added icons for footer
import content from '@/data/content.json';

const { ctaFinal } = content;

export default function FinalCTA() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Main CTA Section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            {ctaFinal.title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-xl leading-8 text-slate-600"
          >
            {ctaFinal.text}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <button className="group relative inline-flex items-center justify-center rounded-full bg-primary-blue px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              {ctaFinal.buttonPrimary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="group inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
              <MessageCircle className="mr-2 h-5 w-5 text-green-500 transition-transform group-hover:scale-110" />
              {ctaFinal.buttonSecondary}
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-20 border-t border-slate-200" />

        {/* Footer Info */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Brand / About */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Colégio Tecla Beta</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    Formando cidadãos completos com ensino de excelência, acolhimento e inovação pedagógica.
                </p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Contato</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-primary-blue" />
                        <span>Rua da Educação, 123 - Centro</span>
                    </li>
                    <li className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-primary-blue" />
                        <span>(11) 99999-9999</span>
                    </li>
                    <li className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-primary-blue" />
                        <span>contato@colegiotecla.com.br</span>
                    </li>
                </ul>
            </div>

            {/* Links */}
            <div className="space-y-4 lg:text-right">
                <h4 className="font-semibold text-slate-900">Links Rápidos</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                    <li><a href="#" className="hover:text-primary-blue transition-colors">Educação Infantil</a></li>
                    <li><a href="#" className="hover:text-primary-blue transition-colors">Ensino Fundamental</a></li>
                    <li><a href="#" className="hover:text-primary-blue transition-colors">Ensino Médio</a></li>
                    <li><a href="#" className="hover:text-primary-blue transition-colors">Agendar Visita</a></li>
                </ul>
            </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-8 text-xs text-slate-400 md:flex-row">
          <p>&copy; {currentYear} Colégio Tecla Beta. Todos os direitos reservados.</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <a href="#" className="hover:text-slate-600">Política de Privacidade</a>
            <a href="#" className="hover:text-slate-600">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
