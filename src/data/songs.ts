// ============================================================
// songs.ts — CANCIONERO LITÚRGICO
// ============================================================
// SOLO cantos de DOMINIO PÚBLICO (siglos VIII-XIII).
// Los cantos modernos están protegidos por copyright y no se incluyen.
// ============================================================

import { Song, SongCategory } from '../models/types';

export const songs: Song[] = [
  // EUCARÍSTICOS
  {
    id: 'sng_001',
    title: 'Tantum Ergo',
    category: SongCategory.Eucaristicos,
    author: 'Santo Tomás de Aquino',
    century: 's. XIII',
    publicDomain: true,
    textLatin: `Tantum ergo Sacraméntum
Venerémur cérnui:
Et antíquum documéntum
Novo cedat rítui:
Præstet fides suppleméntum
Sénsuum deféctui.

Genitóri, Genitóque
Laus et jubilátio,
Salus, honor, virtus quoque
Sit et benedíctio:
Procedénti ab utróque
Compar sit laudátio.
Amen.`,
    textSpanish: `Veneremos, pues, postrados
tan grande Sacramento;
y la antigua figura ceda el puesto al nuevo rito;
la fe supla la incapacidad de los sentidos.

Al Padre y al Hijo
sean dadas alabanza y júbilo,
salud, honor, poder y bendición;
y al que de uno y de otro procede
sea dada igual alabanza.
Amén.`,
  },
  {
    id: 'sng_002',
    title: 'Pange Lingua',
    category: SongCategory.Eucaristicos,
    author: 'Santo Tomás de Aquino',
    century: 's. XIII',
    publicDomain: true,
    textLatin: `Pange, lingua, gloriósi
Córporis mystérium,
Sanguinísque pretiósi,
Quem in mundi prétium
Fructus ventris generósi
Rex effúdit géntium.

Nobis datus, nobis natus
Ex intácta Vírgine,
Et in mundo conversátus,
Sparso verbi sémine,
Sui moras incolátus
Miro clausit órdine.

In suprémæ nocte cœnæ
Recúmbens cum frátribus,
Observáta lege plene
Cibis in legálibus,
Cibum turbæ duodénæ
Se dat suis mánibus.

Verbum caro, panem verum
Verbo carnem éfficit:
Fitque sanguis Christi merum,
Et si sensus déficit,
Ad firmándum cor sincérum
Sola fides súfficit.`,
    textSpanish: `Canta, lengua, el misterio
del cuerpo glorioso
y de la sangre preciosa
que derramó como precio del mundo
el Rey de las naciones,
fruto de un noble vientre.

A nosotros nos fue dado, para nosotros nació
de una Virgen sin mancha;
y, después de pasar su vida en el mundo,
una vez esparcida la semilla de su palabra,
terminó el tiempo de su destierro
dando una admirable disposición.

En la noche de la última cena,
sentado a la mesa con sus hermanos,
después de observar plenamente
la ley sobre la comida legal,
se da con sus propias manos
como alimento al grupo de los Doce.

El Verbo encarnado, con su palabra,
convierte el verdadero pan en su carne,
y el vino se transforma en sangre de Cristo;
y aunque fallen los sentidos,
basta la sola fe
para confirmar al corazón sincero.`,
  },
  {
    id: 'sng_003',
    title: 'Adoro Te Devote',
    category: SongCategory.Eucaristicos,
    author: 'Santo Tomás de Aquino',
    century: 's. XIII',
    publicDomain: true,
    textLatin: `Adóro te devóte, latens Déitas,
Quæ sub his figúris vere látitas:
Tibi se cor meum totum súbjicit,
Quia te contémplans totum déficit.

Visus, tactus, gustus in te fállitur,
Sed audítu solo tuto créditur:
Credo quidquid dixit Dei Fílius;
Nil hoc verbo veritátis vérius.`,
    textSpanish: `Te adoro con devoción, Dios escondido,
oculto verdaderamente bajo estas apariencias.
A Ti se somete mi corazón por completo,
y se rinde totalmente al contemplarte.

Al juzgar de Ti, se equivocan la vista, el tacto, el gusto;
pero basta el oído para creer con firmeza:
creo todo lo que ha dicho el Hijo de Dios:
nada es más verdadero que esta Palabra de verdad.`,
  },

  // MARIANOS
  {
    id: 'sng_004',
    title: 'Ave Maris Stella',
    category: SongCategory.Marianos,
    author: 'Anónimo',
    century: 's. VIII-IX',
    publicDomain: true,
    textLatin: `Ave maris stella,
Dei Mater alma,
atque semper Virgo,
felix cæli porta.

Sumens illud "Ave"
Gabriélis ore,
funda nos in pace,
mutans Hevæ nomen.

Solve vincla reis,
profer lumen cæcis,
mala nostra pelle,
bona cuncta posce.`,
    textSpanish: `Salve, Estrella del mar,
santa Madre de Dios
y siempre Virgen,
puerta feliz del cielo.

Tú que recibiste aquel "Ave"
de boca de Gabriel,
fúndanos en la paz,
trocando el nombre de Eva.

Suelta las cadenas a los reos,
da luz a los ciegos,
ahuyenta nuestros males,
alcánzanos todos los bienes.`,
  },
  {
    id: 'sng_005',
    title: 'Regina Cæli',
    category: SongCategory.Marianos,
    author: 'Anónimo',
    century: 's. XII',
    publicDomain: true,
    textLatin: `Regína cæli, lætáre, allelúia.
Quia quem meruísti portáre, allelúia.
Resurréxit, sicut dixit, allelúia.
Ora pro nobis Deum, allelúia.`,
    textSpanish: `Reina del cielo, alégrate, aleluya.
Porque el Señor a quien has merecido llevar, aleluya,
ha resucitado según su palabra, aleluya.
Ruega por nosotros a Dios, aleluya.`,
  },
  {
    id: 'sng_008',
    title: 'Salve Marinera',
    category: SongCategory.Marianos,
    author: 'Antonio García Pacheco',
    century: 's. XIX',
    publicDomain: true,
    textSpanish: `Salve, Estrella de los mares,
de los mares iris,
de eterna ventura.
Salve, ¡oh Fénix de hermosura!,
madre del divino amor.

De tu pueblo a los pesares
tu clemencia da consuelo;
fervoroso llegue al cielo,
hasta ti, hasta ti nuestro clamor.

Salve, salve, Estrella de los mares,
salve, salve, Estrella de los mares,
sí, fervoroso llegue a ti nuestro clamor.

Si en el mar embravecido
a la nave tormentosa
das aurora venturosa
de bonanza y de quietud,

danos, Madre, en nuestro olvido,
de pureza la blancura,
y celeste hermosa altura
de paciencia y de virtud.

Salve, salve, Estrella de los mares,
salve, salve, Estrella de los mares,
de paciencia y de virtud.`,
  },

  // ALABANZA
  {
    id: 'sng_006',
    title: 'Te Deum',
    category: SongCategory.Alabanza,
    author: 'San Ambrosio (atribuido)',
    century: 's. IV',
    publicDomain: true,
    textLatin: `Te Deum laudámus:
te Dóminum confitémur.
Te ætérnum Patrem,
omnis terra venerátur.
Tibi omnes Angeli,
tibi Cæli et univérsæ Potestátes:
tibi Chérubim et Séraphim
incessábili voce proclámant:
Sanctus, Sanctus, Sanctus
Dóminus Deus Sábaoth.`,
    textSpanish: `A Ti, oh Dios, te alabamos,
a Ti, Señor, te confesamos.
A Ti, eterno Padre,
te venera toda la tierra.
A Ti los ángeles,
a Ti los cielos y todas las potestades,
a Ti los querubines y serafines
proclaman sin cesar:
Santo, Santo, Santo,
Señor Dios de los ejércitos.`,
  },
  {
    id: 'sng_007',
    title: 'Veni Creator Spiritus',
    category: SongCategory.Alabanza,
    author: 'Rabano Mauro (atribuido)',
    century: 's. IX',
    publicDomain: true,
    textLatin: `Veni, Creátor Spíritus,
mentes tuórum vísita,
imple supérna grátia,
quæ tu creásti, péctora.

Qui díceris Paráclitus,
altíssimi donum Dei,
fons vivus, ignis, cáritas,
et spiritális únctio.`,
    textSpanish: `Ven, Espíritu Creador,
visita las almas de los tuyos
y llena con la divina gracia
los corazones que Tú creaste.

Tú que eres llamado Paráclito,
don del Dios Altísimo,
fuente viva, fuego, caridad
y unción espiritual.`,
  },
];
