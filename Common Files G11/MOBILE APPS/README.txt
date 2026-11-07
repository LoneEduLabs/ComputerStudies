PROTECTED RELEASE BUILD
  The JavaScript (app.js) is obfuscated, the CSS and HTML are minified, and the app and module JSON files in apps/ are encoded.
  The app loads encoded and plain JSON the same way, so you can still add your own apps and modules as ordinary readable JSON files
  (see apps/_template/app.json for the format). Encoded files cannot be edited by hand; keep your readable source copy to make changes.
  The Android package made by the studio also contains an obfuscated copy of the runtime.

APP DEVELOPMENT STUDIO  -  Learn by Building. Create by Doing.

HOW TO RUN
  Double-click index.html (Chrome, Edge, Firefox or Safari). No installation and no internet needed.
  On every load the studio first asks for the student's SID, name and grade (saved on the device), then shows the module dashboard of the last app you used (School App-1 the first time). To switch apps or load a
  JSON file, click the app title at the top of the dashboard.

WHAT IS IN THIS FOLDER
  index.html   page layout (also holds an embedded copy of the JSON so it works from disk)
  styles.css   all styling
  app.js       the studio (guided steps, validation, commands, Run, Preview, Android export)
  apps/
    index.json                         the list of apps shown on "Your apps"
    school-app-1/app.json              School App-1: id, title, weeks, badges, collections, built-in content and its module list
    school-app-1/modules/01-welcome.json ... 09-cyber-safety.json    the nine modules (one JSON file each)
    student-dismissal-app/app.json     Student Dismissal App: welcome screen, student details, dismissal request (calendar), my requests, dismissal slip
    student-dismissal-app/modules/     its five modules (01-welcome.json ... 05-dismissal-slip.json)
    _template/app.json                 a starting point for your next app (not listed, so it is hidden until you add it)

HOW JSON IS LOADED
  * Served by a web server (GitHub Pages, Netlify, "python -m http.server" ...): the studio reads the JSON files
    in apps/ on every reload, so editing a file changes the app straight away.
  * Opened by double-click (file://): browsers block reading local files, so the studio uses the copy embedded
    in index.html. To try an edited JSON file, press "Load JSON..." (or drop the file onto the page). Loaded files are
    checked, kept in this browser, and shown on "Your apps".
  * "Load JSON..." accepts: an app file, a module file (it joins the app that is open), or an app file together with
    its module files (select them all at once).

ADD ANOTHER APP
  1. Copy apps/_template to apps/my-app/ and edit app.json (give it a new "id", a "title" and its "modules").
     "modules" can list module files (paths are relative to app.json, e.g. "modules/01.json" or
     "../school-app-1/modules/05-daily-quiz.json" to reuse a module) or contain module objects directly.
  2. Add an entry to apps/index.json:
       { "id": "my-app", "title": "My App", "description": "...", "file": "apps/my-app/app.json" }
  3. Reload. Each app keeps its own saved progress.

APP FILE (app.json)
  id, title, appName (shown on the dashboard and in the finished app), description,
  intro, goals [..], studentWill [..]   (shown in the window that opens when the app is selected),
  lockModules (true by default: finish a module to unlock the next; set false to open all modules),
  collections [{id,label}] (the saved lists the app can count: used by SAVE and by badges),
  badges [{id,name,icon,desc,rule}]  rules: {r:"stat",stat,gte} {r:"module",id} {r:"modules",gte} {r:"step",id}
        {r:"flags",all:[...]} {r:"hintfree",gte} {r:"half"} {r:"colours"},
  homeStats [{label,coll,mode:"count|todo|done"}] (numbers shown on the finished app's Home screen),
  kb {calendar:{weekend:[5,6]} (days that cannot be picked; 0 = Sunday), assistant:[{k:"keywords,comma",r:"reply"}], library:[{title,author,tag}], scenarios:[{q,opts,ans,why}]},
  modules [ "path/to/module.json" or {module} ... ]

MODULE FILE
  id, number, title, icon, week, summary, skills,
  objectives [..]   (shown in the window that opens when the module is selected),
  requires (optional list of module ids that must be completed first; default = the previous module),
  screens [{id,name,builtin?}], startScreen, tools [component types],
  listCollection (default collection for the List component), formScreen, builtinHome, subjectCards,
  steps [ step ... ]

STEP
  id, title, screen, objective, concept, expected, hints [3 strings],
  bridge {why,q,c,w,fb}   the "why" question shown before this step (c = correct answer, w = wrong one),
  do      what the student does:
            {k:"drag", tool, zone, n}            drag a tool into a zone (header | body | footer)
            {k:"edit", type, text | own}         edit the Text content (exact text, or "own" = any text other than the default)
            {k:"cmd", cmds:[...], allow:[...], free, select}   type commands ("free" = the student may use their own words,
                                                  "select" = click that component type first)
            {k:"colour"}                          choose colours with the palette
            {k:"custom", allow:[...]}             anything else (use "subs" and "expect")
  expect  how the studio checks the work (all must pass):
            {type, zone?, text?, own?, textMin?, action?, link?, min?, all?, len?:{prop:n}, screen?, label?, fail?}
            {t:"flag", name}   {t:"screen", is}   {t:"colours", min}   {t:"named", name:"quotesSeen|quotesFixed|answer", ...}
  subs    optional explicit sub-steps for custom steps: {t, code?, tab?, panel?, ack?, hot:[...], done:{...}}
            hot: "tool:header" "zone:body" "comp:card" "prop" "tab:console" "cmd" "run" "check" "next" "topRun" "colours"
                 "palette" "screenTab:id" "runBtn:Label" "runInput" "runDate" "runChoice" "runChat" "runSearch" "runComp:list"
            done: {met} {flag} {sel} {run} {runScreen} {runInput} {runChoice} {runDate} {palette} {cmdEq} {cmdRe} {ack} {any:[...]}

COMPONENT TYPES   header logo card text input date time calendar choice button list latest timetable quiz chat achievements library safety
COMMANDS          ADD <type> "text"   ADD CHOICE "label" OPTIONS "a,b,c"   ADD QUESTION "q" ANSWER "right" OR "wrong"...
                  ADD RULE "keywords" REPLY "answer"   ADD BADGE "name" FOR "collection" AT n   ADD BOOK "t" BY "a" TAG "t"
                  ADD TIP "text"   ADD CALENDAR "label"   ADD TIME "label"   ADD LATEST "title"   SET TEXT "text"   SET ACTION "button" SAVE "collection" [WITH "other collection"] | OPEN FORM
                  LINK BUTTON "button" TO "screen"   NAVIGATE TO "screen"   HELP   CLEAR

PUBLISH TO GOOGLE PLAY
  When every module is complete press "Publish to Google Play" on the dashboard. The studio builds a ZIP with an installable
  offline web app, icons, a store listing, a privacy policy and a step-by-step guide. A free tool (PWABuilder) turns it into the
  Android file Google Play accepts. A teacher or the school should hold the Google Play developer account.


STUDENT DETAILS AND PDF REPORT
  The studio asks for SID, name and grade on load. The "PDF" button in the footer (and in the workspace) downloads a report with the
  student details, the app name, the steps completed today and a screenshot of every screen built in the modules worked on today.

STEP LENGTH AND STYLING
  Every step has at least 7 sub-steps before Next Step. After the step's own task, the student styles an element in the style box
  (background, text colour, border colour, border thickness, corner roundness, text size). To switch this off, set "styleSubsteps": false
  in app.json (whole app) or in a module file.

LOGO
  The logo shown at the top right of the page is images/logo.png. Replace that file with your own logo (same name, a square PNG
  works best). The single-file version (alrowad-studio.html) contains a built-in copy of the placeholder logo.

TYPING COMMANDS IN EVERY STEP
  Every step ends with a typing step, just before Check My Work: the student types LOCK STATUS and presses Run Commands. It prints whether the
  step is ready for Check My Work and which modules are open or locked. (Switch off with "lockStatus": false in app.json or a module file.)
  Steps that teach commands (such as ADD CARD) have their own typing sub-steps as well, so each step has 1 to 3.

PDF REPORT LAYOUT
  Page 1: student details table, module introduction and a screenshot of the instruction panel and mobile canvas.
  Page 2 onwards: the steps completed today (left column) beside screenshots of each screen (right column).
