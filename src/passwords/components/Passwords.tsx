import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { apiUrl } from "@/lib/public";
import { Star } from "lucide-react";

const Passord = () => {
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

  return (
    <div>
      <div className=" text-2xl font-bold">كلمات السر:</div>
      <div className=" flex justify-start items-start flex-col w-full ">
        {data.map((item: any, index) => (
          <div key={index} className=" w-full p-5">
            <div className="m-2  w-full p-2 flex justify-start items-start flex-col rounded-lg shadow-lg tran hover:scale-105">
              <img
                src={item.image ? item.image : item.file}
                alt=""
                width={100}
                height={100}
              />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>id</AccordionTrigger>
                  <AccordionContent>{item._id}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>اسم المستخدم</AccordionTrigger>
                  <AccordionContent>{item.username}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>كلمة السر</AccordionTrigger>
                  <AccordionContent>{item.password}</AccordionContent>
                </AccordionItem>
              </Accordion>
              <div onClick={() => {
                axios.post(`${apiUrl}/fav` , {
                  username : item.username,
                  image : item.image,
                  file : item.file,
                  id: item._id,
                })
              }} className=" bg-yellow-500 cursor-pointer p-2 m-2 rounded-full  flex justify-center items-center flex-col" >
            <Star   color="yellow"/>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passord;
