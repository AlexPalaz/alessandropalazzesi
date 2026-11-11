import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Clients, Contact, Hero, Lab, Principles, Services, Stack } from "@/components/Sections";
import { getDictionary, hasLocale } from "@/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main id="content" className="relative z-10">
        <Hero dict={dict} />
        <Stack dict={dict} />
        <Services dict={dict} />
        <Principles dict={dict} />
        <Clients dict={dict} />
        <Lab dict={dict} />
        <Contact dict={dict} />
      </main>
    </>
  );
}
