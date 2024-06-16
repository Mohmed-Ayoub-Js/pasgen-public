import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/public";
import moment from 'moment';

const ThenUseig = () => {
  const [data , setData] = useState<any>(null);
  useEffect(()  => {
    axios.get(`${apiUrl}/getactivity`).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
      
    })
  } , [])
  return (
    <div className=" mt-5">
      <Card>
        <CardHeader>
          <CardTitle className=" flex justify-start items-start flex-row gap-1">
            <History
              className="  bg-yellow-600 rounded-full p-1"
              color="yellow"
            />{" "}
            <span>التأريخ</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data == null ? (
            <div className=" flex justify-center items-center flex-col">
              <img src="error.png" alt="" />
              <p className=" text-1xl font-bold">لا يوجد شيء لعرضه</p>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-10">
              {data.map((item : any , index : any) => (
                <div key={index} className=" flex justify-between items-start flex-row gap-10 rounded-lg shadow-lg w-full p-5"> 
                 <span>
                  {item.action}
                 </span>
                 <span>
                 <span>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</span>
                 </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThenUseig;
