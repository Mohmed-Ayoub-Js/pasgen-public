import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/lib/public";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {PayPalButton} from 'react-paypal-button-v2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Coinss = () => {
  const [selected , setSelected] = useState<any>();
  const [totalPrice , setTotalPrice] = useState<string>('0');
  const [value, setValue] = useState<any>(0);

  const paymentSuccessHandler = (details : any, _data : any) => {
    alert("Transaction completed by " + details.payer.name.given_name);
};
    const invoices = [
        {
          invoice: "مستوى 1",
          paymentStatus: "تسريع",
          totalAmount: "0.5$",
          paymentMethod: "تسريع الى X5",
        },
        {
          invoice: "مستوى 2",
          paymentStatus: "مميزات",
          totalAmount: "1.5$",
          paymentMethod: "الحصول على تسعة الاف نقطة",
        },
        {
          invoice: "مستوى 3",
          paymentStatus: "تسريع",
          totalAmount: "3.7$",
          paymentMethod: "تسريع الى X10",
        },
        {
          invoice: "مستوى 4",
          paymentStatus: "مميزات",
          totalAmount: "5.7$",
          paymentMethod: "الحصول على خمسة عشر الاف نقطة",
        },
        {
          invoice: "مستوى 5",
          paymentStatus: "تسريع",
          totalAmount: "6.9$",
          paymentMethod: "تسريع الى X15",
        },
        {
          invoice: "مستوى 6",
          paymentStatus: "مميزات",
          totalAmount: "8.4$",
          paymentMethod: "الحصول على عشرين الف نقطةr",
        },
        {
          invoice: "مستوى 7",
          paymentStatus: "مميزات",
          totalAmount: "9.0$",
          paymentMethod: "عدد لا محدود من النقاط ، تسريع الى X100 اضعاف",
        },
      ]
  useEffect(() => {
    axios.get(`${apiUrl}/getCredit`)
      .then((res) => {
        setValue(res.data.credit);
      })
      .catch((err) => {
        console.log(err);
      });
    const interval = setInterval(() => {
      setValue((prevValue: number) => prevValue + 0.1);
      
    }, 500); 

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    console.log(value);
    
  } , [value])


  function setPrice() {
    if (!selected) {
      setTotalPrice("0");
    } else {
      switch (selected) {
        case "l1":
          setTotalPrice("0.5");
          break;
        case "l2":
          setTotalPrice("1.5");
          break;
        case "l3":
          setTotalPrice("3.7");
          break;
        case "l4":
          setTotalPrice("5.7");
          break;
        case "l5":
          setTotalPrice("6.9");
          break;
        case "l6":
          setTotalPrice("8.4");
          break;
        case "l7":
          setTotalPrice("9.0");
          break;
        default:
          setTotalPrice("0"); 
          break;
      }
    }
  }
  function save(){
    axios.post(`${apiUrl}/credit` , {creditValue : value}).then((res) => {
      console.log(res);
      axios.post(`${apiUrl}/saveactivity`, {action :`سحب كريديت بقيمة ${value}$`}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <div >
     <div className="flex justify-center items-center flex-col h-[100vh] mt-[140px]">
      <p className="text-5xl font-extrabold text-black">
        {value.toFixed(1)}
      </p>
      <Button className=" w-24  p-5 mt-4" onClick={() => {
        save();
      }}>
        حفظ
      </Button>
      <p>
        تساعدك العملات على تخزين اكبر عدد من كلمات السر ، ستكلفك كلمة السر الواحدة عملتين
      </p>
      <p>
        ابقى في الصفحة
      </p>
      <p>
        بعد الانتهاء قم بحفظ التقدم ليتم حفظه واستخدامه
      </p>
      <div className=" w-full p-5">
      <Table>
      <TableCaption>
        اختر المستوى الذي تريد الدعم به يمكنك الدفع بدل ذلك بالكريديت على الديسكورد
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">المستويات</TableHead>
          <TableHead>نوع المستوى</TableHead>
          <TableHead>المكافئة</TableHead>
          <TableHead className="text-right">السعر</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>

      </div>
      <div>
      <div className="flex items-center justify-center flex-col gap-6 bg-gray-100">
      <Select onValueChange={(e) => {
       setSelected(e);
       setPrice();
       console.log(totalPrice);
       
      }}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="اختيار مستوى" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="l1">المستوى الاول</SelectItem>
    <SelectItem value="l2">المستوى الثاني</SelectItem>
    <SelectItem value="l3">المستوى الثالث</SelectItem>
    <SelectItem value="l4">المستوى الرابع</SelectItem>
    <SelectItem value="l5">المستوى الخامس</SelectItem>
    <SelectItem value="l6">المستوى السادس</SelectItem>
    <SelectItem value="l7">المستوى السابع</SelectItem>
  </SelectContent>
</Select>

      <PayPalButton
              
                amount={totalPrice}
                currency="USD"
                onSuccess={paymentSuccessHandler}
                onError={(error : any) => console.log(error)}
                options={{ clientId: "ASf48obWCH-aJpr1hvXZCIMt9cTV_AmpqsXYaHwSMYT7GSA-VNqw5G18cnpzsrV_mlOmClPtJo8D0KMB" }}
                
            />
</div>
      </div>
    </div>      
    </div>
  );
};

export default Coinss;
