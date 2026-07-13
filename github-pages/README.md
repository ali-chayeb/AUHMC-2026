# AUHMC 2026 — نسخة GitHub Pages

هذا المجلد يحتوي على نسخة مستقلة من الموقع تعمل على GitHub Pages بدون الحاجة إلى خادم خلفي (Backend).

## 🚀 النشر على GitHub Pages

### الطريقة 1: رفع الملفات مباشرة

1. اذهب إلى مستودع GitHub: https://github.com/ali-chayeb/AUHMC-2026
2. ارفع جميع الملفات من هذا المجلد إلى الفرع `main`
3. اذهب إلى Settings > Pages
4. اختر المصدر: `main` branch
5. الموقع سيكون متاحاً على: `https://ali-chayeb.github.io/AUHMC-2026/`

### الطريقة 2: استخدام Git

```bash
# 1. انسخ الملفات إلى مجلد مؤقت
cp -r github-pages/* /path/to/temp/folder/

# 2. ادفع إلى GitHub
cd /path/to/temp/folder
git init
git remote add origin https://github.com/ali-chayeb/AUHMC-2026.git
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main --force
```

## ⚠️ ملاحظات مهمة

### ما يعمل على GitHub Pages:
- ✅ الموقع الرئيسي (الصفحات، المسارات، البرنامج، اللجان، البوسترات، التسجيل، الرعاة)
- ✅ الوضع الليلي
- ✅ العد التنازلي
- ✅ لوحة التحكم (admin.html)
- ✅ التعديلات على المحتوى (تُحفظ في localStorage)
- ✅ نموذج التسجيل (يُحفظ في localStorage)

### ما لا يعمل على GitHub Pages:
- ❌ API الخادم (لا يوجد Node.js على GitHub Pages)
- ❌ قاعدة البيانات المركزية
- ❌ رفع الصور إلى السيرفر
- ❌ تسجيل الدخول الحقيقي (JWT)

## 🔧 لوحة التحكم

- افتح: `https://ali-chayeb.github.io/AUHMC-2026/admin.html`
- كلمة المرور الافتراضية: `admin2026`
- جميع التعديلات تُحفظ في localStorage (محلياً في المتصفح)

## 📱 الميزات

- تصميم متجاوب (Mobile-First)
- دعم RTL للعربية
- وضع ليلي مع حفظ التفضيل
- عد تنازلي للمؤتمر
- فلترة البرنامج حسب المسار
- نموذج تسجيل ذكي

## 🔄 التبديل بين النسخ

### للعمل المحلي مع Backend:
```bash
# استخدم الملفات في مجلد public/
npm start
# السيرفر يعمل على http://localhost:3000
```

### للنشر على GitHub Pages:
```bash
# استخدم الملفات في مجلد github-pages/
# ارفعها إلى GitHub
```

## 📝 الترخيص

© 2026 AUHMC — جميع الحقوق محفوظة