import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Image as ImageIcon,
  MessageCircle,
  Shield,
  UserPlus,
  Wifi,
  Bell,
} from "lucide-react";
import Logo from "../assets/logo-transparent-cropped.png";
import { useAuthStore } from "../store/useAuthStore";

const features = [
  {
    icon: MessageCircle,
    title: "Messages that land instantly",
    body: "Talk in the moment. No refresh, no waiting — conversations move as fast as you do.",
  },
  {
    icon: UserPlus,
    title: "Your people, your list",
    body: "Search, add, and keep a clean sidebar of the contacts you actually chat with.",
  },
  {
    icon: ImageIcon,
    title: "Share more than words",
    body: "Drop photos into the conversation and keep the thread feeling alive.",
  },
  {
    icon: Wifi,
    title: "See who’s around",
    body: "Clear online and offline cues so you know when someone’s free to talk.",
  },
  {
    icon: Bell,
    title: "Never miss a reply",
    body: "Unread badges on your contacts keep new messages impossible to overlook.",
  },
  {
    icon: Shield,
    title: "Private by design",
    body: "Unknown senders stay discreet until you choose to add them as a contact.",
  },
];

const roadmap = [
  "Typing indicators",
  "Group chats",
  "Emoji reactions",
  "Seen & delivery status",
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const LandingPage = () => {
  const { authUser } = useAuthStore();
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: easeOutExpo },
        };

  return (
    <div className="landing min-h-dvh overflow-x-hidden text-[var(--lp-text)]">
      <div className="landing-atmosphere" aria-hidden="true" />
      <div className="landing-grain" aria-hidden="true" />

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:max-w-none lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Tether"
              className="h-10 w-auto sm:h-11"
              width={132}
              height={44}
            />
          </a>
          <nav className="flex items-center gap-2 sm:gap-3">
            {authUser ? (
              <Link to="/chat" className="lp-btn lp-btn-primary">
                Open chats
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="lp-btn lp-btn-ghost hidden sm:inline-flex">
                  Log in
                </Link>
                <Link to="/signup" className="lp-btn lp-btn-primary">
                  Get started
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero: copy + full-bleed product plane */}
        <section className="relative z-10 min-h-dvh lg:grid lg:grid-cols-2">
          <div className="relative flex flex-col justify-center px-5 pb-12 pt-28 sm:px-8 lg:px-10 lg:pb-20 lg:pt-24 xl:pl-[max(2.5rem,calc((100vw-72rem)/2))]">
            <motion.p
              className="font-[family-name:var(--lp-display)] text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              {...fadeUp(0)}
            >
              Tether
            </motion.p>
            <motion.h1
              className="mt-5 max-w-xl font-[family-name:var(--lp-display)] text-2xl font-semibold leading-snug tracking-tight text-[var(--lp-text)] sm:text-3xl lg:text-[2rem]"
              {...fadeUp(0.08)}
            >
              Stay close to the people who matter.
            </motion.h1>
            <motion.p
              className="mt-4 max-w-md text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg"
              {...fadeUp(0.14)}
            >
              Private conversations in real time — messages, photos, and presence,
              without the noise.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              {...fadeUp(0.2)}
            >
              {authUser ? (
                <Link to="/chat" className="lp-btn lp-btn-primary lp-btn-lg">
                  Continue chatting
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="lp-btn lp-btn-primary lp-btn-lg">
                    Create free account
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-lg">
                    Log in
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            className="relative h-[min(58vh,420px)] w-full lg:h-auto lg:min-h-dvh"
            aria-hidden="true"
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.8, delay: 0.12, ease: easeOutExpo },
                })}
          >
            <HeroChatVisual />
          </motion.div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="relative z-10 border-t border-white/8 bg-[var(--lp-surface)]/40"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-[family-name:var(--lp-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built for real conversation
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg">
                Everything you need to stay in touch — nothing that gets in the way.
              </p>
            </div>

            <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, body }, i) => (
                <motion.li
                  key={title}
                  className="group"
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 16 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, margin: "-40px" },
                        transition: {
                          duration: 0.45,
                          delay: i * 0.05,
                          ease: easeOutExpo,
                        },
                      })}
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[var(--lp-accent-soft)] text-[var(--lp-accent)]">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="font-[family-name:var(--lp-display)] text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--lp-muted)]">
                    {body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Roadmap */}
        <section className="relative z-10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-[family-name:var(--lp-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                What’s next
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg">
                Tether is growing. Here’s what’s on the way.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {roadmap.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-white/8 pb-4 text-[var(--lp-muted)]"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-[var(--lp-accent)]"
                    aria-hidden="true"
                  />
                  <span className="text-base text-[var(--lp-text)]/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative z-10 border-t border-white/8">
          <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-[family-name:var(--lp-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to tether in?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg">
              Create an account in seconds and start a conversation that feels
              immediate.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {authUser ? (
                <Link to="/chat" className="lp-btn lp-btn-primary lp-btn-lg">
                  Open your chats
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="lp-btn lp-btn-primary lp-btn-lg">
                    Get started free
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-lg">
                    I already have an account
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="" className="h-8 w-auto opacity-90" width={96} height={32} />
            <span className="text-sm text-[var(--lp-muted)]">
              Stay close. Talk freely.
            </span>
          </div>
          <p className="text-sm text-[var(--lp-muted)]/70">
            © {new Date().getFullYear()} Tether
          </p>
        </div>
      </footer>
    </div>
  );
};

function HeroChatVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden border-t border-white/8 lg:border-l lg:border-t-0">
      <div className="lp-hero-glow" />
      <div className="absolute inset-0 flex bg-[#0e0e10]">
        <aside className="hidden w-[42%] flex-col border-r border-white/8 bg-[#0a0a0b] md:flex">
          <div className="border-b border-white/8 px-5 py-4 lg:pt-[5.5rem]">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--lp-muted)]">
              Contacts
            </p>
          </div>
          <div className="flex flex-col gap-1 p-3">
            <ContactRow name="Maya Chen" preview="See you at 7?" unread={2} active online />
            <ContactRow name="Jordan Lee" preview="Photo shared" online />
            <ContactRow name="Sam Rivera" preview="Thanks for earlier" />
            <ContactRow name="Alex Kim" preview="Talk soon" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4 lg:pt-[5.5rem] lg:pb-4">
            <span className="relative flex size-9 items-center justify-center rounded-full bg-[#2a2a30] text-sm font-semibold text-white">
              M
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#0e0e10] bg-[var(--lp-accent)]" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Maya Chen</p>
              <p className="text-xs text-[var(--lp-accent)]">Online</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden p-5 pb-8 sm:p-6 sm:pb-10">
            <Bubble side="them" delay={0.35}>
              Are we still on for tonight?
            </Bubble>
            <Bubble side="me" delay={0.55}>
              Absolutely — leaving in ten.
            </Bubble>
            <Bubble side="them" delay={0.75}>
              Perfect. I’ll send the spot.
            </Bubble>
            <Bubble side="them" delay={0.95} image>
              Shared a photo
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  name,
  preview,
  unread,
  active,
  online,
}: {
  name: string;
  preview: string;
  unread?: number;
  active?: boolean;
  online?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${
        active ? "bg-white/[0.07]" : "bg-transparent"
      }`}
    >
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2a2a30] text-xs font-semibold text-white">
        {name.charAt(0)}
        {online && (
          <span className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-[#0e0e10] bg-[var(--lp-accent)]" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-white">{name}</p>
        <p className="truncate text-[11px] text-[var(--lp-muted)]">{preview}</p>
      </div>
      {unread ? (
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--lp-accent)] text-[10px] font-bold text-[#0a0a0b]">
          {unread}
        </span>
      ) : null}
    </div>
  );
}

function Bubble({
  side,
  children,
  delay = 0,
  image = false,
}: {
  side: "me" | "them";
  children: ReactNode;
  delay?: number;
  image?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const isMe = side === "me";

  return (
    <motion.div
      className={`max-w-[85%] ${isMe ? "ml-auto" : "mr-auto"}`}
      {...(reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 10, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.4, delay, ease: easeOutExpo },
          })}
    >
      {image ? (
        <div
          className={`overflow-hidden rounded-2xl ${
            isMe ? "rounded-br-md bg-[var(--lp-accent)]/20" : "rounded-bl-md bg-[#1e1e24]"
          }`}
        >
          <img
            src="/spot.jpg"
            alt=""
            className="h-28 w-full object-cover"
            width={280}
            height={112}
          />
          <p
            className={`px-3 py-2 text-xs ${
              isMe ? "text-[var(--lp-accent)]" : "text-[var(--lp-muted)]"
            }`}
          >
            {children}
          </p>
        </div>
      ) : (
        <p
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
            isMe
              ? "rounded-br-md bg-[var(--lp-accent)] text-[#0a0a0b]"
              : "rounded-bl-md bg-[#1e1e24] text-[#e8e8ec]"
          }`}
        >
          {children}
        </p>
      )}
    </motion.div>
  );
}

export default LandingPage;
