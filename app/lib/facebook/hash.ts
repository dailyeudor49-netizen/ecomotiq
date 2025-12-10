export async function sha256Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashNome(nome: string): Promise<string> {
  if (!nome) return '';
  const normalized = nome.toLowerCase().trim();
  return sha256Hash(normalized);
}

export async function hashCognome(cognome: string): Promise<string> {
  if (!cognome) return '';
  const normalized = cognome.toLowerCase().trim();
  return sha256Hash(normalized);
}

export async function hashTelefono(telefono: string): Promise<string> {
  if (!telefono) return '';
  let cleaned = telefono.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('3')) {
    cleaned = '39' + cleaned;
  }
  return sha256Hash(cleaned);
}

export async function hashEmail(email: string): Promise<string> {
  if (!email) return '';
  const normalized = email.toLowerCase().trim();
  return sha256Hash(normalized);
}
