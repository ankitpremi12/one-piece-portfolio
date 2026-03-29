"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { fadeUpVariants, staggerContainerVariants, cardVariants, VIEWPORT_OPTS } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import { PERSONAL } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

const SOCIAL_LINKS = [
  { label: "Email", icon: "✉", value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, color: "#e63946" },
  { label: "LinkedIn", icon: "in", value: "ankit-premi", href: PERSONAL.linkedin, color: "#0077b5" },
  { label: "GitHub", icon: "⌥", value: "ankitpremiji", href: PERSONAL.github, color: "#00ff88" },
  { label: "LeetCode", icon: "⚡", value: "ankitpremiji", href: PERSONAL.leetcode, color: "#ffd700" },
];

export default function Contact() {
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Message sent! Setting sail... ⚓", { style: { background: "#0d0d0d", color: "#00ff88", border: "1px solid rgba(0,255,136,0.2)" } });
        reset();
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Failed to send. Try email directly.", { style: { background: "#0d0d0d", color: "#e63946", border: "1px solid rgba(230,57,70,0.2)" } });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-base py-32 bg-[#050505] relative overflow-hidden">
      {/* Red emperor aura */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(230,57,70,0.06) 0%, transparent 60%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63946]/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63946]/20 to-transparent" />

      {/* Haki energy pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 bottom-0 rounded-full border border-[#e63946]/10 pointer-events-none"
          style={{ width: `${(i + 1) * 40}vw`, height: `${(i + 1) * 20}vw`, transform: "translateX(-50%)" }}
          animate={{ opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, delay: i * 1, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel
          icon="🏴‍☠️"
          pirate="SHANKS"
          theme="Red Emperor"
          title="Send the Den Den Mushi"
          subtitle="Ready to join the crew? Let's build something legendary."
          color="#e63946"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
          >
            <GlassCard className="p-8" glowColor="#e63946">
              <h3 className="text-lg font-black text-white mb-6 uppercase" style={{ fontFamily: '"Cinzel", serif' }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Name</label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full bg-white/3 border border-white/8 text-white text-sm font-mono px-4 py-3 rounded-lg focus:outline-none focus:border-[#e63946]/50 placeholder:text-white/20 transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />
                  {errors.name && <p className="text-xs text-[#e63946] mt-1 font-mono">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-white/8 text-white text-sm font-mono px-4 py-3 rounded-lg focus:outline-none focus:border-[#e63946]/50 placeholder:text-white/20 transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />
                  {errors.email && <p className="text-xs text-[#e63946] mt-1 font-mono">{errors.email.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="What adventure awaits?"
                    className="w-full border border-white/8 text-white text-sm font-mono px-4 py-3 rounded-lg focus:outline-none focus:border-[#e63946]/50 placeholder:text-white/20 transition-colors resize-none"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />
                  {errors.message && <p className="text-xs text-[#e63946] mt-1 font-mono">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#e63946] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#c1121f] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  {sending ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>☠</motion.span>
                      Sending...
                    </>
                  ) : (
                    <><span>⚡</span> Set Sail</>
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Social + Info */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
            className="flex flex-col gap-6"
          >
            {/* Quote */}
            <motion.div variants={cardVariants} custom={0}>
              <GlassCard className="p-8" glowColor="#e63946" hover={false}>
                <p className="text-2xl font-black text-white/80 leading-tight mb-3" style={{ fontFamily: '"Cinzel", serif' }}>
                  "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... is the Pirate King!"
                </p>
                <p className="text-xs font-mono text-[#e63946] tracking-widest">— Monkey D. Luffy</p>
              </GlassCard>
            </motion.div>

            {/* Social links */}
            <motion.div variants={cardVariants} custom={0.1}>
              <GlassCard className="p-6" glowColor="#e63946">
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-5">Connect</p>
                <div className="space-y-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group py-2 border-b border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors"
                          style={{ borderColor: `${link.color}30`, color: link.color, background: `${link.color}10` }}
                        >
                          {link.icon}
                        </div>
                        <div>
                          <p className="text-xs font-mono text-white/50 uppercase tracking-widest">{link.label}</p>
                          <p className="text-xs font-mono text-white/25 truncate max-w-[200px]">{link.value}</p>
                        </div>
                      </div>
                      <span className="text-white/20 group-hover:text-white/60 transition-colors">→</span>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Resume download */}
            <motion.div variants={cardVariants} custom={0.2}>
              <a
                href="/Ankit_Premi_Resume.pdf"
                download
                className="flex items-center justify-between px-6 py-4 border border-[#ffd700]/20 text-[#ffd700]/60 hover:border-[#ffd700]/50 hover:text-[#ffd700] transition-all duration-300 group rounded-xl"
                style={{ background: "rgba(255,215,0,0.03)" }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📜</span>
                  <div>
                    <p className="text-sm font-black uppercase" style={{ fontFamily: '"Cinzel", serif' }}>Download Resume</p>
                    <p className="text-xs font-mono text-white/20 mt-0.5">PDF · 2026 Edition</p>
                  </div>
                </div>
                <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_OPTS}
          custom={0.4}
          className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs font-mono text-white/20 tracking-widest">
            © 2026 Ankit Premi · All Rights Reserved
          </p>
          <p className="text-xs font-mono text-white/15 tracking-widest">
            Built with Next.js · Three.js · Framer Motion · One Piece
          </p>
          <p className="text-xs font-mono" style={{ color: "#00ff88", opacity: 0.4 }}>
            ⚓ The Grand Line Awaits
          </p>
        </motion.div>
      </div>
    </section>
  );
}
