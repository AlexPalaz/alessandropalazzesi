import type { Dictionary } from "@/i18n";
import { site } from "@/site.config";
import { CopyEmail } from "./CopyEmail";

const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-16";

/** A display heading whose last line ends with the cobalt point. */
function Title({
  lines,
  as: Tag = "h2",
  className,
}: {
  lines: string[];
  as?: "h1" | "h2";
  className: string;
}) {
  return (
    <Tag className={`display ${className}`}>
      {lines.map((line, index) => (
        <span key={line} className="block">
          {line}
          {index === lines.length - 1 && <span className="text-cobalt">.</span>}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Narrow screens only: the stretch of the page kept free for the 3D of scene
 * `scene`. The stage draws that scene inside this box and nowhere else, so the
 * animation scrolls with the page and is never behind text. Wide screens place
 * the subject beside the copy instead, and this box is not rendered.
 */
function StageSlot({ scene, className }: { scene: number; className: string }) {
  return <div data-stage-slot={scene} aria-hidden="true" className={`xl:hidden ${className}`} />;
}

const SECTION_COUNT = 5;

function SceneIndex({ index }: { index: number }) {
  return (
    <span className="font-mono text-[13px] text-muted">
      {String(index + 1).padStart(2, "0")} / {String(SECTION_COUNT).padStart(2, "0")}
    </span>
  );
}

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  return (
    <section id="top" data-scene="0" className="relative flex min-h-svh flex-col">
      <StageSlot scene={0} className="mt-16 h-[42svh] md:mt-[88px]" />
      <div className={`${wrap} flex flex-1 flex-col justify-end pt-5 pb-10 xl:justify-center xl:pt-[120px] xl:pb-8`}>
        <div className="flex max-w-[860px] flex-col gap-6 md:gap-7">
          <p className="kicker">{hero.kicker}</p>
          <Title as="h1" lines={hero.title} className="text-[clamp(3.25rem,8.6vw,7.75rem)]" />
          <p className="max-w-[540px] text-base leading-[1.55] text-body md:text-[19px]">{hero.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <a
              href="#contact"
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-full bg-ink px-7 text-[15px] font-semibold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span aria-hidden="true" className="size-[9px] rounded-full bg-[#6f86ff]" />
              {hero.cta}
            </a>
            <a
              href="#clients"
              className="inline-flex h-[52px] items-center justify-center text-[15px] font-semibold underline underline-offset-[6px] transition-colors hover:text-cobalt"
            >
              {hero.secondary}
            </a>
          </div>
        </div>
      </div>
      {/* Solid ground: the particles in flight pass behind this bar, never over its text. */}
      <div className="relative bg-paper">
       <div className={wrap}>
        <div className="flex flex-col gap-5 border-t border-ink py-6 xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:py-8">
          <dl className="grid grid-cols-3 gap-x-4 xl:flex xl:gap-x-12">
            {hero.stats.map((stat) => (
              <div key={stat.value} className="flex flex-col-reverse justify-end gap-1 xl:flex-row-reverse xl:items-baseline xl:gap-3">
                <dt className="text-xs leading-snug text-muted sm:text-sm">{stat.label}</dt>
                <dd className="font-display text-[17px] font-semibold tracking-[-0.02em] whitespace-nowrap text-cobalt sm:text-2xl xl:text-[28px]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            {[
              { href: site.github, name: "GitHub", label: dict.stack.github },
              { href: site.linkedin, name: "LinkedIn", label: dict.stack.linkedin },
            ]
              .filter((profile) => profile.href)
              .map((profile) => (
                <li key={profile.name}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={profile.label}
                    className="flex h-11 items-center justify-between gap-2.5 rounded-full border border-ink px-5 text-sm font-semibold transition-colors hover:border-cobalt hover:text-cobalt"
                  >
                    {profile.name}
                    <ArrowOut />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}

/** An arrow for links that leave the site. */
function ArrowOut() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

/**
 * A small isometric drawing of the stack: four plates, with the one this
 * group stands for lifted and filled. `active` counts from the top (0) down.
 */
function LayerGlyph({ active }: { active: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 56 58" className="h-[58px] w-14 shrink-0 overflow-visible">
      {[3, 2, 1, 0].map((layer) => {
        const on = layer === active;
        const y = 10 + layer * 9 - (on ? 4 : 0);
        return (
          <polygon
            key={layer}
            points={`28,${y} 52,${y + 10} 28,${y + 20} 4,${y + 10}`}
            fill={on ? "var(--cobalt)" : "var(--paper)"}
            stroke={on ? "var(--cobalt)" : "var(--ink)"}
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

/**
 * The stack: a slim strip between the hero and the services, not a section of
 * its own. Four groups, numbered like the four services below, each with its
 * layer of the stack drawn beside it. The solid ground covers the stage, so
 * the particles never run behind the text.
 */
export function Stack({ dict }: { dict: Dictionary }) {
  const { stack } = dict;
  return (
    <aside id="stack" aria-label={stack.kicker} className="relative border-y border-ink bg-paper">
      <dl className={`${wrap} grid grid-cols-1 gap-x-8 gap-y-5 py-5 sm:grid-cols-2 xl:grid-cols-[1fr_1.25fr_1.15fr_1fr]`}>
        {stack.groups.map((group, index) => (
          <div key={group.label} className="flex items-center gap-4">
            <LayerGlyph active={index} />
            <div className="flex min-w-0 flex-col gap-1">
              <dt className="flex items-baseline gap-2.5 font-mono text-xs tracking-[0.06em] uppercase">
                <span className="text-cobalt">{String(index + 1).padStart(2, "0")}</span>
                <span>{group.label}</span>
              </dt>
              <dd className="text-sm leading-snug text-body">
                {/* The separator belongs to the name before it, so a line never starts with a dot. */}
                {group.items.map((item, at) => (
                  <span key={item}>
                    <span className="whitespace-nowrap">
                      {item}
                      {at < group.items.length - 1 && " ·"}
                    </span>{" "}
                  </span>
                ))}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;
  return (
    <section id="services" data-scene="1" className="relative flex min-h-svh items-center pt-24 pb-8 md:pt-24">
      <div className={wrap}>
        <div className="flex max-w-[620px] flex-col gap-5">
          <div className="flex items-baseline justify-between">
            <p className="kicker">{services.kicker}</p>
            <SceneIndex index={1} />
          </div>
          <Title lines={services.title} className="text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none" />
          <StageSlot scene={1} className="h-[40svh]" />
          <ol className="border-t border-ink xl:mt-2">
            {services.items.map((item, index) => (
              <li key={item.name} className="flex gap-5 border-b border-rule py-3.5">
                <span className="w-7 shrink-0 pt-2 font-mono text-[13px] text-cobalt">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[24px] leading-tight font-semibold tracking-[-0.02em] md:text-[28px]">
                    {item.name}
                  </h3>
                  <p className="text-[15px] leading-normal text-body md:text-base">{item.desc}</p>
                  <p className="font-mono text-xs text-muted">{item.tech}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Clients({ dict }: { dict: Dictionary }) {
  const { clients } = dict;
  return (
    <section id="clients" data-scene="2" className="relative flex min-h-svh items-center pt-24 pb-10 md:pt-[104px]">
      <div className={wrap}>
        <div className="flex max-w-[816px] flex-col gap-6">
          <div className="flex items-baseline justify-between">
            <p className="kicker">{clients.kicker}</p>
            <SceneIndex index={2} />
          </div>
          <Title lines={clients.title} className="text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none" />
          <StageSlot scene={2} className="h-[40svh]" />
          <ol className="border-t border-ink xl:mt-3">
            {clients.items.map((client, index) => (
              <li
                key={client.name}
                className="grid grid-cols-1 gap-x-6 gap-y-2 border-b border-rule py-4 md:grid-cols-[132px_minmax(0,1fr)_200px]"
              >
                <span className="font-mono text-[13px] text-muted md:pt-3">
                  <span className="text-cobalt">{String(index + 1).padStart(2, "0")}</span> · {client.years}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] md:text-[32px]">
                    {client.name}
                  </h3>
                  <p className="text-[15px] leading-[1.45] text-body">{client.desc}</p>
                </div>
                <span className="font-mono text-xs leading-normal text-muted md:pt-3 md:text-right">
                  {client.role}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Lab: the route an AI project takes, from the problem to production. The
 * four captions sit on a line at the bottom; the stage draws the same route in
 * 3D above them, each stop standing over its caption's marker
 * (`data-route-anchor`, read by the scroll director). The captions have a
 * solid ground, so the 3D never runs behind the text.
 */
export function Lab({ dict }: { dict: Dictionary }) {
  const { lab } = dict;
  const last = lab.steps.length - 1;
  return (
    <section id="lab" data-scene="3" className="relative flex min-h-svh flex-col pt-24 md:pt-[112px]">
      <div className={`${wrap} flex flex-1 flex-col`}>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-6">
              <p className="kicker">{lab.kicker}</p>
              <SceneIndex index={3} />
            </div>
            <Title lines={lab.title} className="text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none" />
          </div>
          <div className="flex max-w-[500px] flex-col items-start gap-2 xl:pt-9">
            <p className="text-base leading-[1.55] text-body md:text-[18px]">{lab.body}</p>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 text-[15px] font-semibold underline underline-offset-[6px] transition-colors hover:text-cobalt"
            >
              {lab.cta}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <StageSlot scene={3} className="mt-4 h-[32svh]" />

      <div className="relative bg-paper">
        <ol className={`${wrap} grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`}>
          {lab.steps.map((step, index) => (
            <li key={step.name} className="relative flex flex-col gap-2 border-t border-ink pt-7 pr-8 pb-8 xl:pb-10">
              <span
                data-route-anchor
                aria-hidden="true"
                className={`absolute top-0 left-0 -translate-y-1/2 rounded-full ${
                  index === 0
                    ? "size-[13px] border-2 border-cobalt bg-paper"
                    : index === last
                      ? "size-[15px] bg-cobalt"
                      : "size-[9px] bg-cobalt"
                }`}
              />
              <p className="flex items-baseline gap-3 font-mono text-[13px]">
                <span className="text-cobalt">{String(index + 1).padStart(2, "0")}</span>
                {index === 0 && <span className="tracking-[0.06em] text-muted uppercase">{lab.start}</span>}
                {index === last && <span className="tracking-[0.06em] text-muted uppercase">{lab.end}</span>}
              </p>
              <h3 className="font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">{step.name}</h3>
              <p className="max-w-[300px] text-[15px] leading-normal text-body">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  return (
    <section id="contact" data-scene="4" className="relative flex min-h-svh flex-col">
      <StageSlot scene={4} className="mt-16 h-[34svh] md:mt-[88px]" />
      <div className={`${wrap} flex flex-1 flex-col justify-end pt-5 pb-12 xl:justify-center xl:pt-[120px]`}>
        <div className="flex max-w-[900px] flex-col gap-7 md:gap-9">
          <div className="flex items-baseline gap-6">
            <p className="kicker">{contact.kicker}</p>
            <SceneIndex index={4} />
          </div>
          <Title lines={contact.title} className="text-[clamp(3rem,7.8vw,7rem)]" />
          <div className="flex flex-col gap-3">
            {site.email && (
              <div className="flex flex-col gap-2 pb-2">
                <p className="font-display text-2xl font-medium tracking-[-0.02em] md:text-[34px]">{contact.email}</p>
                <CopyEmail
                  email={site.email}
                  labels={{ copy: contact.copy, copied: contact.copied, copyLabel: contact.copyLabel }}
                />
              </div>
            )}
            <a
              href={site.linkedin}
              className="self-start py-2 font-display text-2xl font-medium tracking-[-0.02em] underline underline-offset-8 transition-colors hover:text-cobalt md:text-[34px]"
            >
              {contact.linkedin}
            </a>
            {site.github && (
              <a
                href={site.github}
                className="self-start py-2 font-display text-xl font-medium tracking-[-0.02em] underline underline-offset-8 transition-colors hover:text-cobalt md:text-[24px]"
              >
                {contact.github}
              </a>
            )}
          </div>
        </div>
      </div>
      <footer className={wrap}>
        <div className="flex flex-col gap-1 border-t border-ink py-6 font-mono text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <span>{contact.rights}</span>
          <span className="text-muted">{contact.place}</span>
        </div>
      </footer>
    </section>
  );
}
