import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";

export const metadata: Metadata = { title: "Конфиденциальность · Privacy" };

const T = {
  ru: ["Конфиденциальность", "Ответы на вопросы тестов хранятся в вашем браузере (localStorage). Если вы входите через VK, Яндекс или почту, мы сохраняем ваше имя, адрес почты, аватар и коды результатов, чтобы показывать историю в кабинете. Мы не продаём данные и не передаём ответы третьим лицам.", "С вашего согласия мы подключаем Яндекс Метрику и Google Analytics, чтобы видеть, какие страницы посещают. В аналитику не передаются ответы и результаты тестов.", "Чтобы удалить свои данные, очистите историю в кабинете или напишите нам, и мы удалим аккаунт."],
  en: ["Privacy", "Your test answers are stored in your browser (localStorage). If you sign in with VK, Yandex or email, we store your name, email, avatar and result codes to show your history. We never sell data or share answers with third parties.", "With your consent we load Yandex Metrica and Google Analytics to see which pages are visited. Test answers and results are never sent to analytics.", "To delete your data, clear the history in your space or contact us and we'll delete your account."],
};

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [h, ...ps] = T[lang];
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{h}</h1>
      <div className="mt-6 space-y-4 text-ink-2">{ps.map((p, i) => <p key={i}>{p}</p>)}</div>
    </div>
  );
}
