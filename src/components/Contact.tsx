import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Mail, Github, Linkedin, Send, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [sending, setSending] = useState(false);

  const validate = (fields = form) => {
    const errs: typeof errors = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!fields.email.trim()) errs.email = "Email is required";
    else if (!emailRegex.test(fields.email)) errs.email = "Invalid email address";
    if (!fields.message.trim()) errs.message = "Message is required";
    else if (fields.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const isValid = form.name.trim() && emailRegex.test(form.email) && form.message.trim().length >= 10;

  const handleBlur = (field: keyof typeof form) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast({ title: "Error", description: "Email service is not configured.", variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: "sevak.badalyan.01@gmail.com",
      }, PUBLIC_KEY);

      // Send auto-reply to the user (don't block on failure)
      if (AUTOREPLY_TEMPLATE_ID) {
        emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: form.email,
        }, PUBLIC_KEY).catch(() => {});
      }
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: "sevak.badalyan.01@gmail.com", href: "mailto:sevak.badalyan.01@gmail.com" },
    { icon: Github, label: "GitHub", value: "github.com/Sevak-Badalyan", href: "https://github.com/Sevak-Badalyan" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sevak-badalyan", href: "https://www.linkedin.com/in/sevak-badalyan-4045032b0/" },
    { icon: MapPin, label: "Location", value: "Yerevan, Armenia", href: "#" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-border" />
            <span className="font-mono text-primary text-sm">05. What's Next?</span>
            <div className="w-12 h-px bg-border" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get In Touch</h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            I'm currently open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi,
            my inbox is always open!
          </p>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-xl p-6 md:p-8 mb-12 text-left space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-muted-foreground">Name</label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={touched.name && errors.name ? "border-destructive" : ""}
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-muted-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={touched.email && errors.email ? "border-destructive" : ""}
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-muted-foreground">Message</label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                className={touched.message && errors.message ? "border-destructive" : ""}
              />
              {touched.message && errors.message && (
                <p className="text-xs text-destructive mt-1">{errors.message}</p>
              )}
            </div>
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={!isValid || sending}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.4 }}
                className="flex items-center gap-4 p-4 glass glass-hover rounded-lg group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-all">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{link.label}</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {link.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
