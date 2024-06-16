import {
  Braces,
  Coins,
  Home,
  Info,
  KeyIcon,
  LayoutDashboard,
  Lock,
  Plus,
  Star,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import Passwords from "./passwords/Page";
import Homes from "./home/Page";
import Genrition from "./gen/Page";
import Json from "./json/Page";
import Faverit from "./faverite/Page";
import Len from "./len/Page";
import Dashboard from "./dashboard/Page";
import axios from "axios";
import { apiUrl } from "@/lib/public";
import Coinss from "./coins/Page";
import News from "./news/Page";

const App = () => {
  const [isClose, setIsClose] = useState(true);
  const [page, setPage] = useState("home");
  const [dikr, setDikr] = useState("");
  const [credit , setCredit] = useState<any>(0);
  const [updateValueOfCredit , setUpdateValueOfCredit] = useState(0);
  setTimeout(() => {
    setUpdateValueOfCredit(updateValueOfCredit + 1);
  }, 500);
  useEffect(() => {
    const data = localStorage.getItem("isClose");
    if (!data) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      setDikr(wordsArray[randomIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    axios.get(`${apiUrl}/getCredit`).then((res) => {
      setCredit(res.data.credit);
    }).catch((err) => {
      console.log(err);
    })
  } , [updateValueOfCredit])
  const wordsArray = [
    "استغفر الله",
    "الحمد لله",
    "الله اكبر",
    "لا اله الا الله",
    "اشهد ان محمدا رسول الله",
    "اشهد ان لا اله الا الله",
    "الله اكبر",
    "الحمد لله",
    "بسم الله الرحمن الرحيم",
    "قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
    "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
    " اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد. ",
    "أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ.",
    " سُبْحـانَ اللهِ وَبِحَمْـدِهِ. ",
    " أسْتَغْفِرُ اللهَ وَأتُوبُ إلَيْهِ ",
    "رضيتُ باللهِ ربًّا وبالإسلامِ دينًا وبمحمَّدٍ صلَّى اللهُ عليه وسلَّم نبيًّا",
    "تب الى الله",
    "لا تقنط من رحمة الله",
    "الله غفور رحيم",
    "الله شديد العقاب",
    "قل أذلك خير أم جنة الخلد التي وعد المتقون",
    "افعل ما شأت ولا تنسى القبر",
    "حينما تشعر بالضيق والهم، تذكر أن الله معك وأنه لا يضيع جهدك وصبرك.",
    "احرص على الصلاة في وقتها المحدد، فهي وصلة بينك وبين الله، وطريقك للسكينة والراحة.",
    "التوكل على الله يجعل الحياة أكثر سهولة، فثق بقضاء الله ولا تحزن.",
    "احمد الله في السراء والضراء، فالشكر لله يزيد من نعمه.",
    "تذكير دائم بأن الدنيا متاجر قصيرة، فاستثمر وقتك في طاعة الله وفعل الخيرات.",
    "كن صادقًا في أقوالك وأفعالك، فالصدق طريق للقرب من الله.",
    "لا تجعل الهموم والضغوط الحياتية تبتعدك عن الله، بل ابحث عن قوتك في الصلاة والتسبيح.",
    "العمل الصالح يرفع درجاتك في الدنيا والآخرة، فاجعل كل عمل تقوم به خالصًا لوجه الله.",
    "تذكر دائماً أن الله يعلم ما في قلوبنا، فابتغِ رضاه في كل لحظة.",
    "تجنب الغيبة والنميمة، فإن الله يحاسب على كل كلمة يوم القيامة.",
    "اجتنب الرياء وابذل جهدك في تحقيق الاخلاص في كل أعمالك.",
    "صدق النية في العطاء والعمل الخيري، فالله يحب المحسنين.",
    "اعتن بعلاقتك بالقرآن الكريم، ففيه هدى وشفاء للقلوب.",
    "الصدق والأمانة سمتان عظيمتان، فكن صادقاً في كلمتك ووفياً في التزاماتك.",
    "استعن بالدعاء في كل أمورك، فإن الله هو المجيب للدعاء.",
    "كن على يقين أن الله يحب التوبة، فإذا أخطأت فراجع نفسك وارجع إلى الله.",
    "التسليم لقضاء الله والرضا بما قدر لك يجلب السكينة والطمأنينة.",
    "الإحسان إلى الآخرين هو عبادة، فكن محسنًا وسامح من ظلمك.",
    "قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ (1) مَلِكِ ٱلنَّاسِ (2) إِلَٰهِ ٱلنَّاسِ (3) مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ (4) ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ (5) مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ (6)",
    " قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ (1) مِن شَرِّ مَا خَلَقَ (2) وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ (3) وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ (4) وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ (5) ",
    " إِنَّآ أَعۡطَيۡنَٰكَ ٱلۡكَوۡثَرَ (1) فَصَلِّ لِرَبِّكَ وَٱنۡحَرۡ (2) إِنَّ شَانِئَكَ هُوَ ٱلۡأَبۡتَرُ (3) ",
    "تب الى الله ، وان رجعت الى الذنب ، اعد التوبة الى الله ، واعد التوبة ، الله لا يمل",
    "سبحانك اللهم وبحمدك أشهد أن لا إله إلا أنت أستغفرك اللهم وأتوب إليك",
    " اللهم إني أستغفرك لكل ذنب يعقب الحسرة، ويورث الندامة ويحبس الرزق ",
    "للهم إني أعوذ بك من زوال نعمتك وتحول عافيتك وفجاءة نقمتك وجميع سخطك",
    "اللهم لا تجعل ابتلائي في جسدي، ولا في مالي، ولا في أهلي، وسهّل علي ما استثقلته نفسي",
    "اللهم بك استعين وعليك اتوكل، اللهم ذلل لي صعوبة أمري وسهل لي مشقته وأرزقني من الخير كله أكثر مما أطلب وأصرف عني كل شرـ رب اشرح لي صدري، ويسر لي أمري يا كريم اللهم يسر لي الخير حيث كنت وحيث توجهت",
    "للهم هون علينا سفرنا هذا وطوي عنا بعده،",
    "اللهم إني أستغفرك من كل ذنب أتيته عامدا متعمدا، لطغوى نفسي علي وإسرافي في اتباعها",
    "للهم إني أسألك الجنة وما قرب إليها من قول وعمل، وأعوذ بك من النار وما قرب إليها من قول وعمل، وأعوذ بك أن أقول زورًا أو أغشى فجورًا أو أكون بك مغرورًا",
  ];
  let content;
  switch (page) {
    case "home":
      content = (
        <div>
          <Homes change={change}/>
        </div>
      );
      break;
    case "passwords":
      content = (
        <div>
          <Passwords />
        </div>
      );
      break;
    case "gen":
      content = (
        <div>
          <Genrition />
        </div>
      );
      break;
    case "json":
      content = (
        <div>
          <Json />
        </div>
      );
      break;
    case "fav":
      content = (
        <div>
          <Faverit />
        </div>
      );
      break;
    case "len":
      content = (
        <div>
          <Len />
        </div>
      );
      break;
      case "dashboard":
      content = (
        <div>
          <Dashboard />
        </div>
      );
      break;
      case "coins":
        content = (
          <div>
            <Coinss />
          </div>
        );
        break;
        case "news":
          content = (
            <div>
              <News />
            </div>
          );
          break;
    default:
      content = null;
  }

  function change(item: any) {
    setPage(item);
  }

  return (
    <div>

      <div className="flex h-screen light:bg-gray-100 dark:bg-black">
        <div className="hidden md:flex flex-col w-64 bg-black">
          <div className="flex items-center justify-center h-16 bg-black">
            <span className="text-white font-bold uppercase">
              باس جان PASSGEN
            </span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            {isClose === false ? (
              <nav className="flex-1 px-2 py-4 bg-gray-900 shadow-md">
                <div
                  onClick={() => change("home")}
                  className="flex cursor-pointer items-center px-4 py-2 text-gray-100 hover:bg-blue-700 gap-2 tran rounded-lg"
                >
                  <Home />
                  الرئيسية
                </div>
                <div
                  onClick={() => change("passwords")}
                  className="flex cursor-pointer items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700 gap-2 tran rounded-lg"
                >
                  <KeyIcon />
                  كلمات السر
                </div>
                <div
                  onClick={() => change("gen")}
                  className="flex cursor-pointer  items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700  gap-2 tran rounded-lg"
                >
                  <Plus />
                  توليد كلمة السر
                </div>
                <div
                  onClick={() => change("fav")}
                  className="flex cursor-pointer  items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700  gap-2 tran rounded-lg"
                >
                  <Star />
                  المفضلة
                </div>
                <div
                  onClick={() => change("dashboard")}
                  className="flex cursor-pointer  items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700  gap-2 tran rounded-lg"
                >
                  <LayoutDashboard />
                  لوحة التحكم
                </div>  
                <div
                  onClick={() => change("coins")}
                  className="flex cursor-pointer  items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700  gap-2 tran rounded-lg"
                >
                  <Coins />
                  كريديت
                </div> 
                <div
                  onClick={() => change("json")}
                  className="flex cursor-pointer  items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700  gap-2 tran rounded-lg"
                >
                  <Braces />
                  json
                </div>              
                <div
                  onClick={() => change("len")}
                  className="flex cursor-pointer  items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-700  gap-2 tran rounded-lg"
                >
                  <Info />
                  عن التطبيق
                </div>
              </nav>
            ) : (
              <nav className="flex-1 px-2 py-4 bg-gray-900 shadow-md">
                <a
                  href="#"
                  className="flex cursor-no-drop items-center px-4 py-2 text-gray-100 hover:bg-blue-700 gap-2 tran rounded-lg"
                >
                  <Lock />
                  مغلق
                </a>
              </nav>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div className="flex items-center px-4">
              <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:hidden block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <p>{dikr}</p>
            </div>
            <div className="flex items-center pr-4">
              {isClose == false ?  (
                <div className=" flex justify-center items-center flex-row gap-1">
                <div className=" flex justify-center items-center flex-row ">
                <Coins size={28} color="#c2c464" strokeWidth={2.25} absoluteStrokeWidth />
                <span className=" text-3xl font-bold">
                  {credit.toFixed(1)}
                </span>
               </div>
                <Button
                className=" m-2"
                onClick={() => {
                  change("gen");
                }}
              >
                <Plus />
              </Button>
              </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="p-4">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
