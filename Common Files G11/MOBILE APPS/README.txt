APP DEVELOPMENT STUDIO  -  Learn by Building. Create by Doing.

HOW TO RUN
  Double-click index.html (Chrome, Edge, Firefox or Safari). No installation and no internet needed.
  On every load the studio first asks for the student's SID, name and grade (saved on the device), then shows the module dashboard of the last app you used (School App-1 the first time). To switch apps or load a
  JSON file, click the app title at the top of the dashboard.

WHAT IS IN THIS FOLDER
  index.html   page layout (also holds an embedded copy of the JSON so it works from disk)
  styles.css   all styling
  app.js       the studio (guided steps, validation, commands, Run, Preview, Android export)
  flowchart.js       draws each module's flowchart (ISO flowchart symbols, responsive SVG)
  cloud.js           saves/loads student progress to the Google Sheet
  config.js          paste the Google Sheet web-app URL here (see gsheet/SETUP.md)
  gsheet/Code.gs     the Google Apps Script that keeps the sheet; gsheet/SETUP.md = 5-minute setup
  apps/
    index.json                         the list of apps shown on "Your apps"
    school-app-1/app.json              School App-1: id, title, weeks, badges, collections, built-in content and its module list
    school-app-1/modules/01-welcome.json ... 09-cyber-safety.json    the nine modules (one JSON file each)
    <app>/flowcharts/<module id>.json  one flowchart file per module (see FLOWCHART JSON below)
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
  lockModules (false in this package: all modules are open; set true to unlock them one by one),
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
  steps [ step ... ],
  flowchart ("flowcharts/<id>.json", relative to app.json), mcqs [ {q, a:[correct, wrong, wrong, wrong], why} ] (max 5 are asked),
  reference {screens:{<screen id>:[components]}}   the finished model app shown on the phone beside the flowchart

STEP
  id, title, screen, objective, concept, expected, hints [3 strings],
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

IN-STEP COLOUR / STYLE CHOICES
  A step can carry "styles": [{"target":{"type":"header","text":"My Homework"},"set":{"preset":"gradient","sh":"medium"},"screen":"homework"}]
  During the module the student may choose ANY colour, background, border, shadow or style for those elements (practice).
  The last step of each module ("<id>-style") first clears those practice choices, shows every option, then asks for the exact
  choices one by one (red dot on the exact swatch / chip / Properties button), so the app ends identical to the model app.
  Run tools/make.sh after changing the data (it rebuilds the embedded data).

RUBRIC TAB
  The right panel has a Rubric tab after Commands. It lists every step of the open module, 1 point each: green + "1 pt" when the
  step is passed, red + "0 pt" when not yet.

LOGO
  images/logo.png is shown top right of the page, of the dashboard and of the module overview, and on the model phone.

LOGO
  The logo shown at the top right of the page is images/logo.png. Replace that file with your own logo (same name, a square PNG
  works best). The single-file version (alrowad-studio.html) contains a built-in copy of the placeholder logo.

TYPING COMMANDS IN EVERY STEP
  Every step ends with a practice command, just before Check My Work. The command changes from step to step and fits the elements on the screen
  (for example SET STYLE "success", GIVE NAME "main-title", SET ACTION "Save" MESSAGE "Saved!"). LOCK STATUS still works whenever the student wants it.
  Steps that teach commands (such as ADD CARD) have their own typing sub-steps as well. See WHAT IS NEW IN THIS VERSION for the JSON switches.

PDF REPORT LAYOUT
  Page 1: student details table, module introduction and a screenshot of the instruction panel and mobile canvas.
  Page 2 onwards: the steps completed today (left column) beside screenshots of each screen (right column).

WHAT IS NEW IN THIS VERSION
  Typing in the Properties panel
    The panel no longer redraws while a box has the cursor, so long text (a header, a name, a tooltip) is no longer cut off after a few
    characters. Text fields finish when you press Enter or click away. The guide waits until then before it moves on.

  More to do in every step (Properties panel, six collapsible groups)
    Element ........... text, name (the id in the code), CSS class, tooltip, placeholder, required / optional
    Look and style .... style presets: Default, Primary, Success, Danger, Warning, Info, Dark, Outline, Neumorphism, Glass, Gradient;
                        background, text colour, border colour and thickness, corner roundness, text size, shadow
    Text and layout ... alignment, weight, capitals, space around
    Effects ........... animation (pulse, bounce, glow, shake), hide at start
    Links and actions . link two elements (show / hide, show, hide, focus, mirror what is typed, label, group, screen),
                        button message, clear form
    Checks ............ what the studio looks for in this step
  Everything above also works in Run, Preview and the exported app, and shows in the Code tab (HTML, CSS and JavaScript).

  Commands (type HELP in the Commands tab; they are grouped)
    Select and inspect   SELECT, DESELECT, LIST ELEMENTS, COUNT, INSPECT, SHOW HTML, SHOW CSS, FIND, WHERE AM I, VALIDATE
    Style                SET STYLE "success", SET BACKGROUND, SET COLOR, SET BORDER, SET RADIUS, SET SIZE, SET SHADOW, SET ALIGN,
                         SET WEIGHT, SET CAPITALS, SET SPACING, SET ANIMATION, RESET STYLE
    Name and describe    GIVE NAME, GIVE CLASS, SET TOOLTIP, SET PLACEHOLDER, SET REQUIRED
    Layout and order     HIDE, UNHIDE, DUPLICATE, MOVE UP, MOVE DOWN, DELETE, UNDO
    Links and actions    LINK "a" TO "b" [AS "how"], UNLINK, SHOW LINKS, SET ACTION ... MESSAGE / CLEAR FORM / TOGGLE / SHOW / HIDE / FOCUS
  These work in every step. Commands that a step teaches are still limited to that step.

  Practice command + link step in every step
    Before Check My Work each step asks for: a typed property (name, class or tooltip), a practice command (rotates through about 35
    different commands that fit the elements on the screen, instead of always LOCK STATUS) and a link between two elements.
    Steps that only move to a new screen skip these. To switch them off, add to a step, module or app JSON:
      "practice": false   "linkStep": false   "propStep": false   "styleSubsteps": false   "lockStatus": false

  Module overview: flowchart + model app (new)
    Choosing a module opens a two-column window: the module's flowchart on the left (70%) and the finished, fully working app
    on a phone on the right (30%). Every button on the phone works. The student studies it, because the app they build must
    match it exactly. "Start Creating App" (or "Continue Creating App - Step N of M") opens the guided workspace.
    The final step compares the student's app with the model app and tells them in plain words what differs.

  Exact guided steps (new)
    Every step says what to pick up, where to drop it, which property to change and the exact text to type (shown as code
    chips; click a chip to copy it). Free choices were removed, so every student builds the same app. Colours, shadow,
    corner roundness etc. are an explicit "Style your screen" step.

  Module quiz (new)
    The question after each step was removed. When a module is finished the student answers up to 5 general questions about
    what they just built. Put them in the module JSON:
      "mcqs": [ { "q": "Question?", "a": ["Correct answer", "Wrong 1", "Wrong 2", "Wrong 3"], "why": "Explanation" } ]
    The first answer is the correct one; the studio shuffles the options. 3 or 4 options both work.

  FLOWCHART JSON (one file per module)
    { "title": "...", "nodes": [ {"id","type","label","note?","step?","rowWith?","lane?"} ], "edges": [ {"from","to","label?","route?"} ] }
    type: start | end | process | manual | input | decision | subprocess | display | data | document | connector
    step: the guided step id (or list of ids) the shape belongs to: shapes turn green when done and gold for the current step.
    rowWith: draw this node beside another one (used for the "No" branch of a decision). route:"loop" draws a return arrow.
    Edge "label" is shown on the arrow (Yes / No). Look at any file in apps/*/flowcharts for a working example.

  Student progress in Google Sheets (new)
    Students sign in with SID, name and grade. Progress (every step, the work on the phone, quiz scores) is saved to a Google Sheet by SID,
    and read back at sign-in, so a student carries on at the exact step, on any computer. See gsheet/SETUP.md.
    Without a sheet URL in config.js progress is kept on the device, separately for each SID. The dashboard shows
    "Your progress": overall %, steps and % per module, and a Continue button. A dot beside the student name shows the save status.

  Easy and interactive (added in v11)
    Build a command with clicks ... Commands tab: pick an element, pick what to do, pick a value. The studio writes the real command(s),
                                    shows them, and you press "Run it now" or "Add to commands". No typing needed, and students still see the real code.
    Link mode ...................... button under the guide: tap one element, then the element it controls. The link is made, with an arrow on the phone
                                    (orange = action link, dashed blue = relation link).
    Undo ........................... button under the guide, or Ctrl+Z. Undoes drops, deletes, style choices, properties, links and commands.

Design and Development: Lone Firdous, Faculty: Computer Studies, Higher Grades, Alrowad International Schools


PDF WORK REPORT LAYOUT
  Page 1: student details, module introduction and objectives, then the Steps rubric table
  (Step Number, What is the Step, What is Expected, Points, Points Achieved; continues on the next page if long).
  Next page: Start Module (module window and workspace). Next: Today's work, steps table on the left, screenshots on the right.


OBFUSCATED BUILD
  app.js, cloud.js, flowchart.js and config.js are obfuscated. To change the Google Sheet web app URL, edit config.js in the
  readable source package, then obfuscate again. gsheet/Code.gs stays readable because you paste it into Apps Script.
