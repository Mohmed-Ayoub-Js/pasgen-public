import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiUrl } from "@/lib/public";
import registeringHistory from "@/hooks/SaveHistory";


const Elements = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<any>(null);
  const upload = () => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", image);
    axios
      .post(`${apiUrl}/savecustomdata`, formData)
      .then((res) => {
        console.log(res);
        registeringHistory("تم حفظ كلمة السر");
        axios.post(`${apiUrl}/sq` , {quantityToSubtract : 2}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
        setTimeout(() => {
          location.reload();
        }, 236);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    {
      name: "amazon",
      image: "amazon.png",
      route: "amazon",
    },
    {
      name: "apple",
      image: "apple.png",
      route: "apple",
    },
    {
      name: "discord",
      image: "discord.png",
      route: "discord",
    },
    {
      name: "email",
      image: "email.png",
      route: "email",
    },
    {
      name: "facebook",
      image: "facebook.png",
      route: "facebook",
    },
    {
      name: "google",
      image: "google.png",
      route: "google",
    },
    {
      name: "insta",
      image: "insta.png",
      route: "insta",
    },
    {
      name: "paypal",
      image: "paypal.png",
      route: "paypal",
    },
    {
      name: "wifi",
      image: "wifi.png",
      route: "wifi",
    },
    {
      name: "youtube",
      image: "youtube.png",
      route: "youtube",
    },
    {
      name: "مخصص",
      image: "cus.png",
      route: "مخصص",
    },
  ];

  return (
    <div className=" grid grid-cols-4 gap-4 mt-5">
      {data.map((item, index) => (
        <Dialog key={index}>
          <DialogTrigger>
            <Card
              onClick={() => {
                setImage(item.image);
              }}
            >
              <CardHeader>
                <CardTitle className=" flex justify-center items-center flex-col tran hover:scale-105">
                  <img src={item.image} alt="" width={70} height={70} />
                </CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>حفظ بيانات المستخدم في {item.name}</DialogTitle>
              <DialogDescription className=" w-full flex justify-start items-start flex-col">
                <img
                  src={item.image}
                  alt=""
                  width={40}
                  height={40}
                  className=" flex justify-center items-center flex-col"
                />
                <Input
                  placeholder="اسم المستخدم"
                  className=" mt-5"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <Input
                  placeholder="كلمة السر"
                  className=" mt-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {item.name == "مخصص" ? (
                  <label className="flex mt-5 cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                    <span className="flex items-center space-x-2">
                      <svg
                        className="h-6 w-6 stroke-gray-400"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="24"
                        ></path>
                        <path
                          d="M80,128a80,80,0,1,1,144,48"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="24"
                        ></path>
                        <polyline
                          points="118.1 161.9 152 128 185.9 161.9"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="24"
                        ></polyline>
                        <line
                          x1="152"
                          y1="208"
                          x2="152"
                          y2="128"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="24"
                        ></line>
                      </svg>
                      <span className="text-xs font-medium text-gray-600">
                        قم رفع صورة المنصة التي تحفظ فيها كلمة السر
                        <span className="text-blue-600 underline">
                          {" "}
                          اظغط للرفع
                        </span>
                      </span>
                    </span>
                    <input
                      id="photo-dropbox"
                      type="file"
                      className="sr-only"
                      onChange={(e: any) => {
                        setFile(e.target.files[0]);
                      }}
                    />

                    <p className=" text-red-500">
                      لن يتم حفظ الصورة في اي خادم خارجي ، سيتم حفظ كل شيء في
                      الجهاز
                    </p>
                  </label>
                ) : (
                  <p></p>
                )}
                <Button
                  className=" w-full mt-5"
                  onClick={async () => {
                    const change = await setFile(item.image);
                    console.log(change);

                    upload();
                  }}
                >
                  حفظ
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Elements;
