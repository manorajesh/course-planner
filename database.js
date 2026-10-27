/* =========================================================================
   DATABASE — department codes, course name/unit lookup, and a library of
   ~90 CMU minor/additional-major templates (CFA, SCS, Tepper, Heinz, MCS,
   Engineering, Dietrich — all departments), each pre-encoded into the same
   program/section/category schema the BCSA degree itself uses (see app.js).
   Sourced from the CMU course catalog (coursecatalog.web.cmu.edu and
   department pages), 2024-2025/current edition. Lighter-fidelity pass: most
   categories are modeled as "choose N from this pool" rather than exact
   required-vs-choice slot logic — edit any template after adding it via the
   Programs tab if a rule needs to be tightened up.

   Use MINOR_TEMPLATES from the Programs tab ("+ Add from Template") to
   instantiate a ready-made minor instead of building one by hand.
   ========================================================================= */

const DEFAULT_DEPTS = {
  "02":"Computational Biology","03":"Biological Sciences","05":"Human-Computer Interaction Institute",
  "06":"Chemical Engineering","07":"SCS Interdisciplinary","09":"Chemistry","10":"Machine Learning Department",
  "11":"Language Technologies Institute","12":"Civil & Environmental Engineering","15":"Computer Science",
  "16":"Robotics Institute","17":"Institute for Software Research","18":"Electrical & Computer Engineering",
  "19":"Engineering & Public Policy","21":"Mathematical Sciences","24":"Mechanical Engineering",
  "27":"Materials Science & Engineering","33":"Physics","36":"Statistics & Data Science",
  "42":"Biomedical Engineering","45":"Tepper School of Business (undergrad core)","48":"Architecture",
  "51":"Design","52":"BXA Intercollege Programs","54":"Drama","57":"Music","60":"Art","62":"Architecture",
  "66":"Institute for Politics & Strategy","67":"Information Systems Program","70":"Tepper School of Business",
  "73":"Economics","76":"English","79":"History","80":"Philosophy","82":"Modern Languages",
  "84":"Institute for Politics & Strategy","85":"Psychology","88":"Social & Decision Sciences",
  "90":"Heinz College (Public Policy)","94":"Heinz College (Information Systems)","95":"Information Systems",
  "99":"University Core / Computing@CMU",
  "08":"College of Engineering (cross-listed courses)","32":"Military Science (ROTC)","39":"College of Engineering (CIT Interdisciplinary)",
  "49":"Integrated Innovation Institute","53":"Entertainment Technology Center (ETC)","86":"Center for the Neural Basis of Cognition",
};

const COURSE_CATALOG = {
"76-101":["Interpretation and Argument",9],"76-102":["Advanced First Year Writing: Special Topics",9],
"76-106":["Writing about Literature, Art and Culture",4.5],"76-107":["Writing about Data",4.5],"76-108":["Writing about Public Problems",4.5],
"21-122":["Integration and Approximation",10],"21-259":["Calculus in Three Dimensions",10],"21-266":["Vector Calculus for Computer Scientists",10],
"21-241":["Matrices and Linear Transformations",10],"21-127":["Concepts of Mathematics",12],"15-151":["Concepts of Mathematics (mini)",12],
"15-259":["Probability and Computing",12],"21-325":["Probability",9],"36-218":["Probability Theory for Computer Scientists",9],
"36-225":["Introduction to Probability Theory",9],"36-226":["Introduction to Statistical Inference",9],
"03-121":["Modern Biology",9],"03-125":["Evolution",9],"03-132":["Basic Science to Modern Medicine",9],"03-133":["Neurobiology of Disease",9],
"03-135":["Structure and Function of the Human Body",9],"03-140":["Ecology and Environmental Science",9],"03-161":["Molecules to Mind",9],
"06-100":["Introduction to Chemical Engineering",12],"09-105":["Introduction to Modern Chemistry I",10],"09-106":["Modern Chemistry II",10],
"09-225":["Climate Change: Chemistry, Physics and Planetary Science",9],"12-100":["Exploring CEE: Infrastructure and Environment in a Changing World",12],
"12-201":["Geology",9],"12-351":["Environmental Engineering",9],"18-095":["Getting Started in Electronics: An Experiential Approach",9],
"18-100":["Introduction to Electrical and Computer Engineering",12],"18-220":["Electronic Devices and Analog Circuits",12],
"18-240":["Structure and Design of Digital Systems",12],"24-101":["Fundamentals of Mechanical Engineering",12],
"24-292":["Renewable Energy Engineering",9],"24-358":["Culinary Mechanics",9],"24-381":["Environmental Systems on a Changing Planet",12],
"27-215":["Thermodynamics of Materials",12],"33-114":["Physics of Musical Sound",9],"33-120":["Science and Science Fiction",9],
"33-121":["Physics I for Science Students",12],"33-141":["Physics I for Engineering Students",12],"33-224":["Stars, Galaxies and the Universe",9],
"33-225":["Quantum Physics and Structure of Matter",9],"33-226":["Physics of Energy",9],"42-101":["Introduction to Biomedical Engineering",12],
"42-202":["Physiology",9],"85-219":["Foundations of Brain and Behavior",9],"02-261":["Quantitative Cell and Molecular Biology Laboratory",9],
"03-124":["Modern Biology Laboratory",9],"27-100":["Engineering the Materials of the Future",12],"33-104":["Experimental Physics",9],
"42-203":["Biomedical Engineering Laboratory",9],"19-101":["Introduction to Engineering and Public Policy",12],
"36-303":["Sampling, Survey and Society",9],"66-221":["Topics of Law: Introduction to Intellectual Property Law",9],
"70-332":["Business, Society and Ethics",9],"73-102":["Principles of Microeconomics",9],"73-104":["Principles of Microeconomics (Accelerated)",9],
"73-103":["Principles of Macroeconomics",9],"76-425":["Rhetoric, Science, and the Public Sphere",9],
"79-101":["Making History: How to Think About the Past (and Present)",9],"79-189":["Democracy and History: Thinking Beyond the Self",9],
"79-237":["Comparative Slavery",9],"79-244":["Women in American History",9],"79-253":["Imperialism and Decolonization in South Asia",9],
"79-300":["Controversial Topics in the History of American Public Policy",9],"79-320":["Women, Politics, and Protest",9],
"79-321":["Documenting Human Rights",9],"79-331":["Body Politics: Women and Health in America",9],"79-370":["Technology in the United States",9],
"79-383":["The History of Capitalism",9],"79-391":["Nations and Nationalisms in South Asia",9],"79-392":["Europe and the Islamic World",9],
"80-135":["Introduction to Political Philosophy",9],"80-136":["Social Structure, Public Policy & Ethics",9],"80-244":["Environmental Ethics",9],
"80-245":["Medical Ethics",9],"80-324":["Philosophy of Economics",9],"80-334":["Social and Political Philosophy",9],
"80-335":["Social and Political Philosophy",9],"80-348":["Health, Human Rights, and International Development",9],
"84-104":["Decision Processes in American Political Institutions",9],"84-110":["The Economics of Politics, Policy, and Technology",9],
"84-275":["Comparative Politics",9],"84-322":["Nonviolent Conflict and Revolution",9],"84-324":["The Future of Democracy",9],
"84-352":["Representation and Voting Rights",9],"84-362":["Diplomacy and Statecraft",9],"84-365":["The Politics of Fake News and Misinformation",9],
"84-380":["US Grand Strategy",9],"84-386":["The Privatization of Force",9],"84-387":["Remote Systems and the Cyber Domain in Conflict",9],
"84-389":["Terrorism and Insurgency",9],"84-390":["Social Media, Technology, and Conflict",9],"84-393":["Legislative Decision Making: US Congress",9],
"84-402":["Judicial Politics and Behavior",9],"84-405":["The Future of Warfare",9],"88-281":["Topics in Law: 1st Amendment",9],
"88-284":["Topics of Law: The Bill of Rights",9],"70-311":["Organizational Behavior",9],"70-318":["Managing Effective Work Teams",9],
"70-385":["Consumer Behavior",9],"80-101":["Dangerous Ideas in Science and Society",9],"80-130":["Introduction to Ethics",9],
"80-150":["Nature of Reason",9],"80-180":["Nature of Language: An Introduction to Linguistics",9],"80-221":["Philosophy of Social Science",9],
"80-252":["Kant",9],"80-270":["Problems of Mind and Body: Meaning and Doing",9],"80-271":["Mind and Body: The Objective and the Subjective",9],
"80-275":["Metaphysics",9],"80-330":["Ethical Theory",9],"85-102":["Introduction to Psychology",9],"85-104":["Psychopathology",9],
"85-211":["Cognitive Psychology",9],"85-213":["Human Information Processing and Artificial Intelligence",9],
"85-221":["Principles of Child Development",9],"85-241":["Social Psychology",9],"85-251":["Personality",9],"85-261":["Psychopathology",9],
"85-370":["Perception",9],"85-385":["Auditory Perception: Sense of Sound",9],"85-408":["Visual Cognition",9],
"85-414":["Cognitive Neuropsychology",9],"85-421":["Language and Thought",9],"88-120":["Reason, Passion and Cognition",9],
"88-230":["Human Intelligence and Human Stupidity",9],"88-231":["Thinking in Person vs. Thinking Online",9],
"99-101":["Core@CMU",3],"52-190":["BXA Seminar I: Building the Wunderkammer",4.5],"52-291":["BXA Seminar II: Transferring Knowledge",4.5],
"52-392":["BXA Seminar III: Deconstructing Disciplines",9],"52-401":["BXA Seminar IV: Capstone Project Research",9],
"52-402":["BXA Seminar V: Capstone Project Production",9],"15-112":["Fundamentals of Programming and Computer Science",12],
"15-122":["Principles of Imperative Computation",12],"15-150":["Principles of Functional Programming",12],
"15-210":["Parallel and Sequential Data Structures and Algorithms",12],"15-213":["Introduction to Computer Systems",12],
"15-251":["Great Ideas in Theoretical Computer Science",12],"05-391":["Designing Human Centered Software",12],
"05-318":["Human AI Interaction",12],"05-319":["Data Visualization",12],"05-320":["Social Web",12],
"05-360":["Interaction Design Fundamentals",12],"05-418":["Design Educational Games",12],"05-430":["Programming Usable Interfaces",15],
"07-280":["Artificial Intelligence & Machine Learning I",12],"07-380":["Artificial Intelligence & Machine Learning II",12],
"10-301":["Introduction to Machine Learning",12],"10-335":["Art and Machine Learning",12],"11-324":["Human Language for Artificial Intelligence",12],
"11-344":["Machine Learning in Practice",12],"11-411":["Natural Language Processing",12],
"15-281":["Artificial Intelligence: Representation and Problem Solving",12],"15-322":["Introduction to Computer Music",9],
"15-362":["Computer Graphics",12],"15-367":["Algorithmic Textiles Design",12],"15-388":["Practical Data Science",9],
"15-415":["Database Applications",12],"15-451":["Algorithm Design and Analysis",12],"15-463":["Computational Photography",12],
"15-464":["Technical Animation",12],"15-465":["Animation Art and Technology",12],"15-466":["Computer Game Programming",12],
"15-494":["Cognitive Robotics: The Future of Robot Toys",12],"16-220":["Robot Building Practices",12],"16-264":["Humanoids",12],
"16-362":["Mobile Robot Algorithms Laboratory",12],"16-376":["IDeATe: Kinetic Fabrics",10],"16-385":["Computer Vision",12],
"16-467":["Introduction to Human Robot Interaction",12],"16-480":["IDeATe: Creative Soft Robotics",10],
"17-214":["Principles of Software Construction: Objects, Design, and Concurrency",12],"17-313":["Foundations of Software Engineering",12],
"17-356":["Software Engineering for Startups",12],"17-437":["Web Application Development",12],
"60-104":["Foundations: Art First-Year Seminar",6],"60-110":["Foundations: Time-Based Media",10],"60-120":["Foundations: Digital Media",10],
"60-131":["Foundations: Sculpture",10],"60-135":["Foundations: Sculpture II",10],"60-150":["Foundations: Drawing",10],
"60-170":["Foundations: Paint/Print",10],"60-107":["Foundations: Critical Studies",9],"60-200":["Sophomore Review",0],
"60-401":["Senior Studio",10],"60-402":["Senior Studio",10],"60-403":["Senior Critique Seminar",10],"60-499":["Studio Independent Study",10],
"15-104":["Introduction to Computing for Creative Practice",10],"15-110":["Principles of Computing",10],
"02-510":["Computational Genomics",12],"03-128":["Biology for Life Special Topics: Tropical Ecology",9],"03-250":["Introduction to Computational Biology",12],
"03-362":["Cellular Neuroscience",9],"03-363":["Systems Neuroscience",9],"03-365":["Neural Correlates of Learning and Memory",9],"03-511":["Computational Molecular Biology and Genomics",9],
"05-291":["Learning Media Design",12],"05-292":["IDeATe: Learning in Museums",12],"05-317":["Design of Artificial Intelligence Products",9],"05-410":["User-Centered Research and Evaluation",12],
"05-413":["Human Factors",9],"05-432":["Personalized Online Learning",12],"05-452":["Service Design",12],"06-421":["Chemical Process Systems Design",12],
"06-426":["Experimental Colloid Surface Science",9],"06-466":["Experimental Polymer Science",9],"06-607":["Physical Chemistry of Colloids and Surfaces",9],
"06-609":["Physical Chemistry of Macromolecules",9],"06-610":["Rheology and Structure of Complex Fluids",9],"06-612":["Formulation Engineering",12],
"08-200":["Ethics and Policy Issues in Computing",9],"09-227":["The Culture of Color: Dyes, Chemistry, and Sustainability",9],"09-502":["Organic Chemistry of Polymers",9],
"09-507":["Nanoparticles",9],"09-510":["Chemistry and Sustainability",9],"09-524":["Environmental Chemistry",9],"09-529":["Introduction to Sustainable Energy Science",9],
"09-538":["Exposure and Risk Assessment for Environmental Pollutants",9],"09-560":["Computational Chemistry",12],"10-315":["Introduction to Machine Learning",12],
"10-403":["Deep Reinforcement Learning & Control",12],"10-405":["Machine Learning with Large Datasets",12],"10-414":["Deep Learning Systems: Algorithms and Implementation",12],
"10-417":["Intermediate Deep Learning",12],"10-418":["Machine Learning for Structured Data",12],"10-422":["Foundations of Learning, Game Theory, and Their Connections",12],
"10-423":["Generative AI",12],"10-424":["Bayesian Methods in Machine Learning",12],"10-425":["Introduction to Convex Optimization",12],"10-613":["Machine Learning Ethics and Society",12],
"10-643":["Socio-technical Evaluations of Generative AI",12],"10-735":["Responsible AI",12],"10-737":["Creative AI",9],"10-777":["Historical Advances in Machine Learning",12],
"11-422":["Grammar Formalisims",12],"11-423":["ConLanging: Lrng Ling & Lang Tech via Constru Artif. Lang",12],"11-424":["Subword Modeling",12],"11-441":["Machine Learning with Graphs",9],
"11-442":["Search Engines",9],"11-481":["Generative AI for Biomedicine",12],"11-485":["Introduction to Deep Learning",9],"11-492":["Speech Technology for Conversational AI",12],
"11-661":["Language and Statistics",12],"11-667":["Large Language Models Methods and Application",12],"11-711":["Advanced Natural Language Processing",12],
"11-731":["Machine Translation and Sequence-to-Sequence Models",12],"11-737":["Multilingual Natural Language Processing",12],"11-751":["Speech Recognition and Understanding",12],
"11-755":["Machine Learning for Signal Processing",12],"11-776":["Multimodal Affective Computing",12],"11-777":["Multimodal Machine Learning",12],
"12-212":["Statics",9],"12-231":["Solid Mechanics",9],"12-411":["Project Management for Engineering and Construction",9],"12-635":["Structural Analysis",12],
"15-214":["Principles of Software Construction: Objects, Design, and Concurrency",12],"15-294":["Rapid Prototyping Technologies",5],"15-316":["Software Foundations of Security and Privacy",9],
"15-356":["Introduction to Cryptography",12],"15-386":["Neural Computation",9],"15-387":["Computational Perception",9],"15-390":["Entrepreneurship for Computer Science",9],
"15-394":["Intermediate Rapid Prototyping",5],"15-410":["Operating System Design and Implementation",15],"15-412":["Operating System Practicum",9],
"15-414":["Bug Catching: Automated Program Verification",9],"15-440":["Distributed Systems",12],"15-441":["Networking and the Internet",12],"15-445":["Database Systems",12],
"15-482":["Autonomous Agents",12],"15-883":["Computational Models of Neural Systems",12],"16-161":["Artificial Intelligence and Humanity",12],"16-223":["IDeATe Portal: Creative Kinetic Systems",10],
"16-224":["IDeATe: Re-Crafting Computational Thinking with Soft Technologies",12],"16-280":["Intelligent Robot Systems",12],"16-299":["Introduction to Feedback Control Systems",12],
"16-311":["Introduction to Robotics",12],"16-350":["Planning Techniques for Robotics",9],"16-375":["IDeATe: Robotics for Creative Practice",10],
"16-384":["Robot Kinematics and Dynamics",9],"16-421":["Vision Sensors",12],"16-474":["Robotics Capstone",12],"16-720":["Computer Vision",12],"16-735":["Ethics and Robotics",9],
"16-824":["Visual Learning and Recognition",12],"16-831":["Introduction to Robot Learning",12],"17-200":["Ethics and Policy Issues in Computing",9],
"17-303":["Cryptocurrencies, Blockchains and Applications",9],"17-331":["Information Security, Privacy, and Policy",12],"17-333":["Privacy Policy, Law, and Technology",9],
"17-334":["Usable Privacy and Security",9],"17-340":["Green Computing",9],"17-355":["Program Analysis",12],"17-413":["Software Engineering Practicum",12],
"17-415":["Software Engineering Reflection",6],"17-423":["Software System Design",12],"17-450":["Crafting Software",12],"17-480":["API Design and Implementation",12],
"17-537":["Artificial Intelligence Methods for Social Good",9],"17-562":["Law of Computer Technology",9],"17-653":["Managing Software Development",6],
"17-702":["Current Topics in Privacy Seminar",3],"17-731":["Foundations of Privacy",12],"17-735":["Engineering Privacy in Software",12],"17-781":["Mobile and IoT Computing Services",12],
"17-880":["Algorithms for Private Data Analysis",12],"18-290":["Signals and Systems",12],"18-300":["Fundamentals of Electromagnetics",12],"18-310":["Fundamentals of Semiconductor Devices",12],
"18-320":["Microelectronic Circuits",12],"18-334":["Network Security",12],"18-341":["Logic Design and Verification",12],"18-349":["Introduction to Embedded Systems",12],
"18-370":["Fundamentals of Control",12],"18-435":["Foundations of Blockchains",12],"18-436":["Browser Security",12],"18-490":["Electroacoustics",12],
"18-491":["Digital Signal Processing",12],"18-540":["Rapid Prototyping of Computer Systems",12],"18-578":["Mechatronic Design",12],"18-749":["Building Reliable Distributed Systems",12],
"19-211":["Ethics and Policy Issues in Computing",9],"19-301":["Decision Making Methods for Engineers and Scientists",9],"19-403":["Policies of Wireless Systems",12],
"19-411":["Science and Innovation Leadership for the 21st Century: Firms, Nations, and Tech",9],"19-429":["Climate Change Science and Solutions",9],
"19-433":["Data Science for Technology, Innovation and Policy",9],"19-451":["EPP Projects I",12],"19-452":["EPP Projects II",12],"19-469":["Behavior, Decision and Policy",9],
"19-639":["Policies of the Internet",12],"19-668":["Electric Vehicles: Technology, Economics, Environment and Policy",12],"21-090":["Precalculus",10],
"21-112":["Calculus",10],"21-120":["Differential and Integral Calculus",10],"21-128":["Mathematical Concepts and Proofs",12],"21-240":["Matrix Algebra with Applications",10],
"21-256":["Multivariate Analysis",9],"21-257":["Models and Methods for Optimization",9],"21-260":["Differential Equations",9],"21-270":["Introduction to Mathematical Finance",9],
"21-292":["Operations Research I",9],"21-369":["Numerical Methods",12],"21-370":["Discrete Time Finance",9],"21-420":["Continuous-Time Finance",9],
"24-291":["Environmental Systems on a Changing Planet",9],"24-352":["Dynamic Systems and Controls",12],"24-370":["Mechanical Design: Methods and Applications",12],
"24-672":["Special Topics in DIY Design and Fabrication",12],"24-684":["Nanoscale Manufacturing Using Structural DNA Nanotechnology",12],"27-201":["Structure of Materials",9],
"27-202":["Defects in Materials",9],"27-211":["Structure of Materials",6],"27-212":["Defects in Materials",6],"27-227":["Phase Relations and Diagrams",9],
"27-301":["Microstructure and Properties",9],"27-357":["Introduction to Materials Selection",6],"27-367":["Selection and Performance of Materials",6],
"27-421":["Processing Design",6],"27-432":["Electronic Properties of Materials",9],"27-433":["Optical, Dielectric, and Magnetic Properties of Materials",9],
"27-445":["Structure, Properties and Performance Relationships in Magnetic Materials",9],"27-477":["Introduction to Polymer Science and Engineering",9],
"27-505":["Exploration of Everyday Materials",9],"27-533":["Processing of semiconductors and thin films",6],"27-542":["Thin Film Technologies",9],
"27-565":["Nanostructured Materials",9],"27-570":["Polymeric Biomaterials",12],"27-577":["Advanced Polymer Science and Engineering",9],"27-591":["Mechanics of Materials",9],
"27-592":["Solidification Processing",9],"27-709":["Biomaterials",12],"32-201":["Leadership & Management",9],"32-310":["Evolution Of Warfare",9],
"32-402":["Leadership and Ethics",9],"33-115":["Physics for Future Presidents",9],"33-232":["Mathematical Methods of Physics",10],"33-241":["Introduction to Computational Physics",9],
"33-355":["Nanoscience and Nanotechnology",9],"33-456":["Advanced Computational Physics",9],"33-658":["Quantum Computation and Quantum Information Theory",10],
"36-200":["Reasoning with Data",9],"36-202":["Methods for Statistics & Data Science",9],"36-204":["Discovering the Data Universe",3],"36-219":["Probability Theory and Random Processes",9],
"36-220":["Engineering Statistics and Quality Control",9],"36-235":["Probability and Statistical Inference I",9],"36-236":["Probability and Statistical Inference II",9],
"36-247":["Statistics for Lab Sciences",null],"36-290":["Introduction to Statistical Research Methodology",9],"36-309":["Experimental Design for Behavioral & Social Sciences",9],
"36-311":["Statistical Analysis of Networks",9],"36-313":["Statistics of Inequality and Discrimination",9],"36-315":["Statistical Graphics and Visualization 2",9],
"36-318":["Introduction to Causal Inference",9],"36-326":["Mathematical Statistics",9],"36-350":["Statistical Computing 2",9],"36-396":["Tartan Athletics Analytics",9],
"36-401":["Modern Regression",9],"36-402":["Advanced Methods for Data Analysis",9],"36-410":["Introduction to Probability Modeling",9],"36-460":["Special Topics: Sports Analytics",9],
"36-461":["Special Topics: Statistical Methods in Epidemiology",9],"36-462":["Special Topics: Statistical Machine Learning",9],"36-463":["Special Topics: Multilevel and Hierarchical Models",9],
"36-464":["Special Topics: Psychometrics: A Statistical Modeling Approach",9],"36-465":["Special Topics: Conceptual Foundations of Statistical Learning",9],
"36-466":["Special Topics: Statistical Methods in Finance",9],"36-467":["Special Topics: Data over Space & Time",9],"36-468":["Special Topics: Text Analysis",9],
"36-469":["Special Topics: Statistical Genomics and High Dimensional Inference",9],"36-470":["Special Topics: Statistical Methods in Health Sciences",9],
"36-471":["Special Topics: Time Series",9],"36-472":["Special Topics: Computational Statistical Methods in Life Sciences",9],"36-473":["Special Topics: Statistical Principles of Generative AI",9],
"36-490":["Undergraduate Research",9],"36-493":["Sports Analytics Capstone",9],"36-497":["Corporate Capstone Project",9],"36-700":["Probability and Mathematical Statistics",12],
"39-601":["Special Topics: Additive Manufacturing Processing and Product Development",12],"39-602":["Additive Manufacturing and Materials",12],
"39-603":["Additive Manufacturing Laboratory",12],"42-402":["BME Design Project",9],"42-444":["Medical Devices",9],"42-611":["Biomaterials",12],"42-630":["Introduction to Neural Engineering",12],
"42-631":["Neural Data Analysis",12],"42-632":["Neural Signal Processing",12],"42-676":["Bio-nanotechnology: Principles and Applications",9],"48-095":["Spatial Concepts for Non-Architecture Majors",12],
"48-100":["Architecture Design Studio: POIESIS STUDIO 1",12],"48-116":["Introduction to Building Performance",3],"48-119":["Design Ethics & Social Justice in Architecture",3],
"48-120":["Digital Media I",6],"48-121":["Drawing I",6],"48-125":["Digital Media II",6],"48-126":["Drawing II",6],"48-214":["Generative Modeling",9],
"48-215":["Materials & Assembly",9],"48-234":["Structural Design 1: Form and Forces",6],"48-240":["History of World Architecture, I",9],"48-241":["Modern Architecture: History & Theory",9],
"48-247":["Fundamentals of Computational Design",9],"48-315":["Environmental Systems: Climate & Energy in Buildings",9],"48-324":["Structural Design 1: Form and Forces",9],
"48-338":["European Cities in the XIX Century: Planning, Architecture, Preservation",9],"48-340":["Modern Architecture and Theory 1900-1945",9],
"48-348":["Architectural History of Mexico & Guatemala",9],"48-350":["Postwar Modern Architecture and Theory",9],"48-374":["History of Architecture in the Islamic World",9],
"48-380":["Constructing Value(s): Economies of Design",6],"48-381":["Issues of Practice",6],"48-383":["Ethics in Architecture",6],"48-432":["Environment II: Design Integration of Active Building Systems",9],
"48-530":["Human-Machine Virtuosity",12],"48-531":["Fabricating Customization: Prototype",9],"48-545":["Design Fabrication",9],"48-551":["Lab for Cybernetics: Engaging Wicked Challenges",9],
"48-555":["Introduction to Architectural Robotics",9],"48-568":["Advanced CAD, BIM, and 3D Visualization",9],"48-599":["Design Fabrication Independent Study",9],
"48-721":["Building Controls and Diagnostics",12],"48-722":["Building Performance Modeling",12],"48-723":["Performance of Advanced Building Systems",9],
"48-724":["Scripting and Parametric Design",9],"48-727":["Inquiry into Computational Design",9],"48-729":["Sustainability, Health and Productivity to Accelerate a Quality Built Environment",9],
"48-749":["Special Topics in Computational Design",6],"48-795":["LEED, Green Design and Building Ratings",6],"49-300":["Integrated Product Conceptualization",12],
"51-173":["Human Experience in Design",9],"51-229":["Digital Imaging",9],"51-236":["Information Design",9],"51-241":["How People Work",9],"51-261":["Communication & Digital Design Fundamentals",9],
"51-262":["Communication and Digital Design Fundamentals",9],"51-264":["Product Design Fundamentals",9],"51-367":["Design Center: Computational Design Thinking",9],
"51-371":["Futures I",4.5],"51-373":["Futures II",4.5],"51-382":["Design for Social Innovation",9],"51-400":["Transition Design",9],"51-486":["Designing Experiences for Learning",9],
"53-230":["Programming for Game Designers",12],"53-312":["Guest Experience in Theme Park Design",9],"53-320":["IDeATe Special Topics in Animation: Character Modeling",6],
"53-321":["IDeATe Special Topics in Animation: Bipedal Rigging for Animation Production",6],"53-322":["IDeATe: Little Games/Big Stories: Indie Tabletop Roleplaying Game Studio",9],
"53-323":["IDEATE Storytelling Through Effects Animation",6],"53-330":["IDeATe: Inflatables",12],"53-353":["Understanding Game Engines",9],"53-371":["Role Playing Games Writing Workshop",12],
"53-451":["Research Issues in Game Development: Designing for XR",12],"53-471":["Game Design, Prototyping and Production",15],"53-472":["Advanced Game Studio",12],
"54-109":["Dramaturgy 1: Approaches to Text",9],"54-157":["Production Science",6],"54-163":["Production for Non Majors",6],"54-166":["Introduction to Sound Design for Theatre",6],
"54-169":["Studiocraft: Drafting",13],"54-171":["Basic Design 1",6],"54-177":["Foundations of Drama I",6],"54-187":["Writing the Speculative Play",9],
"54-191":["Acting for Non-Majors",9],"54-193":["Improv: Acting for Non-Majors",9],"54-196":["Introduction to Playwriting",9],"54-267":["Conceptual Sound Design",9],
"54-281":["Foundations of Drama II",6],"54-346":["Introduction to Costume Construction",6],"54-397":["Sound Design For Interactive Environments",9],
"54-399":["Decoding Media",9],"54-405":["Digital Narratives",5],"54-486":["Understanding Textiles",3],"57-101":["Elective Studio",6],"57-149":["Basic Harmony I",9],
"57-152":["Harmony I",9],"57-161":["Eurhythmics I",3],"57-173":["Survey of Western Music History",9],"57-181":["Solfege I",3],"57-188":["Repertoire and Listening for Musicians",1],
"57-209":["The Beatles",6],"57-306":["World Music",9],"57-329":["Beginning Piano for Minors",3],"57-330":["Beginning Piano for Minors II",3],"57-337":["Sound Recording",6],
"57-338":["Sound Editing and Mastering",6],"57-344":["Experimental Sound Synthesis",9],"57-345":["Twisted Signals: Multimedia Processing for the Arts",10],
"57-347":["Electronic and Computer Music",6],"57-358":["Introduction to Electronic Music",9],"57-359":["Audiovisual Composition",9],"57-421":["Exploded Ensemble",6],
"57-438":["Multitrack Recording",9],"57-458":["Business of Music",6],"57-476":["How Music Works: An Affective History",6],"57-477":["Music of the Spirit",6],
"57-478":["Survey of Historical Recording",6],"57-480":["History of Black American Music",6],"57-485":["History of the Symphony",9],"60-105":["Cultural History of the Visual Arts",9],
"60-106":["Cultural History of the Visual Arts - the Modern Period",9],"60-125":["IDeATe: Introduction to 3D Animation Pipeline",12],"60-136":["Ceramics for Non-Majors",10],
"60-137":["Physical Computing for Non-Majors",10],"60-141":["Black and White Photography I",10],"60-142":["Digital Photography I",10],"60-157":["Drawing for Non-Majors",10],
"60-212":["Intermediate Studio: Creative Coding",12],"60-220":["IDeATe: Technical Character Animation",10],"60-223":["IDeATe Portal: Introduction to Physical Computing",10],
"60-224":["Intermediate Studio: Expanded Cinema",10],"60-241":["Black and White Photography II",10],"60-335":["IDeATe Special Topics in Animation: Story Development",6],
"60-337":["IDeATe Special Topics in Animation: Storyboarding",6],"60-369":["Critical Studies: DEEP FAKE, AI and Beyond: Posthumanism & Contemporary Art",9],
"60-372":["Critical Studies: The Precarious Body in Contemporary Art",9],"60-399":["Art History/Theory Independent Study",9],"60-413":["Advanced ETB: Real-Time Animation",10],
"60-414":["Advanced ETB: Hand Drawn Animation",10],"60-415":["Advanced ETB: Animation Studio",10],"60-428":["Advanced ETB: Drawing with Machines",12],
"62-150":["IDeATe Portal: Introduction to Media Synthesis and Analysis",10],"62-245":["Portrait Photography",10],"62-279":["Photography and the Ineffable",10],
"62-315":["Shaping Environments: Experiments in Geometry and (Waste)Matter",9],"62-343":["Professional Practices in Photography",10],"62-360":["Photographers and Photography Since World War II",9],
"62-371":["Photography, The First 100 Years, 1839-1939",9],"62-423":["IDeATe Inclusive Design Studio: From Interview to Product w Physical Computing",10],
"62-478":["IDeATe: digiTOOL",9],"66-152":["Dietrich College Grand Challenge Seminar: Gender: Contemporary Issues",9],"66-236":["Introduction to Environmental Ideas",9],
"67-206":["Technology Outreach and Engagement in the Pittsburgh Community",6],"67-220":["Digital Accessibility - Ensuring Universal Access to the Information Society",9],
"67-240":["Mobile Web Design & Development",9],"67-250":["The Information Systems Milieux",9],"67-262":["Database Design and Development",9],"67-265":["Design Fundamentals: Shaping Interactions and Experiences",9],
"67-279":["Introduction to Geographical Information Systems",6],"67-306":["Management of Computer and Information Systems",6],"67-336":["Building Data Visualizations in to Information Systems",9],
"67-348":["Black Mirror - Cultural Representations of Technology",9],"67-364":["Practical Data Science",9],"67-368":["User Experience (UX) Research for Product Managers",9],
"67-443":["Mobile Application Design and Development",12],"70-100":["Global Business",9],"70-101":["Business Strategy Fundamentals",9],"70-122":["Introduction to Accounting",9],
"70-207":["Probability and Statistics for Business Applications",9],"70-208":["Regression Analysis",9],"70-246":["Innovation & Entrepreneurial Mindset",6],
"70-257":["Optimization for Business",9],"70-321":["Negotiation and Conflict Resolution",9],"70-341":["Team Dynamics and Leadership",9],"70-342":["Managing Across Cultures",9],
"70-364":["Business Law",6],"70-365":["International Trade and International Law",9],"70-371":["Operations Management",9],"70-374":["Data Mining & Business Analytics",9],
"70-381":["Marketing I",9],"70-387":["Strategy for High-Tech Products and Services",9],"70-389":["Design Thinking with AI",9],"70-391":["Finance",9],
"70-395":["Funding Entrepreneurial Ventures",9],"70-398":["International Finance",9],"70-415":["Introduction to Entrepreneurship",9],"70-416":["New Venture Creation",9],
"70-428":["Financial Statement Analysis",9],"70-430":["International Management",9],"70-438":["Commercialization and Innovation",9],"70-443":["Digital Marketing and Social Media Strategy",9],
"70-452":["Introduction to Product Management",9],"70-455":["Data Management Fundamentals",9],"70-458":["Advanced Data Management",9],"70-460":["Mathematical Models for Consulting",9],
"70-462":["Uncertainty and Risk Modeling",9],"70-467":["Machine Learning for Business Analytics",9],"70-469":["End to End Business Analytics",9],
"70-471":["Supply Chain Management",9],"70-477":["Real Options: Creating Value Beyond NPV",9],"70-481":["Marketing Research",9],"70-482":["Pricing Strategy",9],
"70-483":["Advertising and Marketing Communications",9],"70-492":["Investment Analysis",9],"70-493":["Valuation and Financial Modeling",9],"70-495":["Corporate Finance",9],
"73-328":["Health Economics",12],"73-332":["Political Economy",9],"73-337":["Business of Blockchain",9],"73-365":["Firms, Market Structures, and Strategy",9],
"73-374":["Econometrics II",9],"73-408":["Law and Economics",9],"73-427":["Sustainability, Energy, and Environmental Economics",9],"76-203":["Literature & Culture in the 18th Century",9],
"76-207":["Special Topics in Literature & Culture",9],"76-210":["Banned Books",9],"76-211":["Model Minorities?: Introduction to Asian American Studies",9],
"76-219":["Law & Blame",9],"76-220":["Mystery! From Detective Fiction to True Crime",9],"76-221":["Books You Should Have Read By Now",9],"76-230":["Literature & Culture in the 19th Century",9],
"76-233":["Literature and Culture in the Renaissance",9],"76-239":["Introduction to Film Studies",9],"76-241":["Introduction to Gender Studies",9],
"76-242":["American Woman Writers",9],"76-244":["Immigrant Fictions",9],"76-245":["Shakespeare: Tragedies & Histories",9],"76-247":["Shakespeare: Comedies and Romances",9],
"76-259":["Film History",9],"76-260":["Introduction to Writing Fiction",9],"76-261":["Intro to Writing Creative Nonfiction",9],"76-265":["Introduction to Writing Poetry",9],
"76-268":["Comic Books & Pop Culture",9],"76-269":["Introduction to Screenwriting",9],"76-270":["Writing for the Professions",9],"76-271":["Introduction to Professional and Technical Writing",null],
"76-275":["Introduction to Critical Writing",9],"76-278":["Japanese Film and Literature: The Art of Storytelling",9],"76-292":["Introduction to Film Production",9],
"76-293":["Writing about Research in Your Discipline",9],"76-295":["Russian Cinema: From the Bolshevik Revolution to Putin's Russia",9],"76-296":["20th Century Russian Masterpieces",9],
"76-299":["19th Century Russian Masterpieces",9],"76-306":["Editing and Publishing",null],"76-310":["Advanced Studies in Film and Media",9],"76-312":["Crime and Justice in American Film",9],
"76-313":["Creative Visual Storytelling in Film Production",9],"76-314":["Data Stories",9],"76-317":["Contemporary American Fiction",9],"76-318":["Communicating in the Global Marketplace",9],
"76-325":["Intertextuality",9],"76-326":["Contemporary Global Fiction",9],"76-327":["Equity & Communication: Strategies for Institutional Change",9],
"76-329":["Performing Race in Early Modern Drama",9],"76-337":["Intersectional Feminism",9],"76-339":["Topics in Film and Media",9],"76-341":["The Age of Jane Austen",9],
"76-342":["Love: A Cultural History",9],"76-343":["Rise of the American Novel",9],"76-347":["Major Fiction",9],"76-348":["Adaptation: Fiction to Film",9],
"76-353":["Transnational Feminisms: Fiction and Film",9],"76-354":["Watchdog Journalism",9],"76-363":["Reading in Forms: Poetry",9],"76-364":["Reading in Forms: Fiction",9],
"76-365":["Beginning Poetry Workshop",9],"76-367":["Fact Into Film: Translating History into Cinema",9],"76-368":["Role Playing Game Writing Workshop",12],
"76-372":["News Writing",9],"76-373":["Argument",9],"76-374":["Mediated Narrative",9],"76-376":["Crafting Race in 19th-Century Britain",9],"76-380":["Methods in Humanities Analytics",9],
"76-384":["Race, Nation, and the Enemy",9],"76-385":["Introduction to Discourse Analysis",9],"76-386":["Language & Culture",9],"76-387":["Writing in the Disciplines",6],
"76-388":["Coding for Humanists",9],"76-389":["Rhetorical Grammar",9],"76-390":["Style",9],"76-391":["Document & Information Design",9],"76-392":["Special Topics in Literature & Culture",9],
"76-395":["Science Writing",9],"76-401":["Hollywood vs. the World",9],"76-407":["Topics in Literary & Cultural Studies: There Are Black People in the Future",9],
"76-410":["The Long Eighteenth Century",9],"76-415":["Mediated Power and Propaganda",9],"76-423":["Transnational Feminisms",9],"76-427":["Topics in Rhetoric: Audience",9],
"76-429":["Introduction to Computational Humanities",9],"76-431":["Gender Play in Early Modern Drama",9],"76-434":["Literature & Social Change in the 19th Century",9],
"76-439":["Seminar in Film and Media Studies",9],"76-442":["Black Lives in Pre-1900 Britain",9],"76-446":["Revenge Tragedy",9],"76-448":["Shakespeare on Film",9],
"76-450":["Law, Culture, and the Humanities",9],"76-454":["Rise of the Blockbuster",9],"76-456":["Independent Study in Film & Media Studies",null],
"76-460":["Beginning Fiction Workshop",9],"76-461":["Refugee Stories: Literature, Art and Film",9],"76-462":["Advanced Fiction Workshop",9],"76-464":["Creative Nonfiction Workshop",9],
"76-465":["Advanced Poetry Workshop",9],"76-467":["Crime Fiction and Film",9],"76-468":["Space and Mobilities",9],"76-469":["Screenwriting Workshop",9],
"76-473":["Rhetoric & the Construction of Race",9],"76-474":["Software Documentation",9],"76-475":["Law, Performance, and Identity",9],"76-476":["Rhetoric of Science",9],
"76-481":["Introduction to Multimedia Design",12],"76-482":["Rise of the Art Film",9],"76-483":["Research Methods in Technical & Professional Communication",9],
"76-484":["Discourse Analysis",9],"76-487":["Information Architecture & Content Strategy",9],"76-488":["Information Architecture & Content Strategy Lab",3],
"76-490":["Digital Rhetorics",9],"76-491":["Rhetorical Analysis",9],"76-492":["Rhetoric of Public Policy",9],"76-493":["Science Fictions/Speculative Futures: Utopian/Dystopian Visions in Film & Media",9],
"76-494":["Healthcare Communications",9],"76-495":["Other People's Words: The History, Theory, and Practice of Interviews",9],"76-496":["Research Methods in Rhetoric & Writing Studies",9],
"79-106":["Introduction to Asian Religions",6],"79-110":["Introduction to the Medieval Mediterranean World",9],"79-116":["Introduction to the Modern Middle East",9],
"79-120":["Introduction to African American History: Black Americans and the World",9],"79-122":["Ancient Mediterranean Civilizations",9],"79-124":["History of Indian Yoga and Meditation",6],
"79-150":["Medieval Science, Magic, and Wonders of Nature",9],"79-155":["Introduction to African American Studies",9],"79-159":["Hinduism: History, Religion, and the BJP",6],
"79-160":["Introduction to the History of Science",9],"79-170":["Introduction to Science, Technology, and Society",9],"79-175":["Moneyball Nation: Data in American Life",9],
"79-178":["Equality Under the Law",9],"79-200":["Introduction to Historical Research & Writing",9],"79-201":["Introduction to Anthropology",9],"79-202":["Flesh and Spirit: Early Modern Europe, 1400-1750",9],
"79-203":["The Other Europe: The Habsburgs, Communism, & Central/Eastern Europe, 1740-1990",9],"79-204":["American Environmental History",9],"79-205":["20th Century Europe",9],
"79-206":["Crime and Punishment in Early Modern Europe",9],"79-208":["Witchcraft and Witch-Hunting",9],"79-210":["Identity, Ethnicity, and Place in Modern China",9],
"79-211":["Modern Southeast Asia: Colonialism, Capitalism, and Cultural Exchange",9],"79-212":["Jim Crow America",9],"79-213":["The American Railroad: Decline and Renaissance in the Age of Deregulation",6],
"79-215":["Environmental Justice from Conservation to Climate Change",9],"79-220":["Screening Mexico: Mexican Cinema, 1898 to Present",9],"79-223":["Mexico: From the Aztec Empire to the Drug War",9],
"79-225":["West African History in Film",9],"79-226":["African History: Earliest Times to 1780",9],"79-227":["Modern Africa: The Slave Trade to the End of Apartheid",9],
"79-228":["Buddhism and Modernity",6],"79-229":["The Origins of the Palestinian-Israeli Conflict, 1880-1948",9],"79-230":["The Arab-Israeli Conflict and Peace Process Through 1948 to Present",9],
"79-234":["Technology and Society",9],"79-240":["U.S. History and Culture",9],"79-242":["African American History: Reconstruction to the Present",6],
"79-245":["Capitalism and Individualism in American Culture",9],"79-246":["War, Genocide, and Gender in Modern Europe",9],"79-247":["African Americans, Imprisonment, and the Carceral State",9],
"79-248":["U.S. Constitution & the Presidency",9],"79-249":["20th Century U.S. History",9],"79-250":["Voting Rights: An Introduction",9],"79-252":["\"Harriet\": Harriet Tubman, Slavery, and the Underground Railroad",6],
"79-255":["Modern Ireland: Politics and Culture from the Famine (1847) to Today",9],"79-257":["Germany and the Second World War",9],"79-260":["Nazi Germany: A Practical History",9],
"79-261":["The Last Emperors: Chinese History and Society, 1600-1900",9],"79-262":["Modern China: From the Birth of Mao ... to Now",9],"79-264":["Tibet and China: History and Propaganda",9],
"79-265":["Russian History: Game of Thrones",9],"79-266":["Russian History and Revolutionary Socialism",9],"79-267":["The Soviet Union in World War II: Military, Political, and Social History",9],
"79-268":["World War I: The Twentieth Century's First Catastrophe",9],"79-269":["Russian History: From Socialism to Capitalism",9],"79-270":["Anti-Semitism Then and Now: Perspectives from the Middle Ages to the Present",9],
"79-272":["Coexistence and Conflict: Muslims, Christians and Jews in Spain and Portugal",9],"79-273":["Jews & Arabs: From the Time of Muhammad to the Present",9],
"79-275":["Introduction to Global Studies",9],"79-276":["Beyond the Border",9],"79-278":["How (Not) to Change the World",9],"79-280":["Coffee and Capitalism",9],
"79-281":["Introduction to Religion",9],"79-283":["Anthropology of Energy",9],"79-284":["Muslim Representation in the Media and Popular Culture",9],
"79-288":["Bananas, Baseball, and Borders: Latin America and the United States",9],"79-289":["Animal Planet: An Environmental History of People and Animals",9],
"79-290":["The Slave Passage: From West Africa to the Americas",9],"79-296":["Religion in American Politics",6],"79-297":["Technology and Work",9],
"79-301":["History of Surveillance: From the Plantation to Data Capitalism",6],"79-302":["Killer Robots",9],"79-303":["Pittsburgh and the Transformation of Modern Urban America",6],
"79-304":["History of Eugenics and Scientific Racism",9],"79-305":["Global Perspectives in LGBTQ+ History",9],"79-306":["Fact into Film: Translating History into Cinema",9],
"79-308":["Crime and Justice in American Film",9],"79-313":["\"Unwanted\": Refugees, Asylum Seekers, and Patterns of Global Migration",6],"79-314":["How Do We Remember? The Politics and Cultures of Memory",9],
"79-315":["The Politics of Water in Global Perspective",9],"79-317":["Art, Anthropology, and Empire",9],"79-318":["Sustainable Social Change: History and Practice",9],
"79-319":["India Through Film",6],"79-322":["Stalin and the Great Terror",9],"79-329":["Introduction to Queer Studies",9],"79-330":["Medicine and Society: Health, Healers, and Hospitals",9],
"79-332":["Medical Anthropology",9],"79-333":["African Americans, Race, and the Fight for Reparations",9],"79-340":["Juvenile Delinquency & Film: From \"Boyz N the Hood\"",6],
"79-342":["Age of Crusading, 1000-1800",9],"79-343":["Education, Democracy, and the Arts",9],"79-349":["The Holocaust in History and Culture",9],
"79-350":["Early Christianity",9],"79-352":["Christianity Divided: The Protestant and Catholic Reformations, 1450-1650",9],"79-357":["Science and the Body",6],
"79-360":["Crime, Policing, and the Law: Historical and Contemporary Perspectives",9],"79-368":["Un-natural Disasters: Societies and Environmental Hazards in Global Perspective",6],
"79-371":["African American Urban History",9],"79-375":["Science & Religion",6],"79-377":["Food, Culture, and Power: A History of Eating",9],"79-378":["Gender in South Asia",9],
"79-379":["Experimental Ethnography",9],"79-380":["Hostile Environments: The Politics of Pollution in Global Perspective",9],"79-385":["Out of Africa: The Making of the African Diaspora",9],
"79-393":["Institutions of the Roman Church",9],"79-395":["The Arts in Pittsburgh",9],"80-201":["Knowledge and Justified Belief",9],"80-208":["Against the Algorithm: Critical Thinking as a Way of Life",9],
"80-210":["Logic and Proofs",null],"80-211":["Logic and Mathematical Inquiry",9],"80-220":["Philosophy of Science",9],"80-222":["Measurement and Methodology",9],
"80-226":["The Nature of Scientific Revolutions",9],"80-234":["Philosophy of Race and Gender",9],"80-246":["Moral Psychology",9],"80-249":["AI, Society and Humanity",9],
"80-250":["Ancient Philosophy",9],"80-251":["Modern Philosophy",9],"80-253":["Continental Philosophy",9],"80-254":["The History of Analytic Philosophy and Its Influence",9],
"80-255":["Pragmatism: Scientific Approach to Philosophy",9],"80-261":["Experience, Reason, and Truth",9],"80-276":["Philosophy of Religion",9],
"80-280":["Linguistic Analysis",9],"80-282":["Phonetics and Phonology",9],"80-283":["It Matters How You Say It",9],"80-285":["Natural Language Syntax",null],
"80-286":["Words and Word Formation: Introduction to Morphology",9],"80-287":["Language Variation and Change",9],"80-288":["Intonation: The Meaning of Linguistic Tunes",9],
"80-305":["Game Theory",9],"80-306":["Decision Theory",9],"80-310":["Formal Logic",9],"80-311":["Undecidability and Incompleteness",null],"80-312":["Mathematical Revolutions",9],
"80-315":["Logics for Knowledge and Belief",9],"80-325":["Foundations of Causation and Machine Learning",9],"80-336":["Philosophy of Law",9],"80-350":["Adam Smith",9],
"80-358":["Hume",9],"80-365":["Ramsey",9],"80-381":["Meaning in Language",9],"80-382":["Laboratory Phonology",9],"80-383":["Language in Use",null],
"80-384":["Linguistics of Turkic Languages",9],"80-385":["Linguistics of Germanic Languages",9],"80-388":["Linguistic Typology: Diversity and Universals",9],
"80-411":["Proof Theory",9],"80-413":["Category Theory",9],"80-445":["Shift Capstone Experience",1],"80-447":["Seminar in Global Justice",9],"80-484":["Language and Thought",9],
"80-488":["Acoustics of Human Speech: Theory, Data, and Analysis",9],"80-514":["Categorical Logic",9],"80-516":["Causality and Machine Learning",9],
"80-521":["Seminar on Formal Epistemology: Uncertain Interpretations",9],"80-524":["Topics in Formal Epistemology: Topological Philosophy of Science",9],
"80-551":["Seminar on History of Philosophy: Smith and Hume",9],"82-114":["Arabic for Global Exchange Online",6],"82-117":["Arabic Conversation & Dialect I",6],
"82-118":["Arabic Conversation & Dialect II",6],"82-137":["Chinese Calligraphy: Culture and Skills",9],"82-186":["Sex and Romance in Study Abroad",9],
"82-191":["Elementary Russian I",12],"82-192":["Elementary Russian II",12],"82-194":["Intensive Russian",15],"82-201":["Intermediate French I",9],
"82-202":["Intermediate French II",9],"82-211":["Intermediate Arabic I",12],"82-212":["Intermediate Arabic II",12],"82-214":["Topics in Modern Arabic Language, Literature, & Culture",6],
"82-215":["Minorities in the Middle East and North Africa",9],"82-216":["Literature of the Arabic-speaking World",9],"82-217":["Multilingualism and Multiculturalism in the Arab World",9],
"82-221":["Intermediate German I",9],"82-222":["Intermediate German II",9],"82-227":["Germany & the European Union",9],"82-230":["Cultural Topics in Chinese Studies",9],
"82-232":["Intermediate Chinese II",12],"82-234":["Environment and Society in Modern Chinese Literature and Visual Culture",9],"82-238":["Topics in Chinese Culture",9],
"82-245":["New Directions in Hispanic Studies",9],"82-247":["US Latinos Literature",9],"82-248":["Introduction to Latin American Film and Visual Arts",9],
"82-249":["Hispanic Language & Cultures for the Professions",9],"82-250":["Digital Realities: An Introduction to Immersive Storytelling",9],"82-253":["Korean Society through Film and Literature",9],
"82-260":["Black Italy",9],"82-271":["Intermediate Japanese I",12],"82-272":["Intermediate Japanese II",12],"82-273":["Japanese Culture and Society",9],
"82-275":["Queer Representations in Contemporary Literature and Culture from Japan",9],"82-278":["Japanese Film and Literature: The Art of Storytelling",9],
"82-279":["Anime - Visual Interplay between Japan and the World",9],"82-280":["Bilingual & Bicultural Experiences in the US",9],"82-281":["Gender and Sexuality in the Spanish-speaking World",9],
"82-282":["Interpreting Global Texts & Cultures",9],"82-283":["Language Diversity & Cultural Identity",9],"82-284":["Multicultural Pittsburgh: Storytelling with 360 Video",6],
"82-285":["Podcasting: Language and Culture Through Storytelling",9],"82-286":["Of Minorities and Migrants: Exploring Germany from the Margins Germany Today",9],
"82-287":["Multicultural Immersion - Relating Your World in Virtual Reality",6],"82-288":["Everyday Learning: Designing Learning Exp in Times of Unrest & Uncertainty",6],
"82-291":["Intermediate Russian I",12],"82-292":["Intermediate Russian II",12],"82-293":["Russian Cinema: From the Bolshevik Revolution to Putin's Russia",null],
"82-294":["19th Century Russian Masterpieces",9],"82-295":["20th Century Russian Masterpieces",9],"82-296":["From Augustine to Avatars: Personal Narratives Across Media",6],
"82-300":["Language & Society in the Arab World",9],"82-303":["Global French Cultures",9],"82-304":["Global French Sociolinguistics",9],"82-311":["Advanced Arabic I",9],
"82-312":["Advanced Arabic II",9],"82-313":["Topics in Modern Arabic Language, Literature & Culture",9],"82-314":["Literature of the Arabic-speaking World",9],
"82-320":["Contemporary Society in Germany, Austria and Switzerland",9],"82-323":["Germany, Austria and Switzerland in the 20th Century",9],"82-331":["Advanced Chinese I: Population, Youth, Marriage and Housing",9],
"82-332":["Reading Into a New China II: Transportation, Education, Pop Culture, & Health",9],"82-333":["Chinese Culture and Society",9],"82-334":["Structure of Chinese",9],
"82-335":["Chinese Culture Through Legends and Folktales",9],"82-337":["Mandarin Chinese for Oral Communication I",9],"82-338":["Mandarin Chinese for Oral Communication II",9],
"82-339":["Business Language & Culture in China I",9],"82-340":["Business Language & Culture in China II",9],"82-342":["Cultures of Spain",9],"82-343":["Cultures of Latin America",9],
"82-344":["U.S. Latine Cultures",9],"82-345":["Using Spanish in Social Contexts",9],"82-371":["Advanced Japanese I: An Exploration of Critical Global Topics",9],
"82-372":["Advanced Japanese 2: An Exploration of Critical Global Topics",9],"82-373":["Structure of the Japanese Language",9],"82-374":["Issues in Japanese Technology & Society",9],
"82-383":["Second Language Acquisition: Theories and Research",9],"82-385":["Qualitative methods in SLA research",null],"82-388":["Topics in Second Language Acquisition",9],
"82-391":["Advanced Russian I - Berlin, Paris, New York, Harbin",9],"82-392":["Advanced Russian II: Great Short Works",9],"82-394":["Russian for Heritage Speakers: Babushkas, Russia & Beyond",9],
"82-397":["Radicals, Heretics, Hackers: Russian Outlaws in History, Literature, and Film",null],"82-411":["Topics in Arabic Media",9],"82-412":["Topics in Arabic Studies",9],
"82-417":["Arabic for the Professions II",9],"82-420":["The Crucible of Modernity: Vienna 1900",9],"82-425":["Topics in German Literature and Culture",9],
"82-426":["Topics in German Literature and Culture",9],"82-427":["Nazi and Resistance Culture",9],"82-428":["History of German Film",9],"82-431":["China and the West",9],
"82-432":["Chinese Popular Culture: A Game of Learning",9],"82-433":["Topics in Contemporary Culture of China",9],"82-434":["Studies in Chinese Traditions",9],
"82-436":["Introduction to Classical Chinese",9],"82-439":["Black Myth: Wukong and the Journey to the West",9],"82-440":["Studies in Chinese Literature & Culture",9],
"82-441":["Studies in Peninsular Literature and Culture",9],"82-443":["Spanish Reading and Translation Workshop",9],"82-444":["The Structure of Spanish",6],
"82-445":["U.S. Latino Literature",9],"82-448":["Topics in Arabic Language, Literature, & Culture",9],"82-451":["Studies in Latin American Literature and Culture",9],
"82-455":["Topics in Hispanic Studies",9],"82-456":["Topics in Hispanic Studies",9],"82-473":["Topics in Japanese Studies",9],"82-474":["Topics in Japanese Studies",9],
"82-480":["Translation Technologies",9],"82-481":["Translation Workshop 1",9],"82-482":["Introduction to Translation",9],"82-492":["The Historical Imagination in Nineteenth-Century Russian Literature",null],
"82-505":["LCAL Undergraduate Internship",null],"82-511":["Special Topics in Arabic Studies",null],"82-512":["Special Topics in Arabic Studies: Advanced Grammar Workshop",null],
"82-521":["Special Topics in German Studies",null],"82-522":["Special Topics in German Studies",null],"82-531":["Special Topics in Chinese Studies",null],
"82-532":["Special Topics in Chinese Studies",null],"82-541":["Special Topics in Hispanic Studies",null],"82-542":["Special Topics in Hispanic Studies",null],
"82-571":["Special Topics in Japanese Studies",null],"82-572":["Special Topics in Japanese Studies",null],"84-101":["Introduction to Political Science",9],
"84-120":["Introduction to US Constitutional Law",9],"84-200":["Security War Game Simulation",6],"84-226":["International Relations",9],"84-250":["Writing for Political Science and Policy",9],
"84-252":["Briefing in the Policy World",6],"84-266":["Research Design for Political Science",9],"84-267":["Data Science for Political Science",9],
"84-274":["An Introduction to Technology and War",9],"84-280":["Popcorn and Politics: American Foreign Policy at the Movies",12],"84-303":["International Human Rights",6],
"84-304":["Analysis of Current US National Security Priorities",6],"84-306":["Latin American Politics",9],"84-309":["American Political Divides and Great Debates",9],
"84-310":["Policy in a Global Economy 1: International Trade and Trade Policy",6],"84-311":["Policy in a Global Economy 2: International Macroeconomics and Finance",6],
"84-312":["Terrorism in Sub-Saharan Africa",6],"84-314":["Politics, Technological Change, and Economic Growth",9],"84-318":["Politics of Developing Nations",9],
"84-319":["Civil-Military Relations",9],"84-323":["War and Peace in the Contemporary Middle East",9],"84-325":["Contemporary American Foreign Policy",9],
"84-327":["Who Really Runs America?: Subnational Governance and Policymaking",9],"84-328":["Military Strategy and Doctrine",9],"84-329":["Asian Strategies",6],
"84-331":["Technology, Law, and Democracy",6],"84-332":["Contemporary US Constitutional Law Issues Taught in Washington, DC, through CMU/WSP",6],
"84-333":["Law of US Democracy",9],"84-336":["Implementing Public Policy: From Good Idea To Reality",12],"84-338":["Analysis of US Presidential Powers Taught in Washington, DC, through CMU/WSP",6],
"84-339":["Seminar in Public Policy Research",12],"84-341":["Transnational Criminal Networks & International Security",6],"84-349":["Digital Diplomacy: Cybersecurity Challenges and Global Governance",9],
"84-350":["A Strategist's Introduction to Artificial Intelligence",9],"84-355":["Democracy's Data: Analytics and Insights into American Elections",9],
"84-356":["Applied Political Data Analytics",9],"84-358":["Money, Connections, and Power: Interests and Influence in the US",9],"84-360":["CMU/WSP: Internship Seminar",24],
"84-363":["Click. Hack. Rule: Understanding the Power & Peril of Cyber Conflict",9],"84-366":["The 21st-Century Presidency: Expanding Powers, New Challenges",9],
"84-367":["The Politics of Antisemitism",9],"84-368":["Technology Ethics",9],"84-369":["Decision Science for International Relations",9],"84-370":["Nuclear Security & Arms Control",9],
"84-371":["International Governance of Artificial Intelligence",9],"84-372":["Space and National Security",9],"84-373":["International Law",9],"84-375":["Geopolitics of Innovation",9],
"84-383":["National Cyber Policy & Strategy",6],"85-100":["Introduction to Psychology",9],"85-106":["Animal Minds",9],"85-108":["Mind and Body: Pathways to Health",9],
"85-110":["Cognitive Psychology",9],"85-130":["Developmental Psychology",9],"85-150":["Social Psychology",9],"85-170":["Foundations of Brain and Behavior",9],
"85-190":["Psychopathology",9],"85-300":["Introduction to Research Methods",9],"85-310":["Research Methods in Cognitive Psychology",9],"85-314":["Cognitive Neuroscience Research Methods",9],
"85-350":["Research Methods in Social Psychology",9],"85-359":["Introduction to Music Cognition Research",9],"85-395":["Applications of Cognitive Science",9],
"85-412":["Cognitive Modeling",9],"85-413":["Perception",9],"85-417":["Multilingual Minds and the Brain",9],"85-419":["Introduction to Parallel Distributed Processing",9],
"85-420":["Biologically Intelligent Exploration",9],"85-432":["Data Science for Psychology and Neuroscience",9],"85-446":["Psychology of Gender",9],
"85-454":["Health Psychology",9],"85-472":["Cognitive Neuropsychology",9],"85-765":["Cognitive Neuroscience",9],"86-375":["Computational Perception",9],
"86-631":["Neural Data Analysis",12],"86-765":["Foundations of the Neural Basis of Cognition",9],"88-130":["Behavioral Economics for Life",9],"88-140":["Introduction to Sociology",9],
"88-150":["Managing Decisions",9],"88-221":["Markets, Democracy, and Public Policy",9],"88-223":["Decision Analysis",12],"88-234":["Negotiation: International Focus",9],
"88-235":["Negotiation: Strategies and Behavioral Insights",9],"88-237":["The Happy Cyborg",9],"88-251":["Empirical Research Methods",9],"88-252":["Causal Inference: from Data to Decisions",9],
"88-255":["Strategic Decision Making",9],"88-261":["Health Policy and Decision Making",9],"88-262":["Rationality and Irrationality in Medicine",9],
"88-275":["Bubbles: Data Science for Human Minds",9],"88-285":["Deconstructing and Dismantling Discrimination",9],"88-290":["Confessions, Lies, and Gossip",9],
"88-300":["Programming and Data Analysis for Social Scientists",9],"88-302":["Behavioral Decision Making",9],"88-312":["Decision Models and Games",null],
"88-341":["Team Dynamics and Leadership",9],"88-342":["The Neuroscience of Decision Making",9],"88-344":["Systems Analysis: Environmental Policy",9],
"88-360":["Behavioral Economics",9],"88-365":["Behavioral Economics and Public Policy",9],"88-366":["Behavioral Economics of Poverty and Development",9],
"88-367":["Designing Economics Experiments in the Wild",9],"88-372":["Social and Emotional Brain",9],"88-379":["Data-Driven Decision Analysis",9],
"88-411":["Rise of the Asian Economies",9],"88-451":["Policy Analysis Senior Project",12],"88-452":["Policy Analysis Senior Project",12],"88-454":["Decision Science Capstone",9],
"90-403":["Gender, Politics and Policies in the US and Across the World",6],"90-404":["Poverty Reduction and Social Policies in the US",6],"90-433":["Population Health",6],
"90-434":["Geospatial Health Analytics",12],"90-436":["Health Systems",6],"90-440":["Critical Analysis of Policy Research",9],"90-442":["Critical AI Studies for Public Policy",9],
"90-443":["Local and Regional Economic Development",12],"90-472":["Health Policy",6],"90-832":["Health Law",6],"90-834":["Geospatial Health Analytics",12],
"94-217":["Systems Thinking and Discrete Event Simulation",9],"94-409":["Healthcare Information Systems",12],"94-416":["Introduction to Decision Analytics and Systems",9],
"94-423":["Measuring Social",12],"94-431":["Applied Econometrics I",9],"94-441":["Ethics and Politics of Data",9],"94-489":["Machine Learning in Practice",12],
"94-806":["Privacy in the Digital Age",6],"95-444":["Cybersecurity Policy and Governance II",6],"99-361":["IDeATe Portal",9],"99-362":["IDeATe: Intelligent Learning Spaces",9],
"99-383":["Technology, Humanity and Social Justice- Education",3]
};

const MINOR_TEMPLATES = [
  {
    id:"tmpl-minor-in-computational-finance", name:"Minor in Computational Finance", type:"minor", college:"Intercollege (Mellon College of Science / Heinz College / Tepper School of Business)",
    totalUnitsTarget:null,
    note:"Unlike the major in Computational Finance, there is no application process required to enroll, but a student must satisfy one of the following sets of requirements to DECLARE the minor: (1) Completion of 21-270 Introduction to Mathematical Finance with a grade of A and an overall QPA of at least 3.20; OR (2) Completion of 21-270 and 21-370 Discrete Time Finance with an average grade of B and an ov [Source: not explicitly stated as a single total (built from listed courses below; core math/finance sequence plus encouraged electives) units]",
    sections:[
      { id:"tmpl-minor-in-computational-finance-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-computational-finance-cat0", name:"Required Courses", kind:"pool", minCourses:6, minUnits:null, targetUnits:null, targetCourses:6, pool:{explicit:["21-241", "21-259", "21-260", "21-270", "21-370", "21-420"], patterns:[], excludes:[]}, note:"all listed required, with stated alternates" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-environmental-and-sustainability-st", name:"Minor in Environmental and Sustainability Studies", type:"minor", college:"Intercollege (Steinbrenner Institute for Environmental Education & Research, Dietrich College of Humanities & Social Sciences, Mellon College of Science)",
    totalUnitsTarget:66,
    note:"Designed to be accessible for any undergraduate student at CMU regardless of primary major/college, with no extensive prerequisite barriers. No application process; declare by contacting the Advisor or Program Director. Double-Counting: Maximum 2 courses, regardless of units, can be double-counted for the Minor from any other Minor, Major, or Master's program (does not apply to General Education c [Source: Minimum 66 Units Total for students with primary majors in CFA, Dietrich, Tepper; Minimum 69 Units Total for students with primary majors in MCS, Engineering, SCS units]",
    sections:[
      { id:"tmpl-minor-in-environmental-and-sustainability-st-sec", name:"Requirements", unitsTarget:66, categories:[
        { id:"tmpl-minor-in-environmental-and-sustainability-st-cat0", name:"Core Courses", kind:"pool", minCourses:3, minUnits:18, targetUnits:18, targetCourses:3, pool:{explicit:["24-291", "24-381", "66-236"], patterns:[], excludes:[]}, note:"Complete 18 Units (CFA/Dietrich/Tepper) or 21 Units (MCS/Engineering/SCS), all listed required" },
        { id:"tmpl-minor-in-environmental-and-sustainability-st-cat1", name:"Global Course", kind:"pool", minCourses:null, minUnits:3, targetUnits:3, targetCourses:null, pool:{explicit:["99-383"], patterns:[], excludes:[]}, note:"Complete any one (3 Units)" },
        { id:"tmpl-minor-in-environmental-and-sustainability-st-cat2", name:"Statistics & Data Science", kind:"pool", minCourses:9, minUnits:9, targetUnits:9, targetCourses:9, pool:{explicit:["36-200"], patterns:[], excludes:[]}, note:"Complete 9 Units" },
        { id:"tmpl-minor-in-environmental-and-sustainability-st-cat3", name:"Electives for Environmental & Sustainability Studies", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["03-128", "03-140", "09-225", "09-510", "09-524", "09-529", "09-538", "19-101", "33-115", "33-226", "73-332", "73-408", "73-427", "79-300", "84-110", "84-226", "84-325", "88-221", "88-344", "88-366"], patterns:[], excludes:[]}, note:"Complete at least 36 Units of eligible electives; at least 27 Units must be \"External electives\" outside the student's primary major college, remaining 9 Units \"Free electives\"" },
      ]},
    ]
  },
  {
    id:"tmpl-game-design-minor-ideate", name:"Game Design Minor (IDeATe)", type:"minor", college:"Intercollege (Entertainment Technology Center / IDeATe network)",
    totalUnitsTarget:45,
    note:"Offered by the Entertainment Technology Center as part of the IDeATe network. Double-Counting: Students may double-count up to two of their Game Design minor courses toward requirements for other majors or minors. [Source: minimum 45 units units]",
    sections:[
      { id:"tmpl-game-design-minor-ideate-sec", name:"Requirements", unitsTarget:45, categories:[
        { id:"tmpl-game-design-minor-ideate-cat0", name:"One Computing Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose one, minimum of 9 Units" },
        { id:"tmpl-game-design-minor-ideate-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["16-223", "53-322", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose one, minimum of 9 Units" },
        { id:"tmpl-game-design-minor-ideate-cat2", name:"IDeATe Game Design Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["05-418", "15-466", "53-230", "53-320", "53-321", "53-323", "53-353", "53-371", "53-451", "53-471", "53-472", "60-224"], patterns:[], excludes:[]}, note:"minimum of 27 Units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-immersive-technologies-in-arts-cult", name:"Minor in Immersive Technologies in Arts & Culture", type:"minor", college:"Intercollege (IDeATe network)",
    totalUnitsTarget:54,
    note:"Students will be hybrid technologists, media-makers, and storytellers. Double-Counting: Students may double-count up to two of their IDeATe minor courses for other requirements. [Source: minimum 54 units units]",
    sections:[
      { id:"tmpl-minor-in-immersive-technologies-in-arts-cult-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-minor-in-immersive-technologies-in-arts-cult-cat0", name:"One IDEATE Portal Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["62-150", "82-250"], patterns:[], excludes:[]}, note:"choose one, minimum of 9 units" },
        { id:"tmpl-minor-in-immersive-technologies-in-arts-cult-cat1", name:"One Intercultural Focus Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["82-280", "82-282", "82-283"], patterns:[], excludes:[]}, note:"choose one, minimum of 9 units" },
        { id:"tmpl-minor-in-immersive-technologies-in-arts-cult-cat2", name:"One Computing Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose one, minimum of 9 units" },
        { id:"tmpl-minor-in-immersive-technologies-in-arts-cult-cat3", name:"IDeATe Immersive Technologies Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["15-463", "53-353", "53-451", "54-397", "54-399", "60-415", "82-284"], patterns:[], excludes:[]}, note:"minimum of 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-health-care-policy-and-management-h", name:"Minor in Health Care Policy and Management (HCPM)", type:"minor", college:"Intercollege (Heinz College, Dietrich College, Mellon College of Science)",
    totalUnitsTarget:54,
    note:"Entry requires completion of 73-102 Principles of Microeconomics or equivalent by approval. [Source: 54 units total units]",
    sections:[
      { id:"tmpl-minor-in-health-care-policy-and-management-h-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-minor-in-health-care-policy-and-management-h-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:21, targetUnits:21, targetCourses:null, pool:{explicit:["79-330", "90-436", "90-472"], patterns:[], excludes:[]}, note:"Complete a total of 21 units" },
        { id:"tmpl-minor-in-health-care-policy-and-management-h-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["42-444", "73-328", "76-494", "80-245", "88-365", "90-433", "90-832", "90-834", "94-409"], patterns:[], excludes:[]}, note:"Complete a minimum of 24 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-business-administration", name:"Minor in Business Administration", type:"minor", college:"Tepper",
    totalUnitsTarget:null,
    note:"Students pursuing the Business Administration primary major are NOT permitted to complete this minor. Only one minor course may double-count with any other major or minor requirements. [Source: 54 units]",
    sections:[
      { id:"tmpl-minor-in-business-administration-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-business-administration-cat0", name:"Required", kind:"pool", minCourses:5, minUnits:null, targetUnits:null, targetCourses:5, pool:{explicit:["70-100", "70-101", "70-122", "73-102", "73-104"], patterns:[], excludes:[]}, note:"all required (with or-alternative)" },
        { id:"tmpl-minor-in-business-administration-cat1", name:"Constrained Elective", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-311", "70-371", "70-381", "70-391"], patterns:[], excludes:[]}, note:"choose one" },
        { id:"tmpl-minor-in-business-administration-cat2", name:"Business Electives", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:[], patterns:[{depts:["70"],min:300,max:999}], excludes:[]}, note:"18 units of 70-3xx level or above" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-business-analytics-optimization", name:"Minor in Business Analytics & Optimization", type:"minor", college:"Tepper",
    totalUnitsTarget:null,
    note:"Requires Multivariate Calculus prerequisite (21-254, 21-256, 21-259, or 21-266), not counted toward minor. [Source: 54 units]",
    sections:[
      { id:"tmpl-minor-in-business-analytics-optimization-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-business-analytics-optimization-cat0", name:"Modeling Uncertainty", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["36-200", "36-220", "36-225", "70-207"], patterns:[], excludes:[]}, note:"choose one" },
        { id:"tmpl-minor-in-business-analytics-optimization-cat1", name:"Business Analytics and Optimization Core", kind:"pool", minCourses:7, minUnits:null, targetUnits:null, targetCourses:7, pool:{explicit:["15-388", "21-257", "21-292", "70-257", "70-374", "70-467", "70-469"], patterns:[], excludes:[]}, note:"all required (with or-alternatives)" },
        { id:"tmpl-minor-in-business-analytics-optimization-cat2", name:"Business Foundations Elective", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-122", "70-311", "70-371", "70-381", "70-391", "73-102", "73-104"], patterns:[], excludes:[]}, note:"choose one" },
        { id:"tmpl-minor-in-business-analytics-optimization-cat3", name:"Technical Elective", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["15-388", "70-208", "70-374", "70-455", "70-458", "70-460", "70-462", "70-467", "73-374"], patterns:[], excludes:[]}, note:"choose one" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-financial-management", name:"Minor in Financial Management", type:"minor", college:"Tepper",
    totalUnitsTarget:null,
    note:"Total: 54 units",
    sections:[
      { id:"tmpl-minor-in-financial-management-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-financial-management-cat0", name:"Required", kind:"pool", minCourses:7, minUnits:null, targetUnits:null, targetCourses:7, pool:{explicit:["36-200", "36-218", "36-220", "36-225", "70-207", "70-391", "70-493"], patterns:[], excludes:[]}, note:"all required (with or-alternatives on third item)" },
        { id:"tmpl-minor-in-financial-management-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["21-270", "70-398", "70-428", "70-492", "70-495", "73-103", "73-337"], patterns:[], excludes:[]}, note:"choose three" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-innovation-entrepreneurship-ideate", name:"Minor in Innovation & Entrepreneurship (IDeATe)", type:"minor", college:"Tepper (with IDeATe network)",
    totalUnitsTarget:65,
    note:"No more than two minor courses may double-count toward a student's major core requirements or an additional minor's core requirements. [Source: ~59-65 units units]",
    sections:[
      { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-sec", name:"Requirements", unitsTarget:65, categories:[
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat0", name:"Prerequisite Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["73-102"], patterns:[], excludes:[]}, note:"required" },
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat1", name:"Innovation Entrepreneurial Mindset Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-246"], patterns:[], excludes:[]}, note:"required" },
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat2", name:"One Portal Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["15-104", "15-294", "15-394", "51-236", "62-478"], patterns:[], excludes:[]}, note:"choose one" },
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat3", name:"One Entrepreneurship Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-415"], patterns:[], excludes:[]}, note:"required" },
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat4", name:"One Venture Creation Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-395", "70-416"], patterns:[], excludes:[]}, note:"choose one" },
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat5", name:"One Innovation Process Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-438"], patterns:[], excludes:[]}, note:"required" },
        { id:"tmpl-minor-in-innovation-entrepreneurship-ideate-cat6", name:"One Product Development Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["49-300"], patterns:[], excludes:[]}, note:"required" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-operations-supply-chain-management", name:"Minor in Operations & Supply Chain Management", type:"minor", college:"Tepper",
    totalUnitsTarget:null,
    note:"2 courses may double-count with any other major or minor requirements. [Source: 45-48 units]",
    sections:[
      { id:"tmpl-minor-in-operations-supply-chain-management-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-operations-supply-chain-management-cat0", name:"Required", kind:"pool", minCourses:9, minUnits:null, targetUnits:null, targetCourses:9, pool:{explicit:["21-257", "21-292", "70-257", "70-371", "70-460", "70-471", "70-477", "73-102", "73-104"], patterns:[], excludes:[]}, note:"all required (with or-alternatives)" },
        { id:"tmpl-minor-in-operations-supply-chain-management-cat1", name:"Engineering Project Management", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["06-421", "12-411", "18-540", "18-578", "19-451", "24-370", "42-402", "88-451"], patterns:[], excludes:[]}, note:"choose one" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-product-management", name:"Minor in Product Management", type:"minor", college:"Tepper",
    totalUnitsTarget:null,
    note:"Total: 54-57 units",
    sections:[
      { id:"tmpl-minor-in-product-management-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-product-management-cat0", name:"Required", kind:"pool", minCourses:5, minUnits:null, targetUnits:null, targetCourses:5, pool:{explicit:["70-381", "70-387", "70-452", "73-102", "73-104"], patterns:[], excludes:[]}, note:"all required (with or-alternative)" },
        { id:"tmpl-minor-in-product-management-cat1", name:"Course in Design Thinking", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["05-391", "05-410", "70-389"], patterns:[], excludes:[]}, note:"choose one" },
        { id:"tmpl-minor-in-product-management-cat2", name:"Marketing Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-385", "70-481", "70-482", "70-483"], patterns:[], excludes:[]}, note:"choose one" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-decision-analytics-and-systems-das", name:"Minor in Decision Analytics and Systems (DAS)", type:"minor", college:"Heinz",
    totalUnitsTarget:null,
    note:"Open to students in any undergraduate major. No per-course unit numbers given in source for core courses. [Source: ? units]",
    sections:[
      { id:"tmpl-minor-in-decision-analytics-and-systems-das-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-decision-analytics-and-systems-das-cat0", name:"DAS Core Courses", kind:"pool", minCourses:5, minUnits:null, targetUnits:null, targetCourses:5, pool:{explicit:["90-440", "94-217", "94-416", "94-431", "94-489"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-minor-in-decision-analytics-and-systems-das-cat1", name:"Expected Pre-requisites", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["15-112", "15-122", "21-240", "36-225", "36-226", "73-102"], patterns:[], excludes:[]}, note:"expected background, not credit-bearing" },
      ]},
    ]
  },
  {
    id:"tmpl-animation-special-effects-minor", name:"Animation & Special Effects Minor", type:"minor", college:"School of Computer Science (IDeATe)",
    totalUnitsTarget:null,
    note:"Students may double-count up to two minor courses toward other requirements. [Source: ~63 units]",
    sections:[
      { id:"tmpl-animation-special-effects-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-animation-special-effects-minor-cat0", name:"One Computing Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-animation-special-effects-minor-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["16-223", "53-322", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-animation-special-effects-minor-cat2", name:"IDeATe Animation & Special Effects Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["15-463", "53-320", "53-321", "53-323", "60-220", "60-335", "60-337", "60-413", "60-414", "60-415"], patterns:[], excludes:[]}, note:"minimum of 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-intelligent-environments-minor", name:"Intelligent Environments Minor", type:"minor", college:"School of Computer Science (IDeATe)",
    totalUnitsTarget:null,
    note:"Total: ~45+ units",
    sections:[
      { id:"tmpl-intelligent-environments-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-intelligent-environments-minor-cat0", name:"One Computing Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-intelligent-environments-minor-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["16-223", "53-322", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-intelligent-environments-minor-cat2", name:"IDeATe Intelligent Environments Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["16-375", "16-376", "16-467", "18-540", "62-315", "99-362"], patterns:[], excludes:[]}, note:"minimum of 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-design-for-learning-minor", name:"Design for Learning Minor", type:"minor", college:"Human-Computer Interaction Institute, School of Computer Science (IDeATe)",
    totalUnitsTarget:null,
    note:"Total: ~45+ units",
    sections:[
      { id:"tmpl-design-for-learning-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-design-for-learning-minor-cat0", name:"One Computing Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-design-for-learning-minor-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["16-223", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-design-for-learning-minor-cat2", name:"IDeATe Design for Learning Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["05-291", "05-292", "05-418", "05-432", "51-486", "82-288", "99-362"], patterns:[], excludes:[]}, note:"minimum of 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-physical-computing-minor", name:"Physical Computing Minor", type:"minor", college:"School of Computer Science (IDeATe)",
    totalUnitsTarget:null,
    note:"Total: ~45+ units",
    sections:[
      { id:"tmpl-physical-computing-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-physical-computing-minor-cat0", name:"One Computing Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-physical-computing-minor-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["16-223", "53-322", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-physical-computing-minor-cat2", name:"IDeATe Physical Computing Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["15-294", "15-394", "16-375", "16-376", "16-480", "18-540", "18-578", "24-672", "62-423", "62-478"], patterns:[], excludes:[]}, note:"minimum of 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-soft-technologies-minor", name:"Soft Technologies Minor", type:"minor", college:"School of Computer Science (IDeATe)",
    totalUnitsTarget:null,
    note:"Total: ~45+ units",
    sections:[
      { id:"tmpl-soft-technologies-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-soft-technologies-minor-cat0", name:"One Computing Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-soft-technologies-minor-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["16-223", "53-322", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose 1, minimum of 9 units" },
        { id:"tmpl-soft-technologies-minor-cat2", name:"IDeATe Soft Technologies Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["09-227", "15-367", "16-224", "16-376", "16-480", "27-505", "53-330", "54-346", "54-486", "62-315"], patterns:[], excludes:[]}, note:"minimum of 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-information-security-privacy-and-policy-mino", name:"Information Security, Privacy, and Policy Minor", type:"minor", college:"School of Computer Science",
    totalUnitsTarget:48,
    note:"At most 2 courses may be counted towards any other undergraduate major or minor program. [Source: minimum 48 units units]",
    sections:[
      { id:"tmpl-information-security-privacy-and-policy-mino-sec", name:"Requirements", unitsTarget:48, categories:[
        { id:"tmpl-information-security-privacy-and-policy-mino-cat0", name:"Introductory Security Course", kind:"pool", minCourses:1, minUnits:null, targetUnits:null, targetCourses:1, pool:{explicit:["17-331"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-information-security-privacy-and-policy-mino-cat1", name:"Privacy and Policy Course", kind:"pool", minCourses:1, minUnits:null, targetUnits:null, targetCourses:1, pool:{explicit:["17-333"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-information-security-privacy-and-policy-mino-cat2", name:"Privacy Elective", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["17-334", "17-702", "17-731", "17-735", "17-880", "18-436", "94-806"], patterns:[], excludes:[]}, note:"complete a minimum of 9 units" },
        { id:"tmpl-information-security-privacy-and-policy-mino-cat3", name:"Technology and Policy Elective", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["17-200", "17-562", "19-101", "19-211", "19-403", "19-639", "84-387"], patterns:[], excludes:[]}, note:"complete a minimum of 9 units" },
        { id:"tmpl-information-security-privacy-and-policy-mino-cat4", name:"Additional Approved Elective", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-316", "15-356", "17-303", "18-334", "18-435"], patterns:[], excludes:[]}, note:"complete an additional elective of 9 units or more" },
      ]},
    ]
  },
  {
    id:"tmpl-language-technologies-minor", name:"Language Technologies Minor", type:"minor", college:"Language Technologies Institute, School of Computer Science",
    totalUnitsTarget:12,
    note:"Students may double count 11-324 and 80-180 toward any other major or minor. [Source: 4 courses + Project (12 units) units]",
    sections:[
      { id:"tmpl-language-technologies-minor-sec", name:"Requirements", unitsTarget:12, categories:[
        { id:"tmpl-language-technologies-minor-cat0", name:"Prerequisites", kind:"pool", minCourses:2, minUnits:null, targetUnits:null, targetCourses:2, pool:{explicit:["15-122", "15-150"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-language-technologies-minor-cat1", name:"Core requirement", kind:"pool", minCourses:1, minUnits:null, targetUnits:null, targetCourses:1, pool:{explicit:["11-324"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-language-technologies-minor-cat2", name:"Electives", kind:"pool", minCourses:3, minUnits:9, targetUnits:9, targetCourses:3, pool:{explicit:["11-344", "11-411", "11-422", "11-423", "11-424", "11-441", "11-442", "11-485", "11-492", "11-667", "11-711", "11-737", "11-751", "11-776", "11-777", "80-180"], patterns:[], excludes:[]}, note:"choose 3, each at least 9 units" },
      ]},
    ]
  },
  {
    id:"tmpl-machine-learning-minor", name:"Machine Learning Minor", type:"minor", college:"School of Computer Science (Machine Learning Department)",
    totalUnitsTarget:null,
    note:"Open only to students OUTSIDE SCS. All courses must be passed with C or better. No course in the ML Minor may be counted towards another SCS minor. At least 3 courses must be used only for the ML Minor. [Source: 3 prereqs + 2 core + 3 electives units]",
    sections:[
      { id:"tmpl-machine-learning-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-machine-learning-minor-cat0", name:"Prerequisites", kind:"pool", minCourses:12, minUnits:null, targetUnits:null, targetCourses:12, pool:{explicit:["15-122", "15-151", "15-259", "21-127", "21-128", "21-240", "21-256", "21-325", "36-218", "36-219", "36-225", "36-235"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-machine-learning-minor-cat1", name:"Core Courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["10-301", "10-315", "10-403", "10-405", "10-414", "10-417", "10-418", "10-422"], patterns:[], excludes:[]}, note:"2 core courses" },
        { id:"tmpl-machine-learning-minor-cat2", name:"Electives (Principal)", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["10-423", "10-424", "10-425", "10-613", "10-643", "10-735", "10-777", "36-401"], patterns:[], excludes:[]}, note:"at least 3 electives of at least 9 units each" },
        { id:"tmpl-machine-learning-minor-cat3", name:"Electives (Interdisciplinary)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["02-510", "03-511", "10-335", "10-737", "11-411", "11-441", "11-481", "11-661", "11-731", "11-751", "11-755", "11-777", "15-281", "15-386", "15-388", "15-482", "16-311", "16-385", "16-720", "16-824", "16-831", "17-537", "36-402", "36-462", "36-463", "36-700"], patterns:[], excludes:[]}, note:"alternative elective pool" },
      ]},
    ]
  },
  {
    id:"tmpl-neural-computation-minor", name:"Neural Computation Minor", type:"minor", college:"Intercollege (School of Computer Science, Mellon College of Science, Dietrich College; coordinated by Neuroscience Institute/CNBC)",
    totalUnitsTarget:null,
    note:"No more than two courses can be double counted toward the student's major or other minors. [Source: 5 courses units]",
    sections:[
      { id:"tmpl-neural-computation-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-neural-computation-minor-cat0", name:"A. Neural Computation", kind:"pool", minCourses:1, minUnits:null, targetUnits:null, targetCourses:1, pool:{explicit:["15-386", "15-387", "15-883", "85-419", "86-375"], patterns:[], excludes:[]}, note:"choose 1 of 4 core areas" },
        { id:"tmpl-neural-computation-minor-cat1", name:"B. Neuroscience", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["03-362", "03-363", "03-365", "42-630", "86-765"], patterns:[], excludes:[]}, note:"one course" },
        { id:"tmpl-neural-computation-minor-cat2", name:"C. Cognitive Psychology", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["85-110", "85-213", "85-412", "85-419", "85-765"], patterns:[], excludes:[]}, note:"one course" },
        { id:"tmpl-neural-computation-minor-cat3", name:"D. Intelligent System Analysis", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["10-301", "15-281", "15-386", "15-387", "15-494", "16-299", "16-311", "16-385", "18-290", "24-352", "36-225", "36-401", "42-631", "42-632"], patterns:[], excludes:[]}, note:"one course" },
      ]},
    ]
  },
  {
    id:"tmpl-software-engineering-minor", name:"Software Engineering Minor", type:"minor", college:"School of Computer Science (S3D)",
    totalUnitsTarget:6,
    note:"At most 2 courses may be counted towards any other major or minor program. [Source: prereq + 2 core + 3 electives + internship + 6-unit reflection course units]",
    sections:[
      { id:"tmpl-software-engineering-minor-sec", name:"Requirements", unitsTarget:6, categories:[
        { id:"tmpl-software-engineering-minor-cat0", name:"Prerequisite", kind:"pool", minCourses:1, minUnits:null, targetUnits:null, targetCourses:1, pool:{explicit:["17-214"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-software-engineering-minor-cat1", name:"Core Course Requirements", kind:"pool", minCourses:2, minUnits:null, targetUnits:null, targetCourses:2, pool:{explicit:["17-313", "17-413"], patterns:[], excludes:[]}, note:"complete both" },
        { id:"tmpl-software-engineering-minor-cat2", name:"Elective 1", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-414", "17-355", "17-356", "17-423", "17-480", "17-653", "17-731"], patterns:[], excludes:[]}, note:"at least 9 units" },
        { id:"tmpl-software-engineering-minor-cat3", name:"Elective 2", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-410", "15-412", "15-440", "15-441", "15-445", "17-437", "18-749", "67-443"], patterns:[], excludes:[]}, note:"at least 9 units" },
        { id:"tmpl-software-engineering-minor-cat4", name:"Elective 3", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-390", "17-200", "17-331", "17-333", "17-334", "17-562", "17-781", "70-311", "88-341"], patterns:[], excludes:[]}, note:"at least 9 units" },
        { id:"tmpl-software-engineering-minor-cat5", name:"Required Internship and Reflection Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["17-415"], patterns:[], excludes:[]}, note:"required" },
      ]},
    ]
  },
  {
    id:"tmpl-ai-minor-minor-in-artificial-intelligence", name:"AI Minor (Minor in Artificial Intelligence)", type:"minor", college:"School of Computer Science",
    totalUnitsTarget:null,
    note:"NOT available to SCS students. At most two courses may be double-counted with any other major or minor. [Source: six courses units]",
    sections:[
      { id:"tmpl-ai-minor-minor-in-artificial-intelligence-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat0", name:"Prerequisites", kind:"pool", minCourses:8, minUnits:null, targetUnits:null, targetCourses:8, pool:{explicit:["15-122", "21-112", "21-120", "21-127", "21-128", "21-240", "21-241", "21-259"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat1", name:"Required Core Courses", kind:"pool", minCourses:3, minUnits:null, targetUnits:null, targetCourses:3, pool:{explicit:["07-280", "07-380", "36-225"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat2", name:"Technical Electives (Cognition and Action Cluster)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["15-386", "15-482", "15-494", "16-350", "16-362", "16-384", "85-213", "85-412", "85-414", "85-419", "85-420"], patterns:[], excludes:[]}, note:"choose from two of three clusters, 9+ units each" },
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat3", name:"Technical Electives (Machine Learning Cluster)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["10-403", "10-405", "10-414", "10-417", "10-418", "10-422", "10-423", "10-424", "10-425", "11-441", "11-485", "15-388", "36-401", "36-402"], patterns:[], excludes:[]}, note:null },
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat4", name:"Technical Electives (Perception and Language Cluster)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["11-411", "11-442", "11-492", "15-387", "15-463", "16-385", "85-408", "85-413"], patterns:[], excludes:[]}, note:null },
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat5", name:"Societal Aspects of AI (Human-AI Interaction Cluster)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["05-317", "05-318", "05-391", "16-467"], patterns:[], excludes:[]}, note:"choose from one of two clusters, 9+ units" },
        { id:"tmpl-ai-minor-minor-in-artificial-intelligence-cat6", name:"Societal Aspects of AI (AI and Humanity Cluster)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["16-735", "17-200", "79-302", "80-249", "88-230", "88-275", "90-442", "94-441"], patterns:[], excludes:[]}, note:null },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-architecture", name:"Minor in Architecture", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Available to non-architecture majors only. [Source: 54 units]",
    sections:[
      { id:"tmpl-minor-in-architecture-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-architecture-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["48-095", "48-100", "48-119", "48-240", "48-241"], patterns:[], excludes:[]}, note:"22-27 units" },
        { id:"tmpl-minor-in-architecture-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:31, targetUnits:31, targetCourses:null, pool:{explicit:["48-116", "48-121", "48-126", "48-215", "48-234", "48-380", "48-381", "48-383"], patterns:[], excludes:[]}, note:"26-31 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-architectural-design-fabrication", name:"Minor in Architectural Design Fabrication", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Available to architecture majors only. [Source: 63 units]",
    sections:[
      { id:"tmpl-minor-in-architectural-design-fabrication-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-architectural-design-fabrication-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:30, targetUnits:30, targetCourses:null, pool:{explicit:["48-531", "48-545", "48-555"], patterns:[], excludes:[]}, note:"30 units" },
        { id:"tmpl-minor-in-architectural-design-fabrication-cat1", name:"Selective Courses", kind:"pool", minCourses:null, minUnits:30, targetUnits:30, targetCourses:null, pool:{explicit:["48-599"], patterns:[], excludes:[]}, note:"30 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-architecture-history", name:"Minor in Architecture History", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Total: 54 (non-arch) / 63 (arch majors) units",
    sections:[
      { id:"tmpl-minor-in-architecture-history-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-architecture-history-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["48-240", "48-241"], patterns:[], excludes:[]}, note:"18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-architectural-representation-and-vi", name:"Minor in Architectural Representation and Visualization", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Total: 54 (non-arch) / 63 (arch majors) units",
    sections:[
      { id:"tmpl-minor-in-architectural-representation-and-vi-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-architectural-representation-and-vi-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["48-120", "48-121", "48-125", "48-126"], patterns:[], excludes:[]}, note:"24 units" },
        { id:"tmpl-minor-in-architectural-representation-and-vi-cat1", name:"Selective Courses", kind:"pool", minCourses:null, minUnits:39, targetUnits:39, targetCourses:null, pool:{explicit:["48-568", "48-724"], patterns:[], excludes:[]}, note:"30-39 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-architectural-technology", name:"Minor in Architectural Technology", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Available to non-architecture majors only. [Source: 54 units]",
    sections:[
      { id:"tmpl-minor-in-architectural-technology-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-architectural-technology-cat0", name:"Prerequisite Courses", kind:"pool", minCourses:null, minUnits:22, targetUnits:22, targetCourses:null, pool:{explicit:["21-120", "33-141"], patterns:[], excludes:[]}, note:"22 units" },
        { id:"tmpl-minor-in-architectural-technology-cat1", name:"Selective Courses", kind:"pool", minCourses:null, minUnits:32, targetUnits:32, targetCourses:null, pool:{explicit:["48-116", "48-215", "48-234", "48-315", "48-324", "48-432"], patterns:[], excludes:[]}, note:"32 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-building-science", name:"Minor in Building Science", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Available to architecture majors only. [Source: 54 units]",
    sections:[
      { id:"tmpl-minor-in-building-science-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-building-science-cat0", name:"Required Course", kind:"pool", minCourses:null, minUnits:12, targetUnits:12, targetCourses:null, pool:{explicit:["48-722"], patterns:[], excludes:[]}, note:"12 units" },
        { id:"tmpl-minor-in-building-science-cat1", name:"Selective Courses", kind:"pool", minCourses:null, minUnits:45, targetUnits:45, targetCourses:null, pool:{explicit:["48-721", "48-723", "48-729", "48-749", "48-795"], patterns:[], excludes:[]}, note:"45 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-computational-design", name:"Minor in Computational Design", type:"minor", college:"CFA, School of Architecture",
    totalUnitsTarget:null,
    note:"Total: 54 units",
    sections:[
      { id:"tmpl-minor-in-computational-design-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-computational-design-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:30, targetUnits:30, targetCourses:null, pool:{explicit:["48-120", "48-125", "48-214", "48-247"], patterns:[], excludes:[]}, note:"30 units" },
        { id:"tmpl-minor-in-computational-design-cat1", name:"Selective Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["48-530", "48-545", "48-555", "48-568", "48-599", "48-727", "48-749", "51-367", "54-399", "54-405", "60-212", "62-315"], patterns:[], excludes:[]}, note:"24 units" },
      ]},
    ]
  },
  {
    id:"tmpl-art-minor", name:"Art Minor", type:"minor", college:"CFA, School of Art",
    totalUnitsTarget:null,
    note:"No portfolio required. Five studio-based courses required (min 3 Intermediate/Advanced), plus one critical studies course. [Source: 59 units]",
    sections:[
      { id:"tmpl-art-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-art-minor-cat0", name:"Art Studio Courses (choose five)", kind:"pool", minCourses:null, minUnits:50, targetUnits:50, targetCourses:null, pool:{explicit:["60-136", "60-137", "60-157"], patterns:[], excludes:[]}, note:"50 units" },
        { id:"tmpl-art-minor-cat1", name:"Critical Studies (choose one)", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["60-105", "60-106"], patterns:[], excludes:[]}, note:"9 units" },
      ]},
    ]
  },
  {
    id:"tmpl-media-design-minor-ideate", name:"Media Design Minor (IDeATe)", type:"minor", college:"CFA, School of Art (IDeATe)",
    totalUnitsTarget:null,
    note:"Total: ~45+ units",
    sections:[
      { id:"tmpl-media-design-minor-ideate-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-media-design-minor-ideate-cat0", name:"One Computing Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose one, min 9 units" },
        { id:"tmpl-media-design-minor-ideate-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["16-223", "53-322", "57-345", "60-125", "60-223", "62-150", "82-250", "99-361"], patterns:[], excludes:[]}, note:"choose one, min 9 units" },
        { id:"tmpl-media-design-minor-ideate-cat2", name:"IDeATe Media Design Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["15-294", "15-394", "16-375", "18-540", "24-672", "51-236", "51-400", "53-312", "54-399", "60-110", "60-428", "62-423", "62-478", "67-240", "76-374", "82-285"], patterns:[], excludes:[]}, note:"min 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-design-minor", name:"Design Minor", type:"minor", college:"CFA, School of Design",
    totalUnitsTarget:null,
    note:"Design majors not eligible. No double-counting allowed. [Source: 54 units]",
    sections:[
      { id:"tmpl-design-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-design-minor-cat0", name:"Required Design Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["51-173", "51-261", "51-262", "51-264"], patterns:[], excludes:[]}, note:"27 units" },
        { id:"tmpl-design-minor-cat1", name:"Design Electives", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:[], patterns:[{depts:["51"],min:0,max:999}], excludes:[]}, note:"27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-drama-minor", name:"Drama Minor", type:"minor", college:"CFA, School of Drama",
    totalUnitsTarget:null,
    note:"Total: 55 units",
    sections:[
      { id:"tmpl-drama-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-drama-minor-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["54-163", "54-177", "54-281"], patterns:[], excludes:[]}, note:"24 units" },
        { id:"tmpl-drama-minor-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:31, targetUnits:31, targetCourses:null, pool:{explicit:["54-109", "54-157", "54-169", "54-171", "54-187", "54-191", "54-193", "54-196"], patterns:[], excludes:[]}, note:"31 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-music", name:"Minor in Music", type:"minor", college:"CFA, School of Music",
    totalUnitsTarget:null,
    note:"Total: 70 units",
    sections:[
      { id:"tmpl-minor-in-music-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-music-cat0", name:"Prerequisite Course", kind:"pool", minCourses:null, minUnits:3, targetUnits:3, targetCourses:null, pool:{explicit:["57-329"], patterns:[], excludes:[]}, note:"3 units" },
        { id:"tmpl-minor-in-music-cat1", name:"Required Music Courses", kind:"pool", minCourses:null, minUnits:25, targetUnits:25, targetCourses:null, pool:{explicit:["57-152", "57-161", "57-173", "57-181", "57-188"], patterns:[], excludes:[]}, note:"25 units" },
        { id:"tmpl-minor-in-music-cat2", name:"Required Studio Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["57-101"], patterns:[], excludes:[]}, note:"24 units" },
        { id:"tmpl-minor-in-music-cat3", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:[], patterns:[{depts:["57"],min:0,max:999}], excludes:[]}, note:"18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-music-technology", name:"Minor in Music Technology", type:"minor", college:"CFA, School of Music",
    totalUnitsTarget:null,
    note:"Total: 70 units",
    sections:[
      { id:"tmpl-minor-in-music-technology-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-music-technology-cat0", name:"Prerequisite Course", kind:"pool", minCourses:null, minUnits:3, targetUnits:3, targetCourses:null, pool:{explicit:["57-329"], patterns:[], excludes:[]}, note:"3 units" },
        { id:"tmpl-minor-in-music-technology-cat1", name:"Required Music Courses", kind:"pool", minCourses:null, minUnits:25, targetUnits:25, targetCourses:null, pool:{explicit:["57-152", "57-161", "57-173", "57-181", "57-188"], patterns:[], excludes:[]}, note:"25 units" },
        { id:"tmpl-minor-in-music-technology-cat2", name:"Sound Recording Courses", kind:"pool", minCourses:null, minUnits:21, targetUnits:21, targetCourses:null, pool:{explicit:["57-337", "57-338", "57-438"], patterns:[], excludes:[]}, note:"21 units" },
        { id:"tmpl-minor-in-music-technology-cat3", name:"Music Technology/Sound Courses", kind:"pool", minCourses:null, minUnits:21, targetUnits:21, targetCourses:null, pool:{explicit:["15-104", "15-322", "33-114", "54-166", "57-344", "57-347", "57-421", "57-478"], patterns:[], excludes:[]}, note:"21 units (choose at least three)" },
      ]},
    ]
  },
  {
    id:"tmpl-sonic-arts-minor-ideate", name:"Sonic Arts Minor (IDeATe)", type:"minor", college:"CFA, School of Music (IDeATe)",
    totalUnitsTarget:null,
    note:"Total: ~45+ units",
    sections:[
      { id:"tmpl-sonic-arts-minor-ideate-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-sonic-arts-minor-ideate-cat0", name:"One Computing Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["15-104", "15-110", "15-112", "60-212"], patterns:[], excludes:[]}, note:"choose one, min 9 units" },
        { id:"tmpl-sonic-arts-minor-ideate-cat1", name:"One IDeATe Portal Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["57-345"], patterns:[], excludes:[]}, note:"min 9 units" },
        { id:"tmpl-sonic-arts-minor-ideate-cat2", name:"IDeATe Sonic Arts Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["54-166", "54-267", "57-337", "57-344", "57-347", "57-358", "57-359", "57-421", "57-458"], patterns:[], excludes:[]}, note:"min 27 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-the-history-of-arts", name:"Minor in the History of Arts", type:"minor", college:"CFA, Dean's Office",
    totalUnitsTarget:null,
    note:"CFA students must take all courses outside of their major school (except Architecture). [Source: 54 units]",
    sections:[
      { id:"tmpl-minor-in-the-history-of-arts-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-the-history-of-arts-cat0", name:"Introductory Level Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["48-240", "48-241", "57-173", "57-188", "60-105", "60-106"], patterns:[], excludes:[]}, note:"27 units (choose at least three)" },
        { id:"tmpl-minor-in-the-history-of-arts-cat1", name:"Intermediate/Advanced Level Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["48-348", "48-374", "57-209", "57-476", "57-477", "57-478", "57-480", "57-485", "79-395"], patterns:[], excludes:[]}, note:"27 units (choose at least three)" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-photography", name:"Minor in Photography", type:"minor", college:"CFA, Dean's Office (Photography Program)",
    totalUnitsTarget:null,
    note:"Total: 58 units",
    sections:[
      { id:"tmpl-minor-in-photography-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-photography-cat0", name:"Photography Required Courses", kind:"pool", minCourses:null, minUnits:30, targetUnits:30, targetCourses:null, pool:{explicit:["60-141", "60-142", "60-241"], patterns:[], excludes:[]}, note:"minimum 30 units" },
        { id:"tmpl-minor-in-photography-cat1", name:"Photography Elective", kind:"pool", minCourses:null, minUnits:10, targetUnits:10, targetCourses:null, pool:{explicit:["62-245", "62-279", "62-343"], patterns:[], excludes:[]}, note:"minimum 10 units" },
        { id:"tmpl-minor-in-photography-cat2", name:"Photo History Required Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["62-360", "62-371"], patterns:[], excludes:[]}, note:"minimum 9 units" },
        { id:"tmpl-minor-in-photography-cat3", name:"History, Theory, or Criticism Elective", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:[], patterns:[], excludes:[]}, note:"minimum 9 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-scientific-computing", name:"Minor in Scientific Computing", type:"minor", college:"MCS",
    totalUnitsTarget:null,
    note:"Total: ~54-60 units",
    sections:[
      { id:"tmpl-minor-in-scientific-computing-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-minor-in-scientific-computing-cat0", name:"A. Non-Introductory Science Requirement", kind:"pool", minCourses:null, minUnits:12, targetUnits:12, targetCourses:null, pool:{explicit:[], patterns:[{depts:["03", "09", "33"],min:200,max:999}], excludes:[]}, note:"9-12 units" },
        { id:"tmpl-minor-in-scientific-computing-cat1", name:"B. Computational Science Requirement", kind:"pool", minCourses:2, minUnits:24, targetUnits:24, targetCourses:2, pool:{explicit:["03-250", "03-511", "09-560", "15-386", "33-241"], patterns:[], excludes:[]}, note:"18-24 units (complete 2)" },
        { id:"tmpl-minor-in-scientific-computing-cat2", name:"C. Computational Methods Requirement", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["21-369", "33-232", "33-456", "33-658", "36-410"], patterns:[], excludes:[]}, note:"9 units (complete one outside home dept)" },
        { id:"tmpl-minor-in-scientific-computing-cat3", name:"D. Applied Scientific Computing Research Project", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:[], patterns:[], excludes:[]}, note:"9 units" },
      ]},
    ]
  },
  {
    id:"tmpl-biomedical-engineering-minor", name:"Biomedical Engineering Minor", type:"minor", college:"College of Engineering, Department of Biomedical Engineering",
    totalUnitsTarget:null,
    note:"Cumulative QPA for minor courses must be 2.00 or better. [Source: 57 units]",
    sections:[
      { id:"tmpl-biomedical-engineering-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-biomedical-engineering-minor-cat0", name:"Core Courses", kind:"pool", minCourses:3, minUnits:null, targetUnits:null, targetCourses:3, pool:{explicit:["03-121", "42-101", "42-202"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-biomedical-engineering-minor-cat1", name:"BME Electives", kind:"pool", minCourses:3, minUnits:null, targetUnits:null, targetCourses:3, pool:{explicit:["42-203"], patterns:[], excludes:[]}, note:"choose 3 electives" },
      ]},
    ]
  },
  {
    id:"tmpl-engineering-studies-minor-for-non-engineerin", name:"Engineering Studies Minor (for non-engineering students)", type:"minor", college:"College of Engineering",
    totalUnitsTarget:null,
    note:"Requires courses from at least two different engineering departments plus depth in one. [Source: 5 courses, each at least 9 units units]",
    sections:[
      { id:"tmpl-engineering-studies-minor-for-non-engineerin-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-engineering-studies-minor-for-non-engineerin-cat0", name:"List #1 Introductory Engineering Courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["06-100", "12-100", "18-100", "19-101", "24-101", "27-100", "42-101"], patterns:[], excludes:[]}, note:"at least one and up to three" },
        { id:"tmpl-engineering-studies-minor-for-non-engineerin-cat1", name:"Robotics Courses (limited, max one)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["16-280", "16-311", "16-350", "16-362", "16-384", "16-385", "16-421", "16-474"], patterns:[], excludes:[]}, note:"up to one may count" },
      ]},
    ]
  },
  {
    id:"tmpl-technology-and-policy-minor", name:"Technology and Policy Minor", type:"minor", college:"College of Engineering, Department of Engineering and Public Policy",
    totalUnitsTarget:null,
    note:"Required courses for primary major may NOT be counted toward this minor. [Source: 51 minimum units]",
    sections:[
      { id:"tmpl-technology-and-policy-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-technology-and-policy-minor-cat0", name:"Course Requirements", kind:"pool", minCourses:3, minUnits:null, targetUnits:null, targetCourses:3, pool:{explicit:["19-101", "19-301", "19-451"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-technology-and-policy-minor-cat1", name:"Example Technology-Policy Electives", kind:"pool", minCourses:2, minUnits:18, targetUnits:18, targetCourses:2, pool:{explicit:["19-211", "19-403", "19-411", "19-429", "19-433", "19-469", "19-639", "19-668"], patterns:[], excludes:[]}, note:"choose 2, 18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-additive-manufacturing-minor", name:"Additive Manufacturing Minor", type:"minor", college:"College of Engineering (interdepartmental)",
    totalUnitsTarget:36,
    note:"Total: 5 courses (core 36 units + 2 electives) units",
    sections:[
      { id:"tmpl-additive-manufacturing-minor-sec", name:"Requirements", unitsTarget:36, categories:[
        { id:"tmpl-additive-manufacturing-minor-cat0", name:"Three Core Courses", kind:"pool", minCourses:3, minUnits:36, targetUnits:36, targetCourses:3, pool:{explicit:["39-601", "39-602", "39-603"], patterns:[], excludes:[]}, note:"all required, 36 units" },
      ]},
    ]
  },
  {
    id:"tmpl-audio-engineering-minor", name:"Audio Engineering Minor", type:"minor", college:"College of Engineering (with School of Music)",
    totalUnitsTarget:null,
    note:"Total: 73-79 units",
    sections:[
      { id:"tmpl-audio-engineering-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-audio-engineering-minor-cat0", name:"Prerequisite Courses", kind:"pool", minCourses:null, minUnits:3, targetUnits:3, targetCourses:null, pool:{explicit:["57-329", "57-330"], patterns:[], excludes:[]}, note:"0-3 units" },
        { id:"tmpl-audio-engineering-minor-cat1", name:"Music Courses", kind:"pool", minCourses:null, minUnits:49, targetUnits:49, targetCourses:null, pool:{explicit:["15-322", "57-101", "57-149", "57-173", "57-188", "57-337", "57-338", "57-347", "57-438"], patterns:[], excludes:[]}, note:"43-49 units" },
        { id:"tmpl-audio-engineering-minor-cat2", name:"Technical Courses", kind:"pool", minCourses:null, minUnits:33, targetUnits:33, targetCourses:null, pool:{explicit:["15-210", "15-214", "18-300", "18-320", "18-341", "18-349", "18-370", "18-490", "18-491", "33-114"], patterns:[], excludes:[]}, note:"33 units" },
      ]},
    ]
  },
  {
    id:"tmpl-colloids-polymers-and-surfaces-minor-cps", name:"Colloids, Polymers and Surfaces Minor (CPS)", type:"minor", college:"College of Engineering, Department of Chemical Engineering",
    totalUnitsTarget:null,
    note:"Total: 45 units",
    sections:[
      { id:"tmpl-colloids-polymers-and-surfaces-minor-cps-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-colloids-polymers-and-surfaces-minor-cps-cat0", name:"Primary List", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["06-607", "06-609", "06-612"], patterns:[], excludes:[]}, note:"complete two" },
        { id:"tmpl-colloids-polymers-and-surfaces-minor-cps-cat1", name:"Remaining Courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["06-426", "06-466", "06-610", "09-502", "09-507", "24-684", "27-477", "27-565", "27-570", "27-577", "33-355", "42-611", "42-676"], patterns:[], excludes:[]}, note:"choose remaining 3 from Primary or Elective list" },
      ]},
    ]
  },
  {
    id:"tmpl-electronic-materials-minor-em", name:"Electronic Materials Minor (EM)", type:"minor", college:"College of Engineering (joint ECE/MSE)",
    totalUnitsTarget:null,
    note:"Total: 54 units",
    sections:[
      { id:"tmpl-electronic-materials-minor-em-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-electronic-materials-minor-em-cat0", name:"54 Units From the Following Electives", kind:"pool", minCourses:null, minUnits:54, targetUnits:54, targetCourses:null, pool:{explicit:["18-100", "18-220", "18-300", "18-310", "27-100", "27-202", "27-432", "27-433", "27-445", "27-533", "27-542", "33-225"], patterns:[], excludes:[]}, note:"select courses totaling 54 units" },
      ]},
    ]
  },
  {
    id:"tmpl-global-engineering-minor", name:"Global Engineering Minor", type:"minor", college:"College of Engineering",
    totalUnitsTarget:null,
    note:"Total: ? units",
    sections:[
      { id:"tmpl-global-engineering-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-global-engineering-minor-cat0", name:"International Management", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-342", "70-365", "70-381", "70-430"], patterns:[], excludes:[]}, note:"complete one" },
        { id:"tmpl-global-engineering-minor-cat1", name:"Ethics", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["70-332", "80-136", "80-244"], patterns:[], excludes:[]}, note:"complete one" },
      ]},
    ]
  },
  {
    id:"tmpl-materials-science-and-engineering-minor", name:"Materials Science and Engineering Minor", type:"minor", college:"College of Engineering, Department of Materials Science and Engineering",
    totalUnitsTarget:null,
    note:"Open to all CIT students except MSE majors. [Source: 45 units]",
    sections:[
      { id:"tmpl-materials-science-and-engineering-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-materials-science-and-engineering-minor-cat0", name:"Core Courses", kind:"pool", minCourses:3, minUnits:21, targetUnits:21, targetCourses:3, pool:{explicit:["27-211", "27-212", "27-227"], patterns:[], excludes:[]}, note:"all required, 21 units" },
        { id:"tmpl-materials-science-and-engineering-minor-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["27-100", "27-301", "27-357", "27-367", "27-421", "27-432", "27-433", "27-445", "27-477", "27-533", "27-542", "27-565", "27-570", "27-591", "27-592", "42-444"], patterns:[], excludes:[]}, note:"minimum 24 units" },
      ]},
    ]
  },
  {
    id:"tmpl-mechanical-behavior-of-materials-minor", name:"Mechanical Behavior of Materials Minor", type:"minor", college:"College of Engineering",
    totalUnitsTarget:null,
    note:"Total: 51-54 units",
    sections:[
      { id:"tmpl-mechanical-behavior-of-materials-minor-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-mechanical-behavior-of-materials-minor-cat0", name:"Core Courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["12-212", "27-201", "27-591"], patterns:[], excludes:[]}, note:"all 3 required" },
        { id:"tmpl-mechanical-behavior-of-materials-minor-cat1", name:"Group A Materials Science Courses", kind:"pool", minCourses:1, minUnits:null, targetUnits:null, targetCourses:1, pool:{explicit:["27-202", "27-357", "27-709"], patterns:[], excludes:[]}, note:"choose 1" },
        { id:"tmpl-mechanical-behavior-of-materials-minor-cat2", name:"Group B Solid Mechanics Courses", kind:"pool", minCourses:2, minUnits:null, targetUnits:null, targetCourses:2, pool:{explicit:["12-231", "12-635"], patterns:[], excludes:[]}, note:"choose 2" },
      ]},
    ]
  },
  {
    id:"tmpl-african-and-african-american-studies", name:"African and African American Studies", type:"minor", college:"Dietrich - Interdepartmental (Faculty Advisor: History Department)",
    totalUnitsTarget:null,
    note:"Composed of two core courses and four elective courses. Elective courses must include one course requiring a research paper/project. Students may take an additional two core courses as electives, but not more than four total courses. Students must take courses in at least two of the four regions (African, African American, Latin American, Caribbean) between core and elective courses. Courses taken [Source: 54 units]",
    sections:[
      { id:"tmpl-african-and-african-american-studies-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-african-and-african-american-studies-cat0", name:"Core Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["79-212", "79-226", "79-227", "79-242"], patterns:[], excludes:[]}, note:"18 units — choose two from the History and/or English Department courses listed (African or African American)" },
        { id:"tmpl-african-and-african-american-studies-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["57-480", "76-407", "79-120", "79-155", "79-225", "79-237", "79-247", "79-252", "79-290", "79-317", "79-333", "79-371", "79-385", "82-260", "82-303", "82-304", "82-343", "82-451"], patterns:[], excludes:[]}, note:"36 units" },
      ]},
    ]
  },
  {
    id:"tmpl-film-and-media-studies", name:"Film and Media Studies", type:"minor", college:"Dietrich - Interdepartmental (housed in Department of English)",
    totalUnitsTarget:54,
    note:"A maximum of two courses may double count with other programs. A maximum of one course may be transferred in, except for the required introductory and intermediate courses. [Source: 9+9+27+9 = 54 units]",
    sections:[
      { id:"tmpl-film-and-media-studies-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-film-and-media-studies-cat0", name:"Required Introductory Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-239"], patterns:[], excludes:[]}, note:"9 units" },
        { id:"tmpl-film-and-media-studies-cat1", name:"Required Intermediate Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-310"], patterns:[], excludes:[]}, note:"9 units" },
        { id:"tmpl-film-and-media-studies-cat2", name:"Film and Media Electives", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["54-191", "76-259", "76-269", "76-292", "76-295", "76-312", "76-313", "76-339", "76-353", "76-367", "76-374", "76-439", "76-448", "76-454", "76-456", "76-469", "79-220", "79-306", "79-308", "79-319", "79-340", "82-253", "82-278", "82-296", "82-428"], patterns:[], excludes:[]}, note:"minimum 27 units, 200-level or above, primary topic film/media" },
        { id:"tmpl-film-and-media-studies-cat3", name:"400-level Film and Media Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-401", "76-439", "76-448", "76-454", "76-456", "76-461", "76-467", "76-469", "76-482"], patterns:[], excludes:[]}, note:"9 units — one 400-level course from the Department of English concentrating on film/media directly or using it as a tool of social/cultural analysis" },
      ]},
    ]
  },
  {
    id:"tmpl-gender-studies", name:"Gender Studies", type:"minor", college:"Dietrich - Interdepartmental (housed in English/History Departments)",
    totalUnitsTarget:null,
    note:"Most eligible classes taught in English, History, and Languages, Cultures, and Applied Linguistics; can sometimes be found in other departments/colleges. Courses may be double-counted with other degree requirements. * = \"Consult with Gender Studies Minor Advisor Professor Lisa Tetrault.\" ** = \"If not taken as a requirement.\" [Source: minimum 54 (6 courses) units]",
    sections:[
      { id:"tmpl-gender-studies-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-gender-studies-cat0", name:"Required Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["76-241", "79-320", "79-331"], patterns:[], excludes:[]}, note:"complete 1 of the following, 9 units" },
        { id:"tmpl-gender-studies-cat1", name:"Additional Courses", kind:"pool", minCourses:5, minUnits:45, targetUnits:45, targetCourses:5, pool:{explicit:["60-369", "60-372", "66-152", "76-211", "76-241", "76-242", "76-327", "76-329", "76-341", "76-342", "76-353", "76-431", "76-473", "79-178", "79-208", "79-246", "79-305", "79-320", "79-329", "79-330", "79-331", "79-378", "80-234", "82-186", "82-215", "82-248", "82-275", "82-283", "82-331", "85-350", "85-446", "90-403", "90-404"], patterns:[], excludes:[]}, note:"complete 5 or more additional courses totaling at least 45 units; \"other courses may fulfill this requirement *\"" },
      ]},
    ]
  },
  {
    id:"tmpl-health-care-policy-and-management-hcpm", name:"Health Care Policy and Management (HCPM)", type:"minor", college:"Dietrich - Interdepartmental (jointly sponsored: Heinz College, Dietrich College, Mellon College of Science)",
    totalUnitsTarget:null,
    note:"Entry into the minor requires completion of 73-102 Principles of Microeconomics or equivalent by approval. Some courses have prerequisites that will not count toward completion of minor requirements. \"Elective Focus Areas\" below are suggested groupings, not separate requirements — students may mix and match electives freely to reach the 18-unit (sub-)minimum noted under Elective Courses. [Source: 54 units]",
    sections:[
      { id:"tmpl-health-care-policy-and-management-hcpm-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-health-care-policy-and-management-hcpm-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:21, targetUnits:21, targetCourses:null, pool:{explicit:["79-330", "90-436", "90-472"], patterns:[], excludes:[]}, note:"complete a total of 21 units from the following" },
        { id:"tmpl-health-care-policy-and-management-hcpm-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["42-444", "73-328", "76-494", "80-245", "88-365", "90-433", "90-832", "90-834", "94-409"], patterns:[], excludes:[]}, note:"complete a minimum of 24 units from these two sections (Heinz College Courses + Humanities and Social Sciences Courses)" },
        { id:"tmpl-health-care-policy-and-management-hcpm-cat2", name:"Elective Focus Areas (informational groupings — Health Management/Administration", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["76-494", "80-245", "90-832"], patterns:[], excludes:[]}, note:null },
        { id:"tmpl-health-care-policy-and-management-hcpm-cat3", name:"Elective Focus Areas (informational groupings — Health Policy Focus)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["73-328", "90-433", "90-832"], patterns:[], excludes:[]}, note:null },
        { id:"tmpl-health-care-policy-and-management-hcpm-cat4", name:"Elective Focus Areas (informational groupings — Health Analytics & IT Focus)", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["42-444", "90-834", "94-409"], patterns:[], excludes:[]}, note:null },
      ]},
    ]
  },
  {
    id:"tmpl-linguistics", name:"Linguistics", type:"minor", college:"Dietrich - Interdepartmental (Philosophy Department / Linguistics Program)",
    totalUnitsTarget:54,
    note:"All courses counted towards the minor must be taken for a letter grade and passed with a grade of \"C\" or above. (Identical content also appears verbatim on the Department of Philosophy page.) [Source: 27 (Core) + 27 (Extended Core) = 54 units]",
    sections:[
      { id:"tmpl-linguistics-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-linguistics-cat0", name:"Core", kind:"pool", minCourses:2, minUnits:27, targetUnits:27, targetCourses:2, pool:{explicit:["80-180", "80-280", "80-282", "80-285", "80-381", "80-383"], patterns:[], excludes:[]}, note:"27 units; Required course plus choose 2 of 3 options" },
        { id:"tmpl-linguistics-cat1", name:"Extended Core", kind:"pool", minCourses:3, minUnits:27, targetUnits:27, targetCourses:3, pool:{explicit:["36-468", "76-389", "80-283", "80-286", "80-287", "80-288", "80-382", "80-384", "80-385", "80-388", "80-484", "80-488"], patterns:[], excludes:[]}, note:"choose 3 courses (27 units) from the Extended Core and/or additional courses from Core" },
      ]},
    ]
  },
  {
    id:"tmpl-logic-and-computation", name:"Logic and Computation", type:"minor", college:"Dietrich - Interdepartmental (Philosophy Department)",
    totalUnitsTarget:54,
    note:"All courses counted towards the minor must be taken for a letter grade and passed with a grade of \"C\" or above. (Identical content also appears verbatim on the Department of Philosophy page.) [Source: 27 (Core) + 27 (Electives) = 54 (six courses total) units]",
    sections:[
      { id:"tmpl-logic-and-computation-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-logic-and-computation-cat0", name:"Logic and Computation Core Courses", kind:"pool", minCourses:5, minUnits:27, targetUnits:27, targetCourses:5, pool:{explicit:["80-150", "80-210", "80-211", "80-310", "80-311"], patterns:[], excludes:[]}, note:"27 units, all required (with two either/or substitutions)" },
        { id:"tmpl-logic-and-computation-cat1", name:"Logic and Computation Electives", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:[], patterns:[{depts:["80"],min:300,max:999}], excludes:[]}, note:"27 units — two courses in Philosophy Department at 300-level or higher related to logic/computation, plus one additional course at 300-level or higher in an area using logical/computational tools (phi" },
      ]},
    ]
  },
  {
    id:"tmpl-neural-computation", name:"Neural Computation", type:"minor", college:"Dietrich - Interdepartmental (intercollege: jointly sponsored by School of Computer Science, Mellon College of Science, Dietrich College; coordinated by Neuroscience Institute / CNBC)",
    totalUnitsTarget:null,
    note:"Requires application (due no later than November 30 of senior year). Requires a total of five courses: four courses drawn from four core areas (one from each), plus one additional depth elective from one of the core areas outside the student's major. Depth elective may be replaced by a year-long research project. No more than two courses can be double counted toward the student's major or other mi [Source: 5 courses (units vary by course, see below) units]",
    sections:[
      { id:"tmpl-neural-computation-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-neural-computation-cat0", name:"A. Neural Computation", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["15-386", "15-387", "15-883", "85-419", "86-375"], patterns:[], excludes:[]}, note:"one course from this area" },
        { id:"tmpl-neural-computation-cat1", name:"B. Neuroscience", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["03-362", "03-363", "03-365", "42-630", "86-765"], patterns:[], excludes:[]}, note:"one course from this area" },
        { id:"tmpl-neural-computation-cat2", name:"C. Cognitive Psychology", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["85-110", "85-213", "85-412", "85-419", "85-765"], patterns:[], excludes:[]}, note:"one course from this area" },
        { id:"tmpl-neural-computation-cat3", name:"D. Intelligent System Analysis", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["10-301", "10-315", "15-281", "15-386", "15-387", "15-494", "16-299", "16-311", "16-385", "18-290", "24-352", "36-225", "36-247", "36-401", "36-410", "42-631", "42-632", "86-375", "86-631"], patterns:[], excludes:[]}, note:"one course from this area" },
        { id:"tmpl-neural-computation-cat4", name:"Depth Elective", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:[], patterns:[], excludes:[]}, note:"one additional course chosen from one of the four core areas, outside the student's major (may be replaced with year-long research project)" },
      ]},
    ]
  },
  {
    id:"tmpl-rationality-uncertainty-and-choice-formal-me", name:"Rationality, Uncertainty, and Choice: Formal Methods (RUC)", type:"minor", college:"Dietrich - Interdepartmental (Department of Philosophy / Department of Social and Decision Sciences)",
    totalUnitsTarget:null,
    note:"All courses counted towards the minor must be taken for a letter grade and passed with a grade of \"C\" or above. Must complete at least one elective course in each of the two elective categories. (Identical content also appears verbatim on the Department of Philosophy page.) [Source: 3 core courses + 3 electives (units: see below) units]",
    sections:[
      { id:"tmpl-rationality-uncertainty-and-choice-formal-me-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-rationality-uncertainty-and-choice-formal-me-cat0", name:"Core Requirements", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["80-305", "80-306", "88-223", "88-312"], patterns:[], excludes:[]}, note:"complete all of the following" },
        { id:"tmpl-rationality-uncertainty-and-choice-formal-me-cat1", name:"Elective Category 1: Formal Foundations", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["80-201", "80-208", "80-210", "80-211", "80-310", "80-311", "80-315", "80-325", "80-516", "80-521", "80-524", "88-223", "88-312", "88-379"], patterns:[], excludes:[]}, note:"9-18 units, at least one course from this category" },
        { id:"tmpl-rationality-uncertainty-and-choice-formal-me-cat2", name:"Elective Category 2: Theory and Applications", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["80-220", "80-221", "80-222", "80-246", "80-249", "80-261", "80-324", "80-330", "80-335", "88-252", "88-255"], patterns:[], excludes:[]}, note:"9-18 units, at least one course from this category" },
      ]},
    ]
  },
  {
    id:"tmpl-religious-studies", name:"Religious Studies", type:"minor", college:"Dietrich - Interdepartmental (Faculty Advisor: History Department)",
    totalUnitsTarget:null,
    note:"Courses taken to fulfill requirements in other major or minor programs may only be applied to this minor with permission of the Faculty Advisor. Relevant courses at University of Pittsburgh, Duquesne University, or other Pittsburgh institutions may count toward the Elective Requirement with Faculty Advisor permission. [Source: at least 54 (six courses) units]",
    sections:[
      { id:"tmpl-religious-studies-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-religious-studies-cat0", name:"Required Core Course", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1, pool:{explicit:["79-281"], patterns:[], excludes:[]}, note:"9 units, all required" },
        { id:"tmpl-religious-studies-cat1", name:"Distribution Requirements", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["79-106", "79-110", "79-150", "79-208", "79-272", "79-273", "79-342", "79-352", "79-392", "80-276", "82-215"], patterns:[], excludes:[]}, note:"18 units (usually two 9-unit courses); \"A Distribution Course is one that applies a particular discipline to more than one religion\" — examples below, not exhaustive" },
        { id:"tmpl-religious-studies-cat2", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["79-124", "79-159", "79-202", "79-228", "79-270", "79-284", "79-296", "79-349", "79-350", "79-375", "79-393"], patterns:[], excludes:[]}, note:"at least 27 units (usually three 9-unit courses); examples below, not exhaustive" },
      ]},
    ]
  },
  {
    id:"tmpl-science-technology-and-society", name:"Science, Technology and Society", type:"minor", college:"Dietrich - Interdepartmental (Faculty Advisor: History Department)",
    totalUnitsTarget:null,
    note:"Courses taken to fulfill requirements in other major or minor programs may only be applied to this minor with permission of the Faculty Advisor. Additional courses from the History of Science Core and Philosophy of Science Core may count as electives. [Source: 54 units]",
    sections:[
      { id:"tmpl-science-technology-and-society-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-science-technology-and-society-cat0", name:"Core Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["79-160", "79-170", "79-175", "79-234", "79-330", "79-370", "79-380", "80-220", "80-221", "80-226", "80-244", "80-245", "80-249"], patterns:[], excludes:[]}, note:"27 units total — complete one course from each of Areas 1, 2, and 3" },
        { id:"tmpl-science-technology-and-society-cat1", name:"Electives", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["73-427", "76-395", "76-425", "76-476", "76-492", "76-494", "79-150", "79-202", "79-204", "79-208", "79-213", "79-215", "79-280", "79-283", "79-289", "79-297", "79-302", "79-303", "79-304", "79-315", "79-331", "79-332", "79-357", "79-368", "80-101", "80-150", "80-222", "80-312", "80-324", "80-335", "80-348", "84-387"], patterns:[], excludes:[]}, note:"27 units — complete three courses from the approved elective list (Areas 1/2 courses may double as electives if not already used)" },
      ]},
    ]
  },
  {
    id:"tmpl-societal-human-impacts-of-future-technologie", name:"Societal & Human Impacts of Future Technologies (SHIFT)", type:"minor", college:"Dietrich - Interdepartmental",
    totalUnitsTarget:64,
    note:"No limit to double-counting with other majors or minors. All courses counted towards the minor must be taken for a letter grade and passed with a grade of \"C\" or above. Of the 6 Area Courses, five must be taken in different departments. [Source: 8 total courses (range: core 10-18 units + area courses 54 units = 64-72 units) units]",
    sections:[
      { id:"tmpl-societal-human-impacts-of-future-technologie-sec", name:"Requirements", unitsTarget:64, categories:[
        { id:"tmpl-societal-human-impacts-of-future-technologie-cat0", name:"Core Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["80-249", "80-445"], patterns:[], excludes:[]}, note:"2 courses, 10 to 18 units total" },
        { id:"tmpl-societal-human-impacts-of-future-technologie-cat1", name:"Area Courses - Technology area", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["05-317", "05-318", "05-320", "05-452", "15-110", "15-112", "16-467", "17-303", "17-313", "17-331", "17-333", "17-355", "36-202", "67-250", "88-300"], patterns:[], excludes:[]}, note:"complete two courses, 18 units" },
        { id:"tmpl-societal-human-impacts-of-future-technologie-cat2", name:"Area Courses - Social & Behavioral Sciences area", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["05-413", "36-200", "36-309", "70-311", "70-321", "70-341", "73-102", "73-103", "84-266", "84-267", "84-369"], patterns:[], excludes:[]}, note:"complete two courses, 18 units" },
        { id:"tmpl-societal-human-impacts-of-future-technologie-cat3", name:"Area Courses - Ethics, Policy & Design Area", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["05-413", "08-200", "16-161", "36-200", "51-173", "51-241", "51-371", "51-373", "51-382", "70-311", "70-321", "70-332", "70-341", "70-364", "73-102", "73-103", "79-175", "79-234", "79-302", "80-130", "80-135", "80-330", "80-335", "84-266", "84-267", "84-275", "84-319", "84-325", "84-369", "84-370", "84-372", "84-373", "84-380", "84-386", "84-387", "84-389", "84-390", "84-405", "88-221"], patterns:[], excludes:[]}, note:"complete two courses, 18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-sociology", name:"Sociology", type:"minor", college:"Dietrich - Interdepartmental",
    totalUnitsTarget:null,
    note:"Core courses comprise 18 units; Elective courses comprise 36 units. Students may double-count two courses with another major or minor. Appropriate University of Pittsburgh Sociology courses (cross-registration) may also count toward electives with program advisor approval. [Source: 54 units]",
    sections:[
      { id:"tmpl-sociology-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-sociology-cat0", name:"Core Courses - A. Organizations", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["70-311", "88-140"], patterns:[], excludes:[]}, note:"complete one course, part of 18 units total" },
        { id:"tmpl-sociology-cat1", name:"Core Courses - B. Methodology", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["36-202", "70-208", "85-310", "85-350", "88-251", "88-252"], patterns:[], excludes:[]}, note:"complete one course, part of 18 units total" },
        { id:"tmpl-sociology-cat2", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["70-332", "70-342", "70-385", "76-241", "79-261", "79-275", "79-320", "79-331", "79-343", "79-377", "80-245", "80-246", "80-305", "80-335", "80-348", "84-369", "85-350", "85-446", "85-454", "88-230", "88-231", "88-234", "88-235", "88-237", "88-255", "88-261", "88-262", "88-275", "88-285", "88-290", "88-341", "88-344", "88-365", "88-366", "88-367", "88-451", "88-452", "88-454"], patterns:[], excludes:[]}, note:"complete four courses (minimum 36 units); two courses (18 units) from one category for \"depth requirement,\" one course (9 units) from the other category, remaining course (9 units) from either categor" },
      ]},
    ]
  },
  {
    id:"tmpl-creative-writing", name:"Creative Writing", type:"minor", college:"Dietrich - Department of English",
    totalUnitsTarget:null,
    note:"Must complete Introductory Genre Writing course and earn A/B to take beginning workshop in same genre (e.g., earn A/B in 76-265 before 76-365). Must earn A/B in beginning workshop to take advanced workshop in same genre (e.g., A/B in 76-460 before 76-462). Only need 76-260 or 76-261 with A/B to take 76-464. Only need 76-269 with A/B to take 76-469. 76-365 | Beginning Poetry Workshop | 9 76-460 | B [Source: minimum 54 (6 courses, includes First-Year Writing) units]",
    sections:[
      { id:"tmpl-creative-writing-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-creative-writing-cat0", name:"Required Prerequisite", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-101", "76-102", "76-106", "76-107", "76-108"], patterns:[], excludes:[]}, note:"First-Year Writing, 9 units" },
        { id:"tmpl-creative-writing-cat1", name:"Introductory Genre Writing Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-260", "76-261", "76-265", "76-269"], patterns:[], excludes:[]}, note:"1 course, 9 units" },
        { id:"tmpl-creative-writing-cat2", name:"Reading in Forms Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-363", "76-364"], patterns:[], excludes:[]}, note:"1 course, 9 units" },
        { id:"tmpl-creative-writing-cat3", name:"Two Workshops", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-365", "76-460", "76-462", "76-464", "76-465", "76-469"], patterns:[], excludes:[]}, note:"2 courses, 18 units" },
        { id:"tmpl-creative-writing-cat4", name:"One 200-level or above English Elective", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:[], patterns:[{depts:["76"],min:200,max:499}], excludes:[]}, note:"1 course, 9 units — \"any nine-unit course from 76-2xx through 76-4xx\"" },
      ]},
    ]
  },
  {
    id:"tmpl-humanities-analytics-human", name:"Humanities Analytics (HumAn)", type:"minor", college:"Dietrich - Department of English",
    totalUnitsTarget:null,
    note:"Total: 54 (6 courses) units",
    sections:[
      { id:"tmpl-humanities-analytics-human-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-humanities-analytics-human-cat0", name:"Required Courses", kind:"pool", minCourses:2, minUnits:18, targetUnits:18, targetCourses:2, pool:{explicit:["76-275", "76-380"], patterns:[], excludes:[]}, note:"2 courses, 18 units, all required" },
        { id:"tmpl-humanities-analytics-human-cat1", name:"Core Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-314", "76-388", "76-425", "76-429", "88-275", "88-300"], patterns:[], excludes:[]}, note:"2 courses, 18 units" },
        { id:"tmpl-humanities-analytics-human-cat2", name:"Electives", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["05-391", "11-411", "11-441/741", "15-104", "15-110", "15-112", "16-223", "16-385", "17-340", "17-450", "17-562", "36-202", "36-204", "36-226", "36-311", "36-315", "36-350", "36-462", "48-095", "48-120", "51-229", "53-451", "60", "62-150", "76-210", "76-245", "76-247", "76-325", "76-373", "76-476", "79-200", "79-234", "80-180", "80-280", "80-381", "80-383", "82-282", "82-283", "82-383", "82-480"], patterns:[], excludes:[]}, note:"choose two courses — one from List A, one from List B (additional non-listed courses may be approved)" },
      ]},
    ]
  },
  {
    id:"tmpl-literature-culture", name:"Literature & Culture", type:"minor", college:"Dietrich - Department of English",
    totalUnitsTarget:null,
    note:"Total: 54 (6 courses) units",
    sections:[
      { id:"tmpl-literature-culture-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-literature-culture-cat0", name:"Required Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-260", "76-261", "76-265", "76-269", "76-275"], patterns:[], excludes:[]}, note:"2 courses, 18 units" },
        { id:"tmpl-literature-culture-cat1", name:"200-Level Literature & Culture Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-203", "76-207", "76-210", "76-220", "76-221", "76-230", "76-233", "76-239", "76-241", "76-244", "76-245", "76-247", "76-259", "76-268", "76-278", "76-295", "76-296", "76-299"], patterns:[], excludes:[]}, note:"2 courses, 18 units; one course must cover the period of 1830 or before" },
        { id:"tmpl-literature-culture-cat2", name:"300- or 400-Level Literature & Culture or Theory Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-312", "76-313", "76-314", "76-317", "76-326", "76-329", "76-337", "76-339", "76-341", "76-342", "76-343", "76-347", "76-348", "76-353", "76-367", "76-376", "76-392", "76-401", "76-407", "76-410", "76-423", "76-429", "76-431", "76-434", "76-439", "76-442", "76-446", "76-448", "76-450", "76-454", "76-461", "76-467", "76-468", "76-482", "76-493", "76-495"], patterns:[], excludes:[]}, note:"2 courses, 18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-professional-writing", name:"Professional Writing", type:"minor", college:"Dietrich - Department of English",
    totalUnitsTarget:null,
    note:"Total: 54 (6 courses) units",
    sections:[
      { id:"tmpl-professional-writing-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-professional-writing-cat0", name:"Required Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-270", "76-271"], patterns:[], excludes:[]}, note:"1 course, 9 units" },
        { id:"tmpl-professional-writing-cat1", name:"Core Writing Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-260", "76-261", "76-265", "76-269", "76-373", "76-389", "76-390"], patterns:[], excludes:[]}, note:"2 courses (200- or 300-level), 18 units" },
        { id:"tmpl-professional-writing-cat2", name:"300- or 400-Level Writing Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-306", "76-314", "76-318", "76-325", "76-354", "76-368", "76-372", "76-384", "76-388", "76-391", "76-395", "76-415", "76-425", "76-464", "76-473", "76-474", "76-475", "76-476", "76-481", "76-483", "76-487", "76-492", "76-494"], patterns:[], excludes:[]}, note:"2 courses, 18 units minimum" },
        { id:"tmpl-professional-writing-cat3", name:"200-level or Above English Elective", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:[], patterns:[{depts:["76"],min:200,max:499}], excludes:[]}, note:"1 course, 9 units — \"Students may choose from the Department's listings\"" },
      ]},
    ]
  },
  {
    id:"tmpl-technical-writing", name:"Technical Writing", type:"minor", college:"Dietrich - Department of English",
    totalUnitsTarget:null,
    note:"Total: 54 (6 courses) units",
    sections:[
      { id:"tmpl-technical-writing-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-technical-writing-cat0", name:"Required Introductory Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-270", "76-271"], patterns:[], excludes:[]}, note:"1 course, 9 units" },
        { id:"tmpl-technical-writing-cat1", name:"Two 200- or 300-level Core Writing Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-373", "76-389", "76-390", "76-391"], patterns:[], excludes:[]}, note:"2 courses, 18 units" },
        { id:"tmpl-technical-writing-cat2", name:"Two 300- or 400-Level Theory/Specialization Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["76-314", "76-318", "76-327", "76-380", "76-395", "76-425", "76-474", "76-476", "76-481", "76-483", "76-487", "76-488"], patterns:[], excludes:[]}, note:"2 courses, 18 units" },
        { id:"tmpl-technical-writing-cat3", name:"One Additional 300- or 400-Level Theory/Specialization Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["76-306", "76-325", "76-354", "76-368", "76-372", "76-384", "76-415", "76-427", "76-464", "76-473", "76-475", "76-490", "76-492", "76-494"], patterns:[], excludes:[]}, note:"1 course, 9 units — \"In addition to any of the courses above that have not already been taken, courses include but are not limited to:\"" },
      ]},
    ]
  },
  {
    id:"tmpl-social-political-history-sph", name:"Social & Political History (SPH)", type:"minor", college:"Dietrich - Department of History",
    totalUnitsTarget:null,
    note:"\"Social & Political History minors have considerable flexibility in choosing their elective courses, but should feel free to consult with the Director of Undergraduate Studies in making their selections.\" [Source: 54 units]",
    sections:[
      { id:"tmpl-social-political-history-sph-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-social-political-history-sph-cat0", name:"Required History Survey Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["79-110", "79-120", "79-160", "79-202", "79-203", "79-204", "79-205", "79-206", "79-211", "79-212", "79-223", "79-225", "79-226", "79-227", "79-229", "79-230", "79-240", "79-242", "79-245", "79-248", "79-249", "79-250", "79-255", "79-260", "79-261", "79-262", "79-265", "79-266", "79-269", "79-272", "79-288", "79-320"], patterns:[], excludes:[]}, note:"choose two, 18 units" },
        { id:"tmpl-social-political-history-sph-cat1", name:"Elective courses for the Minor in Social & Political History", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:[], patterns:[{depts:["79"],min:0,max:999}], excludes:[]}, note:"36 units (typically 4 courses) — \"considerable flexibility,\" no fixed list" },
      ]},
    ]
  },
  {
    id:"tmpl-anthropology", name:"Anthropology", type:"minor", college:"Dietrich - Department of History",
    totalUnitsTarget:null,
    note:"Relevant Anthropology courses may be taken at another university (study abroad, University of Pittsburgh, or other Pittsburgh institutions) with permission of the Faculty Advisor. Other courses may fulfill Methods/Anthropological Perspectives requirements with Faculty Advisor permission. [Source: 63 units]",
    sections:[
      { id:"tmpl-anthropology-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-anthropology-cat0", name:"General Education Course, Disciplinary Perspectives: Social Sciences", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["79-201"], patterns:[], excludes:[]}, note:"9 units, required (\"need not be satisfied before beginning the minor\")" },
        { id:"tmpl-anthropology-cat1", name:"Methods", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["79-275", "79-314", "79-317", "79-332", "79-379", "79-380"], patterns:[], excludes:[]}, note:"18 units (typically 2 courses)" },
        { id:"tmpl-anthropology-cat2", name:"Anthropological Perspectives", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["57-306", "79-110", "79-116", "79-122", "79-150", "79-170", "79-203", "79-208", "79-210", "79-211", "79-215", "79-223", "79-227", "79-234", "79-246", "79-261", "79-262", "79-264", "79-275", "79-276", "79-278", "79-280", "79-313", "79-314", "79-315", "79-317", "79-331", "79-332", "79-368", "79-371", "79-377", "79-379", "79-380"], patterns:[], excludes:[]}, note:"36 units (typically 4 courses)" },
      ]},
    ]
  },
  {
    id:"tmpl-ethics", name:"Ethics", type:"minor", college:"Dietrich - Department of Philosophy",
    totalUnitsTarget:45,
    note:"All five required courses must be taken for a letter grade and passed with a grade of \"C\" or above, except 80-500 Undergraduate Internship, which may be taken pass/fail. [Source: 27 (Core) + 18 (Electives) = 45 (five courses) units]",
    sections:[
      { id:"tmpl-ethics-sec", name:"Requirements", unitsTarget:45, categories:[
        { id:"tmpl-ethics-cat0", name:"Ethics Core Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["80-130", "80-135", "80-136", "80-244", "80-245", "80-246", "80-249", "80-330", "80-335", "80-336", "80-348", "80-447"], patterns:[], excludes:[]}, note:"27 units — complete three courses from the list below, with at least two courses at the 200-level or higher" },
        { id:"tmpl-ethics-cat1", name:"Ethics Electives", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["80-234", "80-244", "80-245", "80-246", "80-330", "80-335", "80-336", "80-348", "80-447"], patterns:[], excludes:[]}, note:"18 units — complete two courses at the 200-level or higher (may be additional courses from the Ethics Core list above)" },
      ]},
    ]
  },
  {
    id:"tmpl-philosophy", name:"Philosophy", type:"minor", college:"Dietrich - Department of Philosophy",
    totalUnitsTarget:45,
    note:"\"The Minor in Philosophy requires five courses and gives students a broad philosophical foundation, requiring one course in Logic/Methodology, two courses in the History of Philosophy and two Philosophy electives. The minor complements any primary major from around the University.\" All courses counted towards the minor must be taken for a letter grade and passed with a grade of \"C\" or above. [Source: 9 + 18 + 18 = 45 (five courses) units]",
    sections:[
      { id:"tmpl-philosophy-sec", name:"Requirements", unitsTarget:45, categories:[
        { id:"tmpl-philosophy-cat0", name:"Logic/Methodology Requirements", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["80-210", "80-211", "80-220", "80-221", "80-226", "80-310", "80-311", "80-312", "80-315", "80-324", "80-325", "80-365", "80-411", "80-413", "80-514", "80-516", "80-521", "80-524"], patterns:[], excludes:[]}, note:"complete one course, 9 units" },
        { id:"tmpl-philosophy-cat1", name:"History of Philosophy Requirements", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["80-150", "80-226", "80-250", "80-251", "80-252", "80-253", "80-254", "80-255", "80-261", "80-350", "80-358", "80-365", "80-551"], patterns:[], excludes:[]}, note:"complete two courses, 18 units" },
        { id:"tmpl-philosophy-cat2", name:"Philosophy Electives", kind:"pool", minCourses:18, minUnits:18, targetUnits:18, targetCourses:18, pool:{explicit:[], patterns:[{depts:["80"],min:200,max:999}], excludes:[]}, note:"18 units — \"Students must complete 18 units in the Philosophy department at the 200-level or higher. The choice of electives must be approved by the Senior Academic Program Manager.\"" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-psychology", name:"Minor in Psychology", type:"minor", college:"Dietrich - Department of Psychology",
    totalUnitsTarget:72,
    note:"(none stated beyond curriculum structure below) [Source: 72 units units]",
    sections:[
      { id:"tmpl-minor-in-psychology-sec", name:"Requirements", unitsTarget:72, categories:[
        { id:"tmpl-minor-in-psychology-cat0", name:"Introductory course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["85-100"], patterns:[], excludes:[]}, note:"required" },
        { id:"tmpl-minor-in-psychology-cat1", name:"Area Survey courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["85-110", "85-130", "85-150", "85-170", "85-190"], patterns:[], excludes:[]}, note:"Complete one course" },
        { id:"tmpl-minor-in-psychology-cat2", name:"Statistics", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["36-200", "36-309"], patterns:[], excludes:[]}, note:"36 units" },
        { id:"tmpl-minor-in-psychology-cat3", name:"Upper Level Courses - Research Methods Courses", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["85-300"], patterns:[], excludes:[]}, note:"required" },
        { id:"tmpl-minor-in-psychology-cat4", name:"Advanced courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:[], patterns:[{depts:["85"],min:400,max:499}], excludes:[]}, note:"minimum 18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-cognitive-neuroscience", name:"Minor in Cognitive Neuroscience", type:"minor", college:"Dietrich - Department of Psychology",
    totalUnitsTarget:63,
    note:"\"The minor in Cognitive Neuroscience offered by the Department of Psychology is similar to the Neuroscience Minor offered by the Department of Biological Sciences. The differences between the two forms of the minor are determined by one required course, and additionally, by the students' choice of distribution electives. The requirements for the Cognitive Neuroscience Minor include 7 courses: four [Source: 63 units units]",
    sections:[
      { id:"tmpl-minor-in-cognitive-neuroscience-sec", name:"Requirements", unitsTarget:63, categories:[
        { id:"tmpl-minor-in-cognitive-neuroscience-cat0", name:"Required Coursework", kind:"pool", minCourses:4, minUnits:null, targetUnits:null, targetCourses:4, pool:{explicit:["03-121", "03-363", "85-110", "85-170"], patterns:[], excludes:[]}, note:"all required" },
        { id:"tmpl-minor-in-cognitive-neuroscience-cat1", name:"Distribution Requirements", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["03-133", "03-362", "03-365", "15-386", "85-106", "85-110", "85-190", "85-213", "85-314", "85-359", "85-370", "85-395", "85-412", "85-414", "85-417", "85-419", "85-421", "85-432", "85-472", "86-375"], patterns:[], excludes:[]}, note:"Three courses, including at least 1 from each of the following categories" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-behavioral-economics", name:"The Minor in Behavioral Economics", type:"minor", college:"Dietrich - Department of Social and Decision Sciences",
    totalUnitsTarget:null,
    note:"\"Students who elect Behavioral Economics as a minor must complete the six core courses and one elective from the elective set (below).\" \"Students may double-count two courses with another major or minor. 73-102 is excluded from this double count policy. The prerequisite course of 36-200 (or its equivalent) is also excluded.\" Faculty Director: Peter Schwardmann. [Source: 63 units]",
    sections:[
      { id:"tmpl-the-minor-in-behavioral-economics-sec", name:"Requirements", unitsTarget:null, categories:[
        { id:"tmpl-the-minor-in-behavioral-economics-cat0", name:"Core Courses", kind:"pool", minCourses:null, minUnits:54, targetUnits:54, targetCourses:null, pool:{explicit:["36-202", "73-102", "88-120", "88-221", "88-360", "88-367"], patterns:[], excludes:[]}, note:"54 units total" },
        { id:"tmpl-the-minor-in-behavioral-economics-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["88-130", "88-221", "88-230", "88-231", "88-234", "88-235", "88-251", "88-252", "88-255", "88-261", "88-275", "88-285", "88-290", "88-300", "88-302", "88-312", "88-344", "88-365", "88-366", "88-367"], patterns:[], excludes:[]}, note:"choose at least one course (9 units); note BE core courses cannot double-count with elective" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-decision-science", name:"The Minor in Decision Science", type:"minor", college:"Dietrich - Department of Social and Decision Sciences",
    totalUnitsTarget:57,
    note:"\"Students who elect Decision Science as a minor must complete the four core courses (below) and two electives from the elective set (below).\" \"Students may double-count two courses with another major or minor.\" [Source: 57 units units]",
    sections:[
      { id:"tmpl-the-minor-in-decision-science-sec", name:"Requirements", unitsTarget:57, categories:[
        { id:"tmpl-the-minor-in-decision-science-cat0", name:"Core Courses", kind:"pool", minCourses:4, minUnits:39, targetUnits:39, targetCourses:4, pool:{explicit:["73-102", "88-120", "88-223", "88-302"], patterns:[], excludes:[]}, note:"all required, 39 units" },
        { id:"tmpl-the-minor-in-decision-science-cat1", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["70-311", "70-332", "70-443", "70-460", "73-365", "80-221", "80-324", "84-369", "85-454", "88-150", "88-221", "88-230", "88-231", "88-234", "88-235", "88-237", "88-252", "88-255", "88-261", "88-262", "88-275", "88-285", "88-290", "88-300", "88-312", "88-342", "88-344", "88-360", "88-365", "88-366", "88-367", "88-372", "88-379", "88-451", "88-452", "88-454"], patterns:[], excludes:[]}, note:"Complete two courses, 18 units; at least one (9 units) must be an SDS course (88-xxx) from the approved list" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-policy-and-management", name:"The Minor in Policy and Management", type:"minor", college:"Dietrich - Department of Social and Decision Sciences",
    totalUnitsTarget:57,
    note:"\"The Policy and Management minor is intended for students who expect to need these management concepts and skills.\" \"Students may double-count two courses with another major or minor.\" [Source: 57 units units]",
    sections:[
      { id:"tmpl-the-minor-in-policy-and-management-sec", name:"Requirements", unitsTarget:57, categories:[
        { id:"tmpl-the-minor-in-policy-and-management-cat0", name:"Required Courses", kind:"pool", minCourses:4, minUnits:39, targetUnits:39, targetCourses:4, pool:{explicit:["73-102", "88-150", "88-221", "88-223"], patterns:[], excludes:[]}, note:"all required, 39 units" },
        { id:"tmpl-the-minor-in-policy-and-management-cat1", name:"Electives", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["36-303", "36-315", "70-257", "70-311", "70-332", "70-342", "70-364", "70-371", "70-374", "70-381", "70-430", "70-455", "70-460", "73-328", "73-408", "76-219", "76-475", "79-302", "79-360", "80-244", "80-447", "84-362", "84-373", "84-389", "88-230", "88-231", "88-234", "88-235", "88-237", "88-252", "88-261", "88-275", "88-281", "88-284", "88-285", "88-300", "88-312", "88-341", "88-344", "88-365", "88-366", "88-367", "88-379", "88-411", "90-434", "90-443", "94-423"], patterns:[], excludes:[]}, note:"Complete two courses (at least 18 units) from any of the concentrations (Analytics, Policy, Management, Law); courses need not be from the same concentration; at least one (9 units) must be an SDS cou" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-medical-decision-making", name:"Minor in Medical Decision Making", type:"minor", college:"Dietrich - Department of Social and Decision Sciences",
    totalUnitsTarget:54,
    note:"\"This minor is specifically curated to be relevant to the health professions and seeks to equip students with essential knowledge and skills in understanding the psychological, behavioral, and ethical dimensions of medical decision-making processes. The minor will also introduce students to healthcare policy as well as the workings of the healthcare industry and insurance markets.\" \"Students may d [Source: 54 units units]",
    sections:[
      { id:"tmpl-minor-in-medical-decision-making-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-minor-in-medical-decision-making-cat0", name:"Foundation Course", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["88-120", "88-130", "88-261", "88-262", "88-302"], patterns:[], excludes:[]}, note:"choose one (per line layout; first course listed has \"or\" alternatives) plus additional required courses" },
        { id:"tmpl-minor-in-medical-decision-making-cat1", name:"Elective", kind:"pool", minCourses:null, minUnits:null, targetUnits:null, targetCourses:null, pool:{explicit:["73-328", "80-245", "85-108", "85-454", "88-365"], patterns:[], excludes:[]}, note:"choose one course" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-statistics-and-data-science", name:"The Minor in Statistics and Data Science", type:"minor", college:"Dietrich - Department of Statistics and Data Science",
    totalUnitsTarget:106,
    note:"\"The Minor (or Additional Major) in Statistics and Data Science is a useful complement to a (primary) major in another department or college.\" Double-counting policy: \"students must have at least three statistics courses (36-xxx) that do not count for their primary major. If students do not have at least three, they need to take additional advanced electives. Make sure to consult your Statistics a [Source: 84-106 units units]",
    sections:[
      { id:"tmpl-the-minor-in-statistics-and-data-science-sec", name:"Requirements", unitsTarget:106, categories:[
        { id:"tmpl-the-minor-in-statistics-and-data-science-cat0", name:"1. Mathematical Foundations (Prerequisites)", kind:"pool", minCourses:5, minUnits:52, targetUnits:52, targetCourses:5, pool:{explicit:["21-090"], patterns:[], excludes:[]}, note:"39-52 units, all required combination below" },
        { id:"tmpl-the-minor-in-statistics-and-data-science-cat1", name:"2. Data Analysis", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["36-200", "36-202", "36-220", "36-290", "36-303", "36-309", "36-311", "36-313", "36-315", "36-318", "36-396", "36-401", "36-402", "36-410", "36-460", "36-461", "36-462", "36-463", "36-464", "36-465", "36-466", "36-467", "36-468", "36-469", "36-470", "36-471", "36-472", "36-473", "36-490", "36-493", "36-497"], patterns:[], excludes:[]}, note:"27-36 units" },
        { id:"tmpl-the-minor-in-statistics-and-data-science-cat2", name:"3. Probability Theory and Statistical Theory", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["36-225", "36-226", "36-235", "36-236", "36-326"], patterns:[], excludes:[]}, note:"18 units" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-applied-multilingual-studies", name:"The Minor in Applied Multilingual Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:57,
    note:"Faculty Advisor: Dr. Bonnie Youngs. \"There are no prerequisites for this minor. The core course in the study of language and culture cannot be fulfilled with any placement credit transferred into Carnegie Mellon. Progress in language and culture will be accelerated by study abroad, which is highly recommended.\" [Source: 54-57 units units]",
    sections:[
      { id:"tmpl-the-minor-in-applied-multilingual-studies-sec", name:"Requirements", unitsTarget:57, categories:[
        { id:"tmpl-the-minor-in-applied-multilingual-studies-cat0", name:"1. Core Courses Languages, Cultures, and Applied Linguistics", kind:"pool", minCourses:null, minUnits:21, targetUnits:21, targetCourses:null, pool:{explicit:["82-283"], patterns:[], excludes:[]}, note:"2 courses, 18-21 units" },
        { id:"tmpl-the-minor-in-applied-multilingual-studies-cat1", name:"2. LCAL Foundational, Theory & Concepts and Data Analysis Courses", kind:"pool", minCourses:null, minUnits:6, targetUnits:6, targetCourses:null, pool:{explicit:["76-293", "76-314", "76-318", "76-325", "76-380", "76-385", "76-386", "76-388", "76-496", "80-180", "80-280", "80-282", "80-287", "80-288", "80-383", "80-385", "80-388", "80-488", "82-217", "82-280", "82-283", "82-284", "82-285", "82-287", "82-288", "82-383", "82-385", "82-388", "82-481", "82-482", "85-421"], patterns:[], excludes:[]}, note:"Choose four courses, at least one at the 300-level and one at the 400-level; one course outside of LCAL may be counted; two minis (6 units each) or one mini plus independent project (3 units) may coun" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-arabic-studies", name:"The Minor in Arabic Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:60,
    note:"Faculty Advisors: Dr. Khaled Al Masaeed (Pittsburgh), Dr. Zeinab Ibrahim (Qatar). Prerequisites differ by campus (Pittsburgh: two Elementary Arabic 100-level courses or equivalent via placement; Qatar: advanced-level proficiency). \"Students may double count two courses taken for the Arabic Studies minor that are also being used to fulfill the requirements of other majors, minors, and programs. Thi [Source: 54-60 units units]",
    sections:[
      { id:"tmpl-the-minor-in-arabic-studies-sec", name:"Requirements", unitsTarget:60, categories:[
        { id:"tmpl-the-minor-in-arabic-studies-cat0", name:"1. Foundational Courses in Arabic Studies", kind:"pool", minCourses:5, minUnits:51, targetUnits:51, targetCourses:5, pool:{explicit:["82-211", "82-212", "82-311", "82-312", "82-411", "82-412", "82-511", "82-512"], patterns:[], excludes:[]}, note:"Complete 5 courses, 45-51 units" },
        { id:"tmpl-the-minor-in-arabic-studies-cat1", name:"2. Arabic Studies and Interdisciplinary Electives", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["19-411", "48-240", "48-315", "70-321", "70-342", "70-365", "76-318", "76-386", "76-484", "76-491", "79-229", "79-230", "79-302", "80-136", "80-180", "80-244", "80-280", "80-282", "80-324", "80-381", "80-383", "82-114", "82-117", "82-118", "82-214", "82-215", "82-216", "82-280", "82-282", "82-283", "82-300", "82-313", "82-314", "82-383", "82-411", "82-412", "82-417", "82-448", "82-480", "82-505", "82-511", "82-512", "84-275", "84-310", "84-322", "84-323", "84-362", "84-389", "85-421"], patterns:[], excludes:[]}, note:"1 course, 9 units; in consultation with advisor, choose one additional course taught in Arabic or English (e.g., additional 400-/500-level Arabic Studies course, 82-215, 82-217, or LCAL Seminar)" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-chinese-studies", name:"The Minor in Chinese Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:57,
    note:"Faculty Advisors: Dr. Sue-mei Wu, Tianxue Yao. Prerequisite: \"Intermediate-level proficiency in the Chinese language\" (3 courses: two 100-level + one 200-level, or placement/exemption). \"Students may double count two courses taken for the Chinese Studies minor... This does not include double-counting with General Education requirements, which has no limit.\" \"Students with native or near-native pro [Source: 54-57 units units]",
    sections:[
      { id:"tmpl-the-minor-in-chinese-studies-sec", name:"Requirements", unitsTarget:57, categories:[
        { id:"tmpl-the-minor-in-chinese-studies-cat0", name:"1. Foundational Courses in Chinese Studies", kind:"pool", minCourses:null, minUnits:39, targetUnits:39, targetCourses:null, pool:{explicit:["82-232", "82-331", "82-332", "82-333"], patterns:[], excludes:[]}, note:"4 courses, 36-39 units" },
        { id:"tmpl-the-minor-in-chinese-studies-cat1", name:"2. Chinese Studies and Interdisciplinary Electives", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["48-551", "60-399", "70-342", "70-365", "70-430", "76-318", "76-339", "76-386", "79-261", "79-262", "79-281", "80-180", "80-276", "80-280", "82-137", "82-230", "82-234", "82-238", "82-280", "82-281", "82-282", "82-283", "82-284", "82-285", "82-286", "82-334", "82-335", "82-337", "82-338", "82-339", "82-340", "82-383", "82-388", "82-431", "82-432", "82-433", "82-434", "82-436", "82-439", "82-440", "82-480", "82-505", "82-531", "82-532", "85-421", "88-411"], patterns:[], excludes:[]}, note:"2 courses, 18 units; at least one taught in Chinese at the 300-, 400- or 500-level; may include one English-taught Chinese culture course; may substitute one relevant related course from outside the p" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-french-and-francophone-studies", name:"The Minor in French and Francophone Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:54,
    note:"Faculty Advisor: Dr. Sébastien Dubreil. Prerequisite: elementary-level proficiency in French (two 12-unit courses) or exemption via AP/IB/placement. \"Students who place out of the intermediate level... additional courses at the 300 and 400 levels will be required.\" \"Students may double count two courses taken for the French & Francophone Studies minor that are also being used to fulfill the requir [Source: 54 units units]",
    sections:[
      { id:"tmpl-the-minor-in-french-and-francophone-studies-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-the-minor-in-french-and-francophone-studies-cat0", name:"1. Foundational Courses in French and Francophone Studies", kind:"pool", minCourses:null, minUnits:45, targetUnits:45, targetCourses:null, pool:{explicit:["82-201", "82-202", "82-303", "82-304"], patterns:[], excludes:[]}, note:"5 courses, 45 units" },
        { id:"tmpl-the-minor-in-french-and-francophone-studies-cat1", name:"2. French and Francophone Studies Electives", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:[], patterns:[], excludes:[]}, note:"1 course, 9 units; in consultation with advisor, choose one additional course taught in French or English (e.g., additional 400-level French & Francophone Studies course, 82-282/82-283, or LCAL Semina" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-german-studies", name:"The Minor in German Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:54,
    note:"Faculty Advisor: Dr. Martina Wells. Prerequisite: completion of two Elementary German (100-level) courses at CMU or equivalent via placement. \"Students may double count two courses taken for the German Studies minor that are also being used to fulfill the requirements of other majors, minors, and programs. This does not include double-counting with General Education requirements, which has no limi [Source: 54 units units]",
    sections:[
      { id:"tmpl-the-minor-in-german-studies-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-the-minor-in-german-studies-cat0", name:"1. Foundational Courses in German Studies", kind:"pool", minCourses:null, minUnits:45, targetUnits:45, targetCourses:null, pool:{explicit:["82-221", "82-222", "82-320", "82-323", "82-425", "82-426"], patterns:[], excludes:[]}, note:"5 courses, 45 units" },
        { id:"tmpl-the-minor-in-german-studies-cat1", name:"2. German Studies & Interdisciplinary Electives", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["48-338", "48-340", "48-350", "57-306", "76-239", "76-386", "76-387", "76-483", "79-205", "79-257", "80-136", "80-180", "80-251", "80-253", "80-275", "80-280", "82-227", "82-280", "82-281", "82-282", "82-283", "82-284", "82-285", "82-286", "82-383", "82-388", "82-420", "82-425", "82-426", "82-427", "82-428", "82-480", "82-521", "82-522", "85-421"], patterns:[], excludes:[]}, note:"1 course, 9 units; choose one additional course taught in German or English (e.g., additional 400-level German Studies course, 82-282/82-283, or LCAL Seminar)" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-hispanic-studies", name:"The Minor in Hispanic Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:54,
    note:"Faculty Advisor: Dr. Candace Skibba. Prerequisite: intermediate-level proficiency in Spanish (4 courses: two 100-level + two 200-level) or AP/IB exemption. \"Students may double count two courses taken for the Hispanic Studies minor that is also being used to fulfill the requirements of other majors, minors, and programs. This does not include double-counting with General Education requirements.\" [Source: 54 units units]",
    sections:[
      { id:"tmpl-the-minor-in-hispanic-studies-sec", name:"Requirements", unitsTarget:54, categories:[
        { id:"tmpl-the-minor-in-hispanic-studies-cat0", name:"1. Foundational Courses in Hispanic Studies", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["82-342", "82-343", "82-344", "82-345"], patterns:[], excludes:[]}, note:"4 courses, 36 units" },
        { id:"tmpl-the-minor-in-hispanic-studies-cat1", name:"2. Hispanic Studies and Interdisciplinary Electives", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["48-348", "57-306", "76-385", "76-386", "76-387", "76-484", "80-180", "80-280", "80-285", "80-286", "80-381", "82-245", "82-247", "82-249", "82-281", "82-284", "82-285", "82-383", "82-388", "82-441", "82-443", "82-444", "82-445", "82-451", "82-455", "82-456", "82-480", "82-482", "82-541", "82-542", "84-306"], patterns:[], excludes:[]}, note:"Complete two (2) Hispanic Studies courses at the 400-level or above, 18 units; may substitute one relevant related course from outside the program" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-japanese-studies", name:"The Minor in Japanese Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:60,
    note:"Faculty Advisor: Dr. Yoshihiro Yasuhara. Prerequisite: intermediate-level proficiency in Japanese (3 courses: two 100-level + one 200-level) or placement/exemption via AP/Cambridge GCE/IB. \"Students may double count two courses taken for the Japanese Studies minor that is also being used to fulfill the requirements of other majors, minors, and programs. This does not include double-counting with G [Source: 54-60 units units]",
    sections:[
      { id:"tmpl-the-minor-in-japanese-studies-sec", name:"Requirements", unitsTarget:60, categories:[
        { id:"tmpl-the-minor-in-japanese-studies-cat0", name:"1. Foundational Courses in Japanese Studies", kind:"pool", minCourses:null, minUnits:42, targetUnits:42, targetCourses:null, pool:{explicit:["82-271", "82-272", "82-273", "82-371", "82-372"], patterns:[], excludes:[]}, note:"4 courses, 36-42 units" },
        { id:"tmpl-the-minor-in-japanese-studies-cat1", name:"2. Japanese Studies and Interdisciplinary Electives", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["57-306", "76-239", "76-386", "76-387", "79-261", "79-262", "79-275", "80-180", "80-280", "82-234", "82-278", "82-279", "82-280", "82-281", "82-282", "82-283", "82-373", "82-374", "82-383", "82-388", "82-473", "82-474", "82-480", "82-505", "82-571", "82-572", "85-421"], patterns:[], excludes:[]}, note:"2 courses, 18 units; at least one taught in Japanese" },
      ]},
    ]
  },
  {
    id:"tmpl-the-minor-in-russian-studies", name:"The Minor in Russian Studies", type:"minor", college:"Dietrich - Department of Languages, Cultures and Applied Linguistics",
    totalUnitsTarget:66,
    note:"Faculty Advisor: Dr. Tatyana Gershkovich. \"There are no language prerequisites for the Russian minor. Students with native or near-native proficiency in Russian or with prior study at the elementary or intermediate level may begin language study at a higher level, based on consultation with the major advisor and placement through CMU placement tests.\" \"Students may double count up to two courses t [Source: 54-66 units units]",
    sections:[
      { id:"tmpl-the-minor-in-russian-studies-sec", name:"Requirements", unitsTarget:66, categories:[
        { id:"tmpl-the-minor-in-russian-studies-cat0", name:"1. Foundational Courses in Russian Studies", kind:"pool", minCourses:null, minUnits:57, targetUnits:57, targetCourses:null, pool:{explicit:["82-191", "82-192", "82-194", "82-291", "82-292", "82-294", "82-295"], patterns:[], excludes:[]}, note:"5 courses, 45-57 units; complete at least three semesters of Russian language study" },
        { id:"tmpl-the-minor-in-russian-studies-cat1", name:"3. Russian Studies and Interdisciplinary Electives", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["79-267", "79-322", "82-293", "82-391", "82-392", "82-394", "82-397", "82-492"], patterns:[], excludes:[]}, note:"1 course, 9 units; choose one additional course taught in English or Russian; may substitute one relevant related course from outside the program" },
      ]},
    ]
  },
  {
    id:"tmpl-information-systems-minor", name:"Information Systems Minor", type:"minor", college:"Dietrich - Information Systems Program",
    totalUnitsTarget:66,
    note:"\"The Information Systems minor will provide an opportunity for undergraduate students in any major at Carnegie Mellon to develop a unique set of skills to enhance their education... It complements majors such as business, psychology, HCI, statistics, computer science, and engineering.\" \"Students in the Information Systems Minor will be required to complete the computational prerequisite, three Inf [Source: 66 units (12 prerequisite + 27 core + minimum 27 elective) units]",
    sections:[
      { id:"tmpl-information-systems-minor-sec", name:"Requirements", unitsTarget:66, categories:[
        { id:"tmpl-information-systems-minor-cat0", name:"Prerequisite", kind:"pool", minCourses:null, minUnits:12, targetUnits:12, targetCourses:null, pool:{explicit:["15-112"], patterns:[], excludes:[]}, note:"12 units" },
        { id:"tmpl-information-systems-minor-cat1", name:"Information Systems Core", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["67-240", "67-250", "67-262"], patterns:[], excludes:[]}, note:"Complete all of the following courses, 27 units" },
        { id:"tmpl-information-systems-minor-cat2", name:"Additional Information Systems Electives", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["67-206", "67-220", "67-265", "67-279", "67-306", "67-336", "67-348", "67-364", "67-368"], patterns:[], excludes:[]}, note:"Complete at least 27 units from the following courses" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-american-politics-and-law", name:"Minor in American Politics and Law", type:"minor", college:"Dietrich - Carnegie Mellon Institute for Strategy and Technology (CMIST) [formerly Institute for Politics and Strategy]",
    totalUnitsTarget:63,
    note:"Director: Audrey Kurth Cronin. \"The minor in American Politics and Law is designed to equip students with comprehensive insights into the political and legal landscape of the United States... particularly useful for students entering law school, as well as other potential future careers in policymaking, politics, non-governmental organizations, political analysis, and legislative affairs.\" \"Studen [Source: 60-63 units units]",
    sections:[
      { id:"tmpl-minor-in-american-politics-and-law-sec", name:"Requirements", unitsTarget:63, categories:[
        { id:"tmpl-minor-in-american-politics-and-law-cat0", name:"Foundational", kind:"pool", minCourses:2, minUnits:18, targetUnits:18, targetCourses:2, pool:{explicit:["84-104", "84-120"], patterns:[], excludes:[]}, note:"all required, 18 units" },
        { id:"tmpl-minor-in-american-politics-and-law-cat1", name:"Communication", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["84-250", "84-252"], patterns:[], excludes:[]}, note:"choose one, 6-9 units" },
        { id:"tmpl-minor-in-american-politics-and-law-cat2", name:"American Politics", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["79-248", "79-250", "84-280", "84-304", "84-309", "84-319", "84-324", "84-325", "84-327", "84-328", "84-338", "84-352", "84-355", "84-358", "84-365", "84-366", "84-367", "84-380", "84-393", "84-402"], patterns:[], excludes:[]}, note:"18 units from list" },
        { id:"tmpl-minor-in-american-politics-and-law-cat3", name:"Law", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["17-333", "66-221", "70-364", "73-408", "76-219", "76-475", "79-178", "79-360", "84-331", "84-332", "84-333", "84-338", "84-349", "84-373", "84-402", "88-281", "88-284"], patterns:[], excludes:[]}, note:"18 units from list" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-cybersecurity-and-international-con", name:"Minor in Cybersecurity and International Conflict", type:"minor", college:"Dietrich - Carnegie Mellon Institute for Strategy and Technology (CMIST)",
    totalUnitsTarget:63,
    note:"Director: Audrey Kurth Cronin. \"The minor in cybersecurity and international conflict analyzes the past, present, and future role of cyber conflict and cybersecurity in international politics.\" \"Students are permitted to double count a maximum of two courses between the minor in Cybersecurity and International Conflict and another major or minor. Unlimited double counting is permitted with general [Source: 63 units units]",
    sections:[
      { id:"tmpl-minor-in-cybersecurity-and-international-con-sec", name:"Requirements", unitsTarget:63, categories:[
        { id:"tmpl-minor-in-cybersecurity-and-international-con-cat0", name:"Foundational Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["84-101", "84-104", "84-226", "84-275"], patterns:[], excludes:[]}, note:"choose one, 9 units" },
        { id:"tmpl-minor-in-cybersecurity-and-international-con-cat1", name:"Core Courses", kind:"pool", minCourses:3, minUnits:27, targetUnits:27, targetCourses:3, pool:{explicit:["84-363", "84-387", "84-405"], patterns:[], excludes:[]}, note:"all required, 27 units" },
        { id:"tmpl-minor-in-cybersecurity-and-international-con-cat2", name:"Elective Courses", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["16-735", "17-200", "17-303", "17-331", "17-333", "17-334", "17-702", "79-301", "79-302", "80-249", "84-200", "84-274", "84-280", "84-304", "84-312", "84-314", "84-319", "84-323", "84-325", "84-328", "84-329", "84-331", "84-341", "84-349", "84-350", "84-356", "84-365", "84-368", "84-370", "84-371", "84-372", "84-373", "84-375", "84-380", "84-383", "84-386", "84-389", "84-390", "95-444"], patterns:[], excludes:[]}, note:"three courses, 27 units; at least one course (9 units) must be a CMIST course with an 84-number" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-international-relations-and-politic", name:"Minor in International Relations and Political Science", type:"minor", college:"Dietrich - Carnegie Mellon Institute for Strategy and Technology (CMIST)",
    totalUnitsTarget:63,
    note:"Director: Audrey Kurth Cronin. \"The International Relations and Political Science (IRPS) minor is for students who want to learn how to think systematically and develop foundational knowledge about international and domestic politics.\" \"A maximum of two courses may double count between the minor in International Relations and Political Science and another major or minor. Unlimited double counting  [Source: 63 units units]",
    sections:[
      { id:"tmpl-minor-in-international-relations-and-politic-sec", name:"Requirements", unitsTarget:63, categories:[
        { id:"tmpl-minor-in-international-relations-and-politic-cat0", name:"Core Courses", kind:"pool", minCourses:5, minUnits:36, targetUnits:36, targetCourses:5, pool:{explicit:["84-101", "84-104", "84-110", "84-226", "84-275"], patterns:[], excludes:[]}, note:"all required, 36 units" },
        { id:"tmpl-minor-in-international-relations-and-politic-cat1", name:"Electives", kind:"pool", minCourses:null, minUnits:27, targetUnits:27, targetCourses:null, pool:{explicit:["19-452", "70-342", "70-365", "70-430", "73-332", "76-318", "79-203", "79-205", "79-223", "79-227", "79-229", "79-230", "79-257", "79-262", "79-264", "79-265", "79-266", "79-267", "79-275", "79-288", "79-301", "79-302", "79-313", "79-314", "79-318", "79-320", "79-343", "79-377", "79-385", "80-135", "80-136", "80-249", "80-335", "80-348", "80-447", "84-120", "84-200", "84-252", "84-274", "84-280", "84-303", "84-304", "84-306", "84-309", "84-310", "84-311", "84-312", "84-314", "84-318", "84-319", "84-322", "84-323", "84-324", "84-325", "84-327", "84-328", "84-329", "84-331", "84-333", "84-341", "84-349", "84-350", "84-352", "84-355", "84-356", "84-358", "84-362", "84-363", "84-365", "84-366", "84-367", "84-368", "84-369", "84-370", "84-371", "84-372", "84-373", "84-375", "84-380", "84-383", "84-386", "84-387", "84-389", "84-390", "84-393", "84-402", "84-405", "88-234", "88-281", "88-284", "88-411"], patterns:[], excludes:[]}, note:"select three courses, 27 units; two courses (18 units) must be from CMIST with an 84-number" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-military-strategy-and-international", name:"Minor in Military Strategy and International Relations", type:"minor", college:"Dietrich - Carnegie Mellon Institute for Strategy and Technology (CMIST)",
    totalUnitsTarget:63,
    note:"Director: Audrey Kurth Cronin. \"Particularly appropriate for CMU students embarking on the Reserve Officer Training Corps (ROTC) program as well as those interested in pursuing defense-related careers.\" \"Students may double count a maximum of two courses (18 units) with another major or minor. Unlimited double counting is permitted with general education requirements.\" [Source: 63 units units]",
    sections:[
      { id:"tmpl-minor-in-military-strategy-and-international-sec", name:"Requirements", unitsTarget:63, categories:[
        { id:"tmpl-minor-in-military-strategy-and-international-cat0", name:"Core Courses", kind:"pool", minCourses:5, minUnits:27, targetUnits:27, targetCourses:5, pool:{explicit:["84-280", "84-319", "84-325", "84-328", "84-362"], patterns:[], excludes:[]}, note:"all required, 27 units" },
        { id:"tmpl-minor-in-military-strategy-and-international-cat1", name:"Electives", kind:"pool", minCourses:null, minUnits:36, targetUnits:36, targetCourses:null, pool:{explicit:["17-200", "32-201", "32-310", "32-402", "79-257", "79-268", "79-302", "80-136", "84-104", "84-120", "84-200", "84-226", "84-274", "84-275", "84-280", "84-303", "84-304", "84-309", "84-312", "84-318", "84-322", "84-323", "84-324", "84-325", "84-329", "84-331", "84-333", "84-341", "84-349", "84-350", "84-362", "84-363", "84-365", "84-366", "84-367", "84-368", "84-370", "84-371", "84-372", "84-373", "84-380", "84-383", "84-386", "84-387", "84-389", "84-390", "84-393", "84-405"], patterns:[], excludes:[]}, note:"total of 36 units (typically four courses); at least 18 units (typically two courses) must be from CMIST with an 84-number" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-political-science-security-and-tech", name:"Minor in Political Science, Security, and Technology", type:"minor", college:"Dietrich - Carnegie Mellon Institute for Strategy and Technology (CMIST)",
    totalUnitsTarget:63,
    note:"Director: Audrey Kurth Cronin. \"Designed for students who are majoring in fields from the arts and humanities to science, engineering, and computer science... takes a social science (not technical) approach to studying emerging technologies that affect war and peace.\" \"A maximum of two courses may double count between the minor in Politics and Public Policy and another major or minor. Unlimited do [Source: 63 units units]",
    sections:[
      { id:"tmpl-minor-in-political-science-security-and-tech-sec", name:"Requirements", unitsTarget:63, categories:[
        { id:"tmpl-minor-in-political-science-security-and-tech-cat0", name:"Political Science Core", kind:"pool", minCourses:null, minUnits:18, targetUnits:18, targetCourses:null, pool:{explicit:["84-101", "84-104", "84-226", "84-275"], patterns:[], excludes:[]}, note:"18 units" },
        { id:"tmpl-minor-in-political-science-security-and-tech-cat1", name:"Security and Technology Core", kind:"pool", minCourses:null, minUnits:45, targetUnits:45, targetCourses:null, pool:{explicit:["84-274", "84-314", "84-349", "84-350", "84-356", "84-363", "84-368", "84-370", "84-371", "84-372", "84-375", "84-383", "84-387", "84-390", "84-405"], patterns:[], excludes:[]}, note:"45 units" },
      ]},
    ]
  },
  {
    id:"tmpl-minor-in-politics-and-public-policy", name:"Minor in Politics and Public Policy", type:"minor", college:"Dietrich - Carnegie Mellon Institute for Strategy and Technology (CMIST)",
    totalUnitsTarget:66,
    note:"Director: Audrey Kurth Cronin. \"Rooted in the discipline of political science, the minor in Politics and Public Policy investigates US public policy issues and other matters of domestic politics... Students pursuing the Politics and Public Policy minor must participate in the Carnegie Mellon University Washington Semester Program (CMU/WSP) for one semester during their undergraduate years.\" \"A max [Source: 66 units units]",
    sections:[
      { id:"tmpl-minor-in-politics-and-public-policy-sec", name:"Requirements", unitsTarget:66, categories:[
        { id:"tmpl-minor-in-politics-and-public-policy-cat0", name:"Internship", kind:"pool", minCourses:null, minUnits:24, targetUnits:24, targetCourses:null, pool:{explicit:["84-360"], patterns:[], excludes:[]}, note:"required, 24 units; taken while participating in CMU/WSP" },
        { id:"tmpl-minor-in-politics-and-public-policy-cat1", name:"Seminar on Public Policy Research, Writing and Implementation", kind:"pool", minCourses:null, minUnits:12, targetUnits:12, targetCourses:null, pool:{explicit:["84-336", "84-339"], patterns:[], excludes:[]}, note:"choose one full-semester course, 12 units" },
        { id:"tmpl-minor-in-politics-and-public-policy-cat2", name:"Seminars on American Politics, Governance, Institutions, and Law", kind:"pool", minCourses:null, minUnits:12, targetUnits:12, targetCourses:null, pool:{explicit:["84-332", "84-338"], patterns:[], excludes:[]}, note:"enroll in one course each mini during DC semester, total 2 seminars, 12 units" },
        { id:"tmpl-minor-in-politics-and-public-policy-cat3", name:"Foundational Course", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["84-101", "84-104", "84-226", "84-275"], patterns:[], excludes:[]}, note:"choose one, 9 units; may be taken before/after CMU/WSP; offered at Pittsburgh or Qatar campus" },
        { id:"tmpl-minor-in-politics-and-public-policy-cat4", name:"Data Science / Economics Requirement", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:null, pool:{explicit:["36-202", "73-102", "73-103", "73-104", "84-110"], patterns:[], excludes:[]}, note:"choose one, 9 units; may be taken before/after CMU/WSP" },
      ]},
    ]
  },
];
// Note: COURSE_CATALOG is purely an autofill convenience (name/units lookup) and
// DEFAULT_DEPTS is purely a department-name lookup — neither affects requirement
// matching logic, which lives in MINOR_TEMPLATES' pool/slot definitions and in
// defaultPrograms() (BCSA) inside index.html.
