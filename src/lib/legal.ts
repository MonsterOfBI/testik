/**
 * Who runs the site. Required by Russian law:
 * - 149-ФЗ ст. 10 ч. 2: the site must identify its owner;
 * - 152-ФЗ ст. 18.1: the privacy policy names the personal-data operator;
 * - 152-ФЗ ст. 9 ч. 4: the consent names the operator and its address.
 * Defaults are the site owner's published details; env vars can override them on a server.
 */
export const OPERATOR = {
  name: process.env.OPERATOR_NAME?.trim() || "Коломийцев Максим Дмитриевич",
  email: process.env.OPERATOR_EMAIL?.trim() || "maximkolomiitseff@yandex.ru",
  /** ИНН / ОГРНИП, optional */
  inn: process.env.OPERATOR_INN?.trim() || "",
  /** postal address for requests from data subjects, optional but recommended */
  address: process.env.OPERATOR_ADDRESS?.trim() || "",
};

export const operatorReady = Boolean(OPERATOR.name && OPERATOR.email);

/** Bump when the policy, consent or terms change in substance; stored with each user's consent. */
export const LEGAL_VERSION = "2026-11-06";
export const LEGAL_DATE = { ru: "6 ноября 2026 г.", en: "6 November 2026" };

/** Age rating for the whole site (436-ФЗ): screeners mention death and self-harm without detail, which is 16+. */
export const AGE_RATING = "16+";

/** Tests whose results are health data (152-ФЗ ст. 10) are never stored on the server. */
export const SENSITIVE_CATEGORIES = new Set(["mental-health"]);

export const CONSENT_COOKIE = "pd_consent";

export const placeholder = (v: string, ru: boolean) => v || (ru ? "[не указано владельцем сайта]" : "[not set by the site owner]");
