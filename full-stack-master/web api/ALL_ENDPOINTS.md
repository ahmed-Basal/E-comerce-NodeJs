# 🚀 الدليل الشامل لجميع نقاط النهاية (Complete API Endpoints Reference)

> **Base URL:** `http://localhost:8000/api/v1`  
> **Auth Headers:**
> - **JWT Bearer Token:** `Authorization: Bearer <YOUR_JWT_TOKEN>`
> - **أو API Key:** `x-api-key: <YOUR_API_KEY>`

---

## 📑 الفهرس (Table of Contents)
1. [المصادقة والحسابات (Authentication & Passwords)](#1-المصادقة-والحسابات-authentication)
2. [المستخدمين والحساب الشخصي (Users & Profile)](#2-المستخدمين-والحساب-الشخصي-users--profile)
3. [المنتجات (Products)](#3-المنتجات-products)
4. [التصنيفات الرئيسية (Categories)](#4-التصنيفات-الرئيسية-categories)
5. [التصنيفات الفرعية (SubCategories)](#5-التصنيفات-الفرعية-subcategories)
6. [الماركات / البراندات (Brands)](#6-الماركات-brands)
7. [سلة المشتريات (Cart)](#7-سلة-المشتريات-cart)
8. [الطلبات والدفع (Orders & Checkout)](#8-الطلبات-والدفع-orders--checkout)
9. [قائمة الرغبات / المفضلة (Wishlist)](#9-قائمة-الرغبات-wishlist)
10. [عناوين الشحن (Addresses)](#10-عناوين-الشحن-addresses)
11. [التقييمات والمراجعات (Reviews)](#11-التقييمات-reviews)
12. [كوبونات الخصم (Coupons)](#12-كوبونات-الخصم-coupons)
13. [مفاتيح الـ API (API Keys Management)](#13-مفاتيح-الـ-api-apikeys)
14. [لوحة التحكم والإحصائيات (Dashboard Stats)](#14-لوحة-التحكم-dashboard)
15. [الإشعارات المباشرة (Notifications SSE)](#15-الإشعارات-notifications)
16. [الملفات والصور الثابتة (Static Uploads)](#16-الملفات-والصور-الاستاتيكية-static-assets)

---

## 1. المصادقة والحسابات (Authentication)
المسار الأساسي: `/api/v1/auth`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `POST` | `/api/v1/auth/signup` | Public | إنشاء حساب جديد | `{ "name", "email", "password", "passwordConfirm" }` |
| `POST` | `/api/v1/auth/login` | Public | تسجيل الدخول واستلام التوكن | `{ "email", "password" }` |
| `POST` | `/api/v1/auth/refreshToken` | Public | تجديد Access Token بواسطة Refresh Token | `{ "refreshToken" }` |
| `POST` | `/api/v1/auth/refresh-token` | Public | رابط بديل لتجديد التوكن | `{ "refreshToken" }` |
| `POST` | `/api/v1/auth/forgotPassword` | Public | إرسال كود استرجاع كلمة المرور للإيميل | `{ "email" }` |
| `POST` | `/api/v1/auth/verifyResetCode` | Public | التحقق من صحة كود إعادة التعيين | `{ "resetCode" }` |
| `PUT` | `/api/v1/auth/resetPassword` | Public | تعيين كلمة المرور الجديدة | `{ "email", "newPassword" }` |

---

## 2. المستخدمين والحساب الشخصي (Users & Profile)
المسار الأساسي: `/api/v1/users`

### الحساب الشخصي للمستخدم المسجل (Logged-in User):
| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/users/getMe` | User / Admin | جلب بيانات حسابي الحالي | لا يوجد |
| `PUT` | `/api/v1/users/updateMe` | User / Admin | تعديل بيانات حسابي (الاسم، الهاتف، الإيميل) | `{ "name", "phone", "email" }` |
| `PUT` | `/api/v1/users/changeMyPassword` | User / Admin | تغيير كلمة المرور الحالية | `{ "currentPassword", "password", "passwordConfirm" }` |
| `DELETE`| `/api/v1/users/deleteMe` | User / Admin | تعطيل/حذف حسابي الشخصي | لا يوجد |

### إدارة المستخدمين (Admin / Manager فقط):
| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/users` | Admin, Manager | جلب قائمة المستخدمين (صفحات، فلترة، بحث) | `?page=1&limit=10&keyword=...` |
| `POST` | `/api/v1/users` | Admin, Manager | إضافة مستخدم جديد (مع إمكانية رفع صورة) | `multipart/form-data` أو JSON |
| `GET` | `/api/v1/users/:id` | Admin, Manager | جلب مستخدم محدد بالـ ID | Param: `id` |
| `PUT` | `/api/v1/users/:id` | Admin, Manager | تعديل مستخدم محدد بالـ ID | Param: `id`, Body: بيانات المستخدم |
| `DELETE`| `/api/v1/users/:id` | Admin | حذف مستخدم نهائياً بالـ ID | Param: `id` |
| `PUT` | `/api/v1/users/changePassword/:id` | Admin, Manager | تغيير كلمة سر أي مستخدم إدارياً | Param: `id`, `{ "password", "passwordConfirm" }` |

---

## 3. المنتجات (Products)
المسار الأساسي: `/api/v1/products`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/products` | Public | جلب كل المنتجات مع الفلترة والبحث والترتيب | `?page=1&limit=10&sort=-price&price[gte]=100&keyword=...` |
| `GET` | `/api/v1/products/:id` | Public | جلب تفاصيل منتج واحد محدد | Param: `id` |
| `POST` | `/api/v1/products` | Admin | إنشاء منتج جديد (رفع الصورة الأساسية وصور المعرض) | `multipart/form-data` (`imageCover`, `images[]`, `title`, `description`, `price`, `category`, إلخ) |
| `PUT` | `/api/v1/products/:id` | Admin | تعديل بيانات منتج | Param: `id`, بيانات التعديل |
| `DELETE`| `/api/v1/products/:id` | Admin | حذف منتج بالـ ID | Param: `id` |
| `POST` | `/api/v1/products/:id/apply-coupon`| User | تطبيق كوبون خصم على سعر منتج معين | Param: `id`, Body: `{ "coupon": "NAME" }` |
| `GET` | `/api/v1/products/:productId/reviews` | Public | جلب جميع تقييمات هذا المنتج بالتحديد | Param: `productId` |
| `POST` | `/api/v1/products/:productId/reviews` | User | إضافة تقييم ومراجعة للمنتج | Param: `productId`, Body: `{ "ratings", "title" }` |

---

## 4. التصنيفات الرئيسية (Categories)
المسار الأساسي: `/api/v1/categories`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/categories` | Public | جلب قائمة التصنيفات الرئيسية | `?page=1&limit=20` |
| `GET` | `/api/v1/categories/:id` | Public | جلب تصنيف محدد بالـ ID | Param: `id` |
| `POST` | `/api/v1/categories` | Admin, Manager | إضافة تصنيف جديد (مع رفع صورة `image`) | `multipart/form-data` (`name`, `image`) |
| `PUT` | `/api/v1/categories/:id` | Admin, Manager | تعديل تصنيف محدد | Param: `id`, (`name`, `image`) |
| `DELETE`| `/api/v1/categories/:id` | Admin | حذف تصنيف | Param: `id` |
| `GET` | `/api/v1/categories/:categoryId/subcategories` | Public | جلب التصنيفات الفرعية التابعة لهذا القسم فقط | Param: `categoryId` |
| `POST` | `/api/v1/categories/:categoryId/subcategories` | Admin, Manager | إضافة تصنيف فرعي داخل هذا القسم مباشرة | Param: `categoryId`, Body: `{ "name" }` |

---

## 5. التصنيفات الفرعية (SubCategories)
المسار الأساسي: `/api/v1/subcategories`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/subcategories` | Public | جلب جميع التصنيفات الفرعية | `?page=1&limit=20` |
| `GET` | `/api/v1/subcategories/:id` | Public | جلب تصنيف فرعي محدد | Param: `id` |
| `POST` | `/api/v1/subcategories` | Admin, Manager | إضافة تصنيف فرعي جديد | `{ "name", "category": "<CATEGORY_ID>" }` |
| `PUT` | `/api/v1/subcategories/:id` | Admin, Manager | تعديل تصنيف فرعي | Param: `id`, `{ "name", "category" }` |
| `DELETE`| `/api/v1/subcategories/:id` | Admin | حذف تصنيف فرعي | Param: `id` |

---

## 6. الماركات (Brands)
المسار الأساسي: `/api/v1/brands`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/brands` | Public | جلب جميع الماركات والبراندات | `?page=1&limit=20` |
| `GET` | `/api/v1/brands/:id` | Public | جلب ماركة معينة بالـ ID | Param: `id` |
| `POST` | `/api/v1/brands` | Admin, Manager | إضافة ماركة جديدة (مع رفع لوجو `image`) | `multipart/form-data` (`name`, `image`) |
| `PUT` | `/api/v1/brands/:id` | Admin, Manager | تعديل بيانات ماركة | Param: `id`, (`name`, `image`) |
| `DELETE`| `/api/v1/brands/:id` | Admin | حذف ماركة | Param: `id` |

---

## 7. سلة المشتريات (Cart)
المسار الأساسي: `/api/v1/cart`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/cart` | User | جلب سلة المشتريات الخاصة بالمستخدم الحالي | لا يوجد |
| `POST` | `/api/v1/cart` | User | إضافة منتج إلى سلة المشتريات | `{ "productId": "...", "color": "red" }` |
| `DELETE`| `/api/v1/cart` | User | تفريغ وحذف سلة المشتريات بالكامل | لا يوجد |
| `PUT` | `/api/v1/cart/applyCoupon` | User | تطبيق كود خصم على إجمالي السلة | `{ "coupon": "COUPON_NAME" }` |
| `PUT` | `/api/v1/cart/:itemId` | User | تعديل كمية منتج موجود في السلة | Param: `itemId`, Body: `{ "count": 3 }` |
| `DELETE`| `/api/v1/cart/:itemId` | User | حذف عنصر معين من السلة | Param: `itemId` |

---

## 8. الطلبات والدفع (Orders & Checkout)
المسار الأساسي: `/api/v1/orders`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `POST` | `/api/v1/orders/:cartId` | User | إنشاء طلب دفع عند الاستلام (Cash On Delivery) | Param: `cartId`, Body: `{ "shippingAddress": { "details", "phone", "city", "postalCode" } }` |
| `GET` | `/api/v1/orders/checkout-session/:cartId` | User | إنشاء جلسة دفع إلكتروني عبر Stripe (Stripe Session) | Param: `cartId` |
| `POST` | `/api/v1/orders/checkout-session/:cartId` | User | رابط إضافي لإنشاء جلسة Stripe | Param: `cartId` |
| `GET` | `/api/v1/orders` | User, Admin, Manager | جلب الطلبات (للمستخدم: طلباته فقط، للإدمن: كل الطلبات) | Query Params للفلترة والترتيب |
| `GET` | `/api/v1/orders/:id` | Authenticated | جلب تفاصيل طلب محدد برقم الـ ID | Param: `id` |
| `PUT` | `/api/v1/orders/:id/pay` | Admin, Manager | تحديث حالة الطلب إلى "مدفوع" (Paid) | Param: `id` |
| `PUT` | `/api/v1/orders/:id/deliver` | Admin, Manager | تحديث حالة الطلب إلى "تم التوصيل" (Delivered) | Param: `id` |

---

## 9. قائمة الرغبات (Wishlist)
المسار الأساسي: `/api/v1/wishlist`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/wishlist` | User | جلب قائمة المنتجات المفضلة للمستخدم | لا يوجد |
| `POST` | `/api/v1/wishlist` | User | إضافة منتج إلى المفضلة | `{ "productId": "PRODUCT_ID" }` |
| `DELETE`| `/api/v1/wishlist/:productId` | User | إزالة منتج من المفضلة | Param: `productId` |

---

## 10. عناوين الشحن (Addresses)
المسار الأساسي: `/api/v1/addresses`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/addresses` | User | جلب جميع عناوين الشحن المحفوظة للمستخدم | لا يوجد |
| `POST` | `/api/v1/addresses` | User | إضافة عنوان شحن جديد | `{ "alias": "Home", "details": "...", "phone": "...", "city": "Cairo", "postalCode": "12345" }` |
| `PUT` | `/api/v1/addresses/:addressId` | User | تعديل عنوان شحن مسجل | Param: `addressId`, Body: بيانات العنوان |
| `DELETE`| `/api/v1/addresses/:addressId` | User | حذف عنوان شحن محدد | Param: `addressId` |

---

## 11. التقييمات (Reviews)
المسار الأساسي: `/api/v1/reviews`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/reviews` | Public | جلب كل التقييمات | `?page=1&limit=10` |
| `GET` | `/api/v1/reviews/:id` | Public | جلب تقييم محدد بالـ ID | Param: `id` |
| `POST` | `/api/v1/reviews` | User | إنشاء تقييم جديد لمنتج | `{ "title": "Good product", "ratings": 4.5, "product": "PRODUCT_ID" }` |
| `PUT` | `/api/v1/reviews/:id` | User (صاحب التقييم) | تعديل التقييم الخاص بي | Param: `id`, `{ "title", "ratings" }` |
| `DELETE`| `/api/v1/reviews/:id` | User (صاحبه) / Admin / Manager | حذف التقييم | Param: `id` |

---

## 12. كوبونات الخصم (Coupons)
المسار الأساسي: `/api/v1/coupons`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/coupons` | Admin, Manager | جلب قائمة جميع الكوبونات | لا يوجد |
| `POST` | `/api/v1/coupons` | Admin, Manager | إنشاء كوبون خصم جديد | `{ "name": "SUMMER2026", "expire": "2026-12-31", "discount": 20 }` |
| `GET` | `/api/v1/coupons/:id` | Admin, Manager | جلب بيانات كوبون محدد | Param: `id` |
| `PUT` | `/api/v1/coupons/:id` | Admin, Manager | تعديل كوبون محدد | Param: `id`, `{ "name", "expire", "discount" }` |
| `DELETE`| `/api/v1/coupons/:id` | Admin, Manager | حذف كوبون محدد | Param: `id` |

---

## 13. مفاتيح الـ API (ApiKeys)
المسار الأساسي: `/api/v1/apikeys`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | Body / Params |
|---|---|---|---|---|
| `GET` | `/api/v1/apikeys` | Authenticated (JWT) | عرض جميع مفاتيح الـ API التي أنشأتها | لا يوجد |
| `POST` | `/api/v1/apikeys` | Authenticated (JWT) | توليد وإنشاء API Key جديد | `{ "name": "Frontend Integration", "role": "user", "permissions": ["read", "write"], "description": "Key for external service" }` |
| `DELETE`| `/api/v1/apikeys/:id` | Authenticated (JWT) | حذف وإلغاء تنشيط API Key | Param: `id` |

---

## 14. لوحة التحكم (Dashboard)
المسار الأساسي: `/api/v1/dashboard`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | تفاصيل الاستجابة (Response) |
|---|---|---|---|---|
| `GET` | `/api/v1/dashboard/stats` | Admin, Manager | إحصائيات عامة للمتجر | يرجع: إجمالي المستخدمين، المنتجات، الطلبات، الأقسام، إجمالي الإيرادات (Total Revenue)، وآخر 10 طلبات |

---

## 15. الإشعارات (Notifications)
المسار الأساسي: `/api/v1/notifications`

| Method | Endpoint | الصلاحية (Access) | الوصف (Description) | نوع الاتصال |
|---|---|---|---|---|
| `GET` | `/api/v1/notifications/stream` | Authenticated (JWT) | بث الإشعارات المباشرة للمستخدم عبر Server-Sent Events | SSE Stream (`text/event-stream`) |

---

## 16. الملفات والصور الاستاتيكية (Static Assets)

| Method | Endpoint / Prefix | الوصف |
|---|---|---|
| `GET` | `/uploads/...` | الوصول لجميع الملفات المرفوعة |
| `GET` | `/products/...` | صور المنتجات المرفوعة |
| `GET` | `/categories/...` | صور التصنيفات المرفوعة |
| `GET` | `/brands/...` | لوجوهات وصور الماركات |
| `GET` | `/users/...` | الصور الشخصية للمستخدمين |

---

## 💡 نصائح وطريقة الاستخدام السريع (Quick Tips)

1. **تسجيل الدخول واستخراج الـ Token:**
   - قم بعمل `POST` إلى `/api/v1/auth/login`.
   - خذ التوكن من حقل `token` في الـ Response.
   - ضعه في الـ Header لأي طلب محمي: `Authorization: Bearer <TOKEN>`.
2. **استخدام الـ API Key:**
   - بعد توليد المفتاح من `/api/v1/apikeys`، يمكنك إرساله في الـ Header: `x-api-key: <KEY>`.
3. **ملفات Postman و OpenAPI الجاهزة في المشروع:**
   - ملف Postman Collection جاهز للاستيراد: `web api/apidog_postman_collection.json`
   - ملف OpenAPI Specification جاهز لـ Swagger/Apidog: `web api/apidog_openapi_spec.json`
