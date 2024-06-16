import { apiUrl } from "@/lib/public";
import axios from "axios";
import { DollarSign, Pen, Save } from "lucide-react"
import { useEffect, useState } from "react";

const About = () => {
    const [credit , setCredit] = useState<any>(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/getCredit`).then((res) => {
          setCredit(res.data.credit);
        }).catch((err) => {
          console.log(err);
        })
      } , []);


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${apiUrl}/get`);
            setData(response.data.length);
            console.log(response.data);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>
<div className="m-6">
    <div className="flex flex-wrap -mx-6">
        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
                <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                    <Save className=" text-white text-xl h-8 w-8"/>
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                        {data}
                    </h4>
                    <div className="text-gray-500">
                        الكل
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
                <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                    <Pen  className=" text-white text-xl h-8 w-8"/>
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">0</h4>
                    <div className="text-gray-500">
                     Unknow
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-200">
                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                   <DollarSign  className=" text-white text-xl h-8 w-8"/>
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                    {credit.toFixed(1)}
                    </h4>
                    <div className="text-gray-500">
                        الكريديت
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default About