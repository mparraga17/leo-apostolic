// ============================================================
// popeQuotes.ts — FRASES DEL PAPA LEÓN XIV (BILINGÜE)
// ============================================================
// Frases auténticas del Papa León XIV verificadas en fuentes
// oficiales del Vaticano y medios católicos de referencia.
//
// Las frases con `en` disponible se muestran tanto en español
// como en inglés. Las frases solo en español únicamente se
// muestran cuando el idioma de la app es español.
//
// Fuentes:
// - https://www.vatican.va/content/leo-xiv/
// - https://www.ncregister.com/cna/start-here-15-quotes-from-pope-leo-xivs-first-encyclical-magnifica-humanitas
// - https://www.catholicworldreport.com
// - https://www.osvnews.com
// ============================================================

export interface LocalizedQuoteEntry {
  text: string;
  source: string;
}

export interface PopeQuote {
  es: LocalizedQuoteEntry;
  en?: LocalizedQuoteEntry;
}

// Citas de la encíclica Magnifica Humanitas (mayo 2026), bilingües
const encyclicalQuotes: PopeQuote[] = [
  {
    es: {
      text: 'Nunca antes la humanidad había tenido tanto poder sobre sí misma.',
      source: 'Encíclica Magnifica Humanitas, n. 4 — mayo de 2026',
    },
    en: {
      text: 'Never has humanity had such power over itself.',
      source: 'Encyclical Magnifica Humanitas, par. 4 — May 2026',
    },
  },
  {
    es: {
      text: 'En la era de la inteligencia artificial, cuando la dignidad humana se ve amenazada por nuevas formas de deshumanización, es nuestro urgente deber permanecer profundamente humanos. Debemos custodiar amorosamente la grandeza de la humanidad que nos ha sido confiada y que se revela en plenitud en Cristo, cuyo esplendor ninguna máquina podrá jamás reemplazar.',
      source: 'Encíclica Magnifica Humanitas, n. 15 — mayo de 2026',
    },
    en: {
      text: 'In the era of artificial intelligence, when human dignity is threatened by new forms of dehumanization, ours is the pressing duty to remain profoundly human. We must lovingly safeguard the grandeur of humanity bestowed upon us and revealed in its fullness in Christ, the splendor of which no machine can ever replace.',
      source: 'Encyclical Magnifica Humanitas, par. 15 — May 2026',
    },
  },
  {
    es: {
      text: 'La dignidad humana no depende de las capacidades, riqueza o posición social de la persona, ni de las decisiones acertadas o equivocadas que haya tomado; es un don que precede y trasciende a cada persona, otorgado por Dios como expresión de su amor infalible.',
      source: 'Encíclica Magnifica Humanitas, n. 50 — mayo de 2026',
    },
    en: {
      text: 'Human dignity does not depend on a person\'s abilities, wealth, or position in life, nor on the right or wrong choices made; instead, it is a gift that precedes and transcends each person, endowed by God as an expression of his unfailing love.',
      source: 'Encyclical Magnifica Humanitas, par. 50 — May 2026',
    },
  },
  {
    es: {
      text: 'Ningún pecado, fracaso, humillación o exclusión puede disminuir el valor profundo de una vida humana que Dios ha querido y llamado a la existencia.',
      source: 'Encíclica Magnifica Humanitas, n. 52 — mayo de 2026',
    },
    en: {
      text: 'No sin, failure, humiliation, or exclusion can diminish the profound value of a human life that God has willed and called into being.',
      source: 'Encyclical Magnifica Humanitas, par. 52 — May 2026',
    },
  },
  {
    es: {
      text: 'Para un algoritmo, un error es un fallo que corregir; para una persona, en cambio, un error puede ser el catalizador de un cambio profundo. El futuro de una persona no es calculable, depende de su libertad — elevada por la gracia inagotable de Dios — y de las relaciones cultivadas.',
      source: 'Encíclica Magnifica Humanitas, n. 128 — mayo de 2026',
    },
    en: {
      text: 'For an algorithm, an error is a flaw to be corrected; for a person, however, an error can be a catalyst for profound change. A person\'s future is not calculable, but depends on one\'s freedom — elevated by the inexhaustible grace of God — and on the relationships cultivated.',
      source: 'Encyclical Magnifica Humanitas, par. 128 — May 2026',
    },
  },
  {
    es: {
      text: 'La civilización del amor no surgirá de un gesto único o espectacular, sino de la suma de pequeños y firmes actos de fidelidad que sirvan de baluarte contra la deshumanización.',
      source: 'Encíclica Magnifica Humanitas, n. 213 — mayo de 2026',
    },
    en: {
      text: 'The civilization of love will not arise from a single or spectacular gesture, but from the sum total of small and steadfast acts of fidelity that serve as a bulwark against dehumanization.',
      source: 'Encyclical Magnifica Humanitas, par. 213 — May 2026',
    },
  },
  {
    es: {
      text: '«Desarmemos las palabras y ayudaremos a desarmar el mundo». Las palabras tienen un poder enorme, algo que experimentamos en nuestras interacciones cotidianas; por ejemplo, las palabras pueden cambiar nuestro estado de ánimo para bien o para mal.',
      source: 'Encíclica Magnifica Humanitas, n. 214 — mayo de 2026',
    },
    en: {
      text: '"Let us disarm words and we will help to disarm the world." Words have enormous power, something we experience in our daily interactions; for example, spoken words can change our mood for better or for worse.',
      source: 'Encyclical Magnifica Humanitas, par. 214 — May 2026',
    },
  },
  {
    es: {
      text: 'Ningún sistema computacional, por sofisticado que sea, puede crear un corazón que se entrega a sí mismo, ni una conciencia que distinga el bien del mal. Aun cuando las máquinas destaquen en eficiencia, el rostro humano que pide ser mirado sigue siendo el centro de nuestra historia. Ese rostro humano es la plenitud hacia la que avanza la historia.',
      source: 'Encíclica Magnifica Humanitas, n. 233 — mayo de 2026',
    },
    en: {
      text: 'No computational system, however sophisticated, can create a heart that gives itself, or a conscience that discerns good from evil. Even when machines excel in efficiency, a human face that asks to be gazed upon remains the center of our history. This human face is the fullness toward which history is moving.',
      source: 'Encyclical Magnifica Humanitas, par. 233 — May 2026',
    },
  },
  {
    es: {
      text: '¡Permanezcamos fieles a la verdad! Viviendo entre flujos incesantes de información, opiniones e imágenes, sabemos lo fácil que puede ser influir en nuestras decisiones y preferencias mediante algoritmos cada vez más sofisticados. En este contexto, es imperativo cultivar corazones que amen la verdad, prefieran lo justo a pesar de los contenidos más atractivos, y busquen la sabiduría antes que los resultados inmediatos.',
      source: 'Encíclica Magnifica Humanitas, n. 237 — mayo de 2026',
    },
    en: {
      text: 'Let us remain faithful to the truth! Living amid incessant flows of information, opinions and images, we know how easy it can be to influence decisions and preferences through increasingly sophisticated algorithms. In this context, it is imperative to cultivate hearts that love the truth, prefer what is right despite the most appealing content and pursue wisdom rather than immediate results.',
      source: 'Encyclical Magnifica Humanitas, par. 237 — May 2026',
    },
  },
];

// Citas anteriores (solo en español)
const earlierQuotes: PopeQuote[] = [
  {
    es: {
      text: 'La paz sea con todos vosotros. Es la paz de Cristo resucitado. Una paz desarmada y desarmante, humilde y perseverante. Una paz que viene de Dios, el Dios que nos ama a todos, incondicionalmente.',
      source: 'Primer saludo tras ser elegido — 8 de mayo de 2025',
    },
    en: {
      text: 'Peace be with you all. It is the peace of the risen Christ. A disarmed and disarming peace, humble and persevering. A peace that comes from God, the God who loves us all, unconditionally.',
      source: 'First greeting after election — May 8, 2025',
    },
  },
  {
    es: {
      text: 'Soy hijo de san Agustín, agustino, que decía: "Para vosotros soy obispo, con vosotros soy cristiano". En este sentido podemos caminar todos juntos hacia esa patria que Dios nos ha preparado.',
      source: 'Primer discurso desde el balcón de San Pedro — 8 de mayo de 2025',
    },
  },
  {
    es: {
      text: 'Hermanos y hermanas, quisiera que nuestro primer gran deseo sea el de una Iglesia unida, signo de unidad y comunión, que se convierta en levadura para un mundo reconciliado.',
      source: 'Misa de inicio de su ministerio petrino — 18 de mayo de 2025',
    },
  },
  {
    es: {
      text: 'Dios nos ama, Dios ama a todos, y el mal no prevalecerá. Estamos todos en las manos de Dios. Por eso, sin miedo, unidos, dándonos la mano con Dios y entre nosotros, sigamos adelante.',
      source: 'Primer saludo tras ser elegido — 8 de mayo de 2025',
    },
    en: {
      text: 'God loves us, God loves everyone, and evil will not prevail. We are all in God\'s hands. So, without fear, united, hand in hand with God and with one another, let us go forward.',
      source: 'First greeting after election — May 8, 2025',
    },
  },
  {
    es: {
      text: 'Sed agentes de comunión, capaces de romper la lógica de la división y de la polarización, del individualismo y del egocentrismo. Centraos en Cristo, para vencer la lógica del mundo, de las fake news y de la frivolidad, con la belleza y la luz de la verdad.',
      source: 'Discurso a los misioneros digitales católicos — 29 de julio de 2025',
    },
  },
  {
    es: {
      text: 'Cuando un instrumento domina al hombre, el hombre se convierte en un instrumento: una mercancía en el mercado y, a su vez, una pieza de mercancía. Solo las relaciones sinceras y los vínculos estables construyen historias de vida buena.',
      source: 'Vigilia del Jubileo de los Jóvenes — 2 de agosto de 2025',
    },
  },
  {
    es: {
      text: 'La amistad con Cristo, que está en la base de la fe, no es solo una ayuda más entre tantas para construir el futuro: es nuestra estrella polar.',
      source: 'Vigilia del Jubileo de los Jóvenes — 2 de agosto de 2025',
    },
    en: {
      text: 'Friendship with Christ, which lies at the foundation of faith, is not just one help among many for building the future: it is our pole star.',
      source: 'Jubilee Vigil with Young People — August 2, 2025',
    },
  },
  {
    es: {
      text: 'En el rostro herido de los pobres encontramos impreso el sufrimiento del inocente y, por tanto, el mismo sufrimiento de Cristo.',
      source: 'Exhortación apostólica "Dilexi Te" — 9 de octubre de 2025',
    },
    en: {
      text: 'In the wounded face of the poor we find imprinted the suffering of the innocent and, therefore, the very suffering of Christ.',
      source: 'Apostolic Exhortation "Dilexi Te" — October 9, 2025',
    },
  },
  {
    es: {
      text: 'La espiritualidad mariana está al servicio del Evangelio: revela su sencillez. El cariño por María de Nazaret nos lleva a hacernos, junto a ella, discípulos de Jesús.',
      source: 'Jubileo de la Espiritualidad Mariana — 12 de octubre de 2025',
    },
  },
  {
    es: {
      text: 'La vida resplandece no porque seamos ricos, hermosos o poderosos. Resplandece cuando descubrimos en nosotros esta verdad: Dios me ha llamado, tengo una vocación, tengo una misión, mi vida sirve a algo más grande que yo mismo.',
      source: 'Jubileo de la Educación — 1 de noviembre de 2025',
    },
  },
  {
    es: {
      text: 'La inteligencia artificial puede procesar información rápidamente, pero no puede sustituir a la inteligencia humana. Y no le pidáis que haga vuestros deberes por vosotros: no puede ofrecer verdadera sabiduría.',
      source: 'Encuentro con jóvenes en Indianápolis — 21 de noviembre de 2025',
    },
    en: {
      text: 'Artificial intelligence can process information quickly, but it cannot replace human intelligence. And don\'t ask it to do your homework for you: it cannot offer true wisdom.',
      source: 'Meeting with young people in Indianapolis — November 21, 2025',
    },
  },
  {
    es: {
      text: 'La paz, de hecho, no se decreta: se acoge y se vive. Es un don de Dios, que se desarrolla con un trabajo paciente y colectivo. Es responsabilidad de todos, comenzando por las autoridades civiles.',
      source: 'Encuentro con autoridades en Yaundé, Camerún — 15 de abril de 2026',
    },
  },
  {
    es: {
      text: 'En un mundo dividido y atribulado, el Espíritu Santo nos enseña a caminar juntos en unidad.',
      source: 'Vigilia de Pentecostés 2025',
    },
    en: {
      text: 'In a divided and troubled world, the Holy Spirit teaches us to walk together in unity.',
      source: 'Pentecost Vigil 2025',
    },
  },
  {
    es: {
      text: 'Hoy más que nunca, la humanidad clama y pide la paz. Es un grito que requiere responsabilidad y razón, y no debe ser ahogado por el ruido de las armas o la retórica que incita al conflicto.',
      source: 'Ángelus en la solemnidad del Corpus Christi 2025',
    },
  },
  {
    es: {
      text: 'Tened valor. Sin miedo. Muchas veces en el Evangelio Jesús dice: "No tengáis miedo". Necesitamos ser valientes en el testimonio que damos, con el mundo y, sobre todo, con la vida.',
      source: 'Homilía en la cripta de la Basílica de San Pedro — mayo de 2025',
    },
    en: {
      text: 'Take courage. Without fear. Many times in the Gospel Jesus says: "Do not be afraid." We need to be courageous in the witness we give, with the world and, above all, with our lives.',
      source: 'Homily in the crypt of St. Peter\'s Basilica — May 2025',
    },
  },
  {
    es: {
      text: 'La evangelización, queridos hermanos y hermanas, no es nuestro intento de conquistar el mundo, sino la gracia infinita que irradia de las vidas transformadas por el Reino de Dios.',
      source: 'Vigilia de Pentecostés 2025',
    },
  },
  {
    es: {
      text: 'Cristo es nuestro salvador y en él somos uno, una familia de Dios, más allá de la rica variedad de nuestras lenguas, culturas y experiencias.',
      source: 'Discurso a las Obras Misionales Pontificias — mayo de 2025',
    },
    en: {
      text: 'Christ is our savior and in him we are one, a family of God, beyond the rich variety of our languages, cultures and experiences.',
      source: 'Address to the Pontifical Mission Societies — May 2025',
    },
  },
  {
    es: {
      text: 'Si permanecemos en su amor, él viene a habitar en nosotros y nuestra vida se convierte en un templo de Dios. Su amor nos ilumina, influye en nuestra forma de pensar.',
      source: 'Audiencia general — verano de 2025',
    },
  },
];

export const popeQuotes: PopeQuote[] = [...encyclicalQuotes, ...earlierQuotes];

/**
 * Devuelve la frase del día rotando por día del año.
 * Si el idioma es 'en' y la frase no está traducida, salta a la
 * siguiente que sí lo esté para evitar mostrar texto en español.
 */
export function getQuoteOfTheDay(
  date: Date = new Date(),
  locale: 'es' | 'en' = 'es',
): LocalizedQuoteEntry {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);

  if (locale === 'en') {
    const englishQuotes = popeQuotes.filter(q => q.en).map(q => q.en!);
    return englishQuotes[dayOfYear % englishQuotes.length];
  }
  return popeQuotes[dayOfYear % popeQuotes.length].es;
}
