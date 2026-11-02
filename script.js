/* HORIZON AUDIOVISUAL — simulador de orçamento */

const PRECOS = {
    eventos: { basico: 850, evento: 1800, pro: 2500, porHora: 200, porFoto: 8, porVideo: 25 },
    estudio: { fotoAte99: 15, fotoAte199: 13, foto200Mais: 10, videoPorMinuto: 100 },
    edicao: { fotoPadrao: 4, videoPadrao: 60 },
    adicionais: { dronePorHora: 350, entrevista: 80, animacaoPorMinuto: 150 }
};



const planos = {
    eventos: [
        {
            nome: "Horizon Basic", preco: PRECOS.eventos.basico,
            desc: "Uma cobertura para registrar os momentos essenciais.",
            itens: ["2 horas de cobertura", "50 fotografias", "10 vídeos", "Edição padrão inclusa"]
        },
        {
            nome: "Horizon Event", preco: PRECOS.eventos.evento, destaque: true,
            desc: "Uma cobertura mais ampla para acompanhar os principais momentos.",
            itens: ["4 horas de cobertura", "100 fotografias", "25 vídeos", "Edição padrão inclusa"]
        },
        {
            nome: "Horizon Pro", preco: PRECOS.eventos.pro,
            desc: "Uma produção completa para eventos de maior duração.",
            itens: ["6 horas de cobertura", "150 fotografias", "40 vídeos", "Edição padrão inclusa"]
        }
    ],
    estudio: [
        {
            nome: "Essencial", preco: 300,
            desc: "Uma sessão compacta para registrar seus melhores momentos.",
            itens: ["20 fotografias", "Produção em estúdio", "Edição padrão inclusa"]
        },
        {
            nome: "Destaque", preco: 750, destaque: true,
            desc: "Mais variedade para escolher e aproveitar.",
            itens: ["50 fotografias", "Produção em estúdio", "Edição padrão inclusa"]
        },
        {
            nome: "Completo", preco: 1300,
            desc: "Uma seleção maior de imagens.",
            itens: ["100 fotografias", "Produção em estúdio", "Edição padrão inclusa"]
        },
        {
            nome: "Amplo", preco: 2000,
            desc: "Uma produção com grande quantidade de registros.",
            itens: ["200 fotografias", "Produção em estúdio", "Edição padrão inclusa"]
        },
        {
            nome: "Vídeo em estúdio", preco: PRECOS.estudio.videoPorMinuto, unidade: "por minuto final",
            desc: "Gravação e produção de vídeos no estúdio da Horizon.",
            itens: ["Captação realizada pela Horizon", "O cálculo considera a duração final total"]
        }
    ],
    edicao: [
        {
            nome: "Edição de fotografia", preco: PRECOS.edicao.fotoPadrao, unidade: "por foto",
            desc: "Tratamento e ajustes padrão para suas imagens.",
            itens: ["Edição padrão da Horizon", "R$ 4,00 por fotografia"]
        },
        {
            nome: "Edição de vídeo", preco: PRECOS.edicao.videoPadrao, unidade: "por vídeo",
            desc: "Edição de vídeos que já foram gravados.",
            itens: ["Edição padrão da Horizon", "R$ 60,00 por vídeo, independentemente da duração"]
        },
        {
            nome: "Edição personalizada", precoLabel: "Sob consulta",
            desc: "Um estilo de edição desenvolvido de acordo com sua proposta.",
            itens: ["Estética e referências personalizadas", "Subtotal calculado pelas tarifas padrão", "Acréscimo definido após avaliação da equipe Horizon"]
        }
    ]
};

const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const grid = document.getElementById("plansGrid");

let categoria = "eventos";



function renderPlans(cat) {

    categoria = cat;

    // Nenhum plano começa destacado: o destaque acompanha a escolha do visitante.

    grid.innerHTML = planos[cat].map(p => `<article class="plan" tabindex="0" aria-label="Plano ${p.nome}">

        <span class="plan-badge">${p.destaque ? "RECOMENDADO" : "&nbsp;"}</span>

        <h3>${p.nome}</h3><p class="plan-desc">${p.desc}</p>

        <div class="price">

            ${p.precoLabel || money(p.preco)}

            <small>${p.unidade || "valor do plano"}</small>

        </div>

        <ul class="features">${p.itens.map(i => `<li>${i}</li>`).join("")}</ul><button class="button ghost choose-plan" data-name="${p.nome}" data-price="${p.preco ?? ""}" data-price-label="${p.precoLabel || ""}" type="button">Tenho interesse ↗</button></article>`).join("");

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

    const priceText = b.dataset.price ? money(Number(b.dataset.price)) : (b.dataset.priceLabel || "sob consulta");
    const msg = `Olá, Horizon! Tenho interesse no plano ${b.dataset.name}, anunciado por ${priceText}. Gostaria de receber informações e confirmar os detalhes do orçamento.`;

    window.open("https://wa.me/5585999250500?text=" + encodeURIComponent(msg), "_blank", "noopener");

});



function renderComparison() {

    const ps = planos[categoria];

    let html = "<div class='comparison-scroll'><table class='comparison-table'><tr><th>Característica</th>" + ps.map(p => `<th>${p.nome}</th>`).join("") + "</tr><tr><td>Preço</td>" + ps.map(p => `<td>${p.precoLabel || money(p.preco)}</td>`).join("") + "</tr>";

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
const hoursLabel = hours.closest("label");
const photosLabel = photos.closest("label");
const videosLabel = videos.closest("label");
const details = document.getElementById("estimateDetails");
if (details) details.hidden = true;
const editDescription = document.getElementById("editDescription");

function show(el, visible) {
    if (el) el.hidden = !visible;
}

function syncFields() {
    const isEvent = type.value === "eventos";
    const isStudio = type.value === "estudio";
    const isEditing = type.value === "edicao";
    const isCustom = editStyle.value === "personalizada";

    show(document.getElementById("eventFields"), isEvent);
    show(hoursLabel, isEvent);
    show(photosLabel, true);
    show(videosLabel, true);
    show(document.getElementById("customEditFields"), isCustom);
    show(drone.closest(".optional-service"), isEvent);
    show(interview.closest(".optional-service"), isEvent);
    show(animation.closest(".optional-service"), isEvent);
    show(document.getElementById("droneFields"), isEvent && drone.checked);
    show(document.getElementById("interviewFields"), isEvent && interview.checked);
    show(document.getElementById("animationFields"), isEvent && animation.checked);

    hours.disabled = !isEvent;
    if (!isEvent) hours.value = "0";
    else if (Number(hours.value) < 0) hours.value = "0";

    drone.disabled = !isEvent;
    interview.disabled = !isEvent;
    animation.disabled = !isEvent;
    if (!isEvent) {
        drone.checked = false;
        interview.checked = false;
        animation.checked = false;
    }

    document.getElementById("interviewCount").required = isEvent && interview.checked;
    document.getElementById("animationMinutes").required = isEvent && animation.checked;
    editDescription.required = isCustom;

    const videoLabel = videosLabel.querySelector("span") || videosLabel.firstChild;
    if (isStudio) {
        if (videoLabel.nodeType === Node.TEXT_NODE) videoLabel.textContent = "Duração total dos vídeos finais (minutos)";
        else videoLabel.textContent = "Duração total dos vídeos finais (minutos)";
        videos.max = "300";
        videos.step = "1";
    } else {
        if (videoLabel.nodeType === Node.TEXT_NODE) videoLabel.textContent = "Quantidade de vídeos";
        else videoLabel.textContent = "Quantidade de vídeos";
        videos.max = "100";
        videos.step = "1";
        if (Number(videos.value) > 100) videos.value = "100";
    }

    document.getElementById("photoEditLabel").hidden = false;
    calc();
}

function calc() {
    const isEvent = type.value === "eventos";
    const isStudio = type.value === "estudio";
    const isEditing = type.value === "edicao";
    const isCustom = editStyle.value === "personalizada";
    const hr = isEvent ? Number(hours.value) || 0 : 0;
    const ph = Number(photos.value) || 0;
    const vi = Number(videos.value) || 0;
    let base = 0;
    let addOnsTotal = 0;
    let discount = 0;
    const addonLines = [];

    if (isEvent) {
        const eventPlans = [
            { hours: 2, photos: 50, videos: 10, price: PRECOS.eventos.basico, name: "Horizon Basic" },
            { hours: 4, photos: 100, videos: 25, price: PRECOS.eventos.evento, name: "Horizon Event" },
            { hours: 6, photos: 150, videos: 40, price: PRECOS.eventos.pro, name: "Horizon Pro" }
        ];
        const match = eventPlans.find(p => p.hours === hr && p.photos === ph && p.videos === vi);
        const calculated = hr * PRECOS.eventos.porHora + ph * PRECOS.eventos.porFoto + vi * PRECOS.eventos.porVideo;
        base = match ? match.price : calculated;
        discount = match ? calculated - match.price : 0;
        if (match) addonLines.push(`Plano aplicado: ${match.name}`);
        else addonLines.push(`Cobertura: ${hr} hora(s) × ${money(PRECOS.eventos.porHora)} = ${money(hr * PRECOS.eventos.porHora)}`,
            `Fotos: ${ph} × ${money(PRECOS.eventos.porFoto)} = ${money(ph * PRECOS.eventos.porFoto)}`,
            `Vídeos: ${vi} × ${money(PRECOS.eventos.porVideo)} = ${money(vi * PRECOS.eventos.porVideo)}`);
        if (discount > 0) addonLines.push(`Desconto aplicado ao plano: −${money(discount)}`);
        if (drone.checked) {
            const v = Number(document.getElementById("droneHours").value) * PRECOS.adicionais.dronePorHora;
            addOnsTotal += v; addonLines.push(`Drone: ${money(v)}`);
        }
        if (interview.checked) {
            const v = Number(document.getElementById("interviewCount").value) * PRECOS.adicionais.entrevista;
            addOnsTotal += v; addonLines.push(`Entrevistas: ${money(v)}`);
        }
        if (animation.checked) {
            const v = Number(document.getElementById("animationMinutes").value) * PRECOS.adicionais.animacaoPorMinuto;
            addOnsTotal += v; addonLines.push(`Animação: ${money(v)}`);
        }
    }

    if (isStudio) {
        let photoRate = 0;
        if (ph > 0 && ph < 100) photoRate = PRECOS.estudio.fotoAte99;
        else if (ph >= 100 && ph < 200) photoRate = PRECOS.estudio.fotoAte199;
        else if (ph >= 200) photoRate = PRECOS.estudio.foto200Mais;
        const photoTotal = ph * photoRate;
        const videoTotal = vi * PRECOS.estudio.videoPorMinuto;
        base = photoTotal + videoTotal;
        if (ph > 0) addonLines.push(`Fotografias em estúdio: ${ph} × ${money(photoRate)} = ${money(photoTotal)}`);
        if (vi > 0) addonLines.push(`Vídeo em estúdio: ${vi} minuto(s) final(is) × ${money(PRECOS.estudio.videoPorMinuto)} = ${money(videoTotal)}`);
    }

    if (isEditing) {
        const photoTotal = ph * PRECOS.edicao.fotoPadrao;
        const videoTotal = vi * PRECOS.edicao.videoPadrao;
        base = photoTotal + videoTotal;
        if (ph > 0) addonLines.push(`Edição de fotos: ${ph} × ${money(PRECOS.edicao.fotoPadrao)} = ${money(photoTotal)}`);
        if (vi > 0) addonLines.push(`Edição de vídeos já gravados: ${vi} × ${money(PRECOS.edicao.videoPadrao)} = ${money(videoTotal)}`);
    }

    const finalTotal = base + addOnsTotal;
    total.textContent = isCustom ? `A partir de ${money(finalTotal)}` : money(finalTotal);
    const lines = [
        isEvent ? "Serviço: Cobertura de evento" : isStudio ? "Serviço: Estúdio" : "Serviço: Edição sem captação",
        ...(isEvent ? [`Horas de cobertura: ${hr}`, `Quantidade de fotos: ${ph}`, `Quantidade de vídeos: ${vi}`] : []),
        ...(isStudio ? [`Quantidade de fotos: ${ph}`, `Minutos finais de vídeo: ${vi}`] : []),
        ...(isEditing ? [`Fotos para edição: ${ph}`, `Vídeos já gravados para edição: ${vi}`] : []),
        ...addonLines,
        `Subtotal do serviço: ${money(base)}`,
        ...(isEvent && addOnsTotal > 0 ? [`Total dos adicionais: ${money(addOnsTotal)}`] : []),
        `Total ${isCustom ? "de referência" : "estimado"}: ${money(finalTotal)}`
    ];
    if (isCustom) lines.push("Edição personalizada: o subtotal considera as tarifas padrão. O acréscimo será definido após avaliação da equipe Horizon.");
    else if (isEvent) lines.push("O deslocamento, se houver, será confirmado pela equipe Horizon.");
    if (details) { details.textContent = lines.join(" | "); details.hidden = true; }
    return finalTotal;
}

const eventAndBudgetInputs = [type, hours, photos, videos, drone, animation, interview, editStyle,
    document.getElementById("droneHours"), document.getElementById("interviewCount"),
    document.getElementById("animationMinutes"), editDescription];
eventAndBudgetInputs.forEach(el => {
    el.addEventListener("input", () => { syncFields(); calc(); });
    el.addEventListener("change", () => { normalizeNumericInputs(); syncFields(); calc(); });
});

const numericLimits = [
    { el: hours, min: 0, max: 8 },
    { el: photos, min: 0, max: 300 },
    { el: videos, min: 0, max: 300 },
    { el: document.getElementById("droneHours"), min: 1, max: 8 },
    { el: document.getElementById("interviewCount"), min: 0, max: 50 },
    { el: document.getElementById("animationMinutes"), min: 0, max: 10 }
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

[hours, photos, videos, document.getElementById("interviewCount"), document.getElementById("animationMinutes")]
    .forEach(el => el.addEventListener("blur", () => { normalizeNumericInputs(); calc(); }));

syncFields();

document.getElementById("budgetForm").addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.id !== "requestWhatsApp") e.preventDefault();
});

document.getElementById("requestWhatsApp").addEventListener("click", () => {
    normalizeNumericInputs();
    syncFields();
    const form = document.getElementById("budgetForm");
    if (!form.reportValidity()) return;
    const value = calc();
    const labels = { eventos: "Cobertura de evento", estudio: "Estúdio (captação e produção)", edicao: "Edição sem captação" };
    const isEvent = type.value === "eventos";
    const isStudio = type.value === "estudio";
    const isCustom = editStyle.value === "personalizada";
    const msg = `Olá, Horizon! Gostaria de solicitar um orçamento.\n` +
        `Tipo: ${labels[type.value]}\n` +
        (isEvent ? `Evento: ${document.getElementById("eventKind").value}\nLocal: ${document.getElementById("eventLocation").value || "não informado"}\nHoras de cobertura: ${hours.value}\n` : "") +
        (isStudio ? `Fotos em estúdio: ${photos.value}\nDuração total final dos vídeos: ${videos.value} minuto(s)\n` : "") +
        (isEvent ? `Fotos: ${photos.value}\nVídeos: ${videos.value}\n` : "") +
        (type.value === "edicao" ? `Fotos para edição: ${photos.value}\nVídeos já gravados para edição: ${videos.value}\n` : "") +
        `Edição: ${isCustom ? "personalizada" : "padrão"}\n` +
        (isCustom ? `Descrição da edição: ${editDescription.value || "a combinar"}\nAcréscimo da edição personalizada: sob avaliação da equipe Horizon\n` : "") +
        `Drone: ${isEvent && drone.checked ? document.getElementById("droneHours").value + " hora(s)" : "não"}\n` +
        `Entrevistas: ${isEvent && interview.checked ? document.getElementById("interviewCount").value : "não"}\n` +
        `Animação: ${isEvent && animation.checked ? document.getElementById("animationMinutes").value + " minuto(s)" : "não"}\n` +
        `${isCustom ? "Subtotal de referência" : "Estimativa"}: ${money(value)}\n` +
        (isCustom ? "O valor final terá acréscimo pela edição personalizada, definido após análise da equipe Horizon." : "Gostaria de confirmar os detalhes e eventual custo de deslocamento com a equipe.");
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
