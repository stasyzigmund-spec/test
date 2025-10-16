(async function () {
  const elCats = document.getElementById('cats');
  const sphere = document.getElementById('sphere');
  const chips = document.getElementById('chips');
  const desc = document.getElementById('desc');
  const buildBtn = document.getElementById('buildBtn');
  const clearBtn = document.getElementById('clearBtn');
  const shareBtn = document.getElementById('shareBtn');
  const resetLink = document.getElementById('resetLink');
  const toast = document.getElementById('toast');

  let data;
  
  data = {
  "categories": [
    {
      "id": "base",
      "title": "Основа",
      "items": [
        { "id": "cosmos", "name": "Космос", "emoji": "🪐", "color": "#7b5cff", "desc": "Чуть звёздной пыли в каждом движении." },
        { "id": "ocean", "name": "Океан", "emoji": "🌊", "color": "#00b3ff", "desc": "Пульсирует, как приливы." },
        { "id": "city", "name": "Город", "emoji": "🌆", "color": "#ff8b3d", "desc": "Неон и трамвайные искры." },
        { "id": "desert", "name": "Пустыня", "emoji": "🏜️", "color": "#f9b24e", "desc": "Греет, но не обжигает." },
        { "id": "forest", "name": "Лес", "emoji": "🌲", "color": "#2ecc71", "desc": "Шуршит иголками и мхом." }
      ]
    },
    {
      "id": "mood",
      "title": "Настроение",
      "items": [
        { "id": "cozy", "name": "Уют", "emoji": "🕯️", "color": "#ffb7c5", "desc": "Мягкое свечение пледа." },
        { "id": "hype", "name": "Хайп", "emoji": "⚡", "color": "#ffd400", "desc": "Искрит на поворотах." },
        { "id": "zen", "name": "Зен", "emoji": "🧘‍♀️", "color": "#8bd3dd", "desc": "Дышит ровно, без лишних слов." },
        { "id": "spooky", "name": "Жуть", "emoji": "🕸️", "color": "#6f7a8a", "desc": "Лёгкая дымка тайн." },
        { "id": "romantic", "name": "Романтик", "emoji": "💌", "color": "#ff6fa3", "desc": "Сердце на перчатке." }
      ]
    },
    {
      "id": "color",
      "title": "Цвет",
      "items": [
        { "id": "neon", "name": "Неон", "emoji": "🌈", "color": "#00ffcc", "desc": "Свечение витрин 24/7." },
        { "id": "pink", "name": "Розовый", "emoji": "🩷", "color": "#ff69b4", "desc": "Сахарная вата и фанк." },
        { "id": "gold", "name": "Золото", "emoji": "🥇", "color": "#ffcd3c", "desc": "Блестит, но без пафоса." },
        { "id": "black", "name": "Черный", "emoji": "⚫", "color": "#1c2230", "desc": "Глубина, где слышно эхо." },
        { "id": "cyan", "name": "Сине-зелёный", "emoji": "🔵", "color": "#16ffe2", "desc": "Бриз из будущего." }
      ]
    },
    {
      "id": "sound",
      "title": "Саунд",
      "items": [
        { "id": "synth", "name": "Синт", "emoji": "🎹", "color": "#a18fff", "desc": "Пластик и космос — лучший микс." },
        { "id": "lofi", "name": "Lo‑fi", "emoji": "🎧", "color": "#a0b9cc", "desc": "Хрустит, как винил." },
        { "id": "rock", "name": "Рок", "emoji": "🎸", "color": "#ff6258", "desc": "Искры с медиатора." },
        { "id": "chip", "name": "8‑бит", "emoji": "🕹️", "color": "#61dafb", "desc": "Пиксельный сахар." },
        { "id": "ambient", "name": "Эмбиент", "emoji": "🌫️", "color": "#8aa0b3", "desc": "Плывёт за горизонтом." }
      ]
    },
    {
      "id": "wild",
      "title": "Дичь",
      "items": [
        { "id": "cat", "name": "Кот", "emoji": "🐈", "color": "#ffb86b", "desc": "Мяукнет — и станет лучше." },
        { "id": "duck", "name": "Утка", "emoji": "🦆", "color": "#31d27c", "desc": "Кряк — и весь мир в такт." },
        { "id": "potato", "name": "Картофель", "emoji": "🥔", "color": "#d4a373", "desc": "Заземляет любой полёт." },
        { "id": "clown", "name": "Клоун", "emoji": "🤡", "color": "#ff4da6", "desc": "Когда слишком серьёзно — смешно." },
        { "id": "glitch", "name": "Глитч", "emoji": "🪞", "color": "#b388ff", "desc": "Пиксели рассыпаются как конфетти." }
      ]
    }
  ]
}

  const byId = new Map();
  data.categories.forEach(cat => cat.items.forEach(it => { byId.set(it.id, { ...it, cat: cat.title }); }));

  const selected = new Set();

  // URL → предвыбор
  const params = new URLSearchParams(location.search);
  const pre = (params.get('s') || '').split(',').map(s => s.trim()).filter(Boolean);
  pre.forEach(id => { if (byId.has(id)) selected.add(id); });

  // Рендер категорий
  function renderCats() {
    elCats.innerHTML = '';
    data.categories.forEach(cat => {
      const wrap = document.createElement('div');
      wrap.className = 'cat';
      const h = document.createElement('h3');
      h.innerHTML = ` ${cat.title}`;
      wrap.appendChild(h);

      const list = document.createElement('div');
      list.className = 'items';

      cat.items.forEach(it => {
        const btn = document.createElement('button');
        btn.className = 'item';
        btn.setAttribute('type', 'button');
        btn.dataset.id = it.id;
        btn.innerHTML = `<span class="emo">${it.emoji}</span> <span>${it.name}</span>`;
        if (selected.has(it.id)) btn.classList.add('selected');
        btn.addEventListener('click', () => {
          if (selected.has(it.id)) {
            selected.delete(it.id);
            btn.classList.remove('selected');
          } else {
            if (selected.size >= 12) {
              showToast('Максимум 12 элементов');
              return;
            }
            selected.add(it.id);
            btn.classList.add('selected');
          }
        });
        list.appendChild(btn);
      });

      wrap.appendChild(list);
      elCats.appendChild(wrap);
    });
  }

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1400);
  }

  function buildGradientFromSelection() {
    if (selected.size === 0) {
      return 'conic-gradient(from 0deg, #243244, #243244 100%)';
    }
    const col = [];
    selected.forEach(id => {
      const it = byId.get(id);
      if (it && it.color) col.push(it.color);
    });
    if (col.length === 0) col.push('#7b5cff', '#00e5ff', '#ff8bd1');

    // Перемешаем, чтобы распределить красивые переходы
    for (let i = col.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [col[i], col[j]] = [col[j], col[i]];
    }
    const step = 100 / col.length;
    let stops = [];
    for (let i = 0; i < col.length; i++) {
      const start = (i * step).toFixed(2) + '%';
      const end = ((i + 1) * step).toFixed(2) + '%';
      stops.push(`${col[i]} ${start} ${end}`);
    }
    return `conic-gradient(from ${Math.floor(Math.random()*360)}deg, ${stops.join(', ')})`;
  }

  function updateChipsAndDesc() {
    chips.innerHTML = '';
    if (selected.size === 0) {
      desc.textContent = 'Пока пусто. Выбери элементы слева и нажми «Собрать сферу».';
      return;
    }
    const chosen = Array.from(selected).map(id => byId.get(id)).filter(Boolean);

    chosen.forEach(it => {
      const c = document.createElement('div');
      c.className = 'chip';
      c.innerHTML = `<span>${it.emoji}</span><span>${it.name}</span>`;
      chips.appendChild(c);
    });

    const lines = [];
    // Небольшая «легенда» по категориям
    const byCat = {};
    chosen.forEach(it => {
      byCat[it.cat] = byCat[it.cat] || [];
      byCat[it.cat].push(`${it.emoji} ${it.name}`);
    });
    Object.entries(byCat).forEach(([cat, arr]) => {
      lines.push(`${cat}: ${arr.join(', ')}`);
    });

    // Пара рандомных прилагательных
    const vibeWords = ['мягко', 'искрит', 'звенит', 'медитативно', 'дерзко', 'кибер', 'тепло', 'воздушно', 'глитчит', 'шуршит', 'кислотно'];
    const a = vibeWords[Math.floor(Math.random()*vibeWords.length)];
    const b = vibeWords[Math.floor(Math.random()*vibeWords.length)];
    lines.push(`Вайб: ${a}, ${b}.`);

    // Комментарии из самих элементов
    const notes = chosen.map(it => it.desc).filter(Boolean).slice(0, 3);
    if (notes.length) lines.push('', ...notes);

    desc.textContent = lines.join('\n');
  }

  function buildSphere() {
    sphere.style.background = buildGradientFromSelection();
    updateChipsAndDesc();
  }

  buildBtn.addEventListener('click', buildSphere);
  clearBtn.addEventListener('click', () => {
    selected.clear();
    // снять выделение в кнопках
    document.querySelectorAll('.item.selected').forEach(btn => btn.classList.remove('selected'));
    buildSphere();
  });

  shareBtn.addEventListener('click', async () => {
    const ids = Array.from(selected);
    const url = new URL(location.href);
    if (ids.length) url.searchParams.set('s', ids.join(','));
    else url.searchParams.delete('s');
    const link = url.toString();
    try {
      await navigator.clipboard.writeText(link);
      showToast('Ссылка скопирована');
    } catch {
      // fallback
      prompt('Скопируй ссылку вручную:', link);
    }
  });

  resetLink.addEventListener('click', (e) => {
    e.preventDefault();
    const url = new URL(location.href);
    url.searchParams.delete('s');
    location.href = url.toString();
  });

  renderCats();
  // Если был предвыбор — сразу собрать сферу
  if (selected.size) buildSphere();
})();
