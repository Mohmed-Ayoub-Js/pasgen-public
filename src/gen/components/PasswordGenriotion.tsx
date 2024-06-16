import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import { apiUrl } from "@/lib/public";
import registeringHistory from "@/hooks/SaveHistory";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(0);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [message, setMessage] = useState(
    "شريط تقييم قوة كلمة السر ، اظغط على زر توليد لأنشاء كلمات سر",
  );
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let generatedPassword = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
    setMessage(
      " ممتاز ، الان باستخدام شريط التقييم قم باتخاذ القرار في اختيار كلمة السر او تجربة غيرها ، كلما كان الشريط في اقصى مراحله كانت كلمة السر قوية  اذا كنت تريد حفظ كلمة السر قم بتمريير المؤشر على الكلمة ستظهر لك بطاقة فيها زر احفظ كلمة السر وستظهر كل كلمات السر المحفوظة اسفل الصفحة",
    );
    const passwordStrength = calculatePasswordStrength(generatedPassword);
    setValue(passwordStrength);
  };
  const calculatePasswordStrength = (password: any) => {
    const lengthScore = (password.length / 8) * 100;
    const diversityScore = calculateDiversityScore(password);
    const totalScore = (lengthScore + diversityScore) / 2;
    return totalScore;
  };

  const calculateDiversityScore = (password: any) => {
    const uniqueChars = new Set(password.split(""));
    const diversityPercentage = (uniqueChars.size / password.length) * 100;
    return diversityPercentage;
  };

  function sendData() {
    axios
      .post(`${apiUrl}/saveminipassword`, { password })
      .then((res) => {
        console.log(res);
        registeringHistory("تم انشاء كلمة السر")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`${apiUrl}/getminipasswords`)
      .then((response) => {
        setSavedPasswords(response.data);
        console.log(response.data);

        // تحديث حالة savedPasswords بالبيانات المسترجعة
      })
      .catch((error) => {
        console.error("Error fetching saved passwords:", error);
      });
  }, [password]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>توليد كلمات السر</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={generatePassword}>توليد</Button>
        </CardContent>
        <CardFooter className=" flex justify-center items-center flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <p className=" text-2xl font-extrabold mt-5 mb-5">{password}</p>
            </HoverCardTrigger>
            <HoverCardContent>
              <Button
                variant={"outline"}
                className=" w-full"
                onClick={() => {
                  sendData();
                }}
              >
                حفظ
              </Button>
            </HoverCardContent>
          </HoverCard>

          <Progress value={value} />
          <p className=" mt-2">{message}</p>
        </CardFooter>
      </Card>
      <div className=" grid grid-cols-4 gap-7">
        {savedPasswords.map((item: any, index: any) => (
          <div className=" mt-2" key={index}>
            <Card>
              <CardHeader>{item.password}</CardHeader>
              <CardContent>id : {item._id}</CardContent>
              <CardFooter>
                <Progress value={item.value} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordGenerator;
