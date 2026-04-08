import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/icon";

const LOGO_BIRD =
  "https://cdn.poehali.dev/projects/8aa0f761-04b1-4e85-a565-56927cc8e748/bucket/632d9dbf-0a86-405d-a478-e5d6af26a706.jpg";

type PaymentType = "card" | "sbp";

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  payment: PaymentType;
  comment: string;
}

const PAYMENT_OPTIONS: { value: PaymentType; label: string; desc: string; icon: string }[] = [
  { value: "card", label: "Оплата картой", desc: "Реквизиты придут на почту", icon: "CreditCard" },
  { value: "sbp", label: "СБП", desc: "Перевод через Систему быстрых платежей", icon: "Zap" },
];

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQty, total, count, clear } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<OrderForm>({
    name: "",
    email: "",
    phone: "",
    payment: "card",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const update = (field: keyof OrderForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canProceedStep1 =
    form.name.trim() && form.email.trim() && form.phone.trim();

  const handleOrder = () => {
    setSubmitted(true);
    clear();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-card border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <img src={LOGO_BIRD} alt="Иволга" className="w-8 h-8 object-cover rounded-full" />
            <span className="font-serif text-xl text-primary tracking-wide">Иволга</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться в каталог
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-primary font-light mb-1">Корзина</h1>
          {!submitted && count > 0 && (
            <p className="text-muted-foreground text-sm">{count} {count === 1 ? "товар" : count < 5 ? "товара" : "товаров"}</p>
          )}
        </div>

        {/* Пустая корзина */}
        {!submitted && items.length === 0 && (
          <div className="text-center py-24 border border-dashed border-border rounded-sm">
            <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="font-serif text-2xl text-muted-foreground font-light mb-2">Корзина пуста</p>
            <p className="text-sm text-muted-foreground mb-6">Выберите товар и положите его в корзину</p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Перейти в каталог
            </button>
          </div>
        )}

        {/* Шаги оформления */}
        {!submitted && items.length > 0 && (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Левая колонка */}
            <div className="space-y-6">
              {/* Шаг-индикатор */}
              <div className="flex items-center gap-0">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`flex items-center gap-2 px-4 py-2 text-sm font-sans ${step === s ? "bg-primary text-primary-foreground" : step > s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                      <span className="font-medium">{s}</span>
                      <span className="hidden sm:inline">{s === 1 ? "Оформление заказа" : "Способ оплаты"}</span>
                    </div>
                    {s < 2 && <div className="w-6 h-px bg-border" />}
                  </div>
                ))}
              </div>

              {/* ШАГ 1: Оформление */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-card border border-border p-6 space-y-4">
                    <h2 className="font-serif text-xl text-foreground">Ваши данные</h2>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Имя *</label>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Ваше имя"
                          className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="your@email.ru"
                          className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Телефон *</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Комментарий к заказу</label>
                        <textarea
                          value={form.comment}
                          onChange={(e) => update("comment", e.target.value)}
                          placeholder="Любые пожелания..."
                          rows={3}
                          className="w-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border p-4 flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon name="Mail" size={18} className="text-primary flex-shrink-0" />
                    <span>Доставка электронная — схема придёт на указанный email в виде PDF</span>
                  </div>

                  <button
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    Далее — выбор оплаты
                  </button>
                </div>
              )}

              {/* ШАГ 2: Оплата */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-card border border-border p-6 space-y-4">
                    <h2 className="font-serif text-xl text-foreground">Способ оплаты</h2>
                    <div className="space-y-2">
                      {PAYMENT_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${form.payment === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={opt.value}
                            checked={form.payment === opt.value}
                            onChange={() => update("payment", opt.value)}
                            className="accent-primary mt-0.5"
                          />
                          <Icon name={opt.icon as "CreditCard"} size={20} className="text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{opt.label}</div>
                            <div className="text-xs text-muted-foreground">{opt.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {form.payment === "card" && (
                      <div className="bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 space-y-2">
                        <p className="font-medium">Оплата картой Сбербанка</p>
                        <p>После оформления заказа вы получите счёт на оплату. Реквизиты для оплаты придут на указанную вами почту в автоматическом ответном письме.</p>
                        <p className="text-xs">Внимание: подтверждение платежа отправляем вручную, может быть не сразу — особенно ночью.</p>
                      </div>
                    )}
                    {form.payment === "sbp" && (
                      <div className="bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                        <p className="font-medium">Оплата через СБП</p>
                        <p>После оформления заказа вы будете перенаправлены на платёжную страницу Ю.Касса.</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-muted/50 border border-border p-4 text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Условия возврата</p>
                    <p>Возврат товара в электронном виде не предусмотрен. Схемы в электронном виде отправим на указанную почту. Сопутствующие товары — Почтой России или СДЭК.</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-border text-foreground font-sans text-sm tracking-widest uppercase hover:bg-muted transition-colors"
                    >
                      Назад
                    </button>
                    <button
                      onClick={handleOrder}
                      className="flex-[2] py-4 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
                    >
                      Оформить заказ
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Правая колонка — итог */}
            <div className="space-y-4">
              <div className="bg-card border border-border p-5 space-y-4 lg:sticky lg:top-24">
                <h3 className="font-serif text-lg text-foreground">Ваш заказ</h3>
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-3 flex gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium leading-tight">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="w-6 h-6 border border-border text-sm hover:bg-muted transition-colors flex items-center justify-center">−</button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="w-6 h-6 border border-border text-sm hover:bg-muted transition-colors flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                        <span className="text-sm font-medium text-foreground">{(item.product.price * item.qty).toLocaleString("ru")} ₽</span>
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors self-end">
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-center">
                  <span className="font-sans text-sm uppercase tracking-widest text-muted-foreground">Итого</span>
                  <span className="font-serif text-2xl text-primary">{total.toLocaleString("ru")} ₽</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Успешный заказ */}
        {submitted && (
          <div className="text-center py-16 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-primary" />
            </div>
            <h2 className="font-serif text-3xl text-primary font-light mb-3">Заказ принят!</h2>
            <p className="text-muted-foreground mb-2">Номер заказа: <span className="font-medium text-foreground">#{orderNumber}</span></p>
            <p className="text-sm text-muted-foreground mb-6">
              {form.payment === "card"
                ? `Реквизиты для оплаты картой Сбербанка придут на ${form.email}. После подтверждения оплаты схемы будут отправлены на вашу почту.`
                : `Вы будете перенаправлены на страницу оплаты Ю.Касса. После оплаты схемы придут на ${form.email}.`
              }
            </p>
            <div className="bg-muted/50 border border-border p-4 text-sm text-left space-y-1 mb-8">
              <p><span className="text-muted-foreground">Имя:</span> {form.name}</p>
              <p><span className="text-muted-foreground">Email:</span> {form.email}</p>
              <p><span className="text-muted-foreground">Телефон:</span> {form.phone}</p>
              <p><span className="text-muted-foreground">Доставка:</span> Электронная (PDF на email)</p>
              <p><span className="text-muted-foreground">Оплата:</span> {PAYMENT_OPTIONS.find(p => p.value === form.payment)?.label}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Вернуться в каталог
            </button>
          </div>
        )}
      </main>
    </div>
  );
}