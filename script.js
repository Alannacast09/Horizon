/*
 * HORIZON AUDIOVISUAL — simulador demonstrativo
 * Os valores abaixo são fictícios para testar o funcionamento do site.
 * Altere-os no objeto PRECOS quando quiser testar outros cenários.
 */
const PRECOS = {
    eventos: { basico: 350, evento: 600, pro: 900, premium: 1200, porHora: 100, base: 150 },
    estudio: { fotos20: 150, fotos50: 300, fotos100: 500, fotos200: 850, videos10: 220, videos25: 450, videos50: 800 },
    edicao: { simples: 100, personalizada: 180, restauracao: 35, compilado: 250 },
    adicionais: {
        dronePorHora: 300,
        entrevista: 50,
        animacaoPorMinuto: 120,
        fotoEvento: 2,
        videoEvento: 7,
        fotoEdicaoPersonalizada: 3,
        videoEdicaoPersonalizada: 20,
        fotografoPorHora: 50,
        videomakerPorHora: 60
    }
};

const planos = {
    eventos: [
        { nome: "Básico", preco: PRECOS.eventos.basico, desc: "Para registrar os momentos essenciais.", itens: ["2 horas de cobertura", "50 fotografias", "10 vídeos", "Momentos essenciais"] },
        { nome: "Evento", preco: PRECOS.eventos.evento, destaque: true, desc: "Uma cobertura equilibrada.", itens: ["4 horas de cobertura", "100 fotografias", "25 vídeos", "Momentos principais"] },
        { nome: "Pro", preco: PRECOS.eventos.pro, desc: "Para eventos com mais detalhes.", itens: ["6 horas de cobertura", "150 fotografias", "40 vídeos", "Cobertura ampliada"] },
        { nome: "Premium", preco: PRECOS.eventos.premium, desc: "Cobertura mais completa.", itens: ["8 horas de cobertura", "200 fotografias", "55 vídeos", "Registro prolongado"] }
    ],
    estudio: [
        { nome: "Essencial", preco: PRECOS.estudio.fotos20, desc: "Uma sessão compacta.", itens: ["20 fotografias", "Produção em estúdio", "Seleção de imagens"] },
        { nome: "Destaque", preco: PRECOS.estudio.fotos50, destaque: true, desc: "Mais variedade para escolher.", itens: ["50 fotografias", "Produção em estúdio", "Direção durante a sessão"] },
        { nome: "Completo", preco: PRECOS.estudio.fotos100, desc: "Para projetos com mais imagens.", itens: ["100 fotografias", "Produção em estúdio", "Seleção de imagens"] },
        { nome: "Amplo", preco: PRECOS.estudio.fotos200, desc: "Grande variedade de registros.", itens: ["200 fotografias", "Produção em estúdio", "Direção durante a sessão"] }
    ],
    edicao: [
        { nome: "Edição essencial", preco: PRECOS.edicao.simples, desc: "Ajustes para seus materiais.", itens: ["Materiais enviados pelo cliente", "Sem captação", "Escopo alinhado previamente"] },
        { nome: "Edição personalizada", preco: PRECOS.edicao.personalizada, destaque: true, desc: "Estilo visual alinhado à sua ideia.", itens: ["Propostas retrô e vintage", "Sem captação", "Estilo combinado com o cliente"] },
        { nome: "Restauração", preco: PRECOS.edicao.restauracao, desc: "Para recuperar uma lembrança.", itens: ["Restauração digital", "Preço ilustrativo por foto", "Avaliação da imagem original"] },
        { nome: "Vídeo compilado", preco: PRECOS.edicao.compilado, desc: "Um vídeo a partir de vários registros.", itens: ["Materiais enviados pelo cliente", "Montagem em sequência", "Edição audiovisual"] }
    ]
};

const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const grid = document.getElementById("plansGrid");
let categoria = "eventos";

function renderPlans(cat) {
    categoria = cat;
    // Nenhum plano começa destacado: o destaque acompanha a escolha do visitante.
    grid.innerHTML = planos[cat].map(p => `<article class="plan" tabindex="0" aria-label="Plano ${p.nome}"><span class="plan-badge">${p.destaque ? "RECOMENDADO" : "&nbsp;"}</span><h3>${p.nome}</h3><p class="plan-desc">${p.desc}</p><div class="price">${money(p.preco)}<small>valor demonstrativo</small></div><ul class="features">${p.itens.map(i => `<li>${i}</li>`).join("")}</ul><button class="button ghost choose-plan" data-name="${p.nome}" data-price="${p.preco}" type="button">Tenho interesse ↗</button></article>`).join("");
    document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.category === cat));
}
renderPlans(categoria);
document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => renderPlans(b.dataset.category)));

// A cor laranja acompanha o cartão escolhido pelo visitante.
function selectPlan(card) {
    if (!card) return;
    grid.querySelectorAll(".plan").forEach(item => {
        const selected = item === card;
        item.classList.toggle("featured", selected);
        item.setAttribute("aria-pressed", String(selected));
        const button = item.querySelector(".choose-plan");
        if (button) {
            button.classList.toggle("orange", selected);
            button.classList.toggle("ghost", !selected);
        }
    });
}
grid.addEventListener("click", e => {
    const card = e.target.closest(".plan");
    if (card) selectPlan(card);
});
grid.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("plan")) {
        e.preventDefault();
        selectPlan(e.target);
    }
});

document.addEventListener("click", e => {
    const b = e.target.closest(".choose-plan");
    if (!b) return;
    const msg = `Olá, Horizon! Tenho interesse no plano ${b.dataset.name}, com valor demonstrativo de ${money(Number(b.dataset.price))}. Gostaria de receber informações e um orçamento.`;
    window.open("https://wa.me/5585999250500?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

function renderComparison() {
    const ps = planos[categoria];
    let html = "<div class='comparison-scroll'><table class='comparison-table'><tr><th>Característica</th>" + ps.map(p => `<th>${p.nome}</th>`).join("") + "</tr><tr><td>Preço ilustrativo</td>" + ps.map(p => `<td>${money(p.preco)}</td>`).join("") + "</tr>";
    const max = Math.max(...ps.map(p => p.itens.length));
    for (let i = 0; i < max; i++) html += "<tr><td>Incluído</td>" + ps.map(p => `<td>${p.itens[i] || "—"}</td>`).join("") + "</tr>";
    document.getElementById("compareHolder").innerHTML = html + "</table></div>";
}
document.getElementById("compareToggle").addEventListener("click", e => {
    const holder = document.getElementById("compareHolder");
    const open = holder.hidden;
    holder.hidden = !open;
    e.currentTarget.querySelector("span").textContent = open ? "−" : "＋";
    if (open) renderComparison();
});

// Campos do orçamento personalizado
const type = document.getElementById("budgetType");
const hours = document.getElementById("hours");
const photos = document.getElementById("photos");
const videos = document.getElementById("videos");
const drone = document.getElementById("drone");
const animation = document.getElementById("animation");
const interview = document.getElementById("interview");
const editStyle = document.getElementById("editStyle");
const total = document.getElementById("total");

function show(el, visible) { el.hidden = !visible; }
function syncFields() {
    const isEvent = type.value === "eventos";
    const isStudio = type.value === "estudio";
    const isEditing = type.value === "edicao";
    show(document.getElementById("eventFields"), isEvent);
    show(document.getElementById("teamFields"), isEvent);
    show(document.getElementById("hoursAndPhotos"), true);
    hours.disabled = !isEvent;
    if (!isEvent) hours.value = "0";
    if (isEvent && Number(hours.value) < 1) hours.value = "1";
    drone.disabled = !isEvent;
    interview.disabled = !isEvent;
    animation.disabled = !isEvent;
    if (!isEvent) { drone.checked = false; interview.checked = false; animation.checked = false; }
    show(document.getElementById("droneFields"), isEvent && drone.checked);
    show(document.getElementById("interviewFields"), isEvent && interview.checked);
    show(document.getElementById("animationFields"), isEvent && animation.checked);
    document.getElementById("interviewCount").required = isEvent && interview.checked;
    document.getElementById("animationMinutes").required = isEvent && animation.checked;
    show(document.getElementById("customEditFields"), editStyle.value === "personalizada" && !isEditing);
    document.getElementById("photoEditLabel").hidden = false;
    if (isEditing) {
        // Na categoria edição, a seleção descreve o estilo do trabalho enviado pelo cliente.
        show(document.getElementById("customEditFields"), editStyle.value === "personalizada");
    }
    calc();
}

function calc() {
    const hr = Number(hours.value);
    const ph = Number(photos.value);
    const vi = Number(videos.value);
    let t = 0;
    const isEvent = type.value === "eventos";
    const isStudio = type.value === "estudio";
    const isEditing = type.value === "edicao";

    if (isEvent) {
        // A base representa estrutura inicial; equipe e entregas são somadas separadamente neste teste.
        t = hr > 0 ? PRECOS.eventos.base + hr * PRECOS.eventos.porHora : 0;
        t += ph * PRECOS.adicionais.fotoEvento + vi * PRECOS.adicionais.videoEvento;
        t += Number(document.getElementById("photographers").value) * hr * PRECOS.adicionais.fotografoPorHora;
        t += Number(document.getElementById("videographers").value) * hr * PRECOS.adicionais.videomakerPorHora;
        if (editStyle.value === "personalizada") t += ph * PRECOS.adicionais.fotoEdicaoPersonalizada + vi * PRECOS.adicionais.videoEdicaoPersonalizada;
        if (drone.checked) t += Number(document.getElementById("droneHours").value) * PRECOS.adicionais.dronePorHora;
        if (interview.checked) t += Number(document.getElementById("interviewCount").value) * PRECOS.adicionais.entrevista;
        if (animation.checked) t += Number(document.getElementById("animationMinutes").value) * PRECOS.adicionais.animacaoPorMinuto;
    }
    if (isStudio) {
        const precoPorFaixa = (qtd, faixas) => {
            if (qtd <= 0) return 0;
            const faixa = faixas.find(f => qtd <= f.limite);
            return qtd * (faixa || faixas[faixas.length - 1]).precoUnitario;
        };
        const precoFotos = [
            { limite: 20, precoUnitario: PRECOS.estudio.fotos20 / 20 },
            { limite: 50, precoUnitario: PRECOS.estudio.fotos50 / 50 },
            { limite: 100, precoUnitario: PRECOS.estudio.fotos100 / 100 },
            { limite: 200, precoUnitario: PRECOS.estudio.fotos200 / 200 }
        ];
        const precoVideos = [
            { limite: 10, precoUnitario: PRECOS.estudio.videos10 / 10 },
            { limite: 25, precoUnitario: PRECOS.estudio.videos25 / 25 },
            { limite: 50, precoUnitario: PRECOS.estudio.videos50 / 50 }
        ];
        t = precoPorFaixa(ph, precoFotos) + precoPorFaixa(vi, precoVideos);
        if (editStyle.value === "personalizada") {
            t += ph * PRECOS.adicionais.fotoEdicaoPersonalizada + vi * PRECOS.adicionais.videoEdicaoPersonalizada;
        }
    }
    if (isEditing) {
        t = ph * 2 + vi * 12;
        if (editStyle.value === "personalizada") t += ph * PRECOS.adicionais.fotoEdicaoPersonalizada + vi * PRECOS.adicionais.videoEdicaoPersonalizada;
        if (t === 0) t = editStyle.value === "personalizada" ? PRECOS.edicao.personalizada : PRECOS.edicao.simples;
    }
    total.textContent = money(t);
    const details = document.getElementById("estimateDetails");
    details.textContent = isEvent
        ? "Estimativa demonstrativa, já incluindo a equipe selecionada e os adicionais marcados. O deslocamento não está incluído e será confirmado pela equipe."
        : "Estimativa demonstrativa; confirme com a equipe os materiais, o escopo e o valor final.";
    return t;
}

[type, hours, photos, videos, drone, animation, interview, editStyle,
 document.getElementById("photographers"), document.getElementById("videographers"),
 document.getElementById("droneHours"),
 document.getElementById("interviewCount"), document.getElementById("animationMinutes")]
    .forEach(el => el.addEventListener("change", () => {
        normalizeNumericInputs();
        syncFields();
    }));

const numericLimits = [
    { el: hours, min: 1, max: 8 },
    { el: photos, min: 0, max: 300 },
    { el: videos, min: 0, max: 100 },
    { el: document.getElementById("droneHours"), min: 1, max: 8 },
    { el: document.getElementById("interviewCount"), min: 1, max: 50 },
    { el: document.getElementById("animationMinutes"), min: 1, max: 10 }
];

function normalizeNumericInputs() {
    numericLimits.forEach(({ el, min, max }) => {
        if (!el || el.disabled || el.value === "") return;
        let value = Number(el.value);
        if (!Number.isFinite(value)) value = min;
        value = Math.max(min, Math.min(max, Math.round(value)));
        el.value = String(value);
    });
}

// Atualiza a estimativa enquanto a pessoa digita, sem precisar apertar Enter.
[hours, photos, videos, document.getElementById("interviewCount"), document.getElementById("animationMinutes")]
    .forEach(el => el.addEventListener("input", calc));
[hours, photos, videos, document.getElementById("interviewCount"), document.getElementById("animationMinutes")]
    .forEach(el => el.addEventListener("blur", () => { normalizeNumericInputs(); calc(); }));

syncFields();

// Enter nos campos não envia o formulário; só o botão abre o WhatsApp.
document.getElementById("budgetForm").addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.id !== "requestWhatsApp") {
        e.preventDefault();
    }
});

document.getElementById("requestWhatsApp").addEventListener("click", () => {
    normalizeNumericInputs();
    syncFields();
    const form = document.getElementById("budgetForm");
    if (!form.reportValidity()) return;
    const value = calc();
    const labels = { eventos: "Cobertura de evento", estudio: "Estúdio", edicao: "Edição sem captação" };
    const isEvent = type.value === "eventos";
    const msg = `Olá, Horizon! Gostaria de solicitar um orçamento personalizado.\n` +
        `Tipo: ${labels[type.value]}\n` +
        (isEvent ? `Evento: ${document.getElementById("eventKind").value}\nLocal informado: ${document.getElementById("eventLocation").value || "não informado"}\n` : "") +
        `Horas de cobertura: ${isEvent ? hours.value : "não se aplica"}\n` +
        `Fotógrafos: ${isEvent ? document.getElementById("photographers").value : "não se aplica"}\n` +
        `Videomakers: ${isEvent ? document.getElementById("videographers").value : "não se aplica"}\n` +
        `Fotos: ${photos.value}\nVídeos: ${videos.value}\n` +
        `Edição: ${editStyle.value === "personalizada" ? "personalizada" : "padrão"}\n` +
        (editStyle.value === "personalizada" ? `Descrição da edição: ${document.getElementById("editDescription").value || "a combinar"}\n` : "") +
        `Drone: ${isEvent && drone.checked ? `sim, ${document.getElementById("droneHours").value} hora(s) de captação` : "não"}\n` +
        `Entrevistas: ${isEvent && interview.checked ? document.getElementById("interviewCount").value : "não"}\n` +
        `Animação: ${isEvent && animation.checked ? document.getElementById("animationMinutes").value + " minuto(s)" : "não"}\n` +
        `Estimativa ilustrativa: ${money(value)}\n` +
        `Se houver deslocamento, gostaria de confirmar o valor com a equipe. Os valores são demonstrativos e não oficiais.`;
    window.open("https://wa.me/5585999250500?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();


const galerias = {
    gincalculando: {
        titulo: "Gincalculando",
        pasta: "imagens/portfolio/gincalculando/",
        fotos: [
            "foto-01.jpg",
            "foto-02.jpg",
            "foto-03.jpg",
            "foto-04.jpg",
            "foto-05.jpg",
            "foto-06.jpg"
        ]
    },

    desfile: {
        titulo: "Desfile Cívico",
        pasta: "imagens/portfolio/desfile-civico/",
        fotos: [
            "foto-01.jpg",
            "foto-02.jpg",
            "foto-03.jpg",
            "foto-04.jpg",
            "foto-05.jpg",
            "foto-06.jpg"
        ]
    },

    saojoao: {
        titulo: "São João",
        pasta: "imagens/portfolio/sao-joao/",
        fotos: [
            "foto-01.jpg",
            "foto-02.jpg",
            "foto-03.jpg",
            "foto-04.jpg",
            "foto-05.jpg",
            "foto-06.jpg"
        ]
    }
};

let galeriaAtual = null;
let indiceFotoAtual = 0;

function abrirGaleria(evento) {
    galeriaAtual = galerias[evento];

    if (!galeriaAtual) return;

    document.getElementById("galleryTitle").textContent =
        galeriaAtual.titulo;

    const grade = document.getElementById("galleryGrid");
    grade.innerHTML = "";

    galeriaAtual.fotos.forEach((arquivo, indice) => {
        const img = document.createElement("img");

        img.src = galeriaAtual.pasta + arquivo;
        img.alt = `${galeriaAtual.titulo} — foto ${indice + 1}`;
        img.loading = "lazy";
        img.tabIndex = 0;

        img.addEventListener("click", () => ampliarFoto(indice));
        img.addEventListener("keydown", (event) => {
            if (event.key === "Enter") ampliarFoto(indice);
        });

        grade.appendChild(img);
    });

    const modal = document.getElementById("galleryModal");
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function fecharGaleria() {
    const modal = document.getElementById("galleryModal");
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function ampliarFoto(indice) {
    indiceFotoAtual = indice;
    atualizarFoto();

    const viewer = document.getElementById("photoViewer");
    viewer.classList.add("active");
    viewer.setAttribute("aria-hidden", "false");
}

function atualizarFoto() {
    const arquivo = galeriaAtual.fotos[indiceFotoAtual];

    document.getElementById("expandedPhoto").src =
        galeriaAtual.pasta + arquivo;

    document.getElementById("photoCounter").textContent =
        `${indiceFotoAtual + 1} / ${galeriaAtual.fotos.length}`;
}

function mudarFoto(direcao) {
    if (!galeriaAtual) return;

    const total = galeriaAtual.fotos.length;
    indiceFotoAtual = (indiceFotoAtual + direcao + total) % total;

    atualizarFoto();
}

function fecharFoto() {
    const viewer = document.getElementById("photoViewer");
    viewer.classList.remove("active");
    viewer.setAttribute("aria-hidden", "true");
}

document.getElementById("galleryModal")
    .addEventListener("click", (event) => {
        if (event.target.id === "galleryModal") fecharGaleria();
    });

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const viewer = document.getElementById("photoViewer");

        if (viewer.classList.contains("active")) {
            fecharFoto();
        } else {
            fecharGaleria();
        }
    }

    if (document.getElementById("photoViewer")
        .classList.contains("active")) {
        if (event.key === "ArrowRight") mudarFoto(1);
        if (event.key === "ArrowLeft") mudarFoto(-1);
    }
});
