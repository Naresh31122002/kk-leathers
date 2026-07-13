"use client";

import { useState } from "react";
import { MapPin, Clock, Mail, Phone, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/anim/Reveal";
import Button from "@/components/ui/Button";
import ShoeStage from "@/components/shoe/ShoeStage";
import { site } from "@/lib/site";
import ContactField from "./ContactField";

type Errors = { name?: string; email?: string; message?: string };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InfoItem = {
  Icon: LucideIcon;
  label: string;
  text: string;
  href?: string;
};

const infoItems: InfoItem[] = [
  { Icon: MapPin, label: "Address", text: site.address },
  { Icon: Clock,  label: "Hours",   text: site.hours },
  { Icon: Mail,   label: "Email",   text: site.email,  href: `mailto:${site.email}` },
  { Icon: Phone,  label: "Phone",   text: site.phone,  href: `tel:${site.phone}` },
];

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent,   setSent]   = useState(false);

  const set = (k: keyof typeof values) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please share your name.";
    if (!emailRe.test(values.email)) e.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      e.message = "Tell us a little more (10+ characters).";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      setValues({ name: "", email: "", message: "" });
    }
  };

  return (
    <Section id="contact" tone="raised" className="grain">
      {/* Hidden waypoint — shoe stays invisible through this stretch */}
      <ShoeStage
        order={70}
        pose={{ width: 120, opacity: 0, glow: 0 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2"
        aria-label=""
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Left — brand info + location panel */}
        <div>
          <SectionHeading
            index="08"
            eyebrow="Enquiries"
            title="Begin a commission"
            intro="Tell us what you have in mind — a pair of Oxfords, a gift, a corporate order. We reply to every enquiry personally."
            className="mb-10"
          />

          <Reveal y={18}>
            <ul className="flex flex-col gap-5 text-small text-text-secondary">
              {infoItems.map(({ Icon, label, text, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <Icon
                    className="mt-[3px] shrink-0 text-gold"
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {href ? (
                    <a
                      href={href}
                      className="transition-colors duration-200 hover:text-text-primary"
                    >
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Location decorative panel */}
          <Reveal y={22} delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-card border border-white/[0.07]">
              <div
                className="relative flex h-[200px] items-center justify-center"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(123,74,36,0.22), transparent 60%)," +
                    "linear-gradient(180deg, #181210, #0c0a09)",
                }}
              >
                {/* Subtle grid */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_72%)]" />
                <div className="relative flex flex-col items-center gap-[6px] text-center">
                  <MapPin className="text-gold/80" size={28} strokeWidth={1.4} aria-hidden />
                  <p className="font-display text-[20px] font-semibold text-text-primary">
                    The Leather Atelier
                  </p>
                  <p className="text-caption text-text-muted">Chennai, India</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal y={24} delay={0.1} className="relative">
          {sent ? (
            <div
              className="flex h-full min-h-[360px] flex-col items-center justify-center
                rounded-card border border-success/25 bg-surface p-10 text-center
                shadow-[0_8px_24px_rgba(0,0,0,.22)]"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success/12">
                <Check className="text-success" size={26} strokeWidth={1.6} />
              </span>
              <h3 className="font-display text-subheading font-semibold">Thank you</h3>
              <p className="mt-3 max-w-[34ch] text-small text-text-secondary">
                Your enquiry has reached us. We&apos;ll be in touch personally, very soon.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 text-[11px] uppercase tracking-[0.20em] text-gold transition-colors hover:text-text-primary"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-5
                rounded-card border border-white/[0.07]
                bg-surface p-8 sm:p-10
                shadow-[0_2px_4px_rgba(0,0,0,.14),0_8px_24px_rgba(0,0,0,.22)]"
            >
              <ContactField
                id="name"
                label="Your name"
                value={values.name}
                onChange={set("name")}
                error={errors.name}
              />
              <ContactField
                id="email"
                label="Email address"
                type="email"
                value={values.email}
                onChange={set("email")}
                error={errors.email}
              />
              <ContactField
                id="message"
                label="Your enquiry"
                textarea
                value={values.message}
                onChange={set("message")}
                error={errors.message}
              />
              <Button type="submit" className="mt-2 w-full" arrow>
                Send Enquiry
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
