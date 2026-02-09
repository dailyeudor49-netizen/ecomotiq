// Form validation utility - Anti-traffico sporco
// Validates phone, name, address + rate limiting & anti-bot

const PHONE_RULES: Record<string, { min: number; max: number; prefix: string[] }> = {
  CZ: { min: 7, max: 11, prefix: ['+420', '00420'] },
  SK: { min: 7, max: 11, prefix: ['+421', '00421'] },
  PL: { min: 7, max: 11, prefix: ['+48', '0048'] },
  HU: { min: 7, max: 11, prefix: ['+36', '0036'] },
  HR: { min: 7, max: 11, prefix: ['+385', '00385'] },
  IT: { min: 7, max: 12, prefix: ['+39', '0039'] },
  ES: { min: 7, max: 11, prefix: ['+34', '0034'] },
  PT: { min: 7, max: 11, prefix: ['+351', '00351'] },
  RO: { min: 7, max: 12, prefix: ['+40', '0040'] },
  LT: { min: 7, max: 10, prefix: ['+370', '00370'] },
  DE: { min: 7, max: 13, prefix: ['+49', '0049'] },
  BG: { min: 7, max: 11, prefix: ['+359', '00359'] },
  SI: { min: 7, max: 10, prefix: ['+386', '00386'] },
};

const KEYBOARD_SEQUENCES = [
  'qwerty', 'qwertz', 'asdfgh', 'zxcvbn', 'yxcvbn',
  'abcdef', 'aaaaaa', 'bbbbbb', 'cccccc', 'dddddd',
  '123456', 'qazwsx',
];

const ERROR_MESSAGES: Record<string, {
  phoneInvalid: string;
  phoneLength: string;
  nameTwoWords: string;
  nameMinChars: string;
  nameNoNumbers: string;
  nameSuspicious: string;
  addressShort: string;
  rateLimited: string;
  tooFast: string;
}> = {
  CZ: {
    phoneInvalid: 'Telefonní číslo může obsahovat pouze číslice.',
    phoneLength: 'Zadejte platné telefonní číslo.',
    nameTwoWords: 'Vyplňte prosím jméno a příjmení.',
    nameMinChars: 'Jméno i příjmení musí mít alespoň 2 znaky.',
    nameNoNumbers: 'Jméno nesmí obsahovat číslice.',
    nameSuspicious: 'Zadejte prosím platné jméno.',
    addressShort: 'Zadejte prosím úplnou adresu.',
    rateLimited: 'Objednávka již byla odeslána. Zkuste to později.',
    tooFast: 'Vyplňte prosím formulář pečlivě.',
  },
  SK: {
    phoneInvalid: 'Telefónne číslo môže obsahovať iba číslice.',
    phoneLength: 'Zadajte platné telefónne číslo.',
    nameTwoWords: 'Vyplňte prosím meno a priezvisko.',
    nameMinChars: 'Meno aj priezvisko musia mať aspoň 2 znaky.',
    nameNoNumbers: 'Meno nesmie obsahovať číslice.',
    nameSuspicious: 'Zadajte prosím platné meno.',
    addressShort: 'Zadajte prosím úplnú adresu.',
    rateLimited: 'Objednávka už bola odoslaná. Skúste to neskôr.',
    tooFast: 'Vyplňte prosím formulár starostlivo.',
  },
  PL: {
    phoneInvalid: 'Numer telefonu może zawierać tylko cyfry.',
    phoneLength: 'Wprowadź prawidłowy numer telefonu.',
    nameTwoWords: 'Proszę wpisać imię i nazwisko.',
    nameMinChars: 'Imię i nazwisko muszą mieć co najmniej 2 znaki.',
    nameNoNumbers: 'Imię nie może zawierać cyfr.',
    nameSuspicious: 'Proszę wpisać prawidłowe imię.',
    addressShort: 'Proszę wpisać pełny adres.',
    rateLimited: 'Zamówienie zostało już wysłane. Spróbuj później.',
    tooFast: 'Proszę dokładnie wypełnić formularz.',
  },
  HU: {
    phoneInvalid: 'A telefonszám csak számjegyeket tartalmazhat.',
    phoneLength: 'Adjon meg érvényes telefonszámot.',
    nameTwoWords: 'Kérjük, adja meg a vezeték- és keresztnevét.',
    nameMinChars: 'A vezetéknévnek és a keresztnévnek legalább 2 karakterből kell állnia.',
    nameNoNumbers: 'A név nem tartalmazhat számjegyeket.',
    nameSuspicious: 'Kérjük, adjon meg érvényes nevet.',
    addressShort: 'Kérjük, adja meg a teljes címet.',
    rateLimited: 'A rendelés már elküldve. Próbálja később.',
    tooFast: 'Kérjük, töltse ki gondosan az űrlapot.',
  },
  HR: {
    phoneInvalid: 'Telefonski broj može sadržavati samo znamenke.',
    phoneLength: 'Unesite važeći telefonski broj.',
    nameTwoWords: 'Molimo unesite ime i prezime.',
    nameMinChars: 'Ime i prezime moraju imati najmanje 2 znaka.',
    nameNoNumbers: 'Ime ne smije sadržavati brojeve.',
    nameSuspicious: 'Molimo unesite ispravno ime.',
    addressShort: 'Molimo unesite potpunu adresu.',
    rateLimited: 'Narudžba je već poslana. Pokušajte kasnije.',
    tooFast: 'Molimo pažljivo ispunite obrazac.',
  },
  IT: {
    phoneInvalid: 'Il numero di telefono può contenere solo cifre.',
    phoneLength: 'Inserisci un numero di telefono valido.',
    nameTwoWords: 'Inserisci nome e cognome.',
    nameMinChars: 'Nome e cognome devono avere almeno 2 caratteri.',
    nameNoNumbers: 'Il nome non può contenere numeri.',
    nameSuspicious: 'Inserisci un nome valido.',
    addressShort: 'Inserisci un indirizzo completo.',
    rateLimited: 'Ordine già inviato. Riprova più tardi.',
    tooFast: 'Compila il modulo con attenzione.',
  },
  ES: {
    phoneInvalid: 'El número de teléfono solo puede contener dígitos.',
    phoneLength: 'Introduce un número de teléfono válido.',
    nameTwoWords: 'Por favor, introduce nombre y apellido.',
    nameMinChars: 'El nombre y apellido deben tener al menos 2 caracteres.',
    nameNoNumbers: 'El nombre no puede contener números.',
    nameSuspicious: 'Por favor, introduce un nombre válido.',
    addressShort: 'Por favor, introduce una dirección completa.',
    rateLimited: 'El pedido ya fue enviado. Inténtalo más tarde.',
    tooFast: 'Por favor, completa el formulario con cuidado.',
  },
  PT: {
    phoneInvalid: 'O número de telefone só pode conter dígitos.',
    phoneLength: 'Introduza um número de telefone válido.',
    nameTwoWords: 'Por favor, introduza nome e apelido.',
    nameMinChars: 'O nome e apelido devem ter pelo menos 2 caracteres.',
    nameNoNumbers: 'O nome não pode conter números.',
    nameSuspicious: 'Por favor, introduza um nome válido.',
    addressShort: 'Por favor, introduza uma morada completa.',
    rateLimited: 'A encomenda já foi enviada. Tente mais tarde.',
    tooFast: 'Por favor, preencha o formulário com cuidado.',
  },
  RO: {
    phoneInvalid: 'Numărul de telefon poate conține doar cifre.',
    phoneLength: 'Introduceți un număr de telefon valid.',
    nameTwoWords: 'Vă rugăm să introduceți numele și prenumele.',
    nameMinChars: 'Numele și prenumele trebuie să aibă cel puțin 2 caractere.',
    nameNoNumbers: 'Numele nu poate conține cifre.',
    nameSuspicious: 'Vă rugăm să introduceți un nume valid.',
    addressShort: 'Vă rugăm să introduceți adresa completă.',
    rateLimited: 'Comanda a fost deja trimisă. Încercați mai târziu.',
    tooFast: 'Vă rugăm să completați formularul cu atenție.',
  },
  LT: {
    phoneInvalid: 'Telefono numeris gali turėti tik skaitmenis.',
    phoneLength: 'Įveskite galiojantį telefono numerį.',
    nameTwoWords: 'Prašome įvesti vardą ir pavardę.',
    nameMinChars: 'Vardas ir pavardė turi turėti bent 2 simbolius.',
    nameNoNumbers: 'Vardas negali turėti skaičių.',
    nameSuspicious: 'Prašome įvesti teisingą vardą.',
    addressShort: 'Prašome įvesti pilną adresą.',
    rateLimited: 'Užsakymas jau išsiųstas. Bandykite vėliau.',
    tooFast: 'Prašome atidžiai užpildyti formą.',
  },
  DE: {
    phoneInvalid: 'Die Telefonnummer darf nur Ziffern enthalten.',
    phoneLength: 'Bitte geben Sie eine gültige Telefonnummer ein.',
    nameTwoWords: 'Bitte geben Sie Vor- und Nachnamen ein.',
    nameMinChars: 'Vor- und Nachname müssen mindestens 2 Zeichen haben.',
    nameNoNumbers: 'Der Name darf keine Zahlen enthalten.',
    nameSuspicious: 'Bitte geben Sie einen gültigen Namen ein.',
    addressShort: 'Bitte geben Sie eine vollständige Adresse ein.',
    rateLimited: 'Die Bestellung wurde bereits gesendet. Versuchen Sie es später.',
    tooFast: 'Bitte füllen Sie das Formular sorgfältig aus.',
  },
  BG: {
    phoneInvalid: 'Телефонният номер може да съдържа само цифри.',
    phoneLength: 'Въведете валиден телефонен номер.',
    nameTwoWords: 'Моля, въведете име и фамилия.',
    nameMinChars: 'Името и фамилията трябва да имат поне 2 символа.',
    nameNoNumbers: 'Името не може да съдържа цифри.',
    nameSuspicious: 'Моля, въведете валидно име.',
    addressShort: 'Моля, въведете пълен адрес.',
    rateLimited: 'Поръчката вече е изпратена. Опитайте по-късно.',
    tooFast: 'Моля, попълнете формуляра внимателно.',
  },
  SI: {
    phoneInvalid: 'Telefonska številka lahko vsebuje samo številke.',
    phoneLength: 'Vnesite veljavno telefonsko številko.',
    nameTwoWords: 'Prosimo, vnesite ime in priimek.',
    nameMinChars: 'Ime in priimek morata imeti vsaj 2 znaka.',
    nameNoNumbers: 'Ime ne sme vsebovati številk.',
    nameSuspicious: 'Prosimo, vnesite veljavno ime.',
    addressShort: 'Prosimo, vnesite popoln naslov.',
    rateLimited: 'Naročilo je že bilo oddano. Poskusite pozneje.',
    tooFast: 'Prosimo, skrbno izpolnite obrazec.',
  },
};

function cleanPhone(phone: string, countryCode: string): string {
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  const rules = PHONE_RULES[countryCode];
  if (rules) {
    for (const prefix of rules.prefix) {
      if (cleaned.startsWith(prefix)) {
        cleaned = cleaned.slice(prefix.length);
        break;
      }
    }
  }
  // Remove leading zero (common in some countries)
  if (cleaned.startsWith('0') && cleaned.length > 1) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

function getMessages(countryCode: string) {
  return ERROR_MESSAGES[countryCode] || ERROR_MESSAGES['IT'];
}

export function validateForm(params: {
  name: string;
  phone: string;
  address: string;
  countryCode: string;
  productKey: string;
  pageLoadTime?: number;
}): { isValid: boolean; error: string } {
  const { name, phone, address, countryCode, productKey, pageLoadTime } = params;
  const msg = getMessages(countryCode);

  // Anti-bot: check minimum time on page (3 seconds)
  if (pageLoadTime && (Date.now() - pageLoadTime) < 3000) {
    return { isValid: false, error: msg.tooFast };
  }

  // Rate limiting: block if submitted in last 60 seconds
  const rateLimitKey = `formSubmit_${productKey}`;
  const lastSubmit = localStorage.getItem(rateLimitKey);
  if (lastSubmit && (Date.now() - parseInt(lastSubmit)) < 60000) {
    return { isValid: false, error: msg.rateLimited };
  }

  // === NAME VALIDATION ===
  const trimmedName = name.trim();
  // No numbers in name
  if (/\d/.test(trimmedName)) {
    return { isValid: false, error: msg.nameNoNumbers };
  }
  // Must have at least 2 words
  const nameParts = trimmedName.split(/\s+/).filter(p => p.length > 0);
  if (nameParts.length < 2) {
    return { isValid: false, error: msg.nameTwoWords };
  }
  // Each word must have at least 2 characters
  if (nameParts.some(p => p.length < 2)) {
    return { isValid: false, error: msg.nameMinChars };
  }
  // Block keyboard sequences
  const nameLower = trimmedName.toLowerCase().replace(/\s+/g, '');
  if (KEYBOARD_SEQUENCES.some(seq => nameLower.includes(seq))) {
    return { isValid: false, error: msg.nameSuspicious };
  }

  // === PHONE VALIDATION ===
  const cleanedPhone = cleanPhone(phone, countryCode);
  // Must contain only digits
  if (!/^\d+$/.test(cleanedPhone)) {
    return { isValid: false, error: msg.phoneInvalid };
  }
  // Check length for country
  const rules = PHONE_RULES[countryCode];
  if (rules) {
    if (cleanedPhone.length < rules.min || cleanedPhone.length > rules.max) {
      return { isValid: false, error: msg.phoneLength };
    }
  }

  // === ADDRESS VALIDATION ===
  if (address.trim().length < 8) {
    return { isValid: false, error: msg.addressShort };
  }

  // All checks passed - save rate limit timestamp
  localStorage.setItem(rateLimitKey, Date.now().toString());

  return { isValid: true, error: '' };
}
