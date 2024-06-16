import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { apiUrl } from "@/lib/public";
const Custom = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
      {data.length == 0 ? (
        <div className=" mt-5">
          <Card>
            <CardHeader>
              <CardTitle className=" flex justify-start items-start flex-row gap-1">
                <Pencil
                  className="  bg-yellow-600 rounded-full p-1"
                  color="yellow"
                />{" "}
                <span>المخصص الحفوظ</span>
              </CardTitle>
              <div className=" flex justify-center items-center flex-col">
                <img src="error.png" alt="" />
                <p className=" text-1xl font-bold">لا يوجد شيء لعرضه</p>
              </div>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <Card className=" mt-5">
          <CardHeader>
            <div className=" flex justify-start items-start flex-row gap-1">
              <Pencil
                className="  bg-yellow-600 rounded-full p-1"
                color="yellow"
              />{" "}
              <span className="  font-bold text-1xl">المخصص الحفوظ</span>
            </div>

            <div className=" grid grid-cols-4 gap-5">
              {data.map((item: any, index) => (
                <div key={index}>
                  <div className="m-2 p-2 flex justify-center items-center flex-col rounded-lg shadow-lg tran hover:scale-105">
                    <img
                      src={item.image ? item.image : item.file}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default Custom;
