/**
 * Utilitários para lidar com datas sem sofrer com shifts de fuso horário (UTC).
 * No JavaScript, `new Date('YYYY-MM-DD')` cria uma data em UTC 00:00,
 * o que em fusos negativos (como Brasil) resulta no dia anterior.
 */

/**
 * Converte uma string "YYYY-MM-DD" para um objeto Date local (meia-noite local).
 */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  // No construtor new Date(year, monthIndex, day), o mês é 0-indexed
  return new Date(year, month - 1, day);
}

/**
 * Formata uma data local para string "YYYY-MM-DD".
 */
export function formatLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Retorna o dia do mês formatado com 2 dígitos (local).
 */
export function getLocalDay(dateStr: string): string {
  if (!dateStr) return '--';
  const d = parseLocalDate(dateStr);
  return d.getDate().toString().padStart(2, '0');
}

/**
 * Retorna o mês abreviado (local).
 */
export function getLocalMonthShort(dateStr: string): string {
  if (!dateStr) return '---';
  const d = parseLocalDate(dateStr);
  return d.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
}
