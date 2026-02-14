// ============================================
// CONFIGURACIÓN PERSONALIZABLE
// ============================================
const CONFIG = {
  // Fecha de inicio de la relación (Formato: Año, Mes-1, Día, Hora, Minuto)
  startDate: new Date("2016-02-02T00:00:00"),

  // Velocidad de dibujo de ramas (ms por pixel)
  branchDrawSpeed: 7,

  // Mensajes personalizables - Array con mensajes para cada persona
  messages: [
    {
      name: "Chunita",
      musicPath: "musica/chunita.mp3",
      messageText: `Chunita, quiero decirte que eres una persona de verdad inigualable.
Tienes una luz propia que se nota en todo lo que haces;
desde esa sonrisa que contagia alegría hasta esa seguridad con la que proyectastus palabras. 

Eres una mujer guapísima y eso es algo que todos notamos a simple vista.

Pero más allá de lo físico, es admirable la dedicación
que le pones a tu trabajo como docente.
Se nota que tienes una vocación increíble y esa paciencia
y forma de tratar a los demás es fantástica.

Cada consejo que das refleja la gran profesional 
y el ser humano de calidad en el que te has convertido.

En este tiempo te he llegado a apreciar muchísimo.
Sigamos riéndonos y compartiendo momentos 
(aunque ya no vale beber porque está malita de la salud, jeje)
Valoro demasiado esta relación de familia tan linda que hemos construido.
`,
      signatureText: `— Con todo mi cariño, ¡Te quiero mucho!`
    },
    {
      name: "Karlita",
      musicPath: "musica/karlita.mp3",
      messageText: `Karlita, primero decirte que tienes una sonrisa preciosa
y, de verdad, eres alguien de admirar. Me impresiona lo luchadora que eres;
no solo peleas por tus sueños, sino por todas las personas
que te importan y te rodean.

Además de ese gran corazón, siempre te ves increíble: 
tienes un estilazo para vestir y te maquillas de diez, ¡siempre radiante!

Ya son casi tres años conviviendo más de cerca,
compartiendo anécdotas que si nos ponemos a recordar,
nos dan ganas de llorar, coraje y risa al mismo tiempo.

Confío muchísimo en ti y sé que vas a llegar lejísimos
por el amor que le pones a todo.
Gracias por ser parte de mi vida y 
por esa complicidad que hemos formado.

Ya toca conseguir parejas oeee.. jaja 

Feliz San Valentín, Karlita.`,
      signatureText: `— Con mucho aprecio`
    },
    {
      name: "Roberth",
      musicPath: "musica/roberth.mp3",
      messageText: `Mi estimado Roberth,
en este San Valentín
quiero enviarte este mensaje especial.

Tu amistad y compañía
han sido invaluables para mí.

Eres un gran profesional,
y te admiro mucho por tu dedicación 
y pasión en lo que haces.

Gracias por estar presente,
por tu apoyo y por ser
una gran persona.

Que este día esté lleno
de amor y alegría para ti.

Feliz San Valentín, amigo.`,
      signatureText: `— Un abrazo fraternal`
    }
  ],

  // Colores de los corazones
  heartColors: ["#ff4d4d", "#ff9a9e", "#ff6b6b", "#ffcccc", "#d62828"],
  
  // Colores de las cervezas (para Roberth) - Amarillos y verdes
  beerColors: ["#FFB627", "#FFA500", "#FFD700", "#FFCC00", "#F4A460", "#2D6E2D", "#3D8B3D", "#4A7C4A", "#5C9E5C", "#228B22"],
  
  // Esquemas de color de fondo para cada persona
  backgroundSchemes: [
    // Chunita - Tonos rosados/melocotón/beige (actual)
    {
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffd1dc 100%)"
    },
    // Karlita - Verde jade con tonos complementarios
    {
      gradient: "linear-gradient(135deg, #d4f1e8 0%, #a8e6cf 50%, #c9f0df 100%)"
    },
    // Roberth - Rojizo suave con amarillo cálido
    {
      gradient: "linear-gradient(135deg, #ffe5d9 0%, #ffd4a3 50%, #ffccb3 100%)"
    }
  ]
};

// ============================================
// INICIALIZACIÓN DE ESTRELLAS EN PANTALLA INICIAL
// ============================================
function initStarsBackground() {
  const starsContainer = document.getElementById("starsBackground");
  // Crear estrellas fijas de fondo
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    starsContainer.appendChild(star);
  }
}

function createShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";
  star.style.top = Math.random() * 60 + "%";
  star.style.left = "-10%";

  const duration = Math.random() * 1.5 + 2;
  star.style.animationDuration = duration + "s";

  document.getElementById("shootingStars").appendChild(star);

  setTimeout(() => {
    star.remove();
  }, duration * 1000);
}

function startShootingStars() {
  // Crear algunas estrellas fugaces iniciales
  for (let i = 0; i < 3; i++) {
    setTimeout(() => createShootingStar(), i * 1000);
  }

  // Continuar creando estrellas fugaces aleatoriamente
  setInterval(() => {
    if (Math.random() > 0.4) {
      createShootingStar();
    }
  }, 1000);
}

// Inicializar estrellas al cargar la página
window.addEventListener("load", () => {
  initStarsBackground();
  startShootingStars();
});

// ============================================
// REFERENCIAS DOM
// ============================================
const startBtn = document.getElementById("startBtn");
const startOverlay = document.getElementById("startOverlay");
const groundLine = document.getElementById("groundLine");
const treeWrapper = document.getElementById("tree-wrapper");
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const messageContainer = document.getElementById("messageContainer");
const typewriterElement = document.getElementById("typewriter");
const counterTextElement = document.getElementById("counterText");
const counterNumbersElement = document.getElementById("counterNumbers");
const bgMusic = document.getElementById("backgroundMusic");
const friendsImage = document.getElementById("friendsImage");

// Configurar volumen inicial
bgMusic.volume = 0.5; // 50% de volumen

// Variable para controlar el estado del mensaje
let isMessageMinimized = false;

// Variables para navegación de mensajes
let currentMessageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let isAnimatingMessage = false;
let hasSwipedOnce = false;
let typewriterTimeout = null;

// Canvas fade settings
let canvasInitialOpacity = 0.15;
let canvasFadeDuration = 3500;
let canvasFadeStart = null;

// Variables de estado
let isTreeBuilt = false;

function fadeCanvas(timestamp) {
  if (!canvasFadeStart) canvasFadeStart = timestamp;
  const elapsed = timestamp - canvasFadeStart;
  const t = Math.min(1, elapsed / canvasFadeDuration);
  const value = canvasInitialOpacity + t * (1 - canvasInitialOpacity);
  canvas.style.opacity = value.toString();
  if (t < 1 && !isTreeBuilt) {
    requestAnimationFrame(fadeCanvas);
  } else {
    canvas.style.opacity = "1";
  }
}

// ============================================
// GESTIÓN DE MÚSICA
// ============================================
function changeMusic(musicPath) {
  if (!bgMusic || !musicPath) return;
  
  // Fade out suave
  const fadeOutInterval = setInterval(() => {
    if (bgMusic.volume > 0.05) {
      bgMusic.volume = Math.max(0, bgMusic.volume - 0.1);
    } else {
      clearInterval(fadeOutInterval);
      bgMusic.volume = 0;
      
      // Cambiar fuente y reproducir
      bgMusic.src = musicPath;
      bgMusic.load();
      bgMusic.play().catch(err => {
        console.log("Error al reproducir música:", err);
      });
      
      // Fade in suave
      const fadeInInterval = setInterval(() => {
        if (bgMusic.volume < 0.45) {
          bgMusic.volume = Math.min(0.5, bgMusic.volume + 0.1);
        } else {
          bgMusic.volume = 0.5;
          clearInterval(fadeInInterval);
        }
      }, 50);
    }
  }, 50);
}

// ============================================
// INICIO - CLICK EN CORAZÓN
// ============================================
startBtn.addEventListener("click", () => {
  // Reproducir música de fondo (primera canción)
  if (CONFIG.messages[0].musicPath) {
    bgMusic.src = CONFIG.messages[0].musicPath;
  }
  bgMusic.play().catch(err => {
    console.log("Reproducción automática bloqueada:", err);
  });
  
  // Desaparecer pantalla inicial
  startOverlay.classList.add("fade-out");

  // Cambiar fondo a beige
  setTimeout(() => {
    document.body.style.background =
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffd1dc 100%)";
    document.body.style.transition = "background 2s ease-in-out"; // ← Añade esto
  }, 500);

  // Aparecer suelo
  setTimeout(() => {
    groundLine.classList.add("expand-ground");
  }, 500);

  // Crecer el árbol
  setTimeout(() => {
    initTree();
    // Mostrar imagen de amigos con fade in
    if (friendsImage) {
      friendsImage.classList.add("show");
    }
  }, 1000);
});

// ============================================
// INTERACTIVIDAD: MINIMIZAR/MAXIMIZAR MENSAJE
// ============================================
// Hacer clic fuera del mensaje para ver el árbol
document.body.addEventListener("click", (e) => {
  if (!messageContainer.contains(e.target) && messageContainer.classList.contains("visible")) {
    isMessageMinimized = true;
    messageContainer.classList.add("minimized");
  }
});

// Hacer clic en el mensaje para volver a mostrarlo completo
if (messageContainer) {
  messageContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMessageMinimized) {
      isMessageMinimized = false;
      messageContainer.classList.remove("minimized");
    }
  });
}

// ============================================
// LÓGICA DEL ÁRBOL (RECURSIVA CON TRIGONOMETRÍA)
// ============================================
function initTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.opacity = canvasInitialOpacity.toString();
  canvasFadeStart = null;
  requestAnimationFrame(fadeCanvas);
  growBranch(300, 600, 120, -90, 14);
}

function growBranch(x, y, len, angle, width) {
  const endX = x + len * Math.cos((angle * Math.PI) / 180);
  const endY = y + len * Math.sin((angle * Math.PI) / 180);
  const duration = Math.max(200, len * CONFIG.branchDrawSpeed);
  let startTime = null;
  let lastX = x;
  let lastY = y;

  function animateBranch(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentX = x + (endX - x) * progress;
    const currentY = y + (endY - y) * progress;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.stroke();

    lastX = currentX;
    lastY = currentY;

    if (progress < 1) {
      requestAnimationFrame(animateBranch);
      return;
    }

    // Caso base: rama pequeña, terminar y poner corazón
    if (len < 10) {
      createHeartLeaf(endX, endY);
      if (!isTreeBuilt) {
        isTreeBuilt = true;
        setTimeout(startPhaseThree, 3000);
      }
      return;
    }

    // Recursividad: crear 2 sub-ramas
    const angleVar = Math.random() * 20 + 15;
    growBranch(endX, endY, len * 0.75, angle - angleVar, width * 0.7);
    growBranch(endX, endY, len * 0.75, angle + angleVar, width * 0.7);
  }

  requestAnimationFrame(animateBranch);
}

// ============================================
// CREAR HOJAS (CORAZONES)
// ============================================
let leafCounters = { left: 0, center: 0, right: 0 };

function createHeartLeaf(x, y) {
  const icon = document.createElement("i");
  icon.className = "bx bxs-heart leaf-heart";
  icon.style.color =
    CONFIG.heartColors[
      Math.floor(Math.random() * CONFIG.heartColors.length)
    ];
  icon.style.left = x - 300 + "px";
  icon.style.bottom = 600 - y + "px";
  treeWrapper.appendChild(icon);

  // Determinar zona del árbol para patrón balanceado
  const zone = x < 250 ? "left" : x > 350 ? "right" : "center";
  let zoneDelay = 0;

  if (zone === "left") {
    zoneDelay = leafCounters.left * 40;
    leafCounters.left++;
  } else if (zone === "right") {
    zoneDelay = 1500 + leafCounters.right * 40;
    leafCounters.right++;
  } else {
    zoneDelay = 3000 + leafCounters.center * 40;
    leafCounters.center++;
  }

  const randomDelay = Math.random() * 400;
  const totalDelay = zoneDelay + randomDelay;

  setTimeout(() => {
    icon.style.fontSize = Math.random() * 15 + 10 + "px";
  }, totalDelay);
}

// ============================================
// FASE 3: MOVER ÁRBOL Y MOSTRAR TEXTO
// ============================================
function startPhaseThree() {
  if (window.innerWidth > 768) {
    treeWrapper.classList.add("move-right");
  } else {
    treeWrapper.style.transform = "scale(0.6)";
    if (window.innerWidth <= 480) {
      treeWrapper.style.transform = "scale(0.45)";
    }
  }

  setTimeout(() => {
    if (counterTextElement) counterTextElement.classList.add("visible");
    startTimer();

    setTimeout(() => {
      // Ocultar imagen de amigos antes de mostrar el mensaje
      if (friendsImage) {
        friendsImage.classList.remove("show");
        friendsImage.classList.add("hide");
      }
      
      // Mostrar mensaje después de que la imagen desaparezca
      setTimeout(() => {
        if (messageContainer) messageContainer.classList.add("visible");
        updateMessageIndicators(); // Inicializar indicadores
        typeWriterEffect();
        startFallingHearts();
        startBackgroundPetals();
        
        // Ocultar hint automáticamente después de 5 segundos
        setTimeout(() => {
          if (!hasSwipedOnce) {
            const swipeHint = document.getElementById("swipeHint");
            if (swipeHint) {
              swipeHint.style.opacity = "0";
              setTimeout(() => {
                swipeHint.style.display = "none";
              }, 500);
            }
          }
        }, 5000);
      }, 1000); // Esperar 1s para que la imagen desaparezca
    }, 2000); // Reducido de 3000 a 2000 para dar tiempo a la imagen
  }, 2500);
}

// ============================================
// MÁQUINA DE ESCRIBIR
// ============================================
function typeWriterEffect() {
  // Cancelar cualquier timeout previo
  if (typewriterTimeout !== null) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }
  
  const currentMessage = CONFIG.messages[currentMessageIndex];
  let i = 0;
  const speed = 50;
  
  // Limpiar completamente el texto y la firma
  typewriterElement.textContent = "";
  const messageSignature = document.getElementById("messageSignature");
  if (messageSignature) {
    messageSignature.textContent = "";
    messageSignature.style.opacity = "0";
  }
  
  function type() {
    if (i < currentMessage.messageText.length) {
      typewriterElement.textContent += currentMessage.messageText.charAt(i);
      i++;
      typewriterTimeout = setTimeout(type, speed);
    } else {
      typewriterTimeout = setTimeout(() => {
        const messageSignature = document.getElementById("messageSignature");
        if (messageSignature) {
          messageSignature.textContent = currentMessage.signatureText;
          messageSignature.style.opacity = "0";
          messageSignature.style.transition = "opacity 1s ease-in";
          setTimeout(() => {
            messageSignature.style.opacity = "1";
          }, 50);
        }
      }, 500);
    }
  }
  type();
}

// ============================================
// NAVEGACIÓN DE MENSAJES
// ============================================
function updateMessageIndicators() {
  const indicators = document.querySelectorAll(".message-indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentMessageIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Helper: obtener clase de icono según el mensaje actual
function getIconClass() {
  // Si es Roberth (índice 2), usar cerveza; caso contrario, corazón
  return currentMessageIndex === 2 ? "bx bx-beer" : "bx bxs-heart";
}

// Helper: obtener paleta de colores según el mensaje actual
function getIconColors() {
  // Si es Roberth, usar colores de cerveza; caso contrario, colores de corazón
  return currentMessageIndex === 2 ? CONFIG.beerColors : CONFIG.heartColors;
}

// Helper: actualizar las hojas del árbol según el mensaje actual
function updateTreeLeaves() {
  const leaves = document.querySelectorAll(".leaf-heart");
  
  if (currentMessageIndex === 2) {
    // Roberth: cambiar a cervezas con colores amarillos
    leaves.forEach(leaf => {
      leaf.className = "bx bx-beer leaf-heart";
      // Usar color aleatorio de la paleta de cervezas
      leaf.style.color = CONFIG.beerColors[
        Math.floor(Math.random() * CONFIG.beerColors.length)
      ];
    });
  } else {
    // Chunita o Karlita: restaurar corazones con colores originales
    leaves.forEach(leaf => {
      leaf.className = "bx bxs-heart leaf-heart";
      // Restaurar color aleatorio de la paleta
      leaf.style.color = CONFIG.heartColors[
        Math.floor(Math.random() * CONFIG.heartColors.length)
      ];
    });
  }
}

function updateBackground() {
  const scheme = CONFIG.backgroundSchemes[currentMessageIndex];
  if (scheme) {
    document.body.style.background = scheme.gradient;
    document.body.style.transition = "background 1.5s ease-in-out";
  }
}

function changeMessage(direction) {
  if (isAnimatingMessage) return;
  
  const newIndex = currentMessageIndex + direction;
  if (newIndex < 0 || newIndex >= CONFIG.messages.length) return;
  
  // Ocultar hint después del primer swipe
  if (!hasSwipedOnce) {
    const swipeHint = document.getElementById("swipeHint");
    if (swipeHint) {
      swipeHint.style.opacity = "0";
      setTimeout(() => {
        swipeHint.style.display = "none";
      }, 500);
    }
    hasSwipedOnce = true;
  }
  
  isAnimatingMessage = true;
  currentMessageIndex = newIndex;
  
  // Actualizar título con emoji
  const messageTitle = document.getElementById("messageTitle");
  if (messageTitle) {
    messageTitle.innerHTML = `<b>💌 Para ${CONFIG.messages[currentMessageIndex].name}:</b>`;
  }
  
  // Scroll al inicio del mensaje
  if (messageContainer) {
    messageContainer.scrollTop = 0;
  }
  
  // Animar salida y entrada del mensaje
  messageContainer.style.opacity = "0.3";
  messageContainer.style.transform = direction > 0 ? "translateX(-30px)" : "translateX(30px)";
  
  setTimeout(() => {
    typeWriterEffect();
    messageContainer.style.opacity = "1";
    messageContainer.style.transform = "translateX(0)";
    updateMessageIndicators();
    updateBackground(); // Cambiar fondo
    updateTreeLeaves(); // Actualizar hojas del árbol
    
    // Cambiar música si está definida
    const currentMusic = CONFIG.messages[currentMessageIndex].musicPath;
    if (currentMusic) {
      changeMusic(currentMusic);
    }
    
    setTimeout(() => {
      isAnimatingMessage = false;
    }, 300);
  }, 300);
}

function nextMessage() {
  changeMessage(1);
}

function prevMessage() {
  changeMessage(-1);
}

// Ir directamente a un mensaje específico
function goToMessage(index) {
  if (isAnimatingMessage || index === currentMessageIndex) return;
  if (index < 0 || index >= CONFIG.messages.length) return;
  
  // Ocultar hint si es el primer cambio
  if (!hasSwipedOnce) {
    const swipeHint = document.getElementById("swipeHint");
    if (swipeHint) {
      swipeHint.style.opacity = "0";
      setTimeout(() => {
        swipeHint.style.display = "none";
      }, 500);
    }
    hasSwipedOnce = true;
  }
  
  isAnimatingMessage = true;
  const direction = index > currentMessageIndex ? 1 : -1;
  currentMessageIndex = index;
  
  // Actualizar título con emoji
  const messageTitle = document.getElementById("messageTitle");
  if (messageTitle) {
    messageTitle.innerHTML = `<b>💌 Para ${CONFIG.messages[currentMessageIndex].name}:</b>`;
  }
  
  // Scroll al inicio del mensaje
  if (messageContainer) {
    messageContainer.scrollTop = 0;
  }
  
  // Animar salida y entrada del mensaje
  messageContainer.style.opacity = "0.3";
  messageContainer.style.transform = direction > 0 ? "translateX(-30px)" : "translateX(30px)";
  
  setTimeout(() => {
    typeWriterEffect();
    messageContainer.style.opacity = "1";
    messageContainer.style.transform = "translateX(0)";
    updateMessageIndicators();
    updateBackground(); // Cambiar fondo
    updateTreeLeaves(); // Actualizar hojas del árbol
    
    // Cambiar música si está definida
    const currentMusic = CONFIG.messages[currentMessageIndex].musicPath;
    if (currentMusic) {
      changeMusic(currentMusic);
    }
    
    setTimeout(() => {
      isAnimatingMessage = false;
    }, 300);
  }, 300);
}

// Detectar swipe en el contenedor del mensaje
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe izquierda - siguiente mensaje
      nextMessage();
    } else {
      // Swipe derecha - mensaje anterior
      prevMessage();
    }
  }
}

// Agregar eventos de swipe al mensaje
if (messageContainer) {
  messageContainer.addEventListener("touchstart", handleTouchStart, false);
  messageContainer.addEventListener("touchend", handleTouchEnd, false);
  
  // También agregar soporte para mouse drag en desktop
  let mouseDownX = 0;
  let isDragging = false;
  
  messageContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    mouseDownX = e.clientX;
  });
  
  messageContainer.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = mouseDownX - e.clientX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextMessage();
      } else {
        prevMessage();
      }
    }
  });
  
  messageContainer.addEventListener("mouseleave", () => {
    isDragging = false;
  });
}

// ============================================
// CONTADOR DE TIEMPO
// ============================================
function startTimer() {
  // Mostrar símbolo de infinito en lugar del contador
  if (counterNumbersElement) {
    counterNumbersElement.innerHTML = `<b style="font-size: -1rem;">∞</b>`;
  }
  
  /* CÓDIGO ORIGINAL COMENTADO - Descomentar cuando tengas la fecha exacta
  setInterval(() => {
    const now = new Date();
    const diff = now - CONFIG.startDate;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const html = `<b>${d}</b> días <b>${h}</b> horas <b>${m}</b> minutos <b>${s}</b> segundos`;
    if (counterNumbersElement) counterNumbersElement.innerHTML = html;
  }, 1000);
  */
}

// ============================================
// LLUVIA DE CORAZONES/CERVEZAS DEL ÁRBOL
// ============================================
function startFallingHearts() {
  setInterval(() => {
    const heart = document.createElement("i");
    heart.className = getIconClass(); // Usar icono dinámico
    heart.style.position = "absolute";
    const colors = getIconColors(); // Obtener paleta según contexto
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    heart.style.opacity = 0.8;
    // Algunos iconos caen por encima del mensaje para verse en el cuadro blanco
    heart.style.zIndex = Math.random() > 0.5 ? 25 : 4;

    let startX, startY;
    if (window.innerWidth > 768) {
      startX = window.innerWidth / 2 + 250 + (Math.random() * 200 - 100);
      startY = window.innerHeight * 0.35;
    } else if (window.innerWidth > 480) {
      startX = window.innerWidth / 2 + (Math.random() * 120 - 60);
      startY = window.innerHeight - 180 - 200;
    } else {
      startX = window.innerWidth / 2 + (Math.random() * 100 - 50);
      startY = window.innerHeight - 160 - 180;
    }

    heart.style.left = startX + "px";
    heart.style.top = startY + "px";
    document.body.appendChild(heart);

    const duration = Math.random() * 3 + 3;
    const rotations = Math.random() * 3 + 2;
    const rotationDeg = rotations * 360;
    heart.style.transition = `top ${duration}s linear, opacity ${duration}s ease-in, transform ${duration}s ease-in-out`;

    setTimeout(() => {
      heart.style.top = "95%";
      heart.style.opacity = 0;
      heart.style.transform = `rotate(${rotationDeg}deg)`;
    }, 50);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }, 300);
}

// ============================================
// PÉTALOS/CERVEZAS DE FONDO
// ============================================
function startBackgroundPetals() {
  setInterval(() => {
    const petal = document.createElement("i");
    petal.className = getIconClass(); // Usar icono dinámico
    petal.style.position = "absolute";
    const colors = getIconColors(); // Obtener paleta según contexto
    petal.style.color = colors[Math.floor(Math.random() * colors.length)];
    petal.style.fontSize = Math.random() * 12 + 8 + "px";
    petal.style.opacity = 0.25;
    petal.style.zIndex = 1;

    const startX = Math.random() * window.innerWidth;
    const startY = -50;
    petal.style.left = startX + "px";
    petal.style.top = startY + "px";
    document.body.appendChild(petal);

    const duration = Math.random() * 5 + 6;
    const rotations = Math.random() * 2 + 1;
    const rotationDeg = rotations * 360;
    const drift = (Math.random() - 0.5) * 100;

    petal.style.transition = `top ${duration}s linear, left ${duration}s ease-in-out, opacity ${duration}s ease-in, transform ${duration}s ease-in-out`;

    setTimeout(() => {
      petal.style.top = window.innerHeight + 50 + "px";
      petal.style.left = startX + drift + "px";
      petal.style.opacity = 0;
      petal.style.transform = `rotate(${rotationDeg}deg)`;
    }, 50);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);
  }, 300);
}