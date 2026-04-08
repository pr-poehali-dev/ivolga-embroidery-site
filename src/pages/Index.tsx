import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/8aa0f761-04b1-4e85-a565-56927cc8e748/files/180f7296-8d41-4eb9-afeb-2dcf937c1e06.jpg";

const COLLAGE_IMAGES = [
  "https://cdn.poehali.dev/projects/8aa0f761-04b1-4e85-a565-56927cc8e748/bucket/968b752d-1e0d-4357-a494-d11527758e37.jpg",
  "https://cdn.poehali.dev/projects/8aa0f761-04b1-4e85-a565-56927cc8e748/bucket/fa20cf07-7764-40f3-9ec0-b74a3205149d.jpg",
  "https://cdn.poehali.dev/projects/8aa0f761-04b1-4e85-a565-56927cc8e748/bucket/bdc2a5da-27d5-4e8d-a3ae-cb80efbb01f2.jpg",
];

const LOGO_BIRD =
  "https://cdn.poehali.dev/projects/8aa0f761-04b1-4e85-a565-56927cc8e748/bucket/632d9dbf-0a86-405d-a478-e5d6af26a706.jpg";

const CATEGORIES = [
  {
    id: 1,
    title: "Пейзажи России",
    icon: "🌲",
    count: 24,
    desc: "Берёзовые рощи, реки, закаты над полями",
  },
  {
    id: 2,
    title: "Зарубежные пейзажи",
    icon: "🏔",
    count: 18,
    desc: "Тосканские холмы, альпийские луга, морские побережья",
  },
  {
    id: 3,
    title: "Животные",
    icon: "🦊",
    count: 32,
    desc: "Дикая природа и домашние любимцы",
  },
  {
    id: 4,
    title: "Цветы",
    icon: "🌸",
    count: 28,
    desc: "Полевые и садовые, акварельные и ботанические",
  },
  {
    id: 5,
    title: "Овощи и фрукты",
    icon: "🍎",
    count: 15,
    desc: "Урожайные натюрморты и садовые зарисовки",
  },
  {
    id: 6,
    title: "Натюрморты",
    icon: "🏺",
    count: 20,
    desc: "Классические и современные композиции",
  },
  {
    id: 7,
    title: "Жанровые сцены",
    icon: "🎭",
    count: 12,
    desc: "Бытовые зарисовки и сюжетные картины",
  },
  {
    id: 8,
    title: "Люди и портреты",
    icon: "👤",
    count: 16,
    desc: "Образные и характерные портреты",
  },
  {
    id: 9,
    title: "Фэнтези",
    icon: "🐉",
    count: 10,
    desc: "Сказочные миры, драконы, эльфы, магия",
  },
];

const FAQ = [
  {
    q: "В каком формате приходит схема?",
    a: "После оплаты вы получаете PDF-файл с полной схемой, легендой цветов и инструкцией по вышивке.",
  },
  {
    q: "Какие нитки используются в схемах?",
    a: "Все схемы разработаны под нитки DMC. В каждой схеме указаны точные номера цветов.",
  },
  {
    q: "Можно ли вернуть или обменять схему?",
    a: "Так как схема — цифровой товар, возврат невозможен после скачивания. Если возникли трудности — пишите, помогу разобраться.",
  },
  {
    q: "Как получить схему после оплаты?",
    a: "Ссылка на скачивание придёт на электронную почту, указанную при оформлении.",
  },
  {
    q: "Можно ли купить схему в подарок?",
    a: "Да! При оформлении укажите электронную почту получателя, и ссылка придёт прямо ему.",
  },
];

const NAV = [
  { id: "catalog", label: "Каталог схем" },
  { id: "about", label: "Об авторе" },
  { id: "how", label: "Как купить" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
          >
            <img src={LOGO_BIRD} alt="Иволга" className="w-10 h-10 object-contain drop-shadow-sm" />
            <div className="text-left leading-none">
              <div className="font-serif text-xl font-semibold text-primary tracking-wide">
                Иволга
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans">
                вышивка крестом
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-foreground/70 hover:text-primary transition-colors tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border/50 bg-ivory px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left text-base text-foreground/80 hover:text-primary font-serif"
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative overflow-hidden bg-primary" style={{ minHeight: "90vh" }}>
        {/* Три картины — фон */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 relative overflow-hidden">
            <img src={COLLAGE_IMAGES[0]} alt="" className="w-full h-full object-cover object-center scale-105" />
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img src={COLLAGE_IMAGES[1]} alt="" className="w-full h-full object-cover object-center scale-105" />
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img src={COLLAGE_IMAGES[2]} alt="" className="w-full h-full object-cover object-center scale-105" />
          </div>
        </div>

        {/* Тонкие разделители между картинами */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1" />
          <div className="w-px bg-ivory/30" />
          <div className="flex-1" />
          <div className="w-px bg-ivory/30" />
          <div className="flex-1" />
        </div>

        {/* Тёмный градиент снизу для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-end min-h-[90vh] py-20 text-center">
          <div className="animate-fade-up text-gold text-sm uppercase tracking-[0.3em] mb-4 font-sans">
            Авторские схемы для вышивки крестом
          </div>
          <h1 className="animate-fade-up delay-100 font-serif text-ivory text-5xl sm:text-6xl md:text-7xl font-light leading-[1.1] mb-6">
            Иволга
          </h1>
          <p className="animate-fade-up delay-200 text-ivory/80 text-lg leading-relaxed mb-10 font-sans font-light max-w-lg">
            Авторские схемы от Евгении Никотиной — каждая работа создана
            с&nbsp;душой и вниманием к&nbsp;деталям. От пейзажей России до
            сказочного фэнтези.
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollTo("catalog")}
              className="px-8 py-3 bg-gold text-ivory font-sans text-sm tracking-widest uppercase hover:bg-accent/90 transition-colors"
            >
              Смотреть схемы
            </button>
            <button
              onClick={() => scrollTo("how")}
              className="px-8 py-3 border border-ivory/50 text-ivory font-sans text-sm tracking-widest uppercase hover:bg-ivory/10 transition-colors"
            >
              Как купить
            </button>
          </div>
        </div>
      </section>

      {/* ── КАТАЛОГ ── */}
      <section id="catalog" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Каталог
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-primary font-light mb-4">
              Схемы по категориям
            </h2>
            <div className="gold-line w-40 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.id ? null : cat.id)
                }
                className={`group text-left p-6 classic-border transition-all duration-300 hover:shadow-md hover:border-accent/50 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:bg-cream"
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <span
                    className={`text-xs font-sans uppercase tracking-widest px-2 py-1 ${
                      activeCategory === cat.id
                        ? "bg-ivory/20 text-ivory"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.count} схем
                  </span>
                </div>
                <h3
                  className={`font-serif text-xl font-medium mb-2 ${
                    activeCategory === cat.id ? "text-ivory" : "text-foreground"
                  }`}
                >
                  {cat.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    activeCategory === cat.id
                      ? "text-ivory/75"
                      : "text-muted-foreground"
                  }`}
                >
                  {cat.desc}
                </p>
                <div
                  className={`mt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-sans ${
                    activeCategory === cat.id ? "text-gold" : "text-accent"
                  }`}
                >
                  Смотреть схемы
                  <Icon name="ArrowRight" size={14} />
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-10 text-muted-foreground text-sm font-sans">
            Выберите категорию, чтобы посмотреть схемы. Оформление покупок —
            через{" "}
            <a
              href="https://vk.com/club168347935"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              сообщество ВКонтакте
            </a>
            .
          </div>
        </div>
      </section>

      {/* ── КАК КУПИТЬ ── */}
      <section id="how" className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Покупка
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-primary font-light mb-4">
              Как оформить заказ
            </h2>
            <div className="gold-line w-40 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              {
                step: "01",
                icon: "Search",
                title: "Выберите схему",
                desc: "Найдите понравившуюся схему в каталоге или в нашем сообществе ВКонтакте",
              },
              {
                step: "02",
                icon: "MessageCircle",
                title: "Напишите нам",
                desc: "Свяжитесь через ВКонтакте или по электронной почте, укажите название схемы",
              },
              {
                step: "03",
                icon: "CreditCard",
                title: "Оплатите",
                desc: "Получите реквизиты для оплаты и переведите нужную сумму",
              },
              {
                step: "04",
                icon: "Download",
                title: "Получите файл",
                desc: "После подтверждения оплаты — PDF-файл с схемой придёт на вашу почту",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6">
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 right-0 w-px h-16 bg-border" />
                )}
                <div className="w-14 h-14 flex items-center justify-center border border-accent/40 text-accent mb-4">
                  <Icon name={item.icon as "Search"} size={22} />
                </div>
                <div className="text-xs text-accent/60 font-sans tracking-widest mb-2">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://vk.com/club168347935"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-sans hover:bg-primary/90 transition-colors"
            >
              <Icon name="ExternalLink" size={16} />
              Сообщество ВКонтакте
            </a>
            <a
              href="mailto:evgen.nik-tin@yandex.ru"
              className="flex items-center justify-center gap-2 px-8 py-3 classic-border text-primary text-sm uppercase tracking-widest font-sans hover:bg-muted transition-colors"
            >
              <Icon name="Mail" size={16} />
              Написать на почту
            </a>
          </div>
        </div>
      </section>

      {/* ── ОБ АВТОРЕ ── */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Дизайнер
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary font-light mb-6 leading-tight">
                Евгения
                <br />
                Никотина
              </h2>
              <div className="gold-line w-20 mb-6" />
              <p className="text-foreground/75 leading-relaxed mb-4">
                Евгения — автор авторских схем для вышивки крестом, создатель
                сообщества «Иволга». Каждая схема — это не просто узор, а
                маленькое произведение искусства, которое приходит к жизни в
                ваших руках.
              </p>
              <p className="text-foreground/75 leading-relaxed mb-8">
                В каталоге — более 175 схем самых разных тематик: от нежных
                цветочных зарисовок до масштабных пейзажей и сказочных существ.
                Работы постоянно пополняются.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://vk.com/club168347935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-primary hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 classic-border flex items-center justify-center text-lg group-hover:border-accent/50 transition-colors">
                    🔵
                  </div>
                  <span>Сообщество ВКонтакте</span>
                  <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
                </a>
                <a
                  href="mailto:evgen.nik-tin@yandex.ru"
                  className="flex items-center gap-3 text-sm text-primary hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 classic-border flex items-center justify-center group-hover:border-accent/50 transition-colors">
                    <Icon name="Mail" size={14} />
                  </div>
                  <span>evgen.nik-tin@yandex.ru</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden classic-border">
                <img
                  src={HERO_IMAGE}
                  alt="Авторская схема вышивки"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/30 -z-10 hidden sm:block" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-accent/20 -z-10 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Вопросы и ответы
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-primary font-light mb-4">
              FAQ
            </h2>
            <div className="gold-line w-40 mx-auto" />
          </div>

          <div className="space-y-0 divide-y divide-border/60">
            {FAQ.map((item, i) => (
              <div key={i}>
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                    {item.q}
                  </span>
                  <span className="mt-1 flex-shrink-0 text-accent">
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={18} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-muted-foreground leading-relaxed text-sm animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold/70 mb-3">
            Связаться с нами
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light mb-4">
            Контакты
          </h2>
          <div className="gold-line w-40 mx-auto mb-10" />

          <p className="text-ivory/75 mb-10 text-lg font-light leading-relaxed">
            По вопросам покупки схем, сотрудничества или просто
            пообщаться&nbsp;— пишите любым удобным способом.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://vk.com/club168347935"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-ivory/30 text-ivory hover:bg-ivory/10 transition-colors text-sm uppercase tracking-widest font-sans w-full sm:w-auto justify-center"
            >
              <span className="text-lg">🔵</span>
              ВКонтакте
            </a>
            <a
              href="mailto:evgen.nik-tin@yandex.ru"
              className="flex items-center gap-3 px-8 py-4 bg-gold text-ivory hover:bg-gold/90 transition-colors text-sm uppercase tracking-widest font-sans w-full sm:w-auto justify-center"
            >
              <Icon name="Mail" size={16} />
              evgen.nik-tin@yandex.ru
            </a>
          </div>

          <p className="mt-12 text-ivory/40 text-xs font-sans tracking-wide">
            Сообщество вышивальщиц «Иволга» · vk.com/club168347935
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-ivory/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-2">
            <img src={LOGO_BIRD} alt="Иволга" className="w-7 h-7 object-contain opacity-70" />
            <span className="text-ivory/70">
              Иволга — авторские схемы для вышивки крестом
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="hover:text-ivory/80 transition-colors uppercase tracking-widest"
              >
                {n.label}
              </button>
            ))}
          </div>
          <div>© 2024 Евгения Никотина</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;