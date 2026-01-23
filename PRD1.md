PRD — DataMate: אפליקציה לניתוח ושליפת נתונים מקובצי CSV/Excel

1) תקציר מנהלים (Executive Summary)

DataMate היא אפליקציה אינטראקטיבית מבוססת Web שמאפשרת למשתמשים להעלות קובצי CSV/Excel ולבצע עליהם פעולות נפוצות של ניתוח טבלאי: סינון, מיון, שליפות/בחירת עמודות, חישובי סכום/ממוצע/מינימום/מקסימום/ספירה, וכן השוואה בין תקופות — בצורה פשוטה וברורה, ישירות על הדאטה הגולמית, ללא צורך באקסל/תוכנות BI מסורתיות.

פרויקט AI

המערכת תדגיש אמינות: כל החישובים יתבצעו דטרמיניסטית בקוד (לא “ניחוש” של AI) — כלי AI/LLM יכולים לסייע בתהליך הפיתוח (תכנון/קוד/ליטוש UI), אבל התוצאות למשתמש חייבות להיות מבוססות נתונים בלבד.

פרויקט AI

פרויקט AI

2) מטרות, לא-מטרות והנחות

2.1 מטרות (Goals)

הנגשת ניתוח נתונים למשתמש לא טכני: לאפשר “להעלות קובץ ולהבין אותו” מהר.פרויקט AI

פעולות בסיסיות ושכיחות: סינון/מיון/חישובים (סכומים, ממוצעים וכו’).פרויקט AI

השוואה בין תקופות: כלי ברור להגדרת שתי תקופות והשוואת מדדים.פרויקט AI

אמינות ושקיפות: התוצאות מחושבות בקוד, עם הצגת “איך חושב” ברמה מספקת (נוסחה/הגדרות/כמה שורות נכנסו).פרויקט AI

UX מודרני ונעים: ממשק “קלאסי” של Data App: פאנל פעולות + טבלה + תוצאות/מדדים + הודעות מצב.

2.2 לא-מטרות (Non-Goals)

לא מערכת BI מלאה (דשבורדים מורכבים, חיבורי DB, ETL אוטומטי, הרשאות ארגוניות).

לא “צ’אט חופשי שממציא תובנות”: אין להציג מסקנות שאינן נתמכות בדאטה.פרויקט AI

לא ניהול קבצים בענן (ב-MVP). הקובץ נטען מקומית בדפדפן.

2.3 הנחות עבודה (Assumptions)

המשתמשים מעלים קבצים עד גודל סביר (למשל 5–30MB ב-MVP).

נתונים טבלאיים עם שורת כותרות (Header row).

עיבוד בצד לקוח (Client-side) אפשרי לרוב שימושים בסיסיים.

3) קהל יעד (Target Audience) ו-Personas

Persona A — “סטודנטית/משתמשת לא טכנית”

מעלה קובץ מהאוניברסיטה/עבודה, רוצה סינון מהיר וחישוב סכומים.

כאב: אקסל מבלבל, Pivot מורכב, רוצה “כפתור”.

יעדים:

לדעת כמה שורות יש, לסנן לפי עמודה, לחשב “סה״כ” או “ממוצע”, לייצא מסונן.

Persona B — “משתמש טכני קל”

רוצה לבצע בדיקות מהירות לפני ניתוח עמוק יותר בפייתון/אקסל.

יעד: חיפוש מהיר, בדיקת outliers, השוואת תקופות.

4) מקרי שימוש מרכזיים (Use Cases)

העלאת קובץ CSV/Excel וטעינה לטבלה.פרויקט AI

בחירת עמודות לצפייה (שליפה).

סינון לפי עמודה (טקסט: “מכיל”; מספר: טווח; תאריך: בין).

מיון לפי עמודה ובחירת סדר עולה/יורד.

חישוב מדד על עמודה: sum/avg/min/max/count.פרויקט AI

השוואה בין תקופות לפי עמודת תאריך (Period A vs Period B) והצגת הבדל/שינוי אחוזי.פרויקט AI

ייצוא של הנתונים המסוננים ל-CSV.

דוגמה מובנית (Sample dataset) לצורך דמו/בדיקות.פרויקט AI

5) זרימות משתמש (User Journeys)

Journey 1 — העלאה ➜ סינון ➜ מדד

Landing: מסך נקי + Dropzone

העלאת קובץ

צפייה בטבלה

בחירת עמודה לסינון + הקלדת ערך

Apply

בחירת עמודה למדד + “ממוצע”

הצגת תוצאה + N שורות שהשתתפו

תנאי הצלחה: המשתמשת מקבלת תוצאה נכונה, מבינה מה חושב ועל מה.

Journey 2 — Excel עם כמה גיליונות

העלאת .xlsx

Select sheet

הטבלה מתעדכנת

פעולות רגילות

Journey 3 — השוואת תקופות

בחירת עמודת תאריך

בחירת תקופה A + תקופה B

בחירת metric (למשל sum של Amount)

הצגת A, B, Δ, %Δ

6) דרישות פונקציונליות (Functional Requirements)

6.1 העלאת קבצים ופרסור

FR-1: תמיכה ב-CSV

זיהוי delimiter בסיסי (לפחות פסיק; אופציונלי: ; )

תמיכה ב-quoted fields

זיהוי שורת כותרות כברירת מחדל

FR-2: תמיכה ב-Excel (XLSX/XLS)

רשימת Sheets

בחירת Sheet משנה את הדאטה הפעיל

FR-3: Validations בעת טעינה

קובץ ריק ➜ שגיאה “אין נתונים”

אין header ברור ➜ הצעה “השתמש בשורה 1 ככותרות / תן כותרות אוטומטיות”

שורות עם אורך לא אחיד ➜ להשלים ערכים חסרים ל-empty

FR-4: מצב Loading

Spinner/הודעת מצב: “טוען…”

חסימת כפתורים עד סיום טעינה

6.2 תצוגת טבלה (Data Grid)

FR-5: הצגת טבלה עם כותרות, גלילה, Sticky headerFR-6: הגבלת תצוגה (50/100/250/500/1000) — כדי לשמור UX מהירFR-7: הצגת סטטוס: מספר שורות, מספר עמודות, שם קובץ, שם גיליון (אם יש)

6.3 שליפות / בחירת עמודות (Projection)

FR-8: אפשרות לבחור אילו עמודות מוצגות

Multi-select

“Select all / Clear all”

שמירת סדר העמודות לפי סדר מקורי כברירת מחדל

הצגת “X מתוך Y עמודות מוצגות”

6.4 סינון (Filtering)

FR-9: סינון טקסטואלי: “מכיל” (case-insensitive)FR-10: סינון מספרי: טווח (min/max)FR-11: סינון תאריך: between + presets (Today/Last 7 days/This month)FR-12: תמיכה במספר פילטרים במקביל (AND)

פילטרים מוצגים כ-Chips, כל Chip ניתן להסרהFR-13: “Reset Filters” מחזיר לדאטה המקורי

6.5 מיון (Sorting)

FR-14: מיון לפי עמודה אחת (MVP)FR-15: זיהוי אוטומטי של מספרים/תאריך לצורך מיון נכוןFR-16: כפתור toggle “עולה/יורד”Stretch: מיון multi-column (לא חובה ב-MVP)

6.6 חישובים בסיסיים (Metrics)

בהתאם להצעה: סכומים וממוצעים ועוד פעולות נפוצות.

פרויקט AI

FR-17: בחירת עמודה + סוג חישוב:

Sum

Average

Min

Max

Count non-emptyFR-18: הצגת פירוט:

N שורות לאחר סינון

N מספריים (אם יש המרה מספרית)

טיפול ב-NaN/Empty: לא נספרים כחלק מהחישוב המספריFR-19: תוצאות עגולות להצגה (formatting):

אלפי מפריד

עד 6 ספרות אחרי נקודה (ניתן לשינוי בהגדרות)

אמינות: כל החישובים דטרמיניסטיים בקוד.

פרויקט AI

6.7 השוואה בין תקופות (Core Feature)

בהתאם להצעה: “השוואה בין תקופות”.

פרויקט AI

FR-20: המשתמש בוחר:

עמודת תאריך (Date column)

תקופה A: start/end

תקופה B: start/end

מדד: (Sum/Avg/Count) על עמודה מספרית (למשל Amount)FR-21: הצגת תוצאות:

A_value

B_value

Δ = B - A

%Δ = (B - A) / A (אם A≠0)

N שורות בכל תקופהFR-22: וולידציה:

אם אין עמודת תאריך תקינה ➜ הודעת שגיאה + הסבר

אם התאריכים לא בסדר (start>end) ➜ חסימת Apply + הודעה

6.8 ייצוא (Export)

FR-23: ייצוא ל-CSV של הדאטה אחרי סינון/מיון

כולל רק עמודות מוצגות (אם Projection מופעל)

שם קובץ: <original>_filtered.csvFR-24: ייצוא “Report” (Stretch):

סיכום פעולות + מדדים + תקופות + timestamps

6.9 דוגמת נתונים (Sample)

FR-25: כפתור “דאטה לדוגמה” שמטעין dataset קטן לצורך הדגמה ובדיקות.

פרויקט AI

7) UX/UI — דרישות ויזואליות מדויקות

7.1 עקרונות עיצוב (Design Principles)

Clarity first: הטבלה מרכזית, פעולות בצד, תוצאות תמיד מסבירות “על מה חושב”.

No dead ends: תמיד כפתור Back/Reset; אם משהו נכשל — הודעה פרקטית.

Progress & Feedback: loading, success, empty state, error state.

Accessible: ניגודיות, פונט קריא, ניווט מקלדת.

7.2 מבנה מסך (Layout)

Desktop (>= 980px)

Grid של 2 עמודות:

Left Panel (380–420px): העלאה, סינון/מיון, חישובים, תקופות, כפתורי פעולה

Right Panel (flex): טבלה + סטטוס

Mobile/Tablet (< 980px)

Stack:

העלאה + פילטרים + חישובים למעלה

הטבלה מתחת

CTA כפתור “Apply” נגיש (sticky bottom optional)

7.3 Wireframe טקסטואלי (ASCII)

┌───────────────────────────────────────────────────────────────┐

│  DataMate  |  [דאטה לדוגמה] [ייצוא] [איפוס]                   │

└───────────────────────────────────────────────────────────────┘

┌──────────── Left Panel ────────────┐  ┌──────── Right Panel ────────┐

│ העלאת קובץ                          │  │ תצוגת נתונים                 │

│ [Dropzone / Select file]            │  │ Status: Loaded | Rows | Cols  │

│ Sheet: [בחר]   Limit: [100]         │  │ ┌──────── Table ────────────┐│

│-------------------------------------│  │ │ headers (sticky)           ││

│ סינון ומיון                         │  │ │ rows...                    ││

│ Filter col [ ]  text [____]         │  │ └───────────────────────────┘│

│ Sort col   [ ]  dir  [asc/desc]     │  └──────────────────────────────┘

│ [Apply] [Clear]                     │

│-------------------------------------│

│ חישובים                             │

│ Metric col [ ]  Type [sum/avg...]   │

│ [חשב]   Result: X   N rows: Y       │

│-------------------------------------│

│ השוואת תקופות (Date col + A/B)      │

│ Date col [ ]                         │

│ A: [start][end]  B: [start][end]     │

│ Metric: sum(Amount)                  │

│ [השווה]  A=... B=... Δ=... %Δ=...     │

└─────────────────────────────────────┘

7.4 שפה ויזואלית (Design System)

Theme: Dark modern (אפשר גם toggle ל-Light כ-Stretch)

Background: #0b1020

Cards: rgba(255,255,255,0.06–0.10)

Accent Primary: סגול/כחול (למשל #7c5cff)

Accent Success: ירוק (למשל #19c37d)

Danger: ורוד/אדום (#ff5c7a)

Typography:

פונט עברית מודרני: Heebo / Rubik

H1: 20–24px bold

Section titles: 15–16px extra-bold

Labels: 12–13px semi-bold

Table cells: 13px

Spacing & Radii:

Radius cards: 16–20px

Buttons: 14–16px radius

Padding cards: 12–16px

Buttons:

Primary (Apply/Compute/Compare): accent

Secondary (Clear/Reset): neutral

Success (Export): green

Disabled: opacity 0.55 + cursor not-allowed

7.5 רכיבי UI ומצבים (Components & States)

7.5.1 Dropzone / File Uploader

Idle: “גררי CSV/Excel או בחרי קובץ”

Drag hover: גבול מודגש + רקע accent

Loading: spinner + “טוען…”

Success: שורת סטטוס “נטען: filename | rows | cols”

Error: הודעה “לא ניתן לקרוא קובץ”

7.5.2 Data Table

Sticky header

Hover row highlight

Empty state: “אין נתונים (אחרי פילטר)” + CTA “נקה פילטרים”

Error state: אם parsing נכשל ➜ לא להציג טבלה

7.5.3 Filter Chips

מוצגים מעל הטבלה או בתוך הפאנל

לכל chip: Column contains "X" / Amount between 10..50

7.5.4 Toast Notifications

Success: “עודכן”, “ייצוא הושלם”

Error: “פורמט לא נתמך”, “אין מספרים לחישוב”

8) כללי התנהגות נתונים (Data Rules)

8.1 טיפוסים והמרות

Text: תמיד string trim

Number: זיהוי “1,234.56” / “1.234,56” ברמה בסיסית

Date:

תמיכה בפורמטים נפוצים: YYYY-MM-DD, DD/MM/YYYY, Excel serial (אם אפשר)

אם לא ניתן לפרש תאריך: השוואת תקופות לא זמינה עד תיקון/בחירה אחרת

8.2 טיפול בערכים חסרים

Empty/null/undefined:

בפילטר “count non-empty”: לא נספר

במדדים מספריים: לא נכנס ל-sum/avg/min/max

בטבלה: מוצג כריק

9) דרישות לא-פונקציונליות (NFR)

9.1 ביצועים

טעינה ראשונית < 2s (ללא קובץ)

קבצים קטנים/בינוניים: parsing < 2–5s

פעולת פילטר/מיון: < 200ms עד ~20k שורות (במכשיר סביר)

9.2 פרטיות ואבטחה

עיבוד מקומי בדפדפן (MVP)

אין העלאה לשרת כברירת מחדל

Sanitization: לא להכניס HTML מטקסט של תא (מניעת XSS)

Export: יצוא רק מהתצוגה הנוכחית

9.3 נגישות

ניווט מלא עם Tab

aria-label לטבלה ולכפתורים

יחס ניגודיות תקין

גדלי פונט מינימום 12–13px

10) מדידה ואנליטיקות (Analytics) — אופציונלי ב-MVP

לא חובה אם אין backend, אבל אפשר לוגים מקומיים או אירועים:

file_loaded (type, rows, cols)

filter_applied (count filters)

metric_computed (type)

compare_periods_used

export_clicked(הכל אנונימי/לוקאלי אם אין שרת)

11) Scope: MVP מול הרחבות

MVP (חובה)

Upload CSV/Excel + sheet select

Table view + limit rows

Filter (טקסט + בסיסי)

Sort

Metrics בסיסיים

Export filtered

Period comparison (תאריך + A/B + מדד)פרויקט AI

UI polished + empty/error/loading

Stretch (Nice to have)

Multi-filter UI מתקדם + AND/OR

Group By (סיכום לפי קטגוריה)

Charts (bar/line)

Saved “views” (שמירת פילטרים)

Light theme toggle

Report PDF/HTML export

12) דרישות טכניות ו-Workflow פיתוח (בהתאם להצעה)

12.1 Tech Stack מומלץ

Frontend: HTML/CSS/JS (או React אם מרחיבים)

Parsing Excel: SheetJS (xlsx)

Hosting: GitHub Pages

Repo: GitHub + README + דוגמאות CSV פרויקט AI

IDE: VSCode

שימוש בכלי LLM לסיוע בפיתוח/ליטוש ממשק — אבל חישובים דטרמיניסטיים.פרויקט AI

12.2 ארטיפקטים (Deliverables)

PRD (המסמך הזה)פרויקט AI

Sample CSV files לבדיקות פרויקט AI

קוד + README

דמו חי (GitHub Pages)

13) קריטריוני קבלה (Acceptance Criteria)

Upload

Given קובץ CSV תקין, When מעלים, Then מופיעה טבלה עם headers ושורות

Given קובץ Excel עם 2 Sheets, Then רשימת sheets מוצגת וניתן לעבור ביניהם

Filtering

Given פילטר “City contains תל”, Then רק שורות מתאימות מוצגות, ושורת סטטוס מציגה N

Clear Filters מחזיר את כל השורות

Metrics

Given עמודת Amount מספרית, When sum, Then התוצאה תואמת סכום ידני של השורות המסוננות

Given אין ערכים מספריים, Then מוצגת הודעה “אין מספרים לחישוב”

Compare Periods

Given עמודת Date תקינה ושתי תקופות, Then מוצגים A, B, Δ, %Δ ו-N בכל תקופה

Given A=0, Then %Δ מוצג כ-— (מניעת חילוק באפס)

Export

Export מוריד CSV עם העמודות המוצגות והשורות המסוננות בלבד

UI

Empty state ברור

Error messages לא “טכניים מדי”

כפתורים disabled כשאין נתונים

14) בדיקות (QA Plan) — תרחישים

CSV עם פסיקים בתוך גרשיים

CSV עם שורות חסרות עמודות

Excel עם תאריכים כ-serial

פילטר מספרי: min בלבד / max בלבד / שניהם

קובץ גדול: בדיקת responsiveness

RTL: טקסט עברי, כותרות ארוכות

15) סיכונים ומגבלות

דפדפן יכול להיות איטי בקבצים ענקיים (פתרון: pagination/virtualization)

פורמטי תאריך מגוונים (פתרון: UI לבחירת פורמט/הדגמה של parsing)

משתמשים עלולים לצפות “AI מסיק מסקנות” — צריך הצהרת אמינות: “החישובים מבוססי קוד בלבד”.פרויקט AI

16) תכולת מסכים (Screen Specs) — פירוט קונקרטי

Screen 1: Landing (לפני העלאה)

מרכז: Dropzone

טקסט: “תומך CSV/Excel; הכל רץ בדפדפן”

כפתור: “דאטה לדוגמה”

Right panel: Empty state עם הסבר קצר

Screen 2: Loaded

Left panel:

File info + rows/cols

Filters + sort

Metric calculator

Period comparison section (מופיע רק אם יש עמודת תאריך או אחרי בחירה)

Right panel: table

Screen 3: Error

כרטיס Error עם:

מה קרה

איך לפתור

כפתור “נסה שוב / טען דוגמה”