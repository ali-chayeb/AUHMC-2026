#!/bin/bash

# ====== AUHMC 2026 — نشر على GitHub Pages ======

echo "🚀 بدء عملية النشر على GitHub Pages..."
echo ""

# التحقق من وجود مجلد github-pages
if [ ! -d "github-pages" ]; then
  echo "❌ خطأ: مجلد github-pages غير موجود"
  exit 1
fi

# إنشاء مجلد مؤقت للنشر
DEPLOY_DIR="deploy-temp"
echo "📁 إنشاء مجلد مؤقت للنشر..."
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# نسخ الملفات
echo "📋 نسخ الملفات..."
cp -r github-pages/* $DEPLOY_DIR/

# التحقق من وجود الملفات الأساسية
if [ ! -f "$DEPLOY_DIR/index.html" ]; then
  echo "❌ خطأ: index.html غير موجود"
  exit 1
fi

echo "✅ تم نسخ جميع الملفات بنجاح"
echo ""

# عرض الملفات المنسوخة
echo "📊 الملفات المنسوخة:"
ls -la $DEPLOY_DIR/
echo ""

# سؤال المستخدم عن طريقة النشر
echo "اختر طريقة النشر:"
echo "1) رفع يدوي (انسخ الملفات من $DEPLOY_DIR إلى GitHub)"
echo "2) استخدام Git (يتطلب تثبيت Git)"
echo "3) إلغاء"
echo ""
read -p "أدخل رقم الخيار (1/2/3): " choice

case $choice in
  1)
    echo ""
    echo "✅ تم تجهيز الملفات في المجلد: $DEPLOY_DIR"
    echo ""
    echo "الخطوات التالية:"
    echo "1. اذهب إلى https://github.com/ali-chayeb/AUHMC-2026"
    echo "2. ارفع جميع الملفات من مجلد: $DEPLOY_DIR"
    echo "3. اذهب إلى Settings > Pages"
    echo "4. اختر المصدر: main branch"
    echo "5. انتظر دقيقة وسيتم نشر الموقع"
    echo ""
    echo "الرابط النهائي: https://ali-chayeb.github.io/AUHMC-2026/"
    ;;
  2)
    echo ""
    echo "🔄 النشر باستخدام Git..."
    
    # التحقق من تثبيت Git
    if ! command -v git &> /dev/null; then
      echo "❌ Git غير مثبت. يرجى تثبيته أولاً أو استخدام الطريقة اليدوية."
      exit 1
    fi
    
    # تهيئة Git
    cd $DEPLOY_DIR
    git init
    git remote add origin https://github.com/ali-chayeb/AUHMC-2026.git
    
    # إضافة جميع الملفات
    git add .
    
    # إنشاء commit
    git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M')"
    
    # الدفع إلى GitHub
    echo ""
    echo "⚠️  تحذير: هذا سيستبدل جميع الملفات في الفرع main"
    read -p "هل أنت متأكد؟ (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
      git push origin main --force
      echo ""
      echo "✅ تم النشر بنجاح!"
      echo "🌐 الموقع متاح على: https://ali-chayeb.github.io/AUHMC-2026/"
    else
      echo "❌ تم إلغاء العملية"
    fi
    ;;
  3)
    echo "❌ تم إلغاء العملية"
    ;;
  *)
    echo "❌ خيار غير صالح"
    exit 1
    ;;
esac

# تنظيف
echo ""
echo "🧹 تنظيف الملفات المؤقتة..."
cd ..
rm -rf $DEPLOY_DIR

echo "✅ انتهت العملية"