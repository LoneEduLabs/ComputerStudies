/* Embedded fallback copy of the question bank, so the app still works
   if it's opened directly (double-clicked) instead of served over http,
   since browsers block fetch() of local files for security. */

window.PRACTICE_DATA = {
  "practiceTests": [
    {
      "id": "Week1-PT",
      "title": "LEVELUP DIGITAL DISCOVERIES",
      "subtitle": "WEEK 1- GRADE 11 PRACTICE TEST",
      "categories": [
        {
          "id": "MULTIPLE-CHOICE QUESTIONS",
          "questions": [
            {
              "question": "Which component is mainly responsible for processing instructions?",
              "options": [
                "Keyboard",
                "Monitor",
                "CPU",
                "Printer"
              ],
              "answer": "CPU"
            },
            {
              "question": "Which of the following is an input component?",
              "options": [
                "Monitor",
                "Keyboard",
                "CPU",
                "SSD"
              ],
              "answer": "Keyboard"
            },
            {
              "question": "Which component is used to display information to the user?",
              "options": [
                "RAM",
                "CPU",
                "Monitor",
                "SSD"
              ],
              "answer": "Monitor"
            },
            {
              "question": "Which component stores files, programs, and the operating system?",
              "options": [
                "Keyboard",
                "SSD",
                "CPU",
                "Monitor"
              ],
              "answer": "SSD"
            },
            {
              "question": "What is the main purpose of input devices?",
              "options": [
                "To display results",
                "To store programs",
                "To enter data and instructions",
                "To perform calculations"
              ],
              "answer": "To enter data and instructions"
            },
            {
              "question": "What do processing components do?",
              "options": [
                "Display information",
                "Work on data and instructions",
                "Print documents",
                "Enter text"
              ],
              "answer": "Work on data and instructions"
            },
            {
              "question": "Which device can produce a physical copy of information?",
              "options": [
                "Mouse",
                "CPU",
                "Printer",
                "RAM"
              ],
              "answer": "Printer"
            },
            {
              "question": "What is the role of the Control Unit?",
              "options": [
                "Store files permanently",
                "Display images",
                "Direct and coordinate CPU activities",
                "Enter data"
              ],
              "answer": "Direct and coordinate CPU activities"
            },
            {
              "question": "What does the Arithmetic Logic Unit (ALU) perform?",
              "options": [
                "Calculations and logical comparisons",
                "File storage",
                "Printing",
                "Keyboard input"
              ],
              "answer": "Calculations and logical comparisons"
            },
            {
              "question": "What do registers temporarily hold?",
              "options": [
                "Printed documents",
                "Data and instructions",
                "Permanent files",
                "Images on the monitor"
              ],
              "answer": "Data and instructions"
            },
            {
              "question": "What does the CPU clock provide?",
              "options": [
                "Permanent storage",
                "Timing signals",
                "User input",
                "Visual output"
              ],
              "answer": "Timing signals"
            },
            {
              "question": "Which sequence represents the basic computer data flow?",
              "options": [
                "Output → Input → Processing",
                "Processing → Output → Input",
                "Input → Processing → Output",
                "Storage → Output → Input"
              ],
              "answer": "Input → Processing → Output"
            },
            {
              "question": "Which device can be used to provide sound as input?",
              "options": [
                "Monitor",
                "Microphone",
                "Printer",
                "Speaker"
              ],
              "answer": "Microphone"
            },
            {
              "question": "Which component provides temporary working memory?",
              "options": [
                "SSD",
                "RAM",
                "Monitor",
                "Keyboard"
              ],
              "answer": "RAM"
            },
            {
              "question": "Which component processes graphics for display?",
              "options": [
                "GPU",
                "Keyboard",
                "SSD",
                "RAM"
              ],
              "answer": "GPU"
            }
          ]
        },
        {
          "id": "MATCHING",
          "questions": [
            {
              "question": "Match Column A with Column B.",
              "left": [
                "Keyboard",
                "CPU",
                "Monitor",
                "SSD",
                "RAM",
                "Control Unit",
                "ALU",
                "Registers",
                "GPU",
                "Printer"
              ],
              "right": [
                "Displays information to the user",
                "Performs calculations and logical comparisons",
                "Stores files, programs, and the operating system",
                "Provides input such as text and commands",
                "Processes instructions and data",
                "Directs and coordinates CPU activities",
                "Provides temporary working memory",
                "Temporarily holds data and instructions",
                "Processes graphics for display",
                "Produces a physical copy of information"
              ],
              "answers": [
                { "left": "Keyboard", "right": "Provides input such as text and commands" },
                { "left": "CPU", "right": "Processes instructions and data" },
                { "left": "Monitor", "right": "Displays information to the user" },
                { "left": "SSD", "right": "Stores files, programs, and the operating system" },
                { "left": "RAM", "right": "Provides temporary working memory" },
                { "left": "Control Unit", "right": "Directs and coordinates CPU activities" },
                { "left": "ALU", "right": "Performs calculations and logical comparisons" },
                { "left": "Registers", "right": "Temporarily holds data and instructions" },
                { "left": "GPU", "right": "Processes graphics for display" },
                { "left": "Printer", "right": "Produces a physical copy of information" }
              ]
            }
          ]
        },
        {
          "id": "DRAG AND DROP",
          "questions": [
            {
              "question": "Drag each item to its correct category.",
              "items": [
                "Keyboard",
                "Mouse",
                "Microphone",
                "CPU",
                "RAM",
                "GPU",
                "Monitor",
                "Printer",
                "SSD",
                "Hard Disk",
                "Registers",
                "ALU"
              ],
              "categories": [
                "Input Components",
                "Processing Components",
                "Output Components",
                "Storage Components"
              ],
              "answers": [
                { "item": "Keyboard", "category": "Input Components" },
                { "item": "Mouse", "category": "Input Components" },
                { "item": "Microphone", "category": "Input Components" },
                { "item": "CPU", "category": "Processing Components" },
                { "item": "RAM", "category": "Processing Components" },
                { "item": "GPU", "category": "Processing Components" },
                { "item": "Registers", "category": "Processing Components" },
                { "item": "ALU", "category": "Processing Components" },
                { "item": "Monitor", "category": "Output Components" },
                { "item": "Printer", "category": "Output Components" },
                { "item": "SSD", "category": "Storage Components" },
                { "item": "Hard Disk", "category": "Storage Components" }
              ]
            }
          ]
        },
        {
          "id": "YES / NO",
          "questions": [
            { "question": "The CPU is the main component responsible for processing instructions.", "answer": "Yes" },
            { "question": "A monitor is an input device used to enter commands.", "answer": "No" },
            { "question": "An SSD can store files and programs even when the computer is turned off.", "answer": "Yes" },
            { "question": "The ALU performs calculations and logical comparisons.", "answer": "Yes" },
            { "question": "The basic computer data flow is Output → Processing → Input.", "answer": "No" }
          ]
        },
        {
          "id": "SHORT ANSWER",
          "questions": [
            { "question": "What are the three basic stages of computer data flow?", "answer": "Input, Processing, and Output." },
            { "question": "What is the main role of the CPU?", "answer": "The CPU processes instructions and data and helps control computer activities." },
            { "question": "What is the difference between RAM and SSD?", "answer": "RAM provides temporary working memory, while an SSD stores files, programs, and the operating system for later use." }
          ]
        }
      ]
    },
    {
      "id": "Week2-PT",
      "title": "LEVELUP DIGITAL DISCOVERIES",
      "subtitle": "WEEK 2- GRADE 11 PRACTICE TEST",
      "categories": [
        {
          "id": "MULTIPLE-CHOICE QUESTIONS",
          "questions": [
            {
              "question": "Which of the following is an example of primary storage?",
              "options": ["SSD", "HDD", "RAM", "DVD"],
              "answer": "RAM"
            },
            {
              "question": "What is the main purpose of RAM?",
              "options": [
                "To store files permanently",
                "To temporarily store data and programs currently being used",
                "To display information",
                "To print documents"
              ],
              "answer": "To temporarily store data and programs currently being used"
            },
            {
              "question": "What happens to the contents of RAM when the computer is turned off?",
              "options": [
                "They are normally lost",
                "They are permanently saved",
                "They are copied to the monitor",
                "They are stored in ROM"
              ],
              "answer": "They are normally lost"
            },
            {
              "question": "Which type of memory stores startup instructions that remain when power is removed?",
              "options": ["RAM", "Cache", "ROM", "SSD"],
              "answer": "ROM"
            },
            {
              "question": "What is the main purpose of cache memory?",
              "options": [
                "To store large files permanently",
                "To keep frequently needed data close to the CPU",
                "To store optical discs",
                "To provide external backup"
              ],
              "answer": "To keep frequently needed data close to the CPU"
            },
            {
              "question": "Which type of storage is normally used for long-term storage?",
              "options": ["Secondary storage", "CPU registers", "Cache memory", "RAM"],
              "answer": "Secondary storage"
            },
            {
              "question": "Which storage device uses electronic memory and has no moving parts?",
              "options": ["HDD", "SSD", "DVD", "CD"],
              "answer": "SSD"
            },
            {
              "question": "Which storage device uses rotating magnetic disks?",
              "options": ["SSD", "USB flash drive", "HDD", "Blu-ray disc"],
              "answer": "HDD"
            },
            {
              "question": "Which storage technology uses a laser to read and write data?",
              "options": ["RAM", "Optical storage", "Cache", "SSD"],
              "answer": "Optical storage"
            },
            {
              "question": "Which device is commonly used to transfer files between computers?",
              "options": ["USB flash drive", "CPU", "RAM", "Monitor"],
              "answer": "USB flash drive"
            },
            {
              "question": "Which unit represents a larger amount of storage?",
              "options": ["GB", "TB", "KB", "Byte"],
              "answer": "TB"
            },
            {
              "question": "What does read speed describe?",
              "options": [
                "How quickly data can be saved",
                "How quickly data can be retrieved",
                "How much data a device can hold",
                "How much power a device uses"
              ],
              "answer": "How quickly data can be retrieved"
            },
            {
              "question": "What does write speed describe?",
              "options": [
                "How quickly data can be saved",
                "How quickly data can be displayed",
                "How much storage is available",
                "How quickly the CPU processes instructions"
              ],
              "answer": "How quickly data can be saved"
            },
            {
              "question": "Which device is generally faster for reading and writing data?",
              "options": ["HDD", "SSD", "DVD", "CD"],
              "answer": "SSD"
            },
            {
              "question": "Which factor describes how much information a storage device can hold?",
              "options": ["Read speed", "Write speed", "Capacity", "Processing speed"],
              "answer": "Capacity"
            }
          ]
        },
        {
          "id": "MATCHING",
          "questions": [
            {
              "question": "Match Column A with Column B.",
              "left": [
                "RAM",
                "ROM",
                "Cache Memory",
                "SSD",
                "HDD",
                "Optical Storage",
                "USB Flash Drive",
                "GB",
                "TB",
                "Storage Capacity"
              ],
              "right": [
                "Temporarily stores data and programs currently being used",
                "Stores startup instructions that remain when power is removed",
                "Keeps frequently needed data close to the CPU",
                "Uses electronic memory for fast data access",
                "Uses rotating magnetic disks to store data",
                "Uses lasers to read and write data on discs",
                "Small external device used to transfer files",
                "Common unit used to measure storage capacity",
                "Larger storage unit than a GB",
                "Amount of data a device can hold"
              ],
              "answers": [
                { "left": "RAM", "right": "Temporarily stores data and programs currently being used" },
                { "left": "ROM", "right": "Stores startup instructions that remain when power is removed" },
                { "left": "Cache Memory", "right": "Keeps frequently needed data close to the CPU" },
                { "left": "SSD", "right": "Uses electronic memory for fast data access" },
                { "left": "HDD", "right": "Uses rotating magnetic disks to store data" },
                { "left": "Optical Storage", "right": "Uses lasers to read and write data on discs" },
                { "left": "USB Flash Drive", "right": "Small external device used to transfer files" },
                { "left": "GB", "right": "Common unit used to measure storage capacity" },
                { "left": "TB", "right": "Larger storage unit than a GB" },
                { "left": "Storage Capacity", "right": "Amount of data a device can hold" }
              ]
            }
          ]
        },
        {
          "id": "DRAG AND DROP",
          "questions": [
            {
              "question": "Drag each item to its correct storage category.",
              "items": [
                "RAM",
                "ROM",
                "Cache Memory",
                "SSD",
                "Hard Disk Drive",
                "CD",
                "DVD",
                "Blu-ray Disc",
                "USB Flash Drive",
                "External SSD",
                "External Hard Drive",
                "CPU Register"
              ],
              "categories": ["Primary Storage", "Secondary Storage", "External Storage"],
              "answers": [
                { "item": "RAM", "category": "Primary Storage" },
                { "item": "ROM", "category": "Primary Storage" },
                { "item": "Cache Memory", "category": "Primary Storage" },
                { "item": "CPU Register", "category": "Primary Storage" },
                { "item": "SSD", "category": "Secondary Storage" },
                { "item": "Hard Disk Drive", "category": "Secondary Storage" },
                { "item": "CD", "category": "Secondary Storage" },
                { "item": "DVD", "category": "Secondary Storage" },
                { "item": "Blu-ray Disc", "category": "Secondary Storage" },
                { "item": "USB Flash Drive", "category": "External Storage" },
                { "item": "External SSD", "category": "External Storage" },
                { "item": "External Hard Drive", "category": "External Storage" }
              ]
            }
          ]
        },
        {
          "id": "YES / NO",
          "questions": [
            { "question": "RAM is volatile storage, so its contents are normally lost when the computer is turned off.", "answer": "Yes" },
            { "question": "ROM loses its stored startup instructions when the computer is turned off.", "answer": "No" },
            { "question": "An SSD generally provides faster read and write access than a traditional HDD.", "answer": "Yes" },
            { "question": "A TB represents a smaller amount of storage than a GB.", "answer": "No" },
            { "question": "Storage capacity describes how much data a storage device can hold.", "answer": "Yes" }
          ]
        },
        {
          "id": "SHORT ANSWER",
          "questions": [
            { "question": "What is the difference between primary storage and secondary storage?", "answer": "Primary storage holds data and instructions needed during computer operation, while secondary storage keeps data and programs for long-term use." },
            { "question": "What is the difference between an SSD and an HDD?", "answer": "An SSD uses electronic memory and is generally faster, while an HDD uses rotating magnetic disks and can provide large storage capacity." },
            { "question": "What is the difference between storage capacity and storage performance?", "answer": "Storage capacity describes how much data a device can hold, while storage performance describes how quickly it can read or write data." }
          ]
        }
      ]
    },
    {
      "id": "Week3-PT",
      "title": "LEVELUP DIGITAL DISCOVERIES",
      "subtitle": "WEEK 3- GRADE 11 PRACTICE TEST",
      "categories": [
        {
          "id": "MULTIPLE-CHOICE QUESTIONS",
          "questions": [
            {
              "question": "Which type of memory only holds data while the computer has power?",
              "options": ["RAM", "ROM", "SSD", "HDD"],
              "answer": "RAM"
            },
            {
              "question": "Which of these is an example of non-volatile memory?",
              "options": ["RAM", "Cache", "ROM", "CPU register"],
              "answer": "ROM"
            },
            {
              "question": "What is the main purpose of virtual memory?",
              "options": [
                "To permanently store files",
                "To use secondary storage as extra RAM",
                "To speed up the CPU clock",
                "To display graphics"
              ],
              "answer": "To use secondary storage as extra RAM"
            },
            {
              "question": "In the memory hierarchy, which type of memory is closest to the CPU and fastest?",
              "options": ["Secondary storage", "RAM", "Cache memory", "ROM"],
              "answer": "Cache memory"
            },
            {
              "question": "What does paging do?",
              "options": [
                "Divides memory into fixed-size pages",
                "Combines RAM and ROM",
                "Removes free memory",
                "Displays graphics"
              ],
              "answer": "Divides memory into fixed-size pages"
            },
            {
              "question": "What is a \"frame\" in paging?",
              "options": [
                "A page stored on secondary storage",
                "A block of physical memory that matches a page",
                "A type of process",
                "A part of the CPU"
              ],
              "answer": "A block of physical memory that matches a page"
            },
            {
              "question": "What does segmentation divide a program's memory into?",
              "options": [
                "Fixed-size pages",
                "Variable-sized logical sections",
                "Frames",
                "Registers"
              ],
              "answer": "Variable-sized logical sections"
            },
            {
              "question": "What is memory allocation?",
              "options": [
                "Assigning available memory space to a program",
                "Removing memory from a program",
                "Combining fragmented memory",
                "Increasing CPU speed"
              ],
              "answer": "Assigning available memory space to a program"
            },
            {
              "question": "What is fragmentation?",
              "options": [
                "When memory is compacted",
                "When the CPU pauses",
                "When free memory becomes divided into small scattered blocks",
                "When RAM loses power"
              ],
              "answer": "When free memory becomes divided into small scattered blocks"
            },
            {
              "question": "Which technique helps reduce fragmentation?",
              "options": ["Compaction", "Paging only", "Segmentation only", "Context switching"],
              "answer": "Compaction"
            },
            {
              "question": "Which of the following is a valid process state?",
              "options": ["Loading", "Ready", "Saving", "Printing"],
              "answer": "Ready"
            },
            {
              "question": "What does a Process Control Block (PCB) store?",
              "options": [
                "The program's source code",
                "Information such as state, program counter, and allocated memory",
                "The CPU clock speed",
                "The list of installed programs"
              ],
              "answer": "Information such as state, program counter, and allocated memory"
            },
            {
              "question": "What happens during context switching?",
              "options": [
                "A new program is installed",
                "The state of one process is saved and another is loaded",
                "RAM is permanently erased",
                "The CPU stops receiving power"
              ],
              "answer": "The state of one process is saved and another is loaded"
            },
            {
              "question": "What does CPU scheduling decide?",
              "options": [
                "Which process should run next",
                "How much RAM a program uses",
                "Which files are stored on disk",
                "How data is displayed"
              ],
              "answer": "Which process should run next"
            },
            {
              "question": "When the CPU needs data, where does the Operating System check first?",
              "options": ["Secondary storage", "RAM", "Cache", "ROM"],
              "answer": "RAM"
            }
          ]
        },
        {
          "id": "MATCHING",
          "questions": [
            {
              "question": "Match Column A with Column B.",
              "left": [
                "RAM",
                "Non-Volatile Memory",
                "Virtual Memory",
                "Memory Hierarchy",
                "Paging",
                "Segmentation",
                "Memory Allocation",
                "Fragmentation",
                "Process Control Block (PCB)",
                "CPU Scheduling"
              ],
              "right": [
                "Volatile memory that only holds data while powered on",
                "Keeps its contents even when power is removed",
                "Uses secondary storage as extra RAM",
                "Arranges memory by speed, size, and cost",
                "Divides memory into fixed-size pages mapped to frames",
                "Divides memory into variable-sized logical segments",
                "Assigns available memory space to programs",
                "Free memory split into small, hard-to-use blocks",
                "Stores key information needed to manage a process",
                "Decides which ready process runs next"
              ],
              "answers": [
                { "left": "RAM", "right": "Volatile memory that only holds data while powered on" },
                { "left": "Non-Volatile Memory", "right": "Keeps its contents even when power is removed" },
                { "left": "Virtual Memory", "right": "Uses secondary storage as extra RAM" },
                { "left": "Memory Hierarchy", "right": "Arranges memory by speed, size, and cost" },
                { "left": "Paging", "right": "Divides memory into fixed-size pages mapped to frames" },
                { "left": "Segmentation", "right": "Divides memory into variable-sized logical segments" },
                { "left": "Memory Allocation", "right": "Assigns available memory space to programs" },
                { "left": "Fragmentation", "right": "Free memory split into small, hard-to-use blocks" },
                { "left": "Process Control Block (PCB)", "right": "Stores key information needed to manage a process" },
                { "left": "CPU Scheduling", "right": "Decides which ready process runs next" }
              ]
            }
          ]
        },
        {
          "id": "DRAG AND DROP",
          "questions": [
            {
              "question": "Drag each item to its correct category.",
              "items": [
                "RAM",
                "ROM",
                "Virtual Memory",
                "Process States",
                "Process Control Block (PCB)",
                "CPU Scheduling"
              ],
              "categories": [
                "Memory Types",
                "Process Management"
              ],
              "answers": [
                { "item": "RAM", "category": "Memory Types" },
                { "item": "ROM", "category": "Memory Types" },
                { "item": "Virtual Memory", "category": "Memory Types" },
                { "item": "Process States", "category": "Process Management" },
                { "item": "Process Control Block (PCB)", "category": "Process Management" },
                { "item": "CPU Scheduling", "category": "Process Management" }
              ]
            }
          ]
        },
        {
          "id": "YES / NO",
          "questions": [
            { "question": "RAM is an example of volatile memory.", "answer": "Yes" },
            { "question": "ROM loses its data when the computer is turned off.", "answer": "No" },
            { "question": "Virtual memory uses secondary storage to act as extra RAM.", "answer": "Yes" },
            { "question": "Segmentation divides memory into fixed-size pages.", "answer": "No" },
            { "question": "A Process Control Block (PCB) stores information the operating system needs to manage a process.", "answer": "Yes" }
          ]
        },
        {
          "id": "SHORT ANSWER",
          "questions": [
            { "question": "What is the difference between volatile and non-volatile memory?", "answer": "Volatile memory only holds data while the computer has power, while non-volatile memory keeps its contents even when power is removed." },
            { "question": "What is the difference between paging and segmentation?", "answer": "Paging divides memory into fixed-size pages mapped to frames, while segmentation divides a program's memory into variable-sized logical segments." },
            { "question": "What is the purpose of a Process Control Block (PCB)?", "answer": "A PCB stores information about a process, such as its state, program counter, and allocated memory, allowing the operating system to pause and resume it correctly." }
          ]
        }
      ]
    }    ,
    {
      "id": "Week4-PT",
      "title": "LEVELUP DIGITAL DISCOVERIES",
      "subtitle": "WEEK 4- GRADE 11 PRACTICE TEST",
      "categories": [
        {
          "id": "MULTIPLE-CHOICE QUESTIONS",
          "questions": [
            { "question": "What does a file extension tell the computer?", "options": ["The type of file", "The size of the file", "The owner of the file", "The color of the file"], "answer": "The type of file" },
            { "question": "Which of the following is an example of a file extension?", "options": [".txt", "folder", "RAM", "CPU"], "answer": ".txt" },
            { "question": "What is another name for a directory?", "options": ["Folder", "Program", "File extension", "Password"], "answer": "Folder" },
            { "question": "What can a folder hold, besides files?", "options": ["Other folders", "Passwords only", "The CPU", "User accounts only"], "answer": "Other folders" },
            { "question": "What does a file system do?", "options": ["Keeps track of where each file is saved", "Types passwords for the user", "Prints documents", "Displays graphics"], "answer": "Keeps track of where each file is saved" },
            { "question": "Which permission lets a user view a file?", "options": ["Read", "Write", "Run", "Delete"], "answer": "Read" },
            { "question": "Which permission lets a user change a file?", "options": ["Read", "Write", "Run", "View"], "answer": "Write" },
            { "question": "Which permission lets a user start a program?", "options": ["Read", "Write", "Run", "Save"], "answer": "Run" },
            { "question": "Who can set permissions on a file?", "options": ["An owner or administrator", "Any random user", "Only the CPU", "Only the printer"], "answer": "An owner or administrator" },
            { "question": "What does a user account let someone do?", "options": ["Log in with their own username and password", "Print documents automatically", "Delete the operating system", "Change the CPU speed"], "answer": "Log in with their own username and password" },
            { "question": "What protects a user account from other people?", "options": ["A password", "A file extension", "A folder", "A file system"], "answer": "A password" },
            { "question": "Besides passwords, what other security method might a computer use?", "options": ["Fingerprints", "File extensions", "Folder names", "File systems"], "answer": "Fingerprints" },
            { "question": "What does the Operating System check first when a user opens a file?", "options": ["The file type", "The user's age", "The CPU speed", "The screen color"], "answer": "The file type" },
            { "question": "When a user logs in, what does the Operating System compare the entered details to?", "options": ["Saved account information", "The file system", "The file extension", "The folder name"], "answer": "Saved account information" },
            { "question": "What happens if a user is not allowed to open a file?", "options": ["The Operating System blocks access", "The file deletes itself", "The computer restarts", "The file opens anyway"], "answer": "The Operating System blocks access" }
          ]
        },
        {
          "id": "MATCHING",
          "questions": [
            {
              "question": "Match Column A with Column B.",
              "left": ["File", "File Type", "Directory (Folder)", "File System", "Permissions", "Read Permission", "Write Permission", "Run Permission", "User Account", "Password"],
              "right": [
                "Stores information and has a name with an extension showing its type",
                "Describes the kind of information a file holds, like documents or pictures",
                "Holds files together and can also hold other folders",
                "Keeps track of where files are stored on a computer",
                "Controls what a user can do with a file",
                "Lets a user view a file",
                "Lets a user change a file",
                "Lets a user start a program",
                "Lets someone log in with their own username and password",
                "Protects an account from other people"
              ],
              "answers": [
                { "left": "File", "right": "Stores information and has a name with an extension showing its type" },
                { "left": "File Type", "right": "Describes the kind of information a file holds, like documents or pictures" },
                { "left": "Directory (Folder)", "right": "Holds files together and can also hold other folders" },
                { "left": "File System", "right": "Keeps track of where files are stored on a computer" },
                { "left": "Permissions", "right": "Controls what a user can do with a file" },
                { "left": "Read Permission", "right": "Lets a user view a file" },
                { "left": "Write Permission", "right": "Lets a user change a file" },
                { "left": "Run Permission", "right": "Lets a user start a program" },
                { "left": "User Account", "right": "Lets someone log in with their own username and password" },
                { "left": "Password", "right": "Protects an account from other people" }
              ]
            }
          ]
        },
        {
          "id": "DRAG AND DROP",
          "questions": [
            {
              "question": "Drag each item to its correct category.",
              "items": [
                "File",
                "Folder",
                "File System",
                "Permissions",
                "User Account",
                "Password"
              ],
              "categories": [
                "File Organization",
                "Access Control"
              ],
              "answers": [
                { "item": "File", "category": "File Organization" },
                { "item": "Folder", "category": "File Organization" },
                { "item": "File System", "category": "File Organization" },
                { "item": "Permissions", "category": "Access Control" },
                { "item": "User Account", "category": "Access Control" },
                { "item": "Password", "category": "Access Control" }
              ]
            }
          ]
        },
        {
          "id": "YES / NO",
          "questions": [
            { "question": "A file extension tells the computer what type of file it is.", "answer": "Yes" },
            { "question": "A folder can only hold files, never other folders.", "answer": "No" },
            { "question": "Read permission lets a user change a file.", "answer": "No" },
            { "question": "An administrator can set permissions on a file.", "answer": "Yes" },
            { "question": "A strong password is easy to guess.", "answer": "No" }
          ]
        },
        {
          "id": "SHORT ANSWER",
          "questions": [
            { "question": "What is the difference between a file and a folder?", "answer": "A file stores information such as a photo or document, while a folder (directory) holds files together and can also hold other folders." },
            { "question": "What is the difference between read and write permissions?", "answer": "Read permission lets a user view a file, while write permission lets a user change it." },
            { "question": "Why are user accounts and passwords important?", "answer": "User accounts let each person log in with their own username, and passwords protect those accounts so only the right person can access their files." }
          ]
        }
      ]
    }    ,
    {
      "id": "Week5-PT",
      "title": "LEVELUP DIGITAL DISCOVERIES",
      "subtitle": "WEEK 5- GRADE 11 PRACTICE TEST",
      "categories": [
        {
          "id": "MULTIPLE-CHOICE QUESTIONS",
          "questions": [
            { "question": "What is data?", "options": ["A collection of raw facts, such as numbers, words, or symbols", "Understanding gained from experience", "A finished report", "A type of computer program"], "answer": "A collection of raw facts, such as numbers, words, or symbols" },
            { "question": "What is information?", "options": ["Data that has been organized so it makes sense", "A raw fact with no meaning", "A type of sensor", "A computer part"], "answer": "Data that has been organized so it makes sense" },
            { "question": "What is knowledge?", "options": ["Understanding gained from information and experience", "A raw number", "A type of survey", "A file extension"], "answer": "Understanding gained from information and experience" },
            { "question": "Which of these is an example of numeric data?", "options": ["A number such as 25", "A photo", "A password", "A folder name"], "answer": "A number such as 25" },
            { "question": "What happens when data is organized, labeled, or explained?", "options": ["It becomes information", "It disappears", "It becomes a sensor", "It becomes a password"], "answer": "It becomes information" },
            { "question": "What helps people make decisions and solve problems?", "options": ["Knowledge", "Raw data alone", "A file system", "A password"], "answer": "Knowledge" },
            { "question": "Which of these is a common way to collect data from people?", "options": ["Surveys", "Sensors only", "Binary code", "File extensions"], "answer": "Surveys" },
            { "question": "Which of these can collect data automatically without a person entering it?", "options": ["Sensors", "Surveys", "Passwords", "Folders"], "answer": "Sensors" },
            { "question": "What is a survey?", "options": ["A list of questions used to collect information from people", "A type of sensor", "A computer file", "A type of encoding"], "answer": "A list of questions used to collect information from people" },
            { "question": "What does observation mean in data collection?", "options": ["Collecting data by watching or measuring something directly", "Asking a computer to guess an answer", "Deleting old data", "Encoding text into binary"], "answer": "Collecting data by watching or measuring something directly" },
            { "question": "Why is accurate data collection important?", "options": ["So the data can be trusted and used correctly", "So the computer runs faster", "So files take up less space", "So passwords are easier to guess"], "answer": "So the data can be trusted and used correctly" },
            { "question": "In turning data into information, what does the computer add to organized data?", "options": ["Labels or titles", "More raw numbers", "A password", "A new file extension"], "answer": "Labels or titles" },
            { "question": "What comes after information in the process of turning information into knowledge?", "options": ["Understanding", "Encoding", "Binary", "A survey"], "answer": "Understanding" },
            { "question": "Which of these is an example of a data type mentioned in the lesson?", "options": ["Text", "Password", "Folder", "Permission"], "answer": "Text" },
            { "question": "Which best describes the correct order?", "options": ["Data becomes information, and information becomes knowledge", "Knowledge becomes data", "Information becomes a sensor", "Data becomes a password"], "answer": "Data becomes information, and information becomes knowledge" }
          ]
        },
        {
          "id": "MATCHING",
          "questions": [
            {
              "question": "Match Column A with Column B.",
              "left": ["Data", "Information", "Knowledge", "Numeric Data", "Survey", "Sensor", "Observation", "Data Source", "Data Collection", "Decision Making"],
              "right": [
                "Raw facts, such as numbers, words, or symbols",
                "Data that has been organized and given meaning",
                "Understanding gained from information and experience",
                "Numbers used for counting or measuring",
                "A list of questions used to collect information from people",
                "A device that can measure things like temperature automatically",
                "Collecting data by watching or measuring directly",
                "Where data comes from, such as people or devices",
                "The process of gathering facts from different places",
                "Using knowledge to choose the best action"
              ],
              "answers": [
                { "left": "Data", "right": "Raw facts, such as numbers, words, or symbols" },
                { "left": "Information", "right": "Data that has been organized and given meaning" },
                { "left": "Knowledge", "right": "Understanding gained from information and experience" },
                { "left": "Numeric Data", "right": "Numbers used for counting or measuring" },
                { "left": "Survey", "right": "A list of questions used to collect information from people" },
                { "left": "Sensor", "right": "A device that can measure things like temperature automatically" },
                { "left": "Observation", "right": "Collecting data by watching or measuring directly" },
                { "left": "Data Source", "right": "Where data comes from, such as people or devices" },
                { "left": "Data Collection", "right": "The process of gathering facts from different places" },
                { "left": "Decision Making", "right": "Using knowledge to choose the best action" }
              ]
            }
          ]
        },
        {
          "id": "DRAG AND DROP",
          "questions": [
            {
              "question": "Drag each item to its correct category.",
              "items": [
                "Data",
                "Information",
                "Knowledge",
                "Survey",
                "Sensor",
                "Observation"
              ],
              "categories": [
                "Data & Information",
                "Data Collection"
              ],
              "answers": [
                { "item": "Data", "category": "Data & Information" },
                { "item": "Information", "category": "Data & Information" },
                { "item": "Knowledge", "category": "Data & Information" },
                { "item": "Survey", "category": "Data Collection" },
                { "item": "Sensor", "category": "Data Collection" },
                { "item": "Observation", "category": "Data Collection" }
              ]
            }
          ]
        },
        {
          "id": "YES / NO",
          "questions": [
            { "question": "Data is raw facts that do not yet have meaning on their own.", "answer": "Yes" },
            { "question": "Information is exactly the same thing as data.", "answer": "No" },
            { "question": "A survey is a way to collect data from people.", "answer": "Yes" },
            { "question": "Sensors can only collect data if a person enters it manually.", "answer": "No" },
            { "question": "Knowledge helps people make decisions and solve problems.", "answer": "Yes" }
          ]
        },
        {
          "id": "SHORT ANSWER",
          "questions": [
            { "question": "What is the difference between data and information?", "answer": "Data is raw facts that don't have much meaning on their own, while information is data that has been organized and given meaning." },
            { "question": "What is the difference between a survey and a sensor as data sources?", "answer": "A survey collects data by asking people questions, while a sensor collects data automatically by measuring things like temperature." },
            { "question": "How does information become knowledge?", "answer": "A person compares new information to what they already know, notices patterns, and forms understanding, which becomes knowledge they can use to make decisions." }
          ]
        }
      ]
    }    ,
    {
      "id": "Week6-PT",
      "title": "LEVELUP DIGITAL DISCOVERIES",
      "subtitle": "WEEK 6- GRADE 11 PRACTICE TEST",
      "categories": [
        {
          "id": "MULTIPLE-CHOICE QUESTIONS",
          "questions": [
            { "question": "What describes the different kinds of data a computer can use?", "options": ["Data types", "File systems", "Passwords", "Folders"], "answer": "Data types" },
            { "question": "Which of these is an example of numeric data?", "options": ["5 or 100", "A letter", "A yes/no answer", "A folder"], "answer": "5 or 100" },
            { "question": "What is text made of?", "options": ["Letters, words, or sentences", "Only numbers", "Only true/false values", "Only binary code"], "answer": "Letters, words, or sentences" },
            { "question": "What is a Boolean value?", "options": ["A value that is either true or false", "A type of file extension", "A type of folder", "A type of sensor"], "answer": "A value that is either true or false" },
            { "question": "What are the only two digits computers use to store data?", "options": ["0 and 1", "1 and 2", "A and B", "Yes and No"], "answer": "0 and 1" },
            { "question": "What is a single 0 or 1 called?", "options": ["A bit", "A byte", "A file", "A folder"], "answer": "A bit" },
            { "question": "How many bits make up a byte?", "options": ["8", "2", "10", "16"], "answer": "8" },
            { "question": "What does digital representation mean?", "options": ["Turning data into a form a computer can use", "Deleting old files", "Printing a document", "Setting a password"], "answer": "Turning data into a form a computer can use" },
            { "question": "What is encoding?", "options": ["Turning data into a special code so a computer can store or send it", "Deleting unwanted data", "Printing a file", "Naming a folder"], "answer": "Turning data into a special code so a computer can store or send it" },
            { "question": "What is ASCII an example of?", "options": ["A text encoding method", "A type of folder", "A type of sensor", "A type of password"], "answer": "A text encoding method" },
            { "question": "Why is encoding important?", "options": ["It helps different computers and programs understand the same data", "It makes files bigger", "It slows down the CPU", "It deletes unused files"], "answer": "It helps different computers and programs understand the same data" },
            { "question": "When storing a number, what form is it changed into before being stored in memory?", "options": ["Binary", "Text", "A password", "A folder"], "answer": "Binary" },
            { "question": "What does the computer look up when turning a letter into binary?", "options": ["The letter's binary code", "The letter's file extension", "The letter's folder", "The letter's password"], "answer": "The letter's binary code" },
            { "question": "What is used to measure how much data a file or device can store?", "options": ["Bytes", "Bits only", "Passwords", "Folders"], "answer": "Bytes" },
            { "question": "Which best describes ASCII's purpose?", "options": ["It gives each letter its own number", "It deletes old letters", "It creates new folders", "It sets file permissions"], "answer": "It gives each letter its own number" }
          ]
        },
        {
          "id": "MATCHING",
          "questions": [
            {
              "question": "Match Column A with Column B.",
              "left": ["Data Type", "Numbers", "Text", "Boolean", "Digital Representation", "Binary", "Bit", "Byte", "Encoding", "ASCII"],
              "right": [
                "Describes the different kinds of data a computer can use",
                "Used for counting or calculating",
                "Made of letters, words, or sentences",
                "A value that is either true or false",
                "Turning data into a form a computer can use",
                "A system that stores data using only 0s and 1s",
                "A single 0 or 1",
                "A group of 8 bits",
                "Turning data into a special code so a computer can store or send it",
                "A common text encoding method that gives each letter its own number"
              ],
              "answers": [
                { "left": "Data Type", "right": "Describes the different kinds of data a computer can use" },
                { "left": "Numbers", "right": "Used for counting or calculating" },
                { "left": "Text", "right": "Made of letters, words, or sentences" },
                { "left": "Boolean", "right": "A value that is either true or false" },
                { "left": "Digital Representation", "right": "Turning data into a form a computer can use" },
                { "left": "Binary", "right": "A system that stores data using only 0s and 1s" },
                { "left": "Bit", "right": "A single 0 or 1" },
                { "left": "Byte", "right": "A group of 8 bits" },
                { "left": "Encoding", "right": "Turning data into a special code so a computer can store or send it" },
                { "left": "ASCII", "right": "A common text encoding method that gives each letter its own number" }
              ]
            }
          ]
        },
        {
          "id": "DRAG AND DROP",
          "questions": [
            {
              "question": "Drag each item to its correct category.",
              "items": [
                "Numbers",
                "Text",
                "Boolean",
                "Binary",
                "Bit",
                "Byte"
              ],
              "categories": [
                "Data Types",
                "Digital Representation"
              ],
              "answers": [
                { "item": "Numbers", "category": "Data Types" },
                { "item": "Text", "category": "Data Types" },
                { "item": "Boolean", "category": "Data Types" },
                { "item": "Binary", "category": "Digital Representation" },
                { "item": "Bit", "category": "Digital Representation" },
                { "item": "Byte", "category": "Digital Representation" }
              ]
            }
          ]
        },
        {
          "id": "YES / NO",
          "questions": [
            { "question": "A Boolean value can only be true or false.", "answer": "Yes" },
            { "question": "Computers store data using ten different digits.", "answer": "No" },
            { "question": "A byte is made up of 8 bits.", "answer": "Yes" },
            { "question": "ASCII is a method used to encode text.", "answer": "Yes" },
            { "question": "Encoding is not important because computers can understand data without it.", "answer": "No" }
          ]
        },
        {
          "id": "SHORT ANSWER",
          "questions": [
            { "question": "What is the difference between numbers and text as data types?", "answer": "Numbers are used for counting or calculating, while text is made of letters, words, or sentences." },
            { "question": "What is the difference between a bit and a byte?", "answer": "A bit is a single 0 or 1, while a byte is a group of 8 bits." },
            { "question": "Why do computers use encoding?", "answer": "Encoding turns data into a special code so computers can store or send it, and it helps different computers and programs understand the same data correctly." }
          ]
        }
      ]
    }
  ]
};
