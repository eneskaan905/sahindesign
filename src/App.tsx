import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Layers,
  Menu,
  MessageCircle,
  RefreshCw,
  Sofa,
  Sparkles,
  X,
} from "lucide-react";
import {
  checkSession,
  login as apiLogin,
  logout as apiLogout,
  saveContent as apiSaveContent,
} from "./api";
import { defaultContent, type SiteContent } from "./content";

const waLink = (
  phone: string,
  message = "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

function WhatsAppLink({
  phone,
  children,
  className = "",
}: {
  phone: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={waLink(phone)}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Header({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Şahin Design ana sayfa">
        <span className="brand-mark">Ş</span>
        <span>
          {content.brand}
          <small>ATÖLYE · KOCAELİ</small>
        </span>
      </a>
      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Menüyü aç/kapat"
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav-links open" : "nav-links"}>
        <a href="#hikayemiz" onClick={() => setOpen(false)}>
          Hikâyemiz
        </a>
        <a href="#hizmetler" onClick={() => setOpen(false)}>
          Hizmetler
        </a>
        <a href="#islerimiz" onClick={() => setOpen(false)}>
          İşlerimiz
        </a>
        <a href="#iletisim" onClick={() => setOpen(false)}>
          İletişim
        </a>
      </nav>
      <WhatsAppLink phone={content.phone} className="header-cta">
        Projenizi konuşalım <ArrowUpRight size={16} />
      </WhatsAppLink>
    </header>
  );
}

function Home({ content }: { content: SiteContent }) {
  const icons = [Sofa, Sparkles, RefreshCw, Layers];
  return (
    <>
      <Header content={content} />
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              {content.heroEyebrow}
            </div>
            <h1>
              {content.heroTitle.split("\n").map((line, i) => (
                <span key={line} className={i ? "serif-line" : ""}>
                  {line}
                </span>
              ))}
            </h1>
            <p>{content.heroText}</p>
            <div className="hero-actions">
              <WhatsAppLink
                phone={content.phone}
                className="button button-dark"
              >
                WhatsApp’tan bize ulaşın <ArrowUpRight size={17} />
              </WhatsAppLink>
              <a className="text-link" href="#islerimiz">
                İşlerimizi keşfedin <ArrowDownRight size={16} />
              </a>
            </div>
            <div className="hero-note">
              <span className="note-dot" />
              Özenle üretilir. Yıllarca yaşar.
            </div>
          </div>
          <div className="hero-visual">
            <div
              className="hero-photo"
              role="img"
              aria-label="Sıcak tonlarda modern ve konforlu yaşam alanı"
            />
            <div className="hero-photo-wash" />
            <div className="photo-caption">
              <span>01 / ÖZEL ÜRETİM</span>
              <span>Yaşayan mekânlar için.</span>
            </div>
            <div className="round-stamp">
              <span>USTALIKLA · SEVGİYLE · ŞAHİN DESIGN · </span>
              <b>Ş</b>
            </div>
            <div className="hero-side-note">
              İYİ TASARIM, HER GÜN HİSSEDİLİR
            </div>
          </div>
          <a className="scroll-cue" href="#hikayemiz">
            <span>KEŞFET</span>
            <ArrowDown size={15} />
          </a>
        </section>

        <section id="hikayemiz" className="intro-section section-pad">
          <Reveal className="intro-index">
            <span>01</span>
            <i />
          </Reveal>
          <Reveal className="intro-title">
            <div className="eyebrow">BİZİM İÇİN HER PARÇA ÖZEL</div>
            <h2>
              Bir mobilyadan
              <br />
              daha fazlası<span className="accent-dot">.</span>
            </h2>
          </Reveal>
          <Reveal className="intro-body">
            <p>
              Bir koltuğun hatırası, bir masanın etrafında toplanan hikâyeler…
              Biz, eşyalarınızın yalnızca görünüşünü değil, sizinle kurduğu bağı
              da önemsiyoruz.
            </p>
            <p>
              Kocaeli’deki atölyemizde; usta işçiliği, iyi malzemeyi ve size
              özel dokunuşları bir araya getiriyoruz.
            </p>
            <a href="#hizmetler" className="underlined-link">
              Şahin Design’ı tanıyın <ArrowRight size={16} />
            </a>
          </Reveal>
        </section>

        <section className="statement-band">
          <div className="statement-orbit">SD</div>
          <p>
            Her güzel şeyin
            <br />
            <em>ikinci bir hayatı</em> var.
          </p>
          <span>YENİLE · DÖNÜŞTÜR · YAŞAT</span>
        </section>

        <section id="hizmetler" className="services-section section-pad">
          <Reveal className="section-heading">
            <div>
              <div className="eyebrow">USTALIKTAN GELEN ÇÖZÜMLER</div>
              <h2>
                İyi hissettiren
                <br />
                <em>dokunuşlar.</em>
              </h2>
            </div>
            <p>
              Her ihtiyaca, her mekâna ve her hikâyeye göre tasarlanmış
              çözümler.
            </p>
          </Reveal>
          <div className="service-grid">
            {content.services.map((service, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={service.number} className="service-card">
                  <div className="service-top">
                    <span>{service.number}</span>
                    <Icon size={25} strokeWidth={1.35} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a
                    href={waLink(
                      content.phone,
                      `${service.title} hakkında bilgi almak istiyorum.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${service.title} için WhatsApp'tan bilgi al`}
                  >
                    <ArrowUpRight size={17} />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="islerimiz" className="work-section section-pad">
          <Reveal className="work-heading">
            <div>
              <div className="eyebrow">SEÇİLMİŞ İŞLERİMİZ</div>
              <h2>İşimiz konuşsun.</h2>
            </div>
            <a
              href="https://www.instagram.com/sahin_desing/"
              target="_blank"
              rel="noreferrer"
              className="underlined-link"
            >
              Instagram’da daha fazlası <Instagram size={16} />
            </a>
          </Reveal>
          <div className="project-grid">
            {content.projects.map((project, i) => (
              <Reveal
                key={`${project.title}-${i}`}
                className={`project-card project-${i + 1}`}
              >
                <a
                  href="https://www.instagram.com/sahin_desing/"
                  target="_blank"
                  rel="noreferrer"
                  className="project-image"
                  style={{ backgroundImage: `url("${project.image}")` }}
                  aria-label={`${project.title} - Instagram'da görüntüle`}
                >
                  <span className="project-label">{project.label}</span>
                  <span className="project-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </a>
                <div className="project-meta">
                  <div>
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-no">0{i + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="process-section section-pad">
          <Reveal className="process-copy">
            <div className="eyebrow">TANIŞALIM, BİRLİKTE TASARLAYALIM</div>
            <h2>
              Hayalinizden
              <br />
              <em>başlayalım.</em>
            </h2>
            <p>
              Bir fotoğraf, bir fikir ya da sadece aklınızdaki his… İlk adım
              için hepsi yeterli.
            </p>
            <WhatsAppLink phone={content.phone} className="button button-light">
              WhatsApp’tan sohbet başlat <MessageCircle size={17} />
            </WhatsAppLink>
          </Reveal>
          <Reveal className="process-steps">
            <div className="process-step">
              <span>01</span>
              <div>
                <h3>Bizi anlatın</h3>
                <p>İhtiyacınızı ve hayalinizi WhatsApp’tan paylaşın.</p>
              </div>
              <ChevronDown />
            </div>
            <div className="process-step">
              <span>02</span>
              <div>
                <h3>Birlikte planlayalım</h3>
                <p>Malzeme, renk ve detayları beraber seçelim.</p>
              </div>
              <ChevronDown />
            </div>
            <div className="process-step">
              <span>03</span>
              <div>
                <h3>Yeni hâlinin keyfini çıkarın</h3>
                <p>Ustalıkla tamamlanan işiniz yaşam alanınıza gelsin.</p>
              </div>
              <Check />
            </div>
          </Reveal>
        </section>

        <section className="quote-section">
          <span className="quote-mark">“</span>
          <blockquote>
            “Mobilyamızın yepyeni hâlini görünce
            <br />
            iyi ki yeniletmişiz dedik.”
          </blockquote>
          <div className="quote-byline">
            <span className="quote-stars">★★★★★</span>
            <span>MUTLU MÜŞTERİLERİMİZDEN</span>
          </div>
        </section>

        <section id="iletisim" className="contact-section section-pad">
          <Reveal className="contact-top">
            <div className="eyebrow">GÜZEL BİR ŞEY BAŞLATALIM</div>
            <h2>
              Bir mesaj kadar
              <br />
              <em>yakınız.</em>
            </h2>
            <p>
              Projenizi konuşmak, fikir almak ya da sadece merhaba demek için
              bize yazın.
            </p>
            <WhatsAppLink phone={content.phone} className="button button-dark">
              WhatsApp’tan iletişime geçin <ArrowUpRight size={17} />
            </WhatsAppLink>
          </Reveal>
          <Reveal className="contact-details">
            <div className="detail-block">
              <span>ATÖLYE</span>
              <p>
                Kocaeli, Türkiye
                <br />
                Tüm Türkiye’ye hizmet
              </p>
            </div>
            <div className="detail-block">
              <span>SOSYAL MEDYA</span>
              <a
                href="https://www.instagram.com/sahin_desing/"
                target="_blank"
                rel="noreferrer"
              >
                @sahin_desing <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="detail-block">
              <span>ÇALIŞMA ŞEKLİMİZ</span>
              <p>
                Randevu ve proje bazlı
                <br />
                hizmet veriyoruz.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">Ş</span>
          <span>
            {content.brand}
            <small>ATÖLYE · KOCAELİ</small>
          </span>
        </a>
        <span>© 2025 Şahin Design. Özenle üretildi.</span>
        <a href="#top" className="back-top">
          BAŞA DÖN ↑
        </a>
      </footer>
      <WhatsAppLink phone={content.phone} className="floating-wa">
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </WhatsAppLink>
    </>
  );
}

function Admin({
  content: initial,
  onSave,
}: {
  content: SiteContent;
  onSave: (value: SiteContent) => void;
}) {
  const [logged, setLogged] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const wasLogged = useRef(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    let active = true;
    checkSession()
      .then((authenticated) => {
        if (active) setLogged(authenticated);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    setForm(initial);
  }, [initial]);
  useEffect(() => {
    if (logged) wasLogged.current = true;
    else if (wasLogged.current) {
      wasLogged.current = false;
      void apiLogout();
    }
  }, [logged]);
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiLogin(user, pass);
      setLogged(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Giriş başarısız.");
    }
  };
  const setField = (key: keyof SiteContent, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  const save = async () => {
    try {
      await onSave(form);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2200);
    } catch (error) {
      alert(error instanceof Error ? error.message : "İçerik kaydedilemedi.");
    }
  };
  if (checkingSession)
    return (
      <div className="admin-login">
        <p>Oturum kontrol ediliyor...</p>
      </div>
    );
  if (!logged)
    return (
      <div className="admin-login">
        <form onSubmit={login}>
          <a className="brand" href="/">
            <span className="brand-mark">Ş</span>
            <span>
              ŞAHİN DESIGN<small>YÖNETİM PANELİ</small>
            </span>
          </a>
          <div className="eyebrow">İÇERİK YÖNETİMİ</div>
          <h1>Tekrar hoş geldiniz.</h1>
          <label>
            Kullanıcı adı
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Parola
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button className="button button-dark" type="submit">
            Panele giriş yap <ArrowRight size={17} />
          </button>
          <a href="/" className="admin-back">
            ← Siteye dön
          </a>
        </form>
      </div>
    );
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="brand" href="/">
          <span className="brand-mark">Ş</span>
          <span>
            ŞAHİN DESIGN<small>YÖNETİM PANELİ</small>
          </span>
        </a>
        <div className="admin-nav-label">ÇALIŞMA ALANI</div>
        <a className="admin-nav active" href="#genel">
          ◈ <span>Genel içerikler</span>
        </a>
        <a className="admin-nav" href="#hizmet-panel">
          ◉ <span>Hizmetler</span>
        </a>
        <a className="admin-nav" href="#projeler-panel">
          ▧ <span>Projeler</span>
        </a>
        <a className="admin-nav" href="/">
          ↗ <span>Siteyi görüntüle</span>
        </a>
        <div className="admin-sidebar-foot">
          Şahin Design CMS
          <br />
          <span>Cloudflare CMS</span>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>YÖNETİM PANELİ</span>
            <h1>Merhaba, Halil 👋</h1>
          </div>
          <button
            onClick={() => {
              setLogged(false);
            }}
            className="logout-button"
          >
            Oturumu kapat <ArrowUpRight size={15} />
          </button>
        </header>
        <div className="admin-warning">
          ⓘ Site içerikleri GitHub deposuna kaydedilir.
        </div>
        <section id="genel" className="admin-card">
          <div className="admin-card-heading">
            <div>
              <span>01 / GENEL</span>
              <h2>Ana sayfa içeriği</h2>
            </div>
          </div>
          <div className="admin-form-grid">
            <label>
              Marka adı
              <input
                value={form.brand}
                onChange={(e) => setField("brand", e.target.value)}
              />
            </label>
            <label>
              WhatsApp numarası <small>(ülke kodu ile, sadece rakam)</small>
              <input
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="905xxxxxxxxx"
              />
            </label>
            <label className="span-2">
              Üst başlık
              <input
                value={form.heroEyebrow}
                onChange={(e) => setField("heroEyebrow", e.target.value)}
              />
            </label>
            <label className="span-2">
              Ana başlık <small>(ikinci satır için yeni satır kullanın)</small>
              <textarea
                rows={2}
                value={form.heroTitle}
                onChange={(e) => setField("heroTitle", e.target.value)}
              />
            </label>
            <label className="span-2">
              Açıklama
              <textarea
                rows={3}
                value={form.heroText}
                onChange={(e) => setField("heroText", e.target.value)}
              />
            </label>
          </div>
        </section>
        <section id="hizmet-panel" className="admin-card">
          <div className="admin-card-heading">
            <div>
              <span>02 / HİZMETLER</span>
              <h2>Hizmet kartları</h2>
            </div>
          </div>
          <div className="admin-form-grid">
            {form.services.map((service, i) => (
              <div className="admin-item" key={service.number}>
                <strong>{service.number} / HİZMET</strong>
                <label>
                  Başlık
                  <input
                    value={service.title}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        services: prev.services.map((s, j) =>
                          j === i ? { ...s, title: e.target.value } : s,
                        ),
                      }))
                    }
                  />
                </label>
                <label>
                  Açıklama
                  <textarea
                    rows={3}
                    value={service.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        services: prev.services.map((s, j) =>
                          j === i ? { ...s, description: e.target.value } : s,
                        ),
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>
        <section id="projeler-panel" className="admin-card">
          <div className="admin-card-heading">
            <div>
              <span>03 / PORTFÖY</span>
              <h2>Seçilmiş işler</h2>
            </div>
          </div>
          <div className="admin-form-grid">
            {form.projects.map((project, i) => (
              <div className="admin-item" key={project.label}>
                <strong>{project.label} / PROJE</strong>
                <label>
                  Proje adı
                  <input
                    value={project.title}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        projects: prev.projects.map((p, j) =>
                          j === i ? { ...p, title: e.target.value } : p,
                        ),
                      }))
                    }
                  />
                </label>
                <label>
                  Kategori
                  <input
                    value={project.category}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        projects: prev.projects.map((p, j) =>
                          j === i ? { ...p, category: e.target.value } : p,
                        ),
                      }))
                    }
                  />
                </label>
                <label>
                  Görsel URL
                  <input
                    value={project.image}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        projects: prev.projects.map((p, j) =>
                          j === i ? { ...p, image: e.target.value } : p,
                        ),
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>
        <div className="admin-savebar">
          <span>Değişiklikler otomatik kaydedilmez.</span>
          <button className="button button-dark" onClick={save}>
            {saved ? (
              <>
                <Check size={16} /> Kaydedildi
              </>
            ) : (
              <>
                Değişiklikleri kaydet <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const isAdmin = window.location.pathname.replace(/\/$/, "") === "/admin";
  const update = async (next: SiteContent) => {
    await apiSaveContent(next);
    setContent(next);
  };
  useEffect(() => {
    document.title = isAdmin
      ? "Yönetim Paneli — Şahin Design"
      : "Şahin Design — Yaşam Alanınıza Değer Katın";
  }, [isAdmin]);
  return isAdmin ? (
    <Admin content={content} onSave={update} />
  ) : (
    <Home content={content} />
  );
}
