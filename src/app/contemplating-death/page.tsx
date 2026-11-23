import Image from "next/image";
import {
  BioProvider,
  SpeakerGrid,
} from "@/components/contemplating-death/bios";
import { Hero } from "@/components/contemplating-death/hero";
import {
  MotionRoot,
  ParallaxLayer,
  Reveal,
  ScrubHeading,
} from "@/components/contemplating-death/motion-kit";
import { RegistrationForm } from "@/components/contemplating-death/registration-form";
import { Schedule } from "@/components/contemplating-death/schedule";
import { SiteHeader } from "@/components/contemplating-death/site-header";
import {
  cdPriceLabel,
  isCdRegistrationOpen,
} from "@/lib/contemplating-death/config";
import { cdEvent } from "../../../content/contemplating-death";

export const dynamic = "force-dynamic";

export default function ContemplatingDeathPage() {
  const registrationOpen = isCdRegistrationOpen();

  return (
    <MotionRoot>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <span id="top" />
      <SiteHeader />
      <main id="main">
        <Hero />

        <section
          className="event-band on-dark"
          id="details"
          aria-labelledby="details-title"
        >
          <div className="shell facts">
            <h2 id="details-title" className="sr-only">
              Event details
            </h2>
            <Reveal className="fact" y={18}>
              <span className="eyebrow">Date</span>
              <strong>
                <time dateTime={cdEvent.dateIso}>{cdEvent.dateLabel}</time>
              </strong>
            </Reveal>
            <Reveal className="fact" y={18} delay={0.1}>
              <span className="eyebrow">Time</span>
              <strong>
                <time dateTime={cdEvent.startIso}>{cdEvent.startLabel}</time> to{" "}
                <time dateTime={cdEvent.endIso}>{cdEvent.endLabel}</time>{" "}
                <span className="minor">{cdEvent.timezoneLabel}</span>
              </strong>
            </Reveal>
            <Reveal className="fact" y={18} delay={0.2}>
              <span className="eyebrow">Venue</span>
              <strong>{cdEvent.venueName}</strong>
              <a
                href={cdEvent.venueMapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cdEvent.venueAddress}
              </a>
            </Reveal>
          </div>
        </section>

        <section
          className="reflection on-dark"
          id="reflection"
          aria-labelledby="reflection-title"
        >
          <ParallaxLayer className="reflection-bg" />
          <div className="shell">
            <ScrubHeading
              id="reflection-title"
              text={cdEvent.reflectionHeading}
            />
            <Reveal className="reflection-copy" delay={0.15} blur>
              <p>
                When was the last time we truly reflected on our death, our
                standing before Allah, and the life that awaits us beyond this
                one? Amidst our daily routines, ambitions and distractions, the
                Hereafter can become something we know of, but rarely give
                ourselves the time to contemplate.
              </p>
              <p>
                Join us for <em>Contemplating Death</em>, an opportunity to
                reflect on the certainty of death, the journey of the soul, the
                realities of the Hereafter and what it means to prepare for our
                meeting with Allah. Through reminders from the Qur’an and
                Sunnah, we hope to revisit what matters most and reflect on
                whether the lives we are living are preparing us for the lives
                to come.
              </p>
            </Reveal>
          </div>
        </section>

        <BioProvider>
          <section
            className="speakers"
            id="speakers"
            aria-labelledby="speakers-title"
          >
            <div className="shell">
              <Reveal className="section-heading">
                <p className="eyebrow">Five teachers, one day</p>
                <h2 id="speakers-title">
                  Meet the <em>speakers</em>
                </h2>
                <span className="rule" aria-hidden="true" />
              </Reveal>
              <SpeakerGrid />
            </div>
          </section>

          <section
            className="schedule on-dark"
            id="schedule"
            aria-labelledby="schedule-title"
          >
            <div className="shell schedule-shell">
              <Reveal className="section-heading">
                <p className="eyebrow">
                  {cdEvent.startLabel} to {cdEvent.endLabel}{" "}
                  {cdEvent.timezoneLabel}
                </p>
                <h2 id="schedule-title">
                  Event <em>schedule</em>
                </h2>
                <span className="rule" aria-hidden="true" />
              </Reveal>
              <Schedule />
            </div>
          </section>
        </BioProvider>

        <section
          className="registration"
          id="register"
          aria-labelledby="registration-title"
        >
          <div className="shell registration-grid">
            <Reveal className="registration-intro">
              <p className="eyebrow">Registration</p>
              <h2 id="registration-title">
                Reserve <em>your place</em>
              </h2>
              <p>
                One registration per attendee. After payment, we’ll email a
                ticket with a unique QR code to show at the door.
              </p>
              <div className="price">
                <strong>{cdPriceLabel}</strong>
                <span>{cdEvent.currency} per attendee</span>
              </div>
              <ol className="steps">
                <li>Fill in the attendee details</li>
                <li>Pay on Stripe’s secure checkout</li>
                <li>Get your QR ticket by email</li>
              </ol>
              <p className="registration-contact">
                Questions?{" "}
                <a href={`mailto:${cdEvent.contactEmail}`}>
                  Contact the organizers
                </a>
                .
              </p>
            </Reveal>
            <Reveal className="registration-panel" delay={0.12} y={40}>
              <h3>Attendee details</h3>
              <RegistrationForm open={registrationOpen} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer on-dark">
        <div className="shell footer-inner">
          <a
            className="wordmark"
            href="#top"
            aria-label="Mathabah Learning Centre, back to top"
          >
            <Image
              src="/contemplating-death/mathabah-logo.png"
              width={190}
              height={83}
              alt=""
            />
          </a>
          <p>
            {cdEvent.title} <span aria-hidden="true">·</span> January 16, 2027
          </p>
          <a
            className="staff-link"
            href="/admin-login?next=/admin/contemplating-death"
          >
            Staff sign-in
          </a>
        </div>
      </footer>
    </MotionRoot>
  );
}
