> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# Navigation

ساختار ناوبری از تصمیم‌های D10-02، D10-18 تا D10-21 می‌آید. شکل: کپسول شیشه‌ای شناور، تب‌های فقط‌آیکون، تب فعال قرص جوهری با برچسب، و دکمه جدای «رزرو» مشتری.

## نوار بالا (`.rv-topbar`)

زمینه صفحه را می‌دهد، نه هویت کاربر. نام و عکس خود کاربر فقط در سرکشوی «بیشتر» است.

- **خانه مشتری:** لوگو (`.rv-logo-ink`) و زنگ اعلان.
- **داشبورد آرایشگر و مدیر:** لوگو، روز و تاریخ («یکشنبه ۱۹ مهر») و زنگ. واژه «امروز» در نوار نیست (D10-21).
- **مدیر کل، در همه صفحه‌ها:** دکمه آیکونی مرکز اقدام (`ri-pending`) با عدد بنفش موارد باز.
- **صفحه‌های دارای Scope** (تقویم، درخواست‌ها، نوبت‌ها؛ فقط مدیر): Segmented دوبخشی **«من / آرایشگر ▾»** (`f-scope` + `rv-seg`؛ منوی آرایشگر `rv-menu` + `f-scope-menu`)، بالاترین عنصر زیر نوار بالا؛ زبانه‌های وضعیت یا زمان زیر آن می‌آیند (D10-112، D10-131). «همه سالن» نیست. Scope داده را عوض می‌کند، نه نقش را؛ در داشبورد، مرکز اقدام، مشتری‌ها و رزرو دستی Scope نیست. روی کارت یا ردیفی که مال آرایشگر دیگری است نام او (`f-who`) می‌آید.
- **صفحه داخلی:** بازگشت (`ri-arrow-right`)، عنوان، و اقدام همان صفحه.

## نشان‌ها (D10-04)

| نشان | معنا |
| --- | --- |
| `.rv-dot.is-ink` | اعلان خوانده‌نشده (پیش‌فرض `.rv-dot` هم جوهری است) |
| `.rv-count.is-plum`، `.rv-nav__badge.is-plum` | تعداد موارد باز منتظر اقدام: مرکز اقدام، درخواست‌های باز |

- شمار زمینه‌ای (مثل «۱ فعال») متن خاکستری است، نه نشان. نام دسترس‌پذیر هر نشان تعداد را می‌گوید.
- قرمز برای نشان به کار نمی‌رود؛ قرمز یعنی شکست یا تخلف.

## نوار پایین شناور (`.rv-dock`)

| نقش | تب‌ها | دکمه جدا |
| --- | --- | --- |
| مشتری | خانه (`ri-home`)، درخواست‌ها (`ri-inbox`)، نوبت‌ها (`ri-scissors`)، بیشتر (`ri-menu`) | «رزرو» (`.rv-dock__book`) |
| آرایشگر و مدیر کل (یکسان) | داشبورد (`ri-grid`)، تقویم (`ri-calendar`)، درخواست‌ها (عدد بنفش)، مشتری‌ها (`ri-users`)، بیشتر | — |

```html
<div class="rv-dock rv-dock--book">
  <nav class="rv-nav rv-glass-strong" aria-label="ناوبری مشتری">
    <a href="/customer" aria-current="page" aria-label="خانه"><span class="rv-nav__ic"><i class="ri ri-home"></i></span><span class="rv-nav__l">خانه</span></a>
    <a href="/customer/requests" aria-label="درخواست‌ها"><span class="rv-nav__ic"><i class="ri ri-inbox"></i></span><span class="rv-nav__l">درخواست‌ها</span></a>
    <a href="/customer/appointments" aria-label="نوبت‌ها"><span class="rv-nav__ic"><i class="ri ri-scissors"></i></span><span class="rv-nav__l">نوبت‌ها</span></a>
    <a href="#more" aria-label="بیشتر"><span class="rv-nav__ic"><i class="ri ri-menu"></i></span><span class="rv-nav__l">بیشتر</span></a>
  </nav>
  <a href="/customer/book" class="rv-dock__book" aria-label="رزرو نوبت"><i class="ri ri-calendar-plus"></i><span>رزرو</span></a>
</div>
```

- آیکن تقویم فقط برای کارکنان است؛ «نوبت‌ها»ی مشتری قیچی است (D10-20).
- **دکمه رزرو:** برچسب پیدا «رزرو»، نام دسترس‌پذیر «رزرو نوبت».
  - در جریان رزرو هیچ تبی فعال نیست و دکمه `aria-current="page"` با حلقه جوهری می‌گیرد.
  - **مشتری غیرفعال:** `aria-disabled="true"` با آیکن قفل (`ri-lock`)، زمینه گچی؛ پنهان نمی‌شود و دلیلش یک خط داخل صفحه است.
- `.rv-dock--book` تب‌ها را کمی فشرده‌تر می‌کند (`gap: 0`، تب فعال `0 12px 0 10px`) تا برچسب «درخواست‌ها» در تب فعال بریده نشود و هر دو در عرض ۳۶۰px جا شوند. هدف لمسی ۴۴px می‌ماند.
- هر تب `aria-label` دارد، چون برچسب فقط در تب فعال دیده می‌شود.
- **عدد بنفش «درخواست‌ها»:** برای آرایشگر و مدیر یکسان، شمار درخواست‌های باز منتظر پاسخ همان کاربر (D10-19). آرایشگر غیرفعال این عدد را ندارد.
- **«بیشتر»:** کشوی کناری از چپ باز می‌کند (`MoreDrawer` در `Overlays`)، نه صفحه جدا. وقتی کاربر در یکی از صفحه‌های داخل کشوست، تب «بیشتر» فعال است و نوار بالا بازگشت دارد.
- صفحه‌های جزئیات پنل نوار پایین را با تب فعال نگه می‌دارند (D10-41). قدمی که اقدام پایانی دارد، نوار اقدام را جای نوار پایین می‌گذارد (D10-22). صفحه نتیجه نوار پایین ندارد (D10-36).
- `.rv-dock--static` برای نمایش بیرون از قاب صفحه.
