// ============================================================
// saints.ts — SANTORAL CATÓLICO COMPLETO
// ============================================================
// Calendario litúrgico de la Iglesia Católica.
// Fuentes: Calendario Romano General, Wikipedia, ACI Prensa.
// Todos los datos son de dominio público.
//
// Para cada día se incluye al menos un santo. Si la fecha es
// una solemnidad o fiesta importante, se marca con isFeast.
// ============================================================

export interface Saint {
  date: string;         // "MM-DD"
  name: string;
  description: string;
  isFeast?: boolean;    // Solemnidad o fiesta universal
}

export const saints: Record<string, Saint> = {
  // ==================== ENERO ====================
  '01-01': { date: '01-01', name: 'Santa María, Madre de Dios', description: 'Solemnidad de la Maternidad divina de María.', isFeast: true },
  '01-02': { date: '01-02', name: 'San Basilio Magno y San Gregorio Nacianceno', description: 'Obispos y doctores de la Iglesia (s. IV).' },
  '01-03': { date: '01-03', name: 'Santísimo Nombre de Jesús', description: 'Memoria del santísimo Nombre de Jesús.' },
  '01-04': { date: '01-04', name: 'Santa Ángela de Foligno', description: 'Mística franciscana italiana (s. XIII).' },
  '01-05': { date: '01-05', name: 'San Juan Nepomuceno Neumann', description: 'Obispo redentorista de Filadelfia.' },
  '01-06': { date: '01-06', name: 'Epifanía del Señor', description: 'Manifestación de Jesús a los Magos de Oriente.', isFeast: true },
  '01-07': { date: '01-07', name: 'San Raimundo de Peñafort', description: 'Sacerdote dominico, patrón de los canonistas.' },
  '01-08': { date: '01-08', name: 'San Severino de Nórico', description: 'Apóstol de los pueblos austríacos (s. V).' },
  '01-09': { date: '01-09', name: 'San Adrián de Canterbury', description: 'Abad benedictino, evangelizador (s. VII).' },
  '01-10': { date: '01-10', name: 'San Gregorio de Nisa', description: 'Obispo y padre capadocio (s. IV).' },
  '01-11': { date: '01-11', name: 'San Higinio, Papa', description: 'Obispo de Roma y mártir.' },
  '01-12': { date: '01-12', name: 'Santa Margarita Bourgeoys', description: 'Religiosa fundadora en Canadá.' },
  '01-13': { date: '01-13', name: 'San Hilario de Poitiers', description: 'Obispo y doctor de la Iglesia (s. IV).' },
  '01-14': { date: '01-14', name: 'San Félix de Nola', description: 'Sacerdote y mártir de la Iglesia primitiva.' },
  '01-15': { date: '01-15', name: 'San Pablo, primer ermitaño', description: 'Padre del monacato (s. III).' },
  '01-16': { date: '01-16', name: 'San Marcelo I, Papa', description: 'Pontífice romano y mártir.' },
  '01-17': { date: '01-17', name: 'San Antonio Abad', description: 'Padre de los monjes del desierto (s. IV).' },
  '01-18': { date: '01-18', name: 'Santa Margarita de Hungría', description: 'Princesa y religiosa dominica.' },
  '01-19': { date: '01-19', name: 'San Mario y compañeros', description: 'Mártires de los primeros siglos.' },
  '01-20': { date: '01-20', name: 'San Fabián y San Sebastián', description: 'Papa mártir y soldado mártir.' },
  '01-21': { date: '01-21', name: 'Santa Inés', description: 'Virgen y mártir romana, patrona de las jóvenes.' },
  '01-22': { date: '01-22', name: 'San Vicente, diácono y mártir', description: 'Mártir de Zaragoza (s. IV).' },
  '01-23': { date: '01-23', name: 'San Ildefonso de Toledo', description: 'Obispo y doctor de la Iglesia española.' },
  '01-24': { date: '01-24', name: 'San Francisco de Sales', description: 'Obispo y doctor de la Iglesia, patrón de periodistas.' },
  '01-25': { date: '01-25', name: 'Conversión de San Pablo', description: 'Fiesta de la conversión del Apóstol de los gentiles.', isFeast: true },
  '01-26': { date: '01-26', name: 'San Timoteo y San Tito', description: 'Obispos y compañeros de San Pablo.' },
  '01-27': { date: '01-27', name: 'Santa Ángela de Mérici', description: 'Fundadora de las ursulinas.' },
  '01-28': { date: '01-28', name: 'Santo Tomás de Aquino', description: 'Sacerdote dominico, doctor común de la Iglesia.', isFeast: true },
  '01-29': { date: '01-29', name: 'San Valero de Zaragoza', description: 'Obispo de Zaragoza (s. IV).' },
  '01-30': { date: '01-30', name: 'Santa Jacinta de Mariscotti', description: 'Religiosa franciscana penitente.' },
  '01-31': { date: '01-31', name: 'San Juan Bosco', description: 'Sacerdote, fundador de los salesianos.' },

  // ==================== FEBRERO ====================
  '02-01': { date: '02-01', name: 'Santa Brígida de Irlanda', description: 'Abadesa de Kildare, patrona de Irlanda.' },
  '02-02': { date: '02-02', name: 'Presentación del Señor', description: 'La Candelaria. Jesús es presentado en el templo.', isFeast: true },
  '02-03': { date: '02-03', name: 'San Blas, obispo y mártir', description: 'Patrón de los enfermos de la garganta.' },
  '02-04': { date: '02-04', name: 'San Andrés Corsini', description: 'Obispo carmelita italiano.' },
  '02-05': { date: '02-05', name: 'Santa Águeda', description: 'Virgen y mártir de Catania (s. III).' },
  '02-06': { date: '02-06', name: 'San Pablo Miki y compañeros', description: 'Mártires de Japón (s. XVI).' },
  '02-07': { date: '02-07', name: 'San Ricardo, rey', description: 'Rey de los anglosajones.' },
  '02-08': { date: '02-08', name: 'San Jerónimo Emiliani', description: 'Fundador de los somascos, patrón de los huérfanos.' },
  '02-09': { date: '02-09', name: 'Santa Apolonia', description: 'Virgen y mártir de Alejandría.' },
  '02-10': { date: '02-10', name: 'Santa Escolástica', description: 'Hermana de San Benito, virgen consagrada.' },
  '02-11': { date: '02-11', name: 'Nuestra Señora de Lourdes', description: 'Aparición de la Virgen en Lourdes (1858).' },
  '02-12': { date: '02-12', name: 'Santa Eulalia de Barcelona', description: 'Virgen y mártir, patrona de Barcelona.' },
  '02-13': { date: '02-13', name: 'San Benigno', description: 'Mártir de los primeros siglos.' },
  '02-14': { date: '02-14', name: 'San Cirilo y San Metodio', description: 'Apóstoles de los eslavos, copatronos de Europa.', isFeast: true },
  '02-15': { date: '02-15', name: 'San Faustino y San Jovita', description: 'Mártires de Brescia.' },
  '02-16': { date: '02-16', name: 'Santa Juliana de Cumas', description: 'Virgen y mártir.' },
  '02-17': { date: '02-17', name: 'Santos Siete Fundadores de los Servitas', description: 'Fundadores de la Orden de los Siervos de María.' },
  '02-18': { date: '02-18', name: 'Beato Fray Angélico', description: 'Pintor dominico, patrón de los artistas.' },
  '02-19': { date: '02-19', name: 'San Conrado de Piacenza', description: 'Ermitaño franciscano italiano.' },
  '02-20': { date: '02-20', name: 'Santos Francisco y Jacinta Marto', description: 'Pastorcitos videntes de Fátima.' },
  '02-21': { date: '02-21', name: 'San Pedro Damiano', description: 'Obispo, doctor de la Iglesia.' },
  '02-22': { date: '02-22', name: 'Cátedra de San Pedro', description: 'Fiesta del primado del Apóstol Pedro.', isFeast: true },
  '02-23': { date: '02-23', name: 'San Policarpo de Esmirna', description: 'Obispo y mártir, padre apostólico.' },
  '02-24': { date: '02-24', name: 'San Modesto de Tréveris', description: 'Obispo del s. V.' },
  '02-25': { date: '02-25', name: 'Beato Sebastián de Aparicio', description: 'Religioso franciscano en México.' },
  '02-26': { date: '02-26', name: 'San Néstor de Magidos', description: 'Obispo y mártir.' },
  '02-27': { date: '02-27', name: 'San Gabriel de la Dolorosa', description: 'Religioso pasionista italiano.' },
  '02-28': { date: '02-28', name: 'San Hilario, Papa', description: 'Pontífice romano del s. V.' },
  '02-29': { date: '02-29', name: 'San Hilario, Papa', description: 'Pontífice romano del s. V (año bisiesto).' },

  // ==================== MARZO ====================
  '03-01': { date: '03-01', name: 'San Rosendo', description: 'Obispo de Mondoñedo (s. X).' },
  '03-02': { date: '03-02', name: 'Beato Carlos el Bueno', description: 'Conde de Flandes y mártir.' },
  '03-03': { date: '03-03', name: 'Santa Catalina Drexel', description: 'Religiosa estadounidense, fundadora.' },
  '03-04': { date: '03-04', name: 'San Casimiro', description: 'Príncipe polaco, patrón de la juventud.' },
  '03-05': { date: '03-05', name: 'Santa Olivia de Palermo', description: 'Virgen y mártir.' },
  '03-06': { date: '03-06', name: 'Santa Coleta de Corbie', description: 'Religiosa franciscana, reformadora.' },
  '03-07': { date: '03-07', name: 'Santas Perpetua y Felicidad', description: 'Mártires de Cartago (s. III).' },
  '03-08': { date: '03-08', name: 'San Juan de Dios', description: 'Fundador de los Hermanos Hospitalarios, patrón de los enfermos.' },
  '03-09': { date: '03-09', name: 'Santa Francisca Romana', description: 'Religiosa, patrona de los conductores.' },
  '03-10': { date: '03-10', name: 'San Juan Ogilvie', description: 'Sacerdote jesuita y mártir escocés.' },
  '03-11': { date: '03-11', name: 'San Eulogio de Córdoba', description: 'Sacerdote y mártir mozárabe (s. IX).' },
  '03-12': { date: '03-12', name: 'San Inocencio I, Papa', description: 'Pontífice romano del s. V.' },
  '03-13': { date: '03-13', name: 'Santa Eufrasia', description: 'Virgen consagrada del desierto egipcio.' },
  '03-14': { date: '03-14', name: 'Santa Matilde, reina', description: 'Reina de Alemania, esposa de Enrique I.' },
  '03-15': { date: '03-15', name: 'San Clemente María Hofbauer', description: 'Sacerdote redentorista, apóstol de Viena.' },
  '03-16': { date: '03-16', name: 'San Heriberto', description: 'Arzobispo de Colonia (s. XI).' },
  '03-17': { date: '03-17', name: 'San Patricio', description: 'Obispo, apóstol y patrón de Irlanda.' },
  '03-18': { date: '03-18', name: 'San Cirilo de Jerusalén', description: 'Obispo y doctor de la Iglesia (s. IV).' },
  '03-19': { date: '03-19', name: 'San José', description: 'Esposo de la Virgen María, patrón de la Iglesia universal.', isFeast: true },
  '03-20': { date: '03-20', name: 'San Martín de Braga', description: 'Obispo y evangelizador de los suevos.' },
  '03-21': { date: '03-21', name: 'Tránsito de San Benito', description: 'Memoria del paso a la vida eterna del patriarca.' },
  '03-22': { date: '03-22', name: 'Santa Lea de Roma', description: 'Viuda romana del s. IV.' },
  '03-23': { date: '03-23', name: 'San Toribio de Mogrovejo', description: 'Arzobispo de Lima, evangelizador del Perú.' },
  '03-24': { date: '03-24', name: 'San Óscar Romero', description: 'Arzobispo de San Salvador, mártir.' },
  '03-25': { date: '03-25', name: 'Anunciación del Señor', description: 'El ángel Gabriel anuncia a María la Encarnación.', isFeast: true },
  '03-26': { date: '03-26', name: 'San Braulio de Zaragoza', description: 'Obispo de Zaragoza (s. VII).' },
  '03-27': { date: '03-27', name: 'San Ruperto de Salzburgo', description: 'Obispo evangelizador de Baviera.' },
  '03-28': { date: '03-28', name: 'San Esperanza, abad', description: 'Padre del desierto.' },
  '03-29': { date: '03-29', name: 'Santos Jonás y Baraquisio', description: 'Mártires persas del s. IV.' },
  '03-30': { date: '03-30', name: 'San Juan Clímaco', description: 'Abad del Sinaí, autor de "La Escala del Paraíso".' },
  '03-31': { date: '03-31', name: 'San Benjamín, diácono', description: 'Mártir persa del s. V.' },
};

// ==================== ABRIL ====================
saints['04-01'] = { date: '04-01', name: 'San Hugo de Grenoble', description: 'Obispo francés (s. XII).' };
saints['04-02'] = { date: '04-02', name: 'San Francisco de Paula', description: 'Fundador de los mínimos.' };
saints['04-03'] = { date: '04-03', name: 'San Ricardo de Chichester', description: 'Obispo inglés del s. XIII.' };
saints['04-04'] = { date: '04-04', name: 'San Isidoro de Sevilla', description: 'Arzobispo y doctor de la Iglesia, patrón de internet.', isFeast: true };
saints['04-05'] = { date: '04-05', name: 'San Vicente Ferrer', description: 'Sacerdote dominico valenciano, gran predicador.' };
saints['04-06'] = { date: '04-06', name: 'Beata Catalina de Pallanza', description: 'Religiosa eremita italiana.' };
saints['04-07'] = { date: '04-07', name: 'San Juan Bautista de la Salle', description: 'Fundador de los Hermanos de las Escuelas Cristianas.' };
saints['04-08'] = { date: '04-08', name: 'Santa Julia Billiart', description: 'Fundadora de Notre-Dame.' };
saints['04-09'] = { date: '04-09', name: 'Santa María Cleofás', description: 'Pariente de la Virgen María.' };
saints['04-10'] = { date: '04-10', name: 'San Ezequiel, profeta', description: 'Profeta del Antiguo Testamento.' };
saints['04-11'] = { date: '04-11', name: 'San Estanislao, obispo y mártir', description: 'Patrón de Polonia.' };
saints['04-12'] = { date: '04-12', name: 'San José Moscati', description: 'Médico napolitano, modelo de profesional cristiano.' };
saints['04-13'] = { date: '04-13', name: 'San Martín I, Papa', description: 'Pontífice y mártir del s. VII.' };
saints['04-14'] = { date: '04-14', name: 'San Telmo (Pedro González)', description: 'Sacerdote dominico, patrón de los marineros.' };
saints['04-15'] = { date: '04-15', name: 'Santa Anastasia', description: 'Virgen y mártir.' };
saints['04-16'] = { date: '04-16', name: 'Santa Bernardita Soubirous', description: 'Vidente de Lourdes.' };
saints['04-17'] = { date: '04-17', name: 'Beata Catalina Tomás', description: 'Religiosa mallorquina.' };
saints['04-18'] = { date: '04-18', name: 'San Galdino', description: 'Cardenal y arzobispo de Milán.' };
saints['04-19'] = { date: '04-19', name: 'San León IX, Papa', description: 'Pontífice reformador del s. XI.' };
saints['04-20'] = { date: '04-20', name: 'Santa Inés de Montepulciano', description: 'Religiosa dominica italiana.' };
saints['04-21'] = { date: '04-21', name: 'San Anselmo de Canterbury', description: 'Arzobispo y doctor de la Iglesia.' };
saints['04-22'] = { date: '04-22', name: 'San Sotero y San Cayo, Papas', description: 'Pontífices y mártires.' };
saints['04-23'] = { date: '04-23', name: 'San Jorge, mártir', description: 'Patrón de Cataluña, Inglaterra y Aragón.' };
saints['04-24'] = { date: '04-24', name: 'San Fidel de Sigmaringa', description: 'Sacerdote capuchino y mártir.' };
saints['04-25'] = { date: '04-25', name: 'San Marcos, evangelista', description: 'Discípulo de San Pedro, autor del segundo Evangelio.', isFeast: true };
saints['04-26'] = { date: '04-26', name: 'Nuestra Señora del Buen Consejo', description: 'Advocación mariana.' };
saints['04-27'] = { date: '04-27', name: 'Santa Zita de Lucca', description: 'Sirvienta italiana, patrona del servicio doméstico.' };
saints['04-28'] = { date: '04-28', name: 'San Pedro Chanel', description: 'Mártir de Oceanía, primer mártir de los maristas.' };
saints['04-29'] = { date: '04-29', name: 'Santa Catalina de Siena', description: 'Doctora de la Iglesia, copatrona de Europa.', isFeast: true };
saints['04-30'] = { date: '04-30', name: 'San Pío V, Papa', description: 'Pontífice dominico del s. XVI.' };

// ==================== MAYO ====================
saints['05-01'] = { date: '05-01', name: 'San José Obrero', description: 'Patrón de los trabajadores.' };
saints['05-02'] = { date: '05-02', name: 'San Atanasio', description: 'Obispo y doctor de la Iglesia (s. IV).' };
saints['05-03'] = { date: '05-03', name: 'Santos Felipe y Santiago, apóstoles', description: 'Apóstoles del Señor.', isFeast: true };
saints['05-04'] = { date: '05-04', name: 'San Florián', description: 'Mártir romano, patrón de bomberos.' };
saints['05-05'] = { date: '05-05', name: 'Santa Judith', description: 'Mujer del Antiguo Testamento.' };
saints['05-06'] = { date: '05-06', name: 'San Domingo Savio', description: 'Joven discípulo de San Juan Bosco.' };
saints['05-07'] = { date: '05-07', name: 'Beato Estanislao Kazimierczyk', description: 'Sacerdote canónigo regular polaco.' };
saints['05-08'] = { date: '05-08', name: 'Nuestra Señora de Luján', description: 'Patrona de Argentina.' };
saints['05-09'] = { date: '05-09', name: 'San Pacomio, abad', description: 'Padre del cenobitismo.' };
saints['05-10'] = { date: '05-10', name: 'San Juan de Ávila', description: 'Sacerdote, doctor de la Iglesia, patrón del clero secular español.', isFeast: true };
saints['05-11'] = { date: '05-11', name: 'San Mamerto', description: 'Obispo de Vienne (s. V).' };
saints['05-12'] = { date: '05-12', name: 'Santos Nereo, Aquileo y Pancracio', description: 'Mártires romanos.' };
saints['05-13'] = { date: '05-13', name: 'Nuestra Señora de Fátima', description: 'Aparición de la Virgen en Fátima (1917).', isFeast: true };
saints['05-14'] = { date: '05-14', name: 'San Matías, apóstol', description: 'Apóstol elegido en lugar de Judas.', isFeast: true };
saints['05-15'] = { date: '05-15', name: 'San Isidro Labrador', description: 'Patrón de Madrid y de los agricultores.', isFeast: true };
saints['05-16'] = { date: '05-16', name: 'San Juan Nepomuceno', description: 'Sacerdote y mártir checo, patrón del secreto sacramental.' };
saints['05-17'] = { date: '05-17', name: 'San Pascual Bailón', description: 'Religioso franciscano, patrón de los congresos eucarísticos.' };
saints['05-18'] = { date: '05-18', name: 'San Juan I, Papa', description: 'Pontífice y mártir del s. VI.' };
saints['05-19'] = { date: '05-19', name: 'San Celestino V, Papa', description: 'Pontífice ermitaño que renunció al pontificado.' };
saints['05-20'] = { date: '05-20', name: 'San Bernardino de Siena', description: 'Sacerdote franciscano, gran predicador.' };
saints['05-21'] = { date: '05-21', name: 'Santos mártires mexicanos', description: 'Mártires de la Cristiada.' };
saints['05-22'] = { date: '05-22', name: 'Santa Rita de Casia', description: 'Religiosa agustina, abogada de los imposibles.' };
saints['05-23'] = { date: '05-23', name: 'San Juan Bautista de Rossi', description: 'Sacerdote italiano del s. XVIII.' };
saints['05-24'] = { date: '05-24', name: 'María Auxiliadora', description: 'Advocación mariana especialmente querida por San Juan Bosco.' };
saints['05-25'] = { date: '05-25', name: 'San Beda el Venerable', description: 'Sacerdote benedictino, doctor de la Iglesia.' };
saints['05-26'] = { date: '05-26', name: 'San Felipe Neri', description: 'Sacerdote, fundador del Oratorio.' };
saints['05-27'] = { date: '05-27', name: 'San Agustín de Canterbury', description: 'Obispo, evangelizador de Inglaterra.' };
saints['05-28'] = { date: '05-28', name: 'San Germán de París', description: 'Obispo francés del s. VI.' };
saints['05-29'] = { date: '05-29', name: 'Santa Úrsula Ledóchowska', description: 'Religiosa polaca, fundadora.' };
saints['05-30'] = { date: '05-30', name: 'San Fernando III, rey', description: 'Rey de Castilla, patrón de Sevilla.' };
saints['05-31'] = { date: '05-31', name: 'Visitación de la Virgen María', description: 'María visita a su prima Isabel.', isFeast: true };

// ==================== JUNIO ====================
saints['06-01'] = { date: '06-01', name: 'San Justino, mártir', description: 'Filósofo y apologista cristiano (s. II).' };
saints['06-02'] = { date: '06-02', name: 'Santos Marcelino y Pedro', description: 'Mártires romanos.' };
saints['06-03'] = { date: '06-03', name: 'San Carlos Lwanga y compañeros', description: 'Mártires de Uganda.' };
saints['06-04'] = { date: '06-04', name: 'Santos Quirino y Julita', description: 'Mártires.' };
saints['06-05'] = { date: '06-05', name: 'San Bonifacio, obispo y mártir', description: 'Apóstol de Alemania.' };
saints['06-06'] = { date: '06-06', name: 'San Norberto', description: 'Obispo, fundador de los premostratenses (s. XII).' };
saints['06-07'] = { date: '06-07', name: 'San Roberto de Newminster', description: 'Abad cisterciense.' };
saints['06-08'] = { date: '06-08', name: 'San Medardo', description: 'Obispo de Noyon (s. VI).' };
saints['06-09'] = { date: '06-09', name: 'San Efrén, diácono', description: 'Diácono y doctor de la Iglesia (s. IV).' };
saints['06-10'] = { date: '06-10', name: 'Beato Diego Oddi', description: 'Religioso franciscano italiano.' };
saints['06-11'] = { date: '06-11', name: 'San Bernabé, apóstol', description: 'Compañero de San Pablo, apóstol.', isFeast: true };
saints['06-12'] = { date: '06-12', name: 'San Juan de Sahagún', description: 'Sacerdote agustino, patrón de Salamanca.' };
saints['06-13'] = { date: '06-13', name: 'San Antonio de Padua', description: 'Sacerdote franciscano, doctor de la Iglesia.', isFeast: true };
saints['06-14'] = { date: '06-14', name: 'Beato Gerardo de Cluny', description: 'Abad benedictino francés.' };
saints['06-15'] = { date: '06-15', name: 'Santa María Micaela', description: 'Fundadora de las Adoratrices.' };
saints['06-16'] = { date: '06-16', name: 'Santa Lutgarda', description: 'Mística cisterciense.' };
saints['06-17'] = { date: '06-17', name: 'San Manuel, mártir', description: 'Mártir persa.' };
saints['06-18'] = { date: '06-18', name: 'Santa Isabel de Schönau', description: 'Mística y abadesa benedictina.' };
saints['06-19'] = { date: '06-19', name: 'San Romualdo', description: 'Abad, fundador de los camaldulenses.' };
saints['06-20'] = { date: '06-20', name: 'San Silverio, Papa', description: 'Pontífice y mártir del s. VI.' };
saints['06-21'] = { date: '06-21', name: 'San Luis Gonzaga', description: 'Religioso jesuita, patrón de la juventud.' };
saints['06-22'] = { date: '06-22', name: 'San Tomás Moro', description: 'Mártir inglés, patrón de los políticos.' };
saints['06-23'] = { date: '06-23', name: 'San José Cafasso', description: 'Sacerdote italiano, maestro de San Juan Bosco.' };
saints['06-24'] = { date: '06-24', name: 'Natividad de San Juan Bautista', description: 'Solemnidad del nacimiento del precursor.', isFeast: true };
saints['06-25'] = { date: '06-25', name: 'San Próspero de Aquitania', description: 'Teólogo y discípulo de San Agustín.' };
saints['06-26'] = { date: '06-26', name: 'San Josemaría Escrivá', description: 'Sacerdote, fundador del Opus Dei.' };
saints['06-27'] = { date: '06-27', name: 'San Cirilo de Alejandría', description: 'Obispo y doctor de la Iglesia (s. V).' };
saints['06-28'] = { date: '06-28', name: 'San Ireneo de Lyon', description: 'Obispo y doctor de la Iglesia, mártir (s. II).' };
saints['06-29'] = { date: '06-29', name: 'Santos Pedro y Pablo, apóstoles', description: 'Solemnidad de los apóstoles fundadores.', isFeast: true };
saints['06-30'] = { date: '06-30', name: 'Santos Protomártires de Roma', description: 'Mártires de la persecución de Nerón.' };

// ==================== JULIO ====================
saints['07-01'] = { date: '07-01', name: 'Beato Antonio Rosmini', description: 'Sacerdote y filósofo italiano.' };
saints['07-02'] = { date: '07-02', name: 'Beato Eugenio III, Papa', description: 'Pontífice cisterciense del s. XII.' };
saints['07-03'] = { date: '07-03', name: 'Santo Tomás, apóstol', description: 'Apóstol del Señor, evangelizador de la India.', isFeast: true };
saints['07-04'] = { date: '07-04', name: 'Santa Isabel de Portugal', description: 'Reina y mediadora de paz.' };
saints['07-05'] = { date: '07-05', name: 'San Antonio María Zaccaria', description: 'Sacerdote, fundador de los barnabitas.' };
saints['07-06'] = { date: '07-06', name: 'Santa María Goretti', description: 'Virgen y mártir, modelo de pureza.' };
saints['07-07'] = { date: '07-07', name: 'Beato Pedro To Rot', description: 'Catequista y mártir de Papúa.' };
saints['07-08'] = { date: '07-08', name: 'Santos Aquila y Priscila', description: 'Esposos, colaboradores de San Pablo.' };
saints['07-09'] = { date: '07-09', name: 'Santos mártires de China', description: 'Mártires en China (s. XIX-XX).' };
saints['07-10'] = { date: '07-10', name: 'Santos Felicidad y compañeros', description: 'Mártires romanos.' };
saints['07-11'] = { date: '07-11', name: 'San Benito de Nursia', description: 'Abad, padre del monacato occidental, patrón de Europa.', isFeast: true };
saints['07-12'] = { date: '07-12', name: 'Beato Luis Martín y Celia Guérin', description: 'Padres de Santa Teresita.' };
saints['07-13'] = { date: '07-13', name: 'San Enrique, emperador', description: 'Emperador del Sacro Imperio.' };
saints['07-14'] = { date: '07-14', name: 'San Camilo de Lelis', description: 'Sacerdote, fundador de los camilos, patrón de los enfermos.' };
saints['07-15'] = { date: '07-15', name: 'San Buenaventura', description: 'Cardenal franciscano, doctor de la Iglesia.' };
saints['07-16'] = { date: '07-16', name: 'Nuestra Señora del Carmen', description: 'Patrona de los marineros y de muchos lugares de España.', isFeast: true };
saints['07-17'] = { date: '07-17', name: 'Santas mártires de Compiègne', description: 'Carmelitas mártires en la Revolución Francesa.' };
saints['07-18'] = { date: '07-18', name: 'San Federico, obispo', description: 'Obispo y mártir holandés.' };
saints['07-19'] = { date: '07-19', name: 'San Macrina', description: 'Hermana de los Padres Capadocios.' };
saints['07-20'] = { date: '07-20', name: 'San Apolinar, obispo', description: 'Primer obispo de Rávena, mártir.' };
saints['07-21'] = { date: '07-21', name: 'San Lorenzo de Brindis', description: 'Sacerdote capuchino, doctor de la Iglesia.' };
saints['07-22'] = { date: '07-22', name: 'Santa María Magdalena', description: 'Apóstol de los apóstoles.', isFeast: true };
saints['07-23'] = { date: '07-23', name: 'Santa Brígida de Suecia', description: 'Religiosa, copatrona de Europa.', isFeast: true };
saints['07-24'] = { date: '07-24', name: 'San Charbel Makhlouf', description: 'Sacerdote maronita libanés.' };
saints['07-25'] = { date: '07-25', name: 'Santiago, apóstol', description: 'Patrón de España.', isFeast: true };
saints['07-26'] = { date: '07-26', name: 'Santos Joaquín y Ana', description: 'Padres de la Virgen María.', isFeast: true };
saints['07-27'] = { date: '07-27', name: 'San Pantaleón, mártir', description: 'Médico y mártir de Bitinia.' };
saints['07-28'] = { date: '07-28', name: 'Santos Nazario y Celso', description: 'Mártires milaneses.' };
saints['07-29'] = { date: '07-29', name: 'Santas Marta, María y Lázaro', description: 'Hermanos amigos del Señor.' };
saints['07-30'] = { date: '07-30', name: 'San Pedro Crisólogo', description: 'Obispo y doctor de la Iglesia.' };
saints['07-31'] = { date: '07-31', name: 'San Ignacio de Loyola', description: 'Sacerdote, fundador de la Compañía de Jesús.', isFeast: true };

// ==================== AGOSTO ====================
saints['08-01'] = { date: '08-01', name: 'San Alfonso María de Ligorio', description: 'Obispo, doctor de la Iglesia, fundador de los redentoristas.' };
saints['08-02'] = { date: '08-02', name: 'San Eusebio de Vercelli', description: 'Obispo italiano (s. IV).' };
saints['08-03'] = { date: '08-03', name: 'Santa Lidia de Filipos', description: 'Primera convertida de Europa por San Pablo.' };
saints['08-04'] = { date: '08-04', name: 'San Juan María Vianney', description: 'Sacerdote, patrón de los párrocos (Cura de Ars).' };
saints['08-05'] = { date: '08-05', name: 'Dedicación de Santa María la Mayor', description: 'Basílica romana mariana.' };
saints['08-06'] = { date: '08-06', name: 'Transfiguración del Señor', description: 'Jesús se transfigura en el monte Tabor.', isFeast: true };
saints['08-07'] = { date: '08-07', name: 'San Cayetano de Thiene', description: 'Sacerdote, fundador de los teatinos.' };
saints['08-08'] = { date: '08-08', name: 'Santo Domingo de Guzmán', description: 'Sacerdote, fundador de los dominicos.' };
saints['08-09'] = { date: '08-09', name: 'Santa Teresa Benedicta de la Cruz (Edith Stein)', description: 'Religiosa carmelita, mártir, copatrona de Europa.', isFeast: true };
saints['08-10'] = { date: '08-10', name: 'San Lorenzo, diácono y mártir', description: 'Mártir romano del s. III.', isFeast: true };
saints['08-11'] = { date: '08-11', name: 'Santa Clara de Asís', description: 'Virgen, fundadora de las clarisas.' };
saints['08-12'] = { date: '08-12', name: 'Santa Juana Francisca de Chantal', description: 'Religiosa, fundadora de las visitandinas.' };
saints['08-13'] = { date: '08-13', name: 'Santos Ponciano e Hipólito', description: 'Papa y sacerdote, mártires.' };
saints['08-14'] = { date: '08-14', name: 'San Maximiliano María Kolbe', description: 'Sacerdote franciscano, mártir de Auschwitz.' };
saints['08-15'] = { date: '08-15', name: 'Asunción de la Virgen María', description: 'María es elevada al cielo en cuerpo y alma.', isFeast: true };
saints['08-16'] = { date: '08-16', name: 'San Roque', description: 'Peregrino, patrón contra las epidemias.' };
saints['08-17'] = { date: '08-17', name: 'Santa Juana de la Cruz', description: 'Religiosa franciscana española.' };
saints['08-18'] = { date: '08-18', name: 'Santa Elena, emperatriz', description: 'Madre del emperador Constantino.' };
saints['08-19'] = { date: '08-19', name: 'San Juan Eudes', description: 'Sacerdote, fundador de los eudistas.' };
saints['08-20'] = { date: '08-20', name: 'San Bernardo de Claraval', description: 'Abad cisterciense, doctor de la Iglesia.' };
saints['08-21'] = { date: '08-21', name: 'San Pío X, Papa', description: 'Pontífice romano, gran reformador litúrgico.' };
saints['08-22'] = { date: '08-22', name: 'María Reina', description: 'Realeza de la Virgen María.' };
saints['08-23'] = { date: '08-23', name: 'Santa Rosa de Lima', description: 'Virgen dominica, primera santa de América.', isFeast: true };
saints['08-24'] = { date: '08-24', name: 'San Bartolomé, apóstol', description: 'Apóstol del Señor.', isFeast: true };
saints['08-25'] = { date: '08-25', name: 'San Luis IX, rey de Francia', description: 'Rey, patrón de la Tercera Orden Franciscana.' };
saints['08-26'] = { date: '08-26', name: 'Beata Teresa de Calcuta (Madre Teresa)', description: 'Fundadora de las Misioneras de la Caridad.' };
saints['08-27'] = { date: '08-27', name: 'Santa Mónica', description: 'Madre de San Agustín, patrona de las madres.' };
saints['08-28'] = { date: '08-28', name: 'San Agustín de Hipona', description: 'Obispo y doctor de la Iglesia. Inspiración del Papa León XIV (agustino).', isFeast: true };
saints['08-29'] = { date: '08-29', name: 'Martirio de San Juan Bautista', description: 'Memoria de la decapitación del Bautista.' };
saints['08-30'] = { date: '08-30', name: 'Santa Juana Jugán', description: 'Fundadora de las Hermanitas de los Pobres.' };
saints['08-31'] = { date: '08-31', name: 'San Ramón Nonato', description: 'Cardenal mercedario, patrón de las parteras.' };

// ==================== SEPTIEMBRE ====================
saints['09-01'] = { date: '09-01', name: 'Beato Bronislav Markiewicz', description: 'Sacerdote polaco fundador.' };
saints['09-02'] = { date: '09-02', name: 'San Antonino, mártir', description: 'Mártir italiano.' };
saints['09-03'] = { date: '09-03', name: 'San Gregorio Magno, Papa', description: 'Pontífice y doctor de la Iglesia (s. VI).' };
saints['09-04'] = { date: '09-04', name: 'Santa Rosalía de Palermo', description: 'Eremita, patrona de Palermo.' };
saints['09-05'] = { date: '09-05', name: 'Santa Teresa de Calcuta', description: 'Fundadora de las Misioneras de la Caridad.' };
saints['09-06'] = { date: '09-06', name: 'Beato Bertrand de Garrigues', description: 'Compañero de Santo Domingo.' };
saints['09-07'] = { date: '09-07', name: 'Santa Regina, mártir', description: 'Virgen y mártir del s. III.' };
saints['09-08'] = { date: '09-08', name: 'Natividad de la Virgen María', description: 'Fiesta del nacimiento de la Virgen.', isFeast: true };
saints['09-09'] = { date: '09-09', name: 'San Pedro Claver', description: 'Sacerdote jesuita, apóstol de los esclavos.' };
saints['09-10'] = { date: '09-10', name: 'San Nicolás de Tolentino', description: 'Sacerdote agustino italiano.' };
saints['09-11'] = { date: '09-11', name: 'Santos Proto y Jacinto', description: 'Mártires romanos.' };
saints['09-12'] = { date: '09-12', name: 'Santísimo Nombre de María', description: 'Memoria del nombre de la Virgen.' };
saints['09-13'] = { date: '09-13', name: 'San Juan Crisóstomo', description: 'Obispo y doctor de la Iglesia (s. IV).' };
saints['09-14'] = { date: '09-14', name: 'Exaltación de la Santa Cruz', description: 'Fiesta de la Cruz triunfante.', isFeast: true };
saints['09-15'] = { date: '09-15', name: 'Nuestra Señora de los Dolores', description: 'Memoria de los dolores de la Virgen.' };
saints['09-16'] = { date: '09-16', name: 'Santos Cornelio y Cipriano', description: 'Papa y obispo mártires.' };
saints['09-17'] = { date: '09-17', name: 'San Roberto Belarmino', description: 'Cardenal jesuita, doctor de la Iglesia.' };
saints['09-18'] = { date: '09-18', name: 'San José de Cupertino', description: 'Sacerdote franciscano, patrón de los aviadores.' };
saints['09-19'] = { date: '09-19', name: 'San Genaro', description: 'Obispo y mártir, patrón de Nápoles.' };
saints['09-20'] = { date: '09-20', name: 'Santos mártires de Corea', description: 'Mártires coreanos del s. XIX.' };
saints['09-21'] = { date: '09-21', name: 'San Mateo, apóstol y evangelista', description: 'Autor del primer Evangelio.', isFeast: true };
saints['09-22'] = { date: '09-22', name: 'San Mauricio y compañeros', description: 'Mártires de la Legión Tebana.' };
saints['09-23'] = { date: '09-23', name: 'San Pío de Pietrelcina (Padre Pío)', description: 'Sacerdote capuchino estigmatizado.' };
saints['09-24'] = { date: '09-24', name: 'Nuestra Señora de la Merced', description: 'Patrona de Barcelona.' };
saints['09-25'] = { date: '09-25', name: 'San Sergio de Radonez', description: 'Padre del monacato ruso.' };
saints['09-26'] = { date: '09-26', name: 'Santos Cosme y Damián', description: 'Médicos mártires, patronos de los médicos.' };
saints['09-27'] = { date: '09-27', name: 'San Vicente de Paúl', description: 'Sacerdote, fundador de los paúles, patrón de la caridad.' };
saints['09-28'] = { date: '09-28', name: 'San Wenceslao, mártir', description: 'Rey de Bohemia, patrón de Chequia.' };
saints['09-29'] = { date: '09-29', name: 'Santos Arcángeles Miguel, Gabriel y Rafael', description: 'Los tres arcángeles principales.', isFeast: true };
saints['09-30'] = { date: '09-30', name: 'San Jerónimo', description: 'Sacerdote, doctor de la Iglesia, traductor de la Vulgata.' };

// ==================== OCTUBRE ====================
saints['10-01'] = { date: '10-01', name: 'Santa Teresa del Niño Jesús', description: 'Doctora de la Iglesia, patrona de las misiones.', isFeast: true };
saints['10-02'] = { date: '10-02', name: 'Santos Ángeles Custodios', description: 'Memoria de los ángeles guardianes.' };
saints['10-03'] = { date: '10-03', name: 'San Francisco de Borja', description: 'Sacerdote jesuita español.' };
saints['10-04'] = { date: '10-04', name: 'San Francisco de Asís', description: 'Diácono, fundador de los franciscanos.', isFeast: true };
saints['10-05'] = { date: '10-05', name: 'Santa Faustina Kowalska', description: 'Apóstol de la Divina Misericordia.' };
saints['10-06'] = { date: '10-06', name: 'San Bruno', description: 'Sacerdote, fundador de los cartujos.' };
saints['10-07'] = { date: '10-07', name: 'Nuestra Señora del Rosario', description: 'Memoria de la Virgen del Rosario.', isFeast: true };
saints['10-08'] = { date: '10-08', name: 'Santa Pelagia, mártir', description: 'Virgen mártir.' };
saints['10-09'] = { date: '10-09', name: 'San Juan Leonardi', description: 'Sacerdote italiano fundador.' };
saints['10-10'] = { date: '10-10', name: 'Santo Tomás de Villanueva', description: 'Obispo agustino, arzobispo de Valencia.' };
saints['10-11'] = { date: '10-11', name: 'San Juan XXIII, Papa', description: 'Pontífice del Concilio Vaticano II.' };
saints['10-12'] = { date: '10-12', name: 'Nuestra Señora del Pilar', description: 'Patrona de la Hispanidad y de España.', isFeast: true };
saints['10-13'] = { date: '10-13', name: 'San Eduardo el Confesor', description: 'Rey de Inglaterra (s. XI).' };
saints['10-14'] = { date: '10-14', name: 'San Calixto I, Papa', description: 'Pontífice y mártir del s. III.' };
saints['10-15'] = { date: '10-15', name: 'Santa Teresa de Jesús', description: 'Mística, doctora de la Iglesia, patrona de los escritores.', isFeast: true };
saints['10-16'] = { date: '10-16', name: 'Santa Eduvigis y Santa Margarita María', description: 'Religiosas, mística del Sagrado Corazón.' };
saints['10-17'] = { date: '10-17', name: 'San Ignacio de Antioquía', description: 'Obispo y mártir, padre apostólico.' };
saints['10-18'] = { date: '10-18', name: 'San Lucas, evangelista', description: 'Discípulo de San Pablo, autor del tercer Evangelio.', isFeast: true };
saints['10-19'] = { date: '10-19', name: 'Santos Juan de Brébeuf y compañeros', description: 'Mártires jesuitas de Norteamérica.' };
saints['10-20'] = { date: '10-20', name: 'San Pablo de la Cruz', description: 'Sacerdote, fundador de los pasionistas.' };
saints['10-21'] = { date: '10-21', name: 'San Hilarión, abad', description: 'Padre del monacato palestino.' };
saints['10-22'] = { date: '10-22', name: 'San Juan Pablo II, Papa', description: 'Pontífice, gran apóstol del siglo XX.' };
saints['10-23'] = { date: '10-23', name: 'San Juan de Capistrano', description: 'Sacerdote franciscano, predicador.' };
saints['10-24'] = { date: '10-24', name: 'San Antonio María Claret', description: 'Arzobispo, fundador de los claretianos.' };
saints['10-25'] = { date: '10-25', name: 'San Frutos', description: 'Patrón de Segovia.' };
saints['10-26'] = { date: '10-26', name: 'Santos mártires hispanos', description: 'Mártires de la persecución española.' };
saints['10-27'] = { date: '10-27', name: 'San Vicente de Soissons', description: 'Sacerdote y mártir.' };
saints['10-28'] = { date: '10-28', name: 'Santos Simón y Judas Tadeo', description: 'Apóstoles del Señor.', isFeast: true };
saints['10-29'] = { date: '10-29', name: 'Santa Ermelinda', description: 'Virgen consagrada.' };
saints['10-30'] = { date: '10-30', name: 'Beato Domingo Collins', description: 'Religioso jesuita irlandés.' };
saints['10-31'] = { date: '10-31', name: 'San Alfonso Rodríguez', description: 'Religioso jesuita, portero de Mallorca.' };

// ==================== NOVIEMBRE ====================
saints['11-01'] = { date: '11-01', name: 'Todos los Santos', description: 'Solemnidad de todos los santos del cielo.', isFeast: true };
saints['11-02'] = { date: '11-02', name: 'Fieles Difuntos', description: 'Conmemoración de todos los fieles difuntos.', isFeast: true };
saints['11-03'] = { date: '11-03', name: 'San Martín de Porres', description: 'Religioso dominico, patrón de la justicia social.' };
saints['11-04'] = { date: '11-04', name: 'San Carlos Borromeo', description: 'Cardenal arzobispo de Milán, gran reformador.' };
saints['11-05'] = { date: '11-05', name: 'Santos Zacarías e Isabel', description: 'Padres de San Juan Bautista.' };
saints['11-06'] = { date: '11-06', name: 'San Leonardo de Noblac', description: 'Ermitaño francés del s. VI.' };
saints['11-07'] = { date: '11-07', name: 'San Ernesto, abad', description: 'Mártir benedictino del s. XII.' };
saints['11-08'] = { date: '11-08', name: 'Beato Juan Duns Escoto', description: 'Sacerdote franciscano, doctor sutil.' };
saints['11-09'] = { date: '11-09', name: 'Dedicación de la Basílica de Letrán', description: 'Catedral de Roma. También Virgen de la Almudena (Madrid).', isFeast: true };
saints['11-10'] = { date: '11-10', name: 'San León Magno, Papa', description: 'Pontífice y doctor de la Iglesia.' };
saints['11-11'] = { date: '11-11', name: 'San Martín de Tours', description: 'Obispo francés, patrón de Francia.' };
saints['11-12'] = { date: '11-12', name: 'San Josafat, mártir', description: 'Obispo y mártir, apóstol de la unidad.' };
saints['11-13'] = { date: '11-13', name: 'Santa Francisca Javier Cabrini', description: 'Religiosa, primera santa estadounidense.' };
saints['11-14'] = { date: '11-14', name: 'San Diego de Alcalá', description: 'Religioso franciscano andaluz.' };
saints['11-15'] = { date: '11-15', name: 'San Alberto Magno', description: 'Obispo dominico, doctor de la Iglesia, maestro de Santo Tomás.' };
saints['11-16'] = { date: '11-16', name: 'Santa Margarita de Escocia', description: 'Reina, modelo de esposa cristiana.' };
saints['11-17'] = { date: '11-17', name: 'Santa Isabel de Hungría', description: 'Princesa, patrona de la Tercera Orden Franciscana.' };
saints['11-18'] = { date: '11-18', name: 'Dedicación de las Basílicas de San Pedro y San Pablo', description: 'Memoria de las basílicas romanas.' };
saints['11-19'] = { date: '11-19', name: 'Santos Crispín y Crispiniano', description: 'Mártires, patronos de zapateros.' };
saints['11-20'] = { date: '11-20', name: 'Santos mártires vietnamitas', description: 'Mártires de la persecución vietnamita.' };
saints['11-21'] = { date: '11-21', name: 'Presentación de la Virgen María', description: 'María es presentada en el templo.' };
saints['11-22'] = { date: '11-22', name: 'Santa Cecilia', description: 'Virgen y mártir romana, patrona de los músicos.', isFeast: true };
saints['11-23'] = { date: '11-23', name: 'San Clemente I, Papa', description: 'Pontífice y mártir, padre apostólico.' };
saints['11-24'] = { date: '11-24', name: 'Santos mártires de China', description: 'Mártires de las persecuciones chinas.' };
saints['11-25'] = { date: '11-25', name: 'Santa Catalina de Alejandría', description: 'Virgen y mártir, patrona de los filósofos.' };
saints['11-26'] = { date: '11-26', name: 'San Juan Berchmans', description: 'Religioso jesuita, modelo de jóvenes.' };
saints['11-27'] = { date: '11-27', name: 'Nuestra Señora de la Medalla Milagrosa', description: 'Aparición a Santa Catalina Labouré (1830).' };
saints['11-28'] = { date: '11-28', name: 'Santa Catalina Labouré', description: 'Religiosa vidente de la Medalla Milagrosa.' };
saints['11-29'] = { date: '11-29', name: 'San Saturnino de Tolosa', description: 'Obispo y mártir.' };
saints['11-30'] = { date: '11-30', name: 'San Andrés, apóstol', description: 'Hermano de San Pedro, primer llamado.', isFeast: true };

// ==================== DICIEMBRE ====================
saints['12-01'] = { date: '12-01', name: 'San Eloy de Noyon', description: 'Obispo y orfebre francés.' };
saints['12-02'] = { date: '12-02', name: 'Santa Bibiana', description: 'Virgen y mártir romana.' };
saints['12-03'] = { date: '12-03', name: 'San Francisco Javier', description: 'Sacerdote jesuita, patrón de las misiones.', isFeast: true };
saints['12-04'] = { date: '12-04', name: 'Santa Bárbara', description: 'Virgen y mártir, patrona de mineros y artilleros.' };
saints['12-05'] = { date: '12-05', name: 'San Sabas, abad', description: 'Padre del monacato palestino.' };
saints['12-06'] = { date: '12-06', name: 'San Nicolás de Bari', description: 'Obispo, patrón de los niños y comerciantes.' };
saints['12-07'] = { date: '12-07', name: 'San Ambrosio', description: 'Obispo de Milán, doctor de la Iglesia.' };
saints['12-08'] = { date: '12-08', name: 'Inmaculada Concepción', description: 'Solemnidad de la Concepción sin pecado de María. Patrona de España.', isFeast: true };
saints['12-09'] = { date: '12-09', name: 'San Juan Diego', description: 'Indígena vidente de Guadalupe.' };
saints['12-10'] = { date: '12-10', name: 'Nuestra Señora de Loreto', description: 'Patrona de los aviadores.' };
saints['12-11'] = { date: '12-11', name: 'San Dámaso I, Papa', description: 'Pontífice español del s. IV.' };
saints['12-12'] = { date: '12-12', name: 'Nuestra Señora de Guadalupe', description: 'Patrona de México y emperatriz de América.', isFeast: true };
saints['12-13'] = { date: '12-13', name: 'Santa Lucía', description: 'Virgen y mártir, patrona de los ojos.' };
saints['12-14'] = { date: '12-14', name: 'San Juan de la Cruz', description: 'Sacerdote carmelita, doctor de la Iglesia, místico.', isFeast: true };
saints['12-15'] = { date: '12-15', name: 'Santa María Crucificada di Rosa', description: 'Religiosa italiana fundadora.' };
saints['12-16'] = { date: '12-16', name: 'Santa Adelaida, emperatriz', description: 'Esposa de Otón I.' };
saints['12-17'] = { date: '12-17', name: 'San Lázaro', description: 'Hermano de Marta y María, resucitado por Cristo.' };
saints['12-18'] = { date: '12-18', name: 'Beato Antonio Grassi', description: 'Sacerdote oratoriano italiano.' };
saints['12-19'] = { date: '12-19', name: 'Beato Urbano V, Papa', description: 'Pontífice del s. XIV.' };
saints['12-20'] = { date: '12-20', name: 'San Domingo de Silos', description: 'Abad benedictino español.' };
saints['12-21'] = { date: '12-21', name: 'San Pedro Canisio', description: 'Sacerdote jesuita, doctor de la Iglesia.' };
saints['12-22'] = { date: '12-22', name: 'Santa Francisca Javier Cabrini', description: 'Patrona de los emigrantes.' };
saints['12-23'] = { date: '12-23', name: 'San Juan de Kety', description: 'Sacerdote polaco, doctor de Cracovia.' };
saints['12-24'] = { date: '12-24', name: 'Nochebuena', description: 'Vigilia del nacimiento del Señor.' };
saints['12-25'] = { date: '12-25', name: 'Natividad del Señor', description: 'Solemnidad mayor del nacimiento de Jesucristo.', isFeast: true };
saints['12-26'] = { date: '12-26', name: 'San Esteban, protomártir', description: 'Primer mártir del cristianismo.', isFeast: true };
saints['12-27'] = { date: '12-27', name: 'San Juan, apóstol y evangelista', description: 'Apóstol amado del Señor.', isFeast: true };
saints['12-28'] = { date: '12-28', name: 'Santos Inocentes', description: 'Niños mártires de Belén.', isFeast: true };
saints['12-29'] = { date: '12-29', name: 'Santo Tomás Becket', description: 'Arzobispo de Canterbury, mártir.' };
saints['12-30'] = { date: '12-30', name: 'Sagrada Familia', description: 'Domingo dentro de la octava de Navidad (variable).' };
saints['12-31'] = { date: '12-31', name: 'San Silvestre I, Papa', description: 'Pontífice romano del s. IV.' };

// Santo genérico para días sin entrada específica
export const defaultSaint: Saint = {
  date: '',
  name: 'Santos del día',
  description: 'Cada día la Iglesia celebra la memoria de muchos santos. Consulta el calendario litúrgico para conocer al santo del día.',
};

export function getSaintOfTheDay(date: Date = new Date()): Saint {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${month}-${day}`;
  return saints[key] ?? defaultSaint;
}
