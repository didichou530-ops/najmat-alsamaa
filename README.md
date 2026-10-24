# نجمة السماء | NAJMAT AL SAMAA — متجر إلكتروني

واجهة متجر مستحضرات التجميل والعناية بالبشرة (React + Vite + Tailwind) مع لوحة تحكم محلية.

## الروابط الحيّة

| الرابط | العنوان |
| :--- | :--- |
| **Netlify — الرابط الرسمي (مجاني)** | https://najmatalsamaa.netlify.app/ |
| النطاق الأصلي على GitHub (الجذر) | https://didichou530-ops.github.io/ |
| الرابط القديم (فرع المستودع) | https://didichou530-ops.github.io/najmat-alsamaa/ |
| لوحة التحكم | `/‎#/admin` — رمز الدخول `1234` |

كلاهما يعرض نفس المتجر ونفس البيانات (نفس الأصل/Origin، لذا تتشارك `localStorage`).

## التشغيل محلياً

```bash
npm install
npm run dev        # http://localhost:3000
```

## النشر

### النشر الموحَّد (المستحسن) — Netlify + GitHub معاً

```bash
node deploy_all.cjs
```

يبني نسخة واحدة بـ `base = "/"` في `dist-root/` ثم ينشرها على:
- **Netlify** → https://najmatalsamaa.netlify.app/ (الرابط الرسمي)
- **GitHub Pages** → https://didichou530-ops.github.io/ (نسخة احتياطية دائمة)

يحتاج `npx netlify login` مرة واحدة (أو متغيّر `NETLIFY_AUTH_TOKEN`).

### نشر GitHub فقط

```bash
node deploy_root.cjs
```

### المسار القديم — `/najmat-alsamaa/`

```bash
npm run build      # base = "/najmat-alsamaa/"
# ثم دفع محتوى dist/ إلى فرع gh-pages في مستودع najmat-alsamaa
```

## النطاق المجاني — لماذا هو دائم؟

| الرابط | التكلفة | الاستمرارية |
| :--- | :--- | :--- |
| `najmatalsamaa.netlify.app` | مجاني | بلا تجديد وبلا انتهاء؛ يبقى ما دام المشروع في حسابك |
| `didichou530-ops.github.io` | مجاني | مملوك لك بالكامل — نسخة احتياطية لا تعتمد على Netlify |

كلاهما يُحدَّث بأمر واحد، فإن تعطّل أحدهما يعمل الآخر بنفس المحتوى.

## نطاق مخصص (اختياري، مدفوع)

عند شراء نطاق (مثل `najmatalsamaa.com`)، لا حاجة لإعادة البناء:

1. GitHub → مستودع `didichou530-ops.github.io` → **Settings › Pages › Custom domain**.
2. في مزوّد النطاق أضف:
   - `A` لـ `@` → `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
   - `CNAME` لـ `www` → `didichou530-ops.github.io`
3. فعّل **Enforce HTTPS** بعد ظهور الشهادة.

تفاصيل إضافية في [`DOMAIN_SETUP.md`](DOMAIN_SETUP.md).
