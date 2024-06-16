import axios from "axios";
import { useEffect, useState } from "react";
import Elements from "./components/Elements";
import Custom from "./components/Custom";
import About from "./components/About";
import Faveir from "./components/Faveir";
import ThenUseig from "./components/ThenUseig";
import { apiUrl } from "@/lib/public";
const Homes = ({change} : any) => {
  const [isClose, setIsClose] = useState(true);
  const [password, setPassword] = useState("");
  const [message , setMessage] = useState("")
  useEffect(() => {
    const data = localStorage.getItem("isClose");
    if (!data) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
  }, []);
  function Create() {
    console.log(apiUrl);
    
    axios
      .post(`${apiUrl}/savepassword`, { password })
      .then((response) => {
        console.log(response.data);
       setMessage(response.data.message);
        localStorage.setItem("isClose", "false");
        axios.post(`${apiUrl}/saveactivity`, {action :"تسجيل الدخول"}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      {isClose == true ? (
        <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
          <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-gray-300">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  قم بأنشاء كلمة سر لحفظ بياناتك
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  ادخل كلمة السر للأستمرار
                </p>
                <p>
                  {message}
                </p>
              </div>

              <div className="mt-5">
                <>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        كلمة السر
                      </label>
                      <div className="relative">
                        <input
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type="password"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-gray-500 focus:ring-gray-500 shadow-sm"
                          required
                          aria-describedby="email-error"
                        />
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    </div>
                    <button
                      onClick={Create}
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      تسجيل الدخول
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>

          <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
            <a
              className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-200"
              href="#"
            >
              يرجى تذكر كلمة السر جيدا
            </a>
          </p>
        </main>
      ) : (
        <div>
          <About change={change}/>
          <Faveir />
          <Elements />
          <Custom />
          <ThenUseig />
        </div>
      )}
    </div>
  );
};

export default Homes;
