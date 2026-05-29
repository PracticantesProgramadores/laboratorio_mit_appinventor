const componentCatalog = [
  { type: "header", icon: "▰", name: "Header", hint: "Encabezado superior" },
  { type: "button", icon: "●", name: "Botón", hint: "Acción principal" },
  { type: "nav", icon: "≡", name: "Barra inferior", hint: "Navegación móvil" },
  { type: "image", icon: "▧", name: "Imagen", hint: "Contenido visual" },
  { type: "input", icon: "T", name: "Campo de texto", hint: "Formulario" },
  { type: "icons", icon: "◇", name: "Íconos", hint: "Accesos rápidos" }
];

const guidedPalettes = [
  {
    name: "Educativa",
    colors: ["#2fbf71", "#3066ff", "#16213e"],
    hint: "Verde para logro, azul para acción y tinta oscura para lectura."
  },
  {
    name: "Bienestar",
    colors: ["#17a2a4", "#7c4dff", "#f7b801"],
    hint: "Análoga fría con acento cálido para alertas o recompensas."
  },
  {
    name: "Contraste",
    colors: ["#111827", "#ffffff", "#ef4e6b"],
    hint: "Alto contraste para botones críticos y texto accesible."
  }
];

const challenges = {
  1: [
    {
      title: "Arrastra correctamente un header",
      instruction: "Coloca el encabezado en la parte superior de la pantalla móvil.",
      hint: "El header debe ser el primer componente visible de una app.",
      validate: () => firstItem()?.dataset.type === "header",
      success: "Excelente jerarquía visual: el header guía la pantalla.",
      error: "La navegación superior debe iniciar arriba. Arrastra o selecciona un header."
    },
    {
      title: "Agrega un botón principal",
      instruction: "Incluye un botón visible para una acción importante.",
      hint: "Busca el componente Botón y ubícalo después del contenido principal.",
      validate: () => hasType("button"),
      success: "Buen uso de llamada a la acción. El usuario sabe qué hacer.",
      error: "El botón principal no destaca porque todavía no existe en la pantalla."
    },
    {
      title: "Organiza una barra de navegación inferior",
      instruction: "Agrega la barra inferior y asegúrate de que quede al final.",
      hint: "En apps móviles, la barra de navegación suele vivir abajo.",
      validate: () => lastItem()?.dataset.type === "nav",
      success: "La navegación es clara y está donde el usuario la espera.",
      error: "La navegación inferior debe ir abajo."
    },
    {
      title: "Identifica qué componente falta",
      instruction: "Una pantalla inicial necesita imagen o campo para comunicar contenido.",
      hint: "Agrega una imagen si quieres una pantalla más visual.",
      validate: () => hasType("image") || hasType("input"),
      success: "Buen diagnóstico: agregaste contenido útil para la interfaz.",
      error: "Falta un componente de contenido: imagen o campo de texto."
    },
    {
      title: "Corrige una interfaz desordenada",
      instruction: "Deja el header arriba, el botón en el centro y la navegación abajo.",
      hint: "Puedes reiniciar o desordenar para practicar corrección visual.",
      validate: () => firstItem()?.dataset.type === "header" && hasType("button") && lastItem()?.dataset.type === "nav",
      success: "Buen uso del espacio visual. La interfaz ya tiene estructura móvil.",
      error: "Revisa orden y jerarquía: header arriba, navegación abajo."
    }
  ],
  2: [
    {
      title: "Selecciona una paleta coherente",
      instruction: "Usa una paleta guiada y aplica sus colores a dos componentes.",
      hint: "Compara la intención: Educativa comunica avance, Bienestar suaviza la experiencia y Contraste prioriza lectura.",
      validate: () => state.selectedPalette && state.paletteChanges >= 2,
      success: "Paleta coherente: elegiste colores con intención visual.",
      error: "Selecciona una paleta guiada y aplica color a dos componentes."
    },
    {
      title: "Corrige un botón con bajo contraste",
      instruction: "Asegura que el texto del botón se lea con claridad.",
      hint: "Observa la lectura HSL/CMYK: baja luminosidad de fondo + texto claro suele mejorar el contraste.",
      validate: () => selectedButtonContrast() >= 4.5,
      success: "Contraste aprobado. El botón ahora es más accesible.",
      error: "El texto gris claro sobre fondo blanco reduce la accesibilidad."
    },
    {
      title: "Optimiza una imagen pixelada",
      instruction: "Inserta una imagen, ajusta recorte y define un punto focal.",
      hint: "Cover llena el espacio; Contain conserva toda la imagen. El foco evita cortar lo importante.",
      validate: () => getItems().some((item) => item.dataset.type === "image" && item.dataset.imageReady === "true" && item.dataset.imageAdjusted === "true"),
      success: "La imagen ya tiene integración visual, recorte y foco definidos.",
      error: "Selecciona una imagen y ajusta altura, modo o foco desde Integración de imagen."
    },
    {
      title: "Ajusta tamaños táctiles mínimos",
      instruction: "Los botones deben medir al menos 44 px de alto.",
      hint: "Usa el control Tamaño táctil en Propiedades.",
      validate: () => getItems().filter((item) => item.dataset.type === "button").every((item) => item.offsetHeight >= 44) && hasType("button"),
      success: "Tamaño táctil correcto. La app es más cómoda en móvil.",
      error: "Ajusta los botones para superar el mínimo táctil recomendado."
    },
    {
      title: "Respeta proporción visual",
      instruction: "Reubica elementos hasta equilibrar header, imagen, botón y navegación.",
      hint: "Arrastra bloques dentro del celular o usa las flechas de Propiedades para ajustar la jerarquía.",
      validate: () => state.reorderCount > 0 && getItems().length >= 4 && getItems().length <= 6 && firstItem()?.dataset.type === "header" && lastItem()?.dataset.type === "nav",
      success: "Excelente proporción visual: la pantalla respira.",
      error: "Reubica al menos un componente y organiza entre 4 y 6 elementos."
    }
  ],
  3: [
    {
      title: "Crear un wireframe",
      instruction: "Activa modo Wireframe y construye la estructura básica.",
      hint: "Wireframe sirve para pensar estructura antes del color.",
      validate: () => phoneScreen.classList.contains("wireframe") && getItems().length >= 3,
      success: "Wireframe listo: diseñaste la arquitectura de pantalla.",
      error: "Activa Wireframe y coloca al menos tres bloques."
    },
    {
      title: "Convertirlo en mockup",
      instruction: "Activa modo Mockup para recuperar colores e identidad visual.",
      hint: "Un mockup agrega detalle visual al wireframe.",
      validate: () => !phoneScreen.classList.contains("wireframe") && getItems().length >= 3,
      success: "Mockup creado: ya se ve como una app real.",
      error: "Activa Mockup después de tener tu estructura."
    },
    {
      title: "Conectar botones entre pantallas",
      instruction: "Selecciona un botón y usa Vista previa para navegar a Pantalla 2.",
      hint: "Al seleccionar un botón se le asigna una acción de navegación.",
      validate: () => getItems().some((item) => item.dataset.action === "go-detail"),
      success: "Conexión creada. Tu prototipo ya tiene navegación.",
      error: "Agrega o selecciona un botón para conectarlo con Pantalla 2."
    },
    {
      title: "Diseñar estados de botones",
      instruction: "Modifica color y tamaño del botón para hacerlo reconocible.",
      hint: "Un botón con color fuerte y tamaño adecuado comunica interacción.",
      validate: () => getItems().some((item) => item.dataset.type === "button" && item.offsetHeight >= 50 && item.style.backgroundColor),
      success: "Estado visual claro: el botón parece interactivo.",
      error: "Cambia color y tamaño de un botón para diseñar su estado."
    },
    {
      title: "Crear formulario funcional",
      instruction: "Agrega un campo de texto y un botón para completar el flujo.",
      hint: "Formulario mínimo: campo + acción.",
      validate: () => hasType("input") && hasType("button"),
      success: "Formulario funcional creado para tu prototipo.",
      error: "Falta campo de texto o botón para formar el flujo."
    },
    {
      title: "Resolver problemas UX",
      instruction: "Valida contraste, tamaño táctil y navegación.",
      hint: "El medidor UX debe superar 80 para cerrar el laboratorio.",
      validate: () => Number(uxScore.textContent) >= 80 && hasType("nav") && hasType("button"),
      success: "Prueba de usabilidad superada. Desbloqueaste la insignia final.",
      error: "Mejora contraste, navegación o tamaño táctil para subir el UX."
    }
  ]
};

const state = {
  started: false,
  theme: 1,
  challenge: 0,
  xp: 0,
  completed: { 1: new Set(), 2: new Set(), 3: new Set() },
  selected: null,
  currentScreen: "screen1",
  paletteChanges: 0,
  reorderCount: 0,
  selectedPalette: "",
  screens: { screen1: [], screen2: [] }
};

const componentList = document.querySelector("#componentList");
const phoneScreen = document.querySelector("#phoneScreen");
const previewScreen = document.querySelector("#previewScreen");
const feedback = document.querySelector("#feedback");
const progressFill = document.querySelector("#progressFill");
const uxScore = document.querySelector("#uxScore");

function init() {
  renderComponents();
  renderPalettes();
  renderBadges();
  bindEvents();
  loadProgress();
  updateChallengeUI();
  updateChecks();
  updateColorReadout(document.querySelector("#colorPicker").value);
}

function renderComponents() {
  componentList.innerHTML = componentCatalog.map((component) => `
    <div class="component-card" draggable="true" data-type="${component.type}">
      <div class="component-icon">${component.icon}</div>
      <div><strong>${component.name}</strong><small>${component.hint}</small></div>
    </div>
  `).join("");
}

function bindEvents() {
  document.querySelector("#startBtn").addEventListener("click", startLab);
  document.querySelector("#heroStartBtn").addEventListener("click", startLab);
  document.querySelector("#validateBtn").addEventListener("click", validateCurrentChallenge);
  document.querySelector("#hintBtn").addEventListener("click", showHint);
  document.querySelector("#saveBtn").addEventListener("click", saveProgress);
  document.querySelector("#previewBtn").addEventListener("click", openPreview);
  document.querySelector("#closePreview").addEventListener("click", () => document.querySelector("#previewModal").close());
  document.querySelector("#wireframeBtn").addEventListener("click", () => phoneScreen.classList.add("wireframe"));
  document.querySelector("#mockupBtn").addEventListener("click", () => phoneScreen.classList.remove("wireframe"));
  document.querySelector("#shuffleBtn").addEventListener("click", shuffleInterface);
  document.querySelector("#resetBtn").addEventListener("click", resetCurrentScreen);
  document.querySelector("#screenOneBtn").addEventListener("click", () => switchScreen("screen1"));
  document.querySelector("#screenTwoBtn").addEventListener("click", () => switchScreen("screen2"));
  document.querySelector("#moveUpBtn").addEventListener("click", () => moveSelected(-1));
  document.querySelector("#moveDownBtn").addEventListener("click", () => moveSelected(1));
  document.querySelector("#narrowBtn").addEventListener("click", () => setSelectedWidth("78%"));
  document.querySelector("#wideBtn").addEventListener("click", () => setSelectedWidth("100%"));
  document.querySelector("#hueRange").addEventListener("input", applyHslColor);
  document.querySelector("#satRange").addEventListener("input", applyHslColor);
  document.querySelector("#lightRange").addEventListener("input", applyHslColor);
  document.querySelector("#imageInput").addEventListener("change", handleImageUpload);
  document.querySelector("#coverBtn").addEventListener("click", () => setImageFit("cover"));
  document.querySelector("#containBtn").addEventListener("click", () => setImageFit("contain"));
  document.querySelector("#imageHeightRange").addEventListener("input", applyImageControls);
  document.querySelector("#imageFocusX").addEventListener("input", applyImageControls);
  document.querySelector("#imageFocusY").addEventListener("input", applyImageControls);

  document.querySelectorAll(".theme-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!tab.classList.contains("locked")) switchTheme(Number(tab.dataset.theme));
    });
  });

  componentList.addEventListener("dragstart", (event) => {
    const card = event.target.closest(".component-card");
    if (card) event.dataTransfer.setData("component", card.dataset.type);
  });

  phoneScreen.addEventListener("dragover", (event) => {
    event.preventDefault();
    phoneScreen.classList.add("drag-over");
    const draggingId = [...event.dataTransfer.types].includes("text/item-id");
    if (draggingId) placeDropIndicator(event);
  });

  phoneScreen.addEventListener("dragleave", () => {
    phoneScreen.classList.remove("drag-over");
    getItems().forEach((item) => item.classList.remove("drop-before"));
  });
  phoneScreen.addEventListener("drop", (event) => {
    event.preventDefault();
    phoneScreen.classList.remove("drag-over");
    const itemId = event.dataTransfer.getData("text/item-id");
    if (itemId) {
      reorderDraggedItem(itemId, event);
      return;
    }
    addComponent(event.dataTransfer.getData("component"));
  });

  phoneScreen.addEventListener("click", (event) => {
    const item = event.target.closest(".mobile-item");
    if (item) selectItem(item);
  });

  document.querySelector("#colorPicker").addEventListener("input", applyProperties);
  document.querySelector("#textColorPicker").addEventListener("input", applyProperties);
  document.querySelector("#sizeRange").addEventListener("input", applyProperties);
  document.querySelector("#textInput").addEventListener("input", applyProperties);
}

function renderPalettes() {
  document.querySelector("#paletteSwatches").innerHTML = guidedPalettes.map((palette) => `
    <button class="palette-chip" data-palette="${palette.name}" title="${palette.hint}">
      <span>${palette.name}</span>
      <i style="background:${palette.colors[0]}"></i>
      <i style="background:${palette.colors[1]}"></i>
      <i style="background:${palette.colors[2]}"></i>
    </button>
  `).join("");

  document.querySelector("#paletteSwatches").addEventListener("click", (event) => {
    const chip = event.target.closest(".palette-chip");
    if (!chip) return;
    const palette = guidedPalettes.find((item) => item.name === chip.dataset.palette);
    state.selectedPalette = palette.name;
    document.querySelectorAll(".palette-chip").forEach((item) => item.classList.toggle("selected", item === chip));
    document.querySelector("#colorPicker").value = palette.colors[0];
    document.querySelector("#textColorPicker").value = palette.colors[2] === "#16213e" ? "#ffffff" : palette.colors[1];
    setFeedback(`Paleta ${palette.name}: ${palette.hint}`, "");
    applyProperties();
  });
}

function startLab() {
  state.started = true;
  document.querySelector("#homeScreen").classList.add("hidden");
  document.querySelector("#labStage").classList.remove("hidden");
  if (!getItems().length) {
    addComponent("header");
  }
  updateChallengeUI();
  setFeedback("Arrastra, prueba y valida. Aquí se aprende diseñando.", "success");
}

function switchTheme(theme) {
  state.theme = theme;
  state.challenge = 0;
  document.querySelectorAll(".theme-tab").forEach((tab) => tab.classList.toggle("active", Number(tab.dataset.theme) === theme));
  updateChallengeUI();
}

function addComponent(type) {
  if (!type) return;
  const item = document.createElement("div");
  item.className = `mobile-item mobile-${type === "icons" ? "icon-row" : type}`;
  item.dataset.type = type;
  item.dataset.id = crypto.randomUUID();
  item.draggable = true;
  item.textContent = defaultText(type);
  item.addEventListener("dragstart", handleItemDragStart);
  if (type === "button" && state.theme === 3) item.dataset.action = "go-detail";
  phoneScreen.appendChild(item);
  selectItem(item);
  updateChecks();
  scoreUX();
}

function defaultText(type) {
  return {
    header: "Mi App Escolar",
    button: "Continuar",
    nav: "Inicio   Retos   Perfil",
    image: "Imagen de la app",
    input: "Escribe tu nombre",
    icons: "★   ◇   ✓"
  }[type] || "Componente";
}

function selectItem(item) {
  getItems().forEach((element) => element.classList.remove("selected"));
  item.classList.add("selected");
  state.selected = item;
  document.querySelector("#selectedName").textContent = componentCatalog.find((c) => c.type === item.dataset.type)?.name || "Componente";
  document.querySelector("#textInput").value = item.textContent.trim();
  document.querySelector("#sizeRange").value = Math.round(item.offsetHeight || 48);
  syncHslSliders(rgbToHex(getComputedStyle(item).backgroundColor));
  updateColorReadout(document.querySelector("#colorPicker").value);
}

function applyProperties() {
  if (!state.selected) {
    setFeedback("Selecciona un componente del celular para editar sus propiedades.", "error");
    return;
  }
  const color = document.querySelector("#colorPicker").value;
  const textColor = document.querySelector("#textColorPicker").value;
  const size = document.querySelector("#sizeRange").value;
  const text = document.querySelector("#textInput").value;
  state.selected.style.background = color;
  state.selected.style.color = textColor;
  state.selected.style.minHeight = `${size}px`;
  state.selected.textContent = text;
  state.paletteChanges += 1;
  if (state.selected.dataset.type === "button" && state.theme === 3) state.selected.dataset.action = "go-detail";
  scoreUX();
  updateChecks();
  updateColorReadout(color);
}

function applyHslColor() {
  const hue = document.querySelector("#hueRange").value;
  const sat = document.querySelector("#satRange").value;
  const light = document.querySelector("#lightRange").value;
  const hex = hslToHex(Number(hue), Number(sat), Number(light));
  document.querySelector("#colorPicker").value = hex;
  state.paletteChanges += 1;
  applyProperties();
}

function updateColorReadout(hex) {
  const hsl = hexToHsl(hex);
  const cmyk = hexToCmyk(hex);
  document.querySelector("#colorReadout").textContent = `HSL ${hsl.h} ${hsl.s}% ${hsl.l}% · CMYK ${cmyk.c} ${cmyk.m} ${cmyk.y} ${cmyk.k}`;
}

function syncHslSliders(hex) {
  const hsl = hexToHsl(hex);
  document.querySelector("#hueRange").value = hsl.h;
  document.querySelector("#satRange").value = hsl.s;
  document.querySelector("#lightRange").value = hsl.l;
}

function handleItemDragStart(event) {
  event.dataTransfer.setData("text/item-id", event.currentTarget.dataset.id);
  selectItem(event.currentTarget);
}

function placeDropIndicator(event) {
  const afterElement = getDragAfterElement(event.clientY);
  getItems().forEach((item) => item.classList.remove("drop-before"));
  if (afterElement) afterElement.classList.add("drop-before");
}

function reorderDraggedItem(itemId, event) {
  const item = getItems().find((element) => element.dataset.id === itemId);
  const afterElement = getDragAfterElement(event.clientY);
  getItems().forEach((element) => element.classList.remove("drop-before"));
  if (!item) return;
  if (afterElement && afterElement !== item) {
    phoneScreen.insertBefore(item, afterElement);
  } else {
    phoneScreen.appendChild(item);
  }
  state.reorderCount += 1;
  selectItem(item);
  setFeedback("Componente reubicado dentro del celular. La jerarquía visual cambió.", "success");
  updateChecks();
  scoreUX();
}

function getDragAfterElement(y) {
  const items = getItems().filter((item) => item.dataset.id !== state.selected?.dataset.id);
  return items.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function moveSelected(direction) {
  if (!state.selected) {
    setFeedback("Selecciona un componente para moverlo con precisión.", "error");
    return;
  }
  const sibling = direction < 0 ? state.selected.previousElementSibling : state.selected.nextElementSibling;
  if (!sibling) return;
  if (direction < 0) {
    phoneScreen.insertBefore(state.selected, sibling);
  } else {
    phoneScreen.insertBefore(sibling, state.selected);
  }
  state.reorderCount += 1;
  updateChecks();
  setFeedback("Reubicación precisa aplicada con flechas.", "success");
}

function setSelectedWidth(width) {
  if (!state.selected) {
    setFeedback("Selecciona un componente antes de ajustar su ancho.", "error");
    return;
  }
  state.selected.style.width = width;
  state.selected.style.alignSelf = width === "100%" ? "stretch" : "center";
  state.reorderCount += 1;
  scoreUX();
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  const imageItem = state.selected?.dataset.type === "image" ? state.selected : getItems().find((item) => item.dataset.type === "image");
  if (!file || !imageItem) {
    setFeedback("Agrega o selecciona un componente Imagen antes de insertar el archivo.", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    imageItem.style.backgroundImage = `linear-gradient(rgba(22,33,62,0.05), rgba(22,33,62,0.05)), url("${reader.result}")`;
    imageItem.style.backgroundSize = imageItem.dataset.imageFit || "cover";
    imageItem.style.backgroundPosition = "50% 50%";
    imageItem.textContent = "";
    imageItem.dataset.imageReady = "true";
    imageItem.dataset.imageAdjusted = "true";
    selectItem(imageItem);
    setFeedback("Imagen insertada. Ajusta foco, altura o modo para integrarla al mockup.", "success");
  };
  reader.readAsDataURL(file);
}

function setImageFit(fit) {
  const imageItem = getSelectedImage();
  if (!imageItem) return;
  imageItem.dataset.imageFit = fit;
  imageItem.dataset.imageAdjusted = "true";
  imageItem.style.backgroundSize = fit;
  document.querySelector("#coverBtn").classList.toggle("active", fit === "cover");
  document.querySelector("#containBtn").classList.toggle("active", fit === "contain");
  setFeedback(fit === "cover" ? "Cover llena el contenedor y puede recortar bordes." : "Contain conserva toda la imagen y puede dejar aire.", "");
}

function applyImageControls() {
  const imageItem = getSelectedImage();
  if (!imageItem) return;
  const height = document.querySelector("#imageHeightRange").value;
  const focusX = document.querySelector("#imageFocusX").value;
  const focusY = document.querySelector("#imageFocusY").value;
  imageItem.style.minHeight = `${height}px`;
  imageItem.style.backgroundPosition = `${focusX}% ${focusY}%`;
  imageItem.dataset.imageAdjusted = "true";
  scoreUX();
}

function getSelectedImage() {
  const imageItem = state.selected?.dataset.type === "image" ? state.selected : getItems().find((item) => item.dataset.type === "image");
  if (!imageItem) setFeedback("Selecciona o agrega una imagen para ajustar sus propiedades.", "error");
  return imageItem;
}

function validateCurrentChallenge() {
  const challenge = currentChallenge();
  const passed = challenge.validate();
  if (passed) {
    const key = `${state.theme}-${state.challenge}`;
    if (!state.completed[state.theme].has(key)) {
      state.completed[state.theme].add(key);
      state.xp += 120;
    }
    setFeedback(`✔ ${challenge.success}`, "success");
    unlockNext();
    advanceChallenge();
  } else {
    setFeedback(`✘ ${challenge.error}`, "error");
  }
  scoreUX();
  updateChallengeUI();
  saveProgress(false);
}

function unlockNext() {
  const done = state.completed[state.theme].size;
  if (done >= challenges[state.theme].length && state.theme < 3) {
    document.querySelector(`.theme-tab[data-theme="${state.theme + 1}"]`).classList.remove("locked");
    document.querySelector(`[data-theme-card="${state.theme + 1}"]`).classList.add("unlocked");
    state.xp += 180;
  }
}

function advanceChallenge() {
  const total = challenges[state.theme].length;
  if (state.challenge < total - 1) {
    state.challenge += 1;
  }
}

function showHint() {
  setFeedback(`Pista: ${currentChallenge().hint}`, "");
}

function currentChallenge() {
  return challenges[state.theme][state.challenge];
}

function updateChallengeUI() {
  const challenge = currentChallenge();
  const total = challenges[state.theme].length;
  document.querySelector("#themeLabel").textContent = `Tema ${state.theme}`;
  document.querySelector("#challengeTitle").textContent = challenge.title;
  document.querySelector("#challengeInstruction").textContent = challenge.instruction;
  document.querySelector("#rightChallengeTitle").textContent = challenge.title;
  document.querySelector("#rightChallengeText").textContent = challenge.instruction;
  document.querySelector("#challengeIndex").textContent = `${state.challenge + 1}/${total}`;
  document.querySelector("#xpValue").textContent = state.xp;
  const completeCount = Object.values(state.completed).reduce((sum, set) => sum + set.size, 0);
  const allCount = Object.values(challenges).reduce((sum, list) => sum + list.length, 0);
  progressFill.style.width = `${Math.round((completeCount / allCount) * 100)}%`;
  document.querySelector("#stars").textContent = "★".repeat(Math.min(3, Math.floor(state.xp / 500))) + "☆".repeat(3 - Math.min(3, Math.floor(state.xp / 500)));
  renderBadges();
}

function renderBadges() {
  const unlocked = [
    state.completed[1].size >= challenges[1].length,
    state.completed[2].size >= challenges[2].length,
    state.completed[3].size >= challenges[3].length
  ];
  const names = ["Diseñador UX Junior", "Maestro del color", "Experto en prototipos"];
  document.querySelector("#badges").innerHTML = names.map((name, index) => `<span class="badge ${unlocked[index] ? "unlocked" : ""}">${name}</span>`).join("");
  document.querySelector("#badgeCount").textContent = `${unlocked.filter(Boolean).length}/3`;
}

function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type || ""}`;
}

function getItems() {
  return [...phoneScreen.querySelectorAll(".mobile-item")];
}

function firstItem() {
  return getItems()[0];
}

function lastItem() {
  const items = getItems();
  return items[items.length - 1];
}

function hasType(type) {
  return getItems().some((item) => item.dataset.type === type);
}

function shuffleInterface() {
  const items = getItems().sort(() => Math.random() - 0.5);
  phoneScreen.innerHTML = "";
  items.forEach((item) => phoneScreen.appendChild(item));
  setFeedback("Interfaz desordenada. Ahora corrige jerarquía, navegación y proporción.", "");
  updateChecks();
}

function resetCurrentScreen() {
  phoneScreen.innerHTML = "";
  state.selected = null;
  addComponent("header");
  setFeedback("Pantalla reiniciada. Empieza desde una estructura limpia.", "");
}

function switchScreen(screen) {
  state.screens[state.currentScreen] = getItems().map((item) => item.outerHTML);
  state.currentScreen = screen;
  phoneScreen.innerHTML = state.screens[screen].join("");
  hydrateMobileItems();
  if (!phoneScreen.innerHTML && screen === "screen2") {
    addComponent("header");
    if (firstItem()) firstItem().textContent = "Detalle del reto";
    addComponent("input");
    addComponent("button");
  }
  state.selected = null;
  updateChecks();
}

function selectedButtonContrast() {
  const button = state.selected?.dataset.type === "button" ? state.selected : getItems().find((item) => item.dataset.type === "button");
  if (!button) return 0;
  return contrastRatio(rgbToHex(getComputedStyle(button).backgroundColor), rgbToHex(getComputedStyle(button).color));
}

function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match) return "#ffffff";
  return `#${match.slice(0, 3).map((value) => Number(value).toString(16).padStart(2, "0")).join("")}`;
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / d + 2;
    if (max === b) h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return `#${[r, g, b].map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0")).join("")}`;
}

function hexToCmyk(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
}

function luminance(hex) {
  const values = hex.replace("#", "").match(/.{2}/g).map((part) => {
    const color = parseInt(part, 16) / 255;
    return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrastRatio(hexA, hexB) {
  const light = Math.max(luminance(hexA), luminance(hexB));
  const dark = Math.min(luminance(hexA), luminance(hexB));
  return (light + 0.05) / (dark + 0.05);
}

function scoreUX() {
  let score = 45;
  if (firstItem()?.dataset.type === "header") score += 12;
  if (lastItem()?.dataset.type === "nav") score += 12;
  if (hasType("button")) score += 10;
  if (selectedButtonContrast() >= 4.5) score += 10;
  if (state.selectedPalette) score += 4;
  if (getItems().some((item) => item.dataset.type === "image" && item.dataset.imageAdjusted === "true")) score += 4;
  if (getItems().some((item) => item.offsetHeight >= 44)) score += 6;
  if (getItems().length >= 4 && getItems().length <= 6) score += 5;
  uxScore.textContent = Math.min(100, score);
}

function updateChecks() {
  const contrast = selectedButtonContrast() >= 4.5 ? "aprobado" : "por mejorar";
  const touch = getItems().some((item) => item.dataset.type === "button" && item.offsetHeight >= 44) ? "aprobado" : "pendiente";
  const nav = lastItem()?.dataset.type === "nav" ? "clara" : "pendiente";
  document.querySelector("#checks").innerHTML = `
    <li>Contraste: ${contrast}</li>
    <li>Tamaño táctil: ${touch}</li>
    <li>Navegación: ${nav}</li>
  `;
}

function openPreview() {
  previewScreen.innerHTML = phoneScreen.innerHTML;
  previewScreen.querySelectorAll(".mobile-item").forEach((item) => {
    item.classList.remove("selected");
    if (item.dataset.action === "go-detail") {
      item.addEventListener("click", () => {
        previewScreen.innerHTML = `
          <div class="mobile-item mobile-header">Pantalla 2</div>
          <div class="mobile-item mobile-image">Prototipo navegable</div>
          <div class="mobile-item mobile-input">Datos del usuario</div>
          <div class="mobile-item mobile-button">Enviar</div>
          <div class="mobile-item mobile-nav">Inicio   Retos   Perfil</div>
        `;
      });
    }
  });
  const completeCount = Object.values(state.completed).reduce((sum, set) => sum + set.size, 0);
  document.querySelector("#previewReport").textContent = `XP: ${state.xp}. Retos completados: ${completeCount}. UX actual: ${uxScore.textContent}/100.`;
  document.querySelector("#certificate").classList.toggle("hidden", state.completed[3].size < challenges[3].length);
  document.querySelector("#previewModal").showModal();
}

function saveProgress(showMessage = true) {
  const data = {
    started: state.started || !document.querySelector("#labStage").classList.contains("hidden"),
    theme: state.theme,
    challenge: state.challenge,
    xp: state.xp,
    completed: Object.fromEntries(Object.entries(state.completed).map(([key, set]) => [key, [...set]])),
    paletteChanges: state.paletteChanges,
    reorderCount: state.reorderCount,
    selectedPalette: state.selectedPalette,
    html: phoneScreen.innerHTML
  };
  try {
    localStorage.setItem("applab-ucn-progress", JSON.stringify(data));
    if (showMessage) {
      setFeedback("Progreso guardado. Al volver a abrir el archivo se restaurará tu laboratorio.", "success");
      const saveBtn = document.querySelector("#saveBtn");
      saveBtn.textContent = "✓";
      saveBtn.title = "Progreso guardado";
      window.setTimeout(() => {
        saveBtn.textContent = "💾";
        saveBtn.title = "Guardar progreso";
      }, 1200);
    }
  } catch {
    setFeedback("No se pudo guardar en este navegador. Revisa permisos de almacenamiento local.", "error");
  }
}

function loadProgress() {
  const raw = localStorage.getItem("applab-ucn-progress");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    state.theme = data.theme || 1;
    state.challenge = data.challenge || 0;
    state.xp = data.xp || 0;
    state.paletteChanges = data.paletteChanges || 0;
    state.reorderCount = data.reorderCount || 0;
    state.selectedPalette = data.selectedPalette || "";
    state.started = Boolean(data.started || data.html);
    state.completed = {
      1: new Set(data.completed?.["1"] || []),
      2: new Set(data.completed?.["2"] || []),
      3: new Set(data.completed?.["3"] || [])
    };
    phoneScreen.innerHTML = data.html || "";
    hydrateMobileItems();
    if (state.started) {
      document.querySelector("#homeScreen").classList.add("hidden");
      document.querySelector("#labStage").classList.remove("hidden");
    }
    document.querySelectorAll(".theme-tab").forEach((tab) => tab.classList.toggle("active", Number(tab.dataset.theme) === state.theme));
    if (state.completed[1].size) document.querySelector('.theme-tab[data-theme="2"]').classList.remove("locked");
    if (state.completed[2].size) document.querySelector('.theme-tab[data-theme="3"]').classList.remove("locked");
    scoreUX();
    updateChecks();
  } catch {
    localStorage.removeItem("applab-ucn-progress");
  }
}

function hydrateMobileItems() {
  getItems().forEach((item) => {
    item.draggable = true;
    item.removeEventListener("dragstart", handleItemDragStart);
    item.addEventListener("dragstart", handleItemDragStart);
  });
}

init();
