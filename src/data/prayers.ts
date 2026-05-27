// ============================================================
// prayers.ts — ORACIONES CATÓLICAS TRADICIONALES
// ============================================================
// Todas las oraciones son de DOMINIO PÚBLICO (textos litúrgicos centenarios).
// ============================================================

import { Prayer, PrayerCategory } from '../models/types';

export const prayers: Prayer[] = [
  // ESENCIALES
  {
    id: 'pry_001',
    title: 'Padrenuestro',
    category: PrayerCategory.Esenciales,
    text: `Padre nuestro, que estás en el cielo,
santificado sea tu nombre;
venga a nosotros tu reino;
hágase tu voluntad
en la tierra como en el cielo.
Danos hoy nuestro pan de cada día;
perdona nuestras ofensas,
como también nosotros perdonamos
a los que nos ofenden;
no nos dejes caer en la tentación,
y líbranos del mal.
Amén.`,
    description: 'La oración que enseñó el propio Jesús a sus discípulos.',
  },
  {
    id: 'pry_002',
    title: 'Avemaría',
    category: PrayerCategory.Esenciales,
    text: `Dios te salve, María,
llena eres de gracia,
el Señor es contigo;
bendita Tú eres entre todas las mujeres,
y bendito es el fruto de tu vientre, Jesús.
Santa María, Madre de Dios,
ruega por nosotros, pecadores,
ahora y en la hora de nuestra muerte.
Amén.`,
    description: 'Oración a la Virgen María, basada en el saludo del ángel Gabriel.',
  },
  {
    id: 'pry_003',
    title: 'Gloria',
    category: PrayerCategory.Esenciales,
    text: `Gloria al Padre, y al Hijo, y al Espíritu Santo.
Como era en el principio, ahora y siempre,
por los siglos de los siglos.
Amén.`,
    description: 'Doxología trinitaria, alabanza a la Santísima Trinidad.',
  },
  {
    id: 'pry_004',
    title: 'Credo de los Apóstoles',
    category: PrayerCategory.Esenciales,
    text: `Creo en Dios, Padre Todopoderoso,
Creador del cielo y de la tierra.
Creo en Jesucristo, su único Hijo, nuestro Señor,
que fue concebido por obra y gracia del Espíritu Santo,
nació de Santa María Virgen,
padeció bajo el poder de Poncio Pilato,
fue crucificado, muerto y sepultado,
descendió a los infiernos,
al tercer día resucitó de entre los muertos,
subió a los cielos
y está sentado a la derecha de Dios, Padre Todopoderoso.
Desde allí ha de venir a juzgar a vivos y muertos.
Creo en el Espíritu Santo,
la santa Iglesia católica,
la comunión de los santos,
el perdón de los pecados,
la resurrección de la carne
y la vida eterna.
Amén.`,
    description: 'Profesión de fe que resume las verdades fundamentales del cristianismo.',
  },

  // MARIANAS
  {
    id: 'pry_005',
    title: 'Salve Regina',
    category: PrayerCategory.Marianas,
    text: `Dios te salve, Reina y Madre de misericordia,
vida, dulzura y esperanza nuestra; Dios te salve.
A Ti llamamos los desterrados hijos de Eva;
a Ti suspiramos, gimiendo y llorando,
en este valle de lágrimas.
Ea, pues, Señora abogada nuestra,
vuelve a nosotros esos tus ojos misericordiosos;
y después de este destierro,
muéstranos a Jesús, fruto bendito de tu vientre.
¡Oh clementísima, oh piadosa, oh dulce siempre Virgen María!
Ruega por nosotros, Santa Madre de Dios,
para que seamos dignos de alcanzar las promesas de Cristo.
Amén.`,
    description: 'Antífona mariana del s. XI, una de las más bellas de la tradición.',
  },
  {
    id: 'pry_006',
    title: 'Magníficat',
    category: PrayerCategory.Marianas,
    text: `Proclama mi alma la grandeza del Señor,
se alegra mi espíritu en Dios, mi Salvador;
porque ha mirado la humillación de su esclava.
Desde ahora me felicitarán todas las generaciones,
porque el Poderoso ha hecho obras grandes en mí:
su nombre es Santo,
y su misericordia llega a sus fieles
de generación en generación.
Él hace proezas con su brazo:
dispersa a los soberbios de corazón,
derriba del trono a los poderosos
y enaltece a los humildes,
a los hambrientos los colma de bienes
y a los ricos los despide vacíos.
Auxilia a Israel, su siervo,
acordándose de su misericordia,
como lo había prometido a nuestros padres,
en favor de Abrahán y su descendencia por siempre.
Amén.`,
    description: 'Cántico de María al visitar a Isabel (Lucas 1, 46-55).',
  },
  {
    id: 'pry_007',
    title: 'Acordaos (Memorare)',
    category: PrayerCategory.Marianas,
    text: `Acordaos, oh piadosísima Virgen María,
que jamás se ha oído decir
que ninguno de los que han acudido a Vuestra protección,
implorando Vuestra asistencia y reclamando Vuestro socorro,
haya sido abandonado por Vos.
Animado con esta confianza,
a Vos también acudo, oh Madre, Virgen de las vírgenes,
y aunque gimiendo bajo el peso de mis pecados,
me atrevo a presentarme ante Vuestra presencia soberana.
No deseches, oh Madre de Dios, mis humildes súplicas,
antes bien, escúchalas y acógelas benignamente.
Amén.`,
    description: 'Oración de confianza filial a la Virgen, atribuida a San Bernardo.',
  },
  {
    id: 'pry_014',
    title: 'Santo Rosario',
    category: PrayerCategory.Marianas,
    text: `[ Inicio ]

Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor, Dios nuestro. En el nombre del Padre y del Hijo y del Espíritu Santo. Amén.

Señor mío Jesucristo, Dios y hombre verdadero, Creador, Padre y Redentor mío…

Acto de contrición:
Pésame, Dios mío, de todo corazón de haberte ofendido, por ser Tú quien eres, bondad infinita, y porque te amo sobre todas las cosas. Propongo firmemente, ayudado de tu divina gracia, no volver a pecar, confesarme y cumplir la penitencia que me sea impuesta. Amén.

[ Misterios del día ]

Lunes y sábado: GOZOSOS
1. La Encarnación del Hijo de Dios
2. La Visitación de María a su prima Santa Isabel
3. El Nacimiento del Hijo de Dios en Belén
4. La Presentación de Jesús en el Templo
5. El Niño Jesús perdido y hallado en el Templo

Martes y viernes: DOLOROSOS
1. La oración de Jesús en el Huerto de los Olivos
2. La flagelación del Señor
3. La coronación de espinas
4. Jesús con la cruz a cuestas, camino del Calvario
5. La crucifixión y muerte de nuestro Señor

Miércoles y domingo: GLORIOSOS
1. La Resurrección del Hijo de Dios
2. La Ascensión del Señor a los cielos
3. La venida del Espíritu Santo sobre los Apóstoles
4. La Asunción de Nuestra Señora a los cielos
5. La Coronación de la Virgen María como Reina del cielo

Jueves: LUMINOSOS
1. El Bautismo de Jesús en el Jordán
2. La autorrevelación de Jesús en las bodas de Caná
3. El anuncio del Reino de Dios invitando a la conversión
4. La Transfiguración del Señor
5. La institución de la Eucaristía en la Última Cena

[ Cómo rezar cada misterio ]

Por cada uno de los cinco misterios del día:

1. Anunciar el misterio y meditarlo brevemente.
2. Rezar un Padrenuestro.
3. Rezar diez Avemarías mientras se medita el misterio.
4. Rezar un Gloria.
5. Rezar la oración de Fátima:
   "Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno y lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia."

[ Letanías ]

Tras los cinco misterios, se rezan las Letanías Lauretanas y se concluye con la Salve.

Letanía a la Santísima Virgen:

Señor, ten piedad de nosotros.
Cristo, ten piedad de nosotros.
Señor, ten piedad de nosotros.
Cristo, óyenos. Cristo, escúchanos.

Dios, Padre celestial, ten piedad de nosotros.
Dios, Hijo, Redentor del mundo, ten piedad de nosotros.
Dios, Espíritu Santo, ten piedad de nosotros.
Trinidad Santa, un solo Dios, ten piedad de nosotros.

Santa María, ruega por nosotros.
Santa Madre de Dios, ruega por nosotros.
Santa Virgen de las Vírgenes, ruega por nosotros.
Madre de Cristo, ruega por nosotros.
Madre de la Iglesia, ruega por nosotros.
Madre de la divina gracia, ruega por nosotros.
Madre purísima, ruega por nosotros.
Madre castísima, ruega por nosotros.
Madre virgen, ruega por nosotros.
Madre sin mancha, ruega por nosotros.
Madre inmaculada, ruega por nosotros.
Madre amable, ruega por nosotros.
Madre admirable, ruega por nosotros.
Madre del buen consejo, ruega por nosotros.
Madre del Creador, ruega por nosotros.
Madre del Salvador, ruega por nosotros.
Virgen prudentísima, ruega por nosotros.
Virgen digna de veneración, ruega por nosotros.
Virgen digna de alabanza, ruega por nosotros.
Virgen poderosa, ruega por nosotros.
Virgen clemente, ruega por nosotros.
Virgen fiel, ruega por nosotros.
Espejo de justicia, ruega por nosotros.
Trono de la Sabiduría, ruega por nosotros.
Causa de nuestra alegría, ruega por nosotros.
Vaso espiritual, ruega por nosotros.
Vaso digno de honor, ruega por nosotros.
Vaso insigne de devoción, ruega por nosotros.
Rosa mística, ruega por nosotros.
Torre de David, ruega por nosotros.
Torre de marfil, ruega por nosotros.
Casa de oro, ruega por nosotros.
Arca de la Alianza, ruega por nosotros.
Puerta del cielo, ruega por nosotros.
Estrella de la mañana, ruega por nosotros.
Salud de los enfermos, ruega por nosotros.
Refugio de los pecadores, ruega por nosotros.
Consoladora de los afligidos, ruega por nosotros.
Auxilio de los cristianos, ruega por nosotros.
Reina de los Ángeles, ruega por nosotros.
Reina de los Patriarcas, ruega por nosotros.
Reina de los Profetas, ruega por nosotros.
Reina de los Apóstoles, ruega por nosotros.
Reina de los Mártires, ruega por nosotros.
Reina de los Confesores, ruega por nosotros.
Reina de las Vírgenes, ruega por nosotros.
Reina de todos los Santos, ruega por nosotros.
Reina concebida sin pecado original, ruega por nosotros.
Reina asunta a los cielos, ruega por nosotros.
Reina del Santísimo Rosario, ruega por nosotros.
Reina de la familia, ruega por nosotros.
Reina de la paz, ruega por nosotros.

Cordero de Dios, que quitas el pecado del mundo, perdónanos, Señor.
Cordero de Dios, que quitas el pecado del mundo, escúchanos, Señor.
Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.

Ruega por nosotros, Santa Madre de Dios.
Para que seamos dignos de alcanzar las promesas de Cristo.

[ Salve final ]

Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A Ti llamamos los desterrados hijos de Eva; a Ti suspiramos, gimiendo y llorando, en este valle de lágrimas. Ea, pues, Señora abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y, después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. Oh clemente, oh piadosa, oh dulce siempre Virgen María. Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén.`,
    description: 'Oración mariana central. Cinco misterios al día rotando: Lunes/Sábado Gozosos, Martes/Viernes Dolorosos, Miércoles/Domingo Gloriosos, Jueves Luminosos.',
  },

  // POR EL PAPA
  {
    id: 'pry_008',
    title: 'Oración por el Santo Padre',
    category: PrayerCategory.PorElPapa,
    text: `Oremos por nuestro Pontífice el Papa León:
El Señor le conserve y le dé vida,
y le haga dichoso en la tierra,
y le libre de las manos de sus enemigos.

Tú eres Pedro, y sobre esta piedra edificaré mi Iglesia,
y las puertas del infierno no prevalecerán contra ella.

Oh Dios, Pastor y Guía de todos los fieles,
mira propicio a tu siervo León,
a quien quisiste constituir pastor de tu Iglesia;
concédele, te rogamos, edificar con su palabra y su ejemplo
a aquellos sobre quienes preside,
para que, juntamente con el rebaño que le ha sido confiado,
alcance la vida eterna.
Por Cristo nuestro Señor.
Amén.`,
    description: 'Oración tradicional por el Romano Pontífice.',
  },
  {
    id: 'pry_009',
    title: 'Oración corta por el Papa',
    category: PrayerCategory.PorElPapa,
    text: `Señor, fuente de toda bondad y sabiduría,
te pedimos por tu siervo León, nuestro Papa.
Asístelo con el don del Espíritu Santo
para que guíe a tu Iglesia
con fidelidad, paz y caridad.
Por Jesucristo nuestro Señor.
Amén.`,
    description: 'Oración breve para rezar diariamente por el Papa.',
  },
  {
    id: 'pry_012',
    title: 'Oración del Papa Francisco por los jóvenes',
    category: PrayerCategory.PorElPapa,
    text: `Señor Jesús,
tu Iglesia dirige su mirada a todos los jóvenes del mundo.
Te rezamos para que con coraje
tomen sus vidas en sus manos,
apunten a las cosas más bellas y más profundas
y siempre mantengan un corazón libre.

Que acompañados por guías sabios y generosos,
sean ayudados a responder a la llamada
que diriges a cada uno de ellos,
para realizar su propio proyecto de vida
y alcanzar la felicidad.

Mantén sus corazones abiertos a grandes sueños
y hazlos atentos al bien de los hermanos.

Como el Discípulo amado,
ellos también estén bajo la Cruz
para dar la bienvenida a tu Madre,
recibiéndola como un regalo tuyo.

Sean testigos de tu Resurrección
y sepan reconocerte vivo junto a ellos
anunciando con alegría que Tú eres el Señor.
Amén.`,
    description: 'Oración del Papa Francisco por los jóvenes del mundo.',
  },
  {
    id: 'pry_013',
    title: 'Oración por la juventud',
    category: PrayerCategory.PorElPapa,
    text: `¡Padre Santo! te pedimos por los jóvenes,
que son la esperanza del mundo.

No te pedimos que los saques de la corrupción
sino que los preserves de ella.

¡Padre! No permitas que se dejen llevar
por ideologías mezquinas.

Que descubran que lo más importante
no es ser más, tener más, poder más,
sino servir más a los demás.

¡Padre! Enséñales la verdad que libera,
que rompe las cadenas de la injusticia,
que hace hombres y forja santos.

Pon en cada uno de ellos un corazón universal
que hable el mismo idioma,
que no vea el color de la piel,
sino el amor que hay dentro de cada uno.

Un corazón que a cada hombre le llame hermano,
y que crea en la ciudad que no conoce las fronteras,
porque su nombre es universo, amistad, amor, Dios.

¡Padre Santo! Cuida a nuestros jóvenes.
Amén.`,
    description: 'Oración por la juventud, esperanza del mundo.',
  },

  // EUCARÍSTICAS
  {
    id: 'pry_010',
    title: 'Comunión espiritual',
    category: PrayerCategory.Eucaristicas,
    text: `Jesús mío,
creo que estás realmente presente
en el Santísimo Sacramento del Altar.
Te amo sobre todas las cosas
y deseo recibirte en mi alma.
Pero como ahora no puedo recibirte sacramentalmente,
ven al menos espiritualmente a mi corazón.
Te abrazo como si ya estuvieras allí
y me uno enteramente a Ti.
No permitas, Señor, que me aparte jamás de Ti.
Amén.`,
    description: 'Oración de San Alfonso María de Ligorio para cuando no se puede comulgar.',
  },
  {
    id: 'pry_011',
    title: 'Alma de Cristo',
    category: PrayerCategory.Eucaristicas,
    text: `Alma de Cristo, santifícame.
Cuerpo de Cristo, sálvame.
Sangre de Cristo, embriágame.
Agua del costado de Cristo, lávame.
Pasión de Cristo, confórtame.
¡Oh, buen Jesús!, óyeme.
Dentro de tus llagas, escóndeme.
No permitas que me aparte de Ti.
Del maligno enemigo, defiéndeme.
En la hora de mi muerte, llámame
y mándame ir a Ti,
para que con tus santos te alabe
por los siglos de los siglos.
Amén.`,
    textLatin: `Anima Christi, sanctifica me.
Corpus Christi, salva me.
Sanguis Christi, inebria me.
Aqua lateris Christi, lava me.
Passio Christi, conforta me.
O bone Iesu, exaudi me.
Intra tua vulnera absconde me.
Ne permittas me separari a te.
Ab hoste maligno defende me.
In hora mortis meae voca me
et iube me venire ad te,
ut cum sanctis tuis laudem te
in saecula saeculorum.
Amen.`,
    description: 'Oración eucarística atribuida tradicionalmente a San Ignacio de Loyola.',
  },
];
