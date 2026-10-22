// A newsletter só aparece no site depois que as variáveis do Brevo estiverem
// configuradas na Vercel. Sem elas, nada é exibido e a rota de cadastro recusa envios.
export function newsletterAtiva() {
  return Boolean(
    process.env.BREVO_API_KEY &&
      process.env.BREVO_LIST_ID &&
      process.env.BREVO_DOI_TEMPLATE_ID
  );
}
