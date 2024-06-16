import  { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { apiUrl } from "@/lib/public";

const Faveir = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/favorites`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-start items-start flex-row gap-1">
            <Star className="bg-yellow-600 rounded-full p-1" color="yellow" />
            <span>المفضلة</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data === null ? (
            <div className="flex justify-center items-center flex-col">
              <img src="error.png" alt="" />
              <p className="text-1xl font-bold">جاري التحميل...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex justify-center items-center flex-col">
              <img src="error.png" alt="" />
              <p className="text-1xl font-bold">لا يوجد شيء لعرضه</p>
            </div>
          ) : (
            <div className=" grid grid-cols-2 gap-10 w-full ">
              {data.map((item : any) => (
                <div key={item._id} className="my-4">
                  <div className="flex justify-center items-center dark:bg-gray-800  ">
    <div className="relative cursor-pointer dark:text-white">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg dark:bg-gray-200"></span>
        <div
            className="relative p-6 bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
            <div className="flex items-center">
                <span className="text-xl">
                <img src={item.image ? item.image : item.file} alt="" width={100} height={100}/>
 
                </span>
                <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                {item.username} 
                </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
               رقم المعرف: {item.userId}
            {item.username} 
            </p>
        </div>
    </div>

</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Faveir;
