"use client";

import { useState } from "react";
import { MapPin, Clock, Mail, Phone, Check } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/anim/Reveal";
import Button from "@/components/ui/Button";
import ShoeStage from "@/components/shoe/ShoeStage";
import { site } from "@/lib/site";
import ContactField from "./ContactField";

type Errors = { name?: string; email?: string; message?: string };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact (doc 09 Phase 13) — a validated enquiry form with floating-label
 * premium fields, brand info, and a location panel that plays the packaging
 * film behind it (integrates the packaging-process asset). Client-side submit
 * with a graceful confirmation (no backend wired).
 */
export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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
      {/* Hidden waypoint (order 70): the shoe stays invisible through the whole
          Business→Contact stretch, re-emerging only for the footer finale. */}
      <ShoeStage
        order={70}
        pose={{ width: 120, opacity: 0, glow: 0 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2"
        aria-label=""
      />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: info + location film */}
        <div>
          <SectionHeading
            index="08"
            eyebrow="Enquiries"
            title="Begin a commission"
            intro="Tell us what you have in mind — a pair of Oxfords, a gift, a corporate order. We reply to every enquiry personally."
            className="mb-10"
          />

          <Reveal y={20}>
            <ul className="flex flex-col gap-5 text-small text-text-secondary">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 shrink-0 text-gold" size={20} />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="mt-1 shrink-0 text-gold" size={20} />
                <span>{site.hours}</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 shrink-0 text-gold" size={20} />
                <a href={`mailto:${site.email}`} className="hover:text-text-primary">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-1 shrink-0 text-gold" size={20} />
                <a href={`tel:${site.phone}`} className="hover:text-text-primary">
                  {site.phone}
                </a>
              </li>
            </ul>
          </Reveal>

          {/* Location panel — a quiet, warm atelier plate (no product film) */}
          <Reveal y={24} delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-card border border-white/[0.08]">
              <div className="relative flex h-[220px] items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,rgba(123,74,36,0.22),transparent_60%),linear-gradient(180deg,#161210,#0a0a0a)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:44px_44px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_75%)]" />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <MapPin className="text-gold" size={30} />
                  <p className="font-display text-card-title">The Leather Atelier</p>
                  <p className="text-caption text-text-muted">Chennai, India</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: form — no shoe here; the enquiry is the focus. */}
        <Reveal y={26} delay={0.1} className="relative">
          {sent ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-card border border-success/30 bg-surface p-10 text-center">
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
                <Check className="text-success" size={28} />
              </span>
              <h3 className="font-display text-subheading">Thank you</h3>
              <p className="mt-3 max-w-[36ch] text-small text-text-secondary">
                Your enquiry has reached us. We&apos;ll be in touch personally,
                very soon.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 text-caption uppercase tracking-[0.18em] text-gold hover:text-text-primary"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-6 rounded-card border border-white/[0.08] bg-surface p-8 sm:p-10"
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
